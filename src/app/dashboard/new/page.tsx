import { Container } from "@/components/container"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import prismaClient from "@/lib/prisma"

export default async function newDemand(){
    const session = await getServerSession(authOptions)

    if (!session || !session.user){
        redirect("/")
    }

    const customers = await prismaClient.customer.findMany({
        where: {
            userId: session.user.id
        },
        orderBy: {
            created_at: 'desc'
        }
    })

    async function handleRegisterDemand(formData: FormData){
        "use server"

        const name = formData.get("name")
        const description = formData.get("description")
        const customerId = formData.get("customer")
        const status = formData.get("status")
        const type = formData.get("type")
        const deadline = formData.get("deadline")
        const deadlineDate = deadline ? new Date(deadline as string) : undefined

        if (!name || !description){
            return
        }

        try{
            await prismaClient.demand.create({
                data: {
                    name: name as string,
                    description: description as string,
                    customerId: customerId as string,
                    status: status as string,
                    type: type as string,
                    deadline: deadlineDate || undefined,
                    UserId: session?.user.id
                }
            })

        } catch(err){
            console.log(err);
        }

        redirect("/dashboard")
    }

    return(
        <Container>
            <main className="my-4">
                <div className="flex items-center gap-3">
                    <Link href='/dashboard' className="bg-gray-900 text-white rounded px-4 py-1">
                        Voltar
                    </Link>
                    <h1 className="text-3xl font-bold">Nova demanda</h1>
                </div>

                <form className="my-6 flex flex-col" action={handleRegisterDemand}>
                    <label className="mb-1 text-lg font-medium">Título</label>
                    <input 
                        type="text"
                        placeholder="Digite o título para demanda"
                        required
                        className="w-full h-10 border-2 rounded px-2 mb-2"
                        name="name"
                    />

                    <label className="mb-1 text-lg font-medium">Descrição</label>
                    <textarea
                        placeholder="Descreva a demanda"
                        required
                        className="w-full h-24 border-2 rounded px-2 mb-2 resize-none"
                        name="description"
                    ></textarea>

                    {customers.length > 0 ? (
                        <>
                            <label className="mb-1 text-lg font-medium">Selecione o cliente</label>
                            <select className="w-full h-10 border-2 rounded px-2 mb-2" name="customer">
                                {customers.map( customer => (
                                    <option value={customer.id} key={customer.id}>{customer.name}</option>
                                ))}
                            </select>
                            
                            <label className="mb-1 text-lg font-medium">Selecione o status da demanda</label>
                            <select className="w-full h-10 border-2 rounded px-2 mb-2" name="status">
                                <option value="andamento">Em andamento</option>
                                <option value="nao-iniciado">Não iniciado</option>
                                <option value="concluido">Concluído</option>
                            </select>
        
                            <label className="mb-1 text-lg font-medium">Selecione a categoria</label>
                            <select className="w-full h-10 border-2 rounded px-2 mb-2" name="type">
                                <option value="audiencia">Audiência</option>
                                <option value="prazo">Prazo</option>
                                <option value="consultoria">Consultoria</option>
                                <option value="doc">Elaboração de documentos</option>
                                <option value="atendimento">Atendimento</option>
                            </select>
        
                            <label className="mb-1 text-lg font-medium">Prazo de conclusão</label>
                            <input 
                                type="date"
                                className="w-full h-10 border-2 rounded px-2 mb-2"
                                name="deadline"
                            />
                        </>
                    ) : (
                        <>
                            <Link href='/dashboard/customer/new'>
                                Você precisa cadastrar clientes para criar demandas. <strong className="text-blue-600">Cadastrar aqui.</strong>
                            </Link>
                        </>
                    )}


                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-bold rounded px-2 my-4 h-10 cursor-pointer hover:opacity-85 duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
                        disabled={customers.length === 0}
                    >Cadastrar</button>

                </form>
            </main>
        </Container>
    )
}