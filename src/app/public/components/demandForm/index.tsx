"use client"

import { Input } from "@/components/input"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { api } from "@/lib/api"
import { CustomerDataInfo } from "../../page"
import toast from "react-hot-toast"

const schema = z.object({
    name: z.string().min(1, "O título da demanda é obrigatório"),
    description: z.string().min(1, "Descreva a demanda..."),
    status: z.enum(["andamento", "nao-iniciado", "concluido"], {
        required_error: "Selecione um status válido",
    }),
    type: z.enum(["audiencia", "prazo", "consultoria", "doc", "atendimento"], {
        required_error: "Selecione uma categoria válida",
    }),
    deadline: z.string()
})

type FormData = z.infer<typeof schema>

export function DemandForm({ customer }: { customer: CustomerDataInfo }){
    const { register, handleSubmit, setValue, formState: {errors} } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    async function handleRegisterDemand(data: FormData){
        const deadlineDate = data.deadline ? new Date(data.deadline as string) : undefined

        try{
            await api.post("/api/demand", {
                customerId: customer.id,
                name: data.name,
                description: data.description,
                status: data.status,
                type: data.type,
                deadline: deadlineDate || undefined
            })
    
            setValue("name", "")
            setValue("description", "")
            setValue("deadline", "")
            
            toast.success(`Demanda do cliente ${customer.name} cadastrada`)
        } catch(err){
            console.log(err);
            toast.error("Ops... Houve um erro!")
        }
        
    }

    return(
        <form onSubmit={handleSubmit(handleRegisterDemand)} className="mt-6 bg-slate-200 py-6 px-2 rounded border-2">
            <label className="mb-1 font-medium text-lg">Título</label>
            <Input
                type="text"
                register={register}
                name="name"
                placeholder="Título da demanda jurídica"
                error={errors.name?.message}                
            />

            <label className="mt-3 mb-1 font-medium text-lg">Descrição</label>
            <textarea
                className="w-full border-2 rounded h-24 px-2 resize-none"
                placeholder="Descreva a demanda jurídica"
                id="description"
                {...register("description")}
            ></textarea>
            {errors.description?.message && (
                <p className="mb-1 text-red-600 truncate">{errors.description?.message}</p>
            )}

            <label className="mb-1 text-lg font-medium">Selecione o status da demanda</label>
            <select {...register("status")} className="w-full h-10 border-2 rounded px-2 mb-2">
                <option value="andamento">Em andamento</option>
                <option value="nao-iniciado">Não iniciado</option>
                <option value="concluido">Concluído</option>
            </select>

            <label className="mb-1 text-lg font-medium">Selecione a categoria</label>
            <select {...register("type")} className="w-full h-10 border-2 rounded px-2 mb-2">
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
                {...register("deadline")}
            />

            <button 
                type="submit"
                className="text-white bg-blue-500 flex items-center justify-center gap-2 w-full h-10 rounded font-bold my-3 hover:opacity-85 duration-300"
            >
                Cadastrar
            </button>
        </form>
    )
}