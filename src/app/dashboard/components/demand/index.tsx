"use client"

import { useContext } from 'react';
import { ModalContext } from '@/providers/modal';
import { CardCustomerProps } from '@/utils/customer.type';
import { DemandProps } from '@/utils/demand.type'
import { FiCheck, FiFile } from 'react-icons/fi'
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation'
import { fixLocalDate } from '@/utils/fix-date';
import { categoriesMap } from './categories';
import { FaWalking } from "react-icons/fa";

interface DemandItemProps{
    demand: DemandProps;
    customer: CardCustomerProps | null;
}

export function Demand({ demand, customer }: DemandItemProps){
    const { handleModalVisibility, handleModalDetails } = useContext(ModalContext)
    const router = useRouter();

    async function handleChangeStatus(){
        try{
            await api.patch("/api/demand", {
                id: demand.id,
                status: demand.status
            })

            router.refresh()
        } catch(err){
            console.log(err);
        }
    }

    function handleOpenModal(){
        handleModalVisibility()

        handleModalDetails({demand, customer})
    }

    return(
        <>
            <tr className='text-center border-b-2 h-16 last:border-b-0 bg-gray-50 hover:bg-gray-200 duration-300'>
                <td className='max-w-16 truncate px-1'>
                    {customer?.name}
                </td>
                <td className='hidden sm:table-cell'>
                    {fixLocalDate(demand.deadline)}
                </td>
                <td>
                    {demand.status === "andamento" ? (
                        <span className="bg-slate-300 px-2 py-1 rounded truncate">
                            Em andamento
                        </span>
                    ) : demand.status === "nao-iniciado" ? (
                        <span className="bg-red-300 px-2 py-1 rounded truncate">
                            Não iniciado
                        </span>
                    ) : demand.status === "concluido" ? (
                        <span className="bg-green-300 px-2 py-1 rounded truncate">
                            Concluído
                        </span>
                    ) : null
                    }
                </td>
                <td className='hidden xs:table-cell max-w-20 truncate'>
                    {categoriesMap[demand.type] || null}
                </td>
                <td>
                    <button onClick={handleOpenModal} title='Detalhes da tarefa'>
                        <FiFile size={24} className='text-blue-500 mr-3 hover:scale-110 duration-300' />
                    </button>
                    {demand.status !== "concluido" && (
                        demand.status === "andamento" ? (
                            <button onClick={handleChangeStatus} title='Concluir tarefa'>
                                <FiCheck size={24} className='text-lime-600 hover:scale-110 duration-300' />
                            </button>

                        ) : (
                            <button onClick={handleChangeStatus} title='Pôr em andamento'>
                                <FaWalking size={24} className='text-slate-600 hover:scale-110 duration-300' />
                            </button>
                        )
                    )}
                </td>
            </tr>
        </>
    )
}