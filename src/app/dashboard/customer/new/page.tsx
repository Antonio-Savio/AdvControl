import { Container } from "@/components/container"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { NewCustomerForm } from "../components/form"

export default async function NewCostumer(){
    const session = await getServerSession(authOptions)

    if(!session || !session.user){
        redirect('/')
    }

    return(
        <Container>
            <main className="flex flex-col my-4">
                <div className="flex items-center gap-3">
                    <Link href='/dashboard/customer' className="bg-gray-900 text-white rounded px-4 py-1">
                        Voltar
                    </Link>
                    <h1 className="text-3xl font-bold">Novo cliente</h1>
                </div>

                <NewCustomerForm/>
                
            </main>
        </Container>
    )
}