"use client"
import { useState } from "react"
import { Input } from "@/components/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FiSearch, FiX } from "react-icons/fi"
import { DemandForm } from "./components/demandForm"
import { api } from "@/lib/api"

const schema = z.object({
    email: z.string().email("Digite um email válido.").min(1, "Campo obrigatório!")
})

type FormData = z.infer<typeof schema>

export interface CustomerDataInfo{
    id: string;
    name: string;
}

export default function PublicDemand(){
    const { register, handleSubmit, setValue, setError, formState: {errors} } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const [customer, setCustomer] = useState<CustomerDataInfo | null>(null)

    function handleRemoveCustomer(){
        setCustomer(null)
        setValue("email", "")
    }

    async function handleGetCustomer(data: FormData){
        const response = await api.get("/api/customer", {
            params: {
                email: data.email
            }
        })

        if(!response.data){
            setError("email", { type: "custom", message: "Cliente não encontrado!" })
            return;
        }

        setCustomer({
            id: response.data.id,
            name: response.data.name
        });
        
    }

    return(
        <div className="w-full max-w-2xl mx-auto px-2">
            <h1 className="font-bold text-2xl text-center mt-20">Nova demanda</h1>
        
            <main className="flex flex-col mt-4 mb-2">
                {customer ? (
                    <>
                        <div className="bg-slate-200 py-6 px-2 rounded border-2 flex justify-between items-center">
                            <p><strong>Cliente selecionado: </strong>{customer.name}</p>
                            <button className="text-red-600" onClick={handleRemoveCustomer}><FiX size={22}/></button>
                        </div>
                    
                        <DemandForm customer={customer} />
                    </>
                ) : (
                    <form
                        className="bg-slate-200 py-6 px-2 rounded border-2"
                        onSubmit={handleSubmit(handleGetCustomer)}    
                    >
                        <div>
                            <Input 
                                type="text"
                                name="email"
                                placeholder="Digite o email do cliente"
                                error={errors.email?.message}
                                register={register}
                            />

                            <button type="submit" className="text-white bg-blue-500 flex items-center justify-center gap-2 w-full h-10 rounded font-bold my-3 hover:opacity-85 duration-300">
                                Procurar clientes
                                <FiSearch size={22} />
                            </button>
                        </div>
                    </form>
                )}
                
            </main>

        </div>
    )
}