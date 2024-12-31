import { Container } from "@/components/container"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { TableData } from "./components/tableData"
import prismaClient from "@/lib/prisma"
import { FilterButton } from "./components/filter"

export default async function Dashboard(){
    const session = await getServerSession(authOptions)

    if(!session || !session.user){
        redirect('/')
    }
    
    const demands = await prismaClient.demand.findMany({
        where: {
            status: {
                in: ['nao-iniciado', 'andamento']
            },
            customer: {
                userId: session.user.id
            }
        },
        orderBy: {
            created_at: 'desc'
        },
        include: {
            customer: true
        }
    })
    

    return(
        <Container>
            <main className="my-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl xs:text-3xl font-bold">Demandas</h1>
                    
                    <div className="flex gap-2">
                        <FilterButton />

                        <Link href='/dashboard/new' className="bg-gray-900 hover:opacity-85 text-white rounded px-4 py-1 duration-300">
                            Nova demanda
                        </Link>
                    </div>
                </div>

                <table className="min-w-full my-2">
                    <thead>
                        <tr className="h-8">
                            <th>Cliente</th>
                            <th className="hidden sm:table-cell">Prazo</th>
                            <th>Status</th>
                            <th className="hidden xs:table-cell">Categoria</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <TableData demands={demands} />
                    
                </table>

                {demands.length === 0 && (
                    <h3 className="font-bold text-gray-600">Nenhuma demanda em aberto...</h3>
                )}
            </main>
        </Container>
    )
}