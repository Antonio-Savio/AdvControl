"use client"

import { CardCustomerProps } from "@/utils/customer.type"
import { api } from '@/lib/api'
import { useRouter } from "next/navigation"
import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface ErrorResponse {
    error: string;
}

export function Card({ customer }: { customer: CardCustomerProps }){
    const router = useRouter();
    
    async function handleDeleteCustomer(){
        try{
            const response = await api.delete("/api/customer", {
                params: {
                    id: customer.id
                }
            })
    
            toast.success("Cliente deletado com sucesso!")
            router.refresh()
        } catch(err){
            const axiosError = err as AxiosError<ErrorResponse>
            toast.error(axiosError.response?.data?.error || "Erro desconhecido")
        }
        
    }
    
    return(
        <>
            <article className="flex flex-col bg-gray-100 hover:bg-gray-200 border-2 p-2 gap-2 rounded duration-300">
                <p className="truncate"><strong>Nome: </strong>{customer.name}</p>
                <p><strong>Email: </strong>{customer.email}</p>
                <p><strong>Telefone: </strong>{customer.phone}</p>
                {customer.address && (
                    <p className="truncate"><strong>Endereço: </strong>{customer.address}</p>
                )}
                
                <button
                    className="bg-red-600 px-4 rounded text-white self-start hover:opacity-85 duration-300"
                    onClick={handleDeleteCustomer}
                >
                    Deletar
                </button>
            </article>
        </>
    )
}