import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prismaClient from '@/lib/prisma'

// http://localhost:3000/api/demand
export async function PATCH(request: Request){
    const session = await getServerSession(authOptions)

    if (!session || !session.user){
        return NextResponse.json({ error: "Not authorized" }, { status: 401 })
    }

    const { id, status } = await request.json()

    const findDemand = await prismaClient.demand.findFirst({
        where: {
            id: id as string
        }
    })

    if(!findDemand){
        return NextResponse.json({ error: "Failed update demand" }, { status: 400 })
    }

    try{
        await prismaClient.demand.update({
            where: {
                id: id as string
            },
            data: {
                status: status === "nao-iniciado" ? "andamento" : "concluido"
            }
        })

        return NextResponse.json({ message: "Status successfully updated" })
    } catch(err){
        return NextResponse.json({ error: "Failed update demand" }, { status: 400 })
    }
}


export async function POST(request: Request){
    const { customerId, name, description, status, type, deadline } = await request.json()

    if(!customerId || !name || !description){
        return NextResponse.json({ error: "Cannot register demand" }, { status: 400 })
    }

    try{
        await prismaClient.demand.create({
            data: {
                customerId,
                name,
                description,
                status,
                type,
                deadline: deadline || undefined
            }
        })

        return NextResponse.json({ message: "Demand successfully created!" })

    } catch(err){
        return NextResponse.json({ error: "Cannot register demand" }, { status: 400 })
    }
}

export async function GET(request: Request){
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const category = searchParams.get("category")
    const deadline = searchParams.get("deadline")
    const session = await getServerSession(authOptions)
    const now = new Date()

    try{
        let whereClause: any = {
            customer: {
                userId: session?.user.id || undefined
            }
        };

        if (status) {
            whereClause.status = status;
        }

        if (category) {
            whereClause.type = category;
        }

        if(deadline === "ultrapassado"){
            whereClause.deadline = { lt: now }
        } else if (deadline === "prazo"){
            whereClause.deadline = { gt: now }
        }

        const filteredDemands = await prismaClient.demand.findMany({
            where: whereClause,
            orderBy: {
                created_at: 'desc'
            },
            include: {
                customer: true
            }
        })

        return NextResponse.json(filteredDemands)

    } catch(err){
        return NextResponse.json({ error: "Cannot find customer" }, { status: 400 })
    }
}