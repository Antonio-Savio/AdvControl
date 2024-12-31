
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prismaClient from '@/lib/prisma';

export async function GET(request: Request){
    const { searchParams } = new URL(request.url);
    const customerEmail = searchParams.get("email")

    if(!customerEmail || customerEmail === ""){
        return Response.json({ error: "Cannot find customer" }, { status: 400 })
    }

    try{
        const customer = await prismaClient.customer.findFirst({
            where: {
                email: customerEmail
            }
        })

        return Response.json(customer)

    } catch(err){
        return Response.json({ error: "Cannot find customer" }, { status: 400 })
    }
}


export async function DELETE(request: Request){
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: "Não autorizado!" }, { status: 401 })
    }

    // http://localhost:3000/api/customer?id=123
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get("id")

    if(!customerId){
        return NextResponse.json({ error: "Não foi possível deletar o cliente" }, { status: 400 })
    }

    //prevent delete customer with a demand not completed
    const findDemands = await prismaClient.demand.findFirst({
        where: {
            customerId: customerId,
            status: {
                in: ['nao-iniciado', 'andamento']
            }
        }
    })

    if (findDemands){
        return NextResponse.json({ error: "Não é possível deletar um cliente com demandas não concluídas" }, { status: 400 })
    }

    try{
        await prismaClient.demand.deleteMany({
            where: {
                customerId: customerId
            }
        })

        await prismaClient.customer.delete({
            where: {
                id: customerId as string
            }
        })

        return NextResponse.json({ message: "Customer successfully deleted" })

    } catch(err){
        console.log(err);
        return NextResponse.json({ error: "Cannot delete customer" }, { status: 400 })
    }
}


export async function POST(request: Request){
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 })
    }

    const { name, email, phone, address } = await request.json()

    try{
        await prismaClient.customer.create({
            data: {
                name,
                phone,
                email,
                address: address ? address : "",
                userId: session.user.id
            }
        })

        return NextResponse.json({ message: "Customer successfully created" })

    }catch{
        return NextResponse.json({ error: "Cannot create new customer" }, { status: 400 })
    }

}