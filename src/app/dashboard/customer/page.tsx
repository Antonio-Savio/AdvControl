import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth"
import Link from "next/link";
import { redirect } from "next/navigation";
import { Card } from "./components/card";
import prismaClient from "@/lib/prisma";

export default async function Customer(){
    const session = await getServerSession(authOptions)
    
    if(!session || !session.user){
        redirect('/')
    }

    const customers = await prismaClient.customer.findMany({
        where: {
            userId: session.user.id
        },
        orderBy: {
            created_at: 'desc'
        }
    })

    return(
        <Container>
            <main>
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Meus clientes</h1>
                    <Link href='/dashboard/customer/new' className="bg-gray-900 text-white rounded px-4 py-1">
                        Novo cliente
                    </Link>
                </div>

                <section className="my-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {customers.map( customer => (
                        <Card 
                            key={customer.id} 
                            customer={customer}
                        />
                    ))}
                </section>

                {customers.length === 0 && (
                    <h2 className="font-bold text-gray-600">Nenhum cliente cadastrado.</h2>
                )}
            </main>
        </Container>
    )
}