"use client"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/input'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const schema = z.object({
    fullName: z.string().min(1, "O campo nome é obrigatório."),
    phone: z.string().refine( (value) => {
        return /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || /^\d{2}\s\d{9}$/.test(value) || /^\d{11}$/.test(value)
    }, {
        message: "O telefone deve ser no formato (XX) 999999999"
    }),
    email: z.string().email("Digite um email válido."),
    address: z.string(),
})

type FormData = z.infer<typeof schema>

export function NewCustomerForm(){
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const router = useRouter();

    async function onSubmit(data: FormData){
        try{
            await api.post("/api/customer", {
                name: data.fullName,
                phone: data.phone,
                email: data.email,
                address: data.address
            })
            
            toast.success("Cliente cadastrado!")
            router.refresh()
            router.replace('/dashboard/customer')

        } catch(err){
            toast.error("Houve um erro ao cadastrar o cliente.")
            console.log(err);
            
        }
    }

    return(
        <form 
            className='flex flex-col my-6'
            onSubmit={handleSubmit(onSubmit)}
        >
            <label htmlFor="fullName" className='mb-1 text-lg font-medium'>Nome completo</label>
            <Input
                type='text'
                name='fullName'
                placeholder='Digite o nome do cliente'
                register={register}
                error={errors.fullName?.message}
            />

            <section className='grid grid-cols-1 sm:grid-cols-2 gap-4 my-4'>
                <div>
                    <label htmlFor="phone" className='mb-1 text-lg font-medium'>Telefone</label>
                    <Input
                        type='text'
                        name='phone'
                        placeholder='(XX) 99999999'
                        register={register}
                        error={errors.phone?.message}
                    />
                </div>

                <div>
                    <label htmlFor="email" className='mb-1 text-lg font-medium'>Email</label>
                    <Input
                        type='email'
                        name='email'
                        placeholder='teste@teste.com'
                        register={register}
                        error={errors.email?.message}
                    />
                </div>
            </section>

            <label htmlFor="address" className='mb-1 text-lg font-medium'>Endereço</label>
            <Input
                type='text'
                name='address'
                placeholder='Rua XPTO, nº 100'
                register={register}
                error={errors.address?.message}
            />

            <button 
                type='submit'
            
                className='bg-blue-600 text-white font-bold rounded px-2 my-4 h-10 hover:opacity-85 duration-300'
            >
                Cadastrar Cliente
            </button>
        </form>
    )
}