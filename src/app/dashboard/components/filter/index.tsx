"use client"
import { FormEvent, useRef, useState, useContext } from "react";
import { FiFilter } from "react-icons/fi";
import { api } from "@/lib/api";
import { ModalContext } from "@/providers/modal";
import { useRouter } from "next/navigation"
import toast from "react-hot-toast";

export function FilterButton(){
    const { setFilters } = useContext(ModalContext)
    const modalRef = useRef<HTMLFormElement>(null)
    const router = useRouter()
    
    const [openFilter, setOpenFilter] = useState(false)
    const [status, setStatus] = useState<string>()
    const [category, setCategory] = useState<string>()
    const [deadline, setDeadline] = useState<string>()

    function handleClickOutside(e: React.MouseEvent<HTMLElement>){
        if(modalRef.current && !modalRef.current.contains(e.target as Node)){
            setOpenFilter(!openFilter)
        }
    }

    async function handleFilter(e: FormEvent){
        e.preventDefault()

        try {
            const filteredDemands = await api.get("/api/demand", {
                params: {
                    status,
                    category,
                    deadline
                }
            })

            setFilters(filteredDemands.data);
            router.refresh()
            
            if(filteredDemands.data.length === 0){
                toast.error("Nenhuma demanda encontrada para esse filtro.")
            }

            setOpenFilter(!openFilter)
            setStatus(undefined)
            setCategory(undefined)
            setDeadline(undefined)

        } catch(err){
            console.log(err);
            
        }
    }


    return(
        <>
            <button 
                className="bg-gray-900 hover:opacity-85 text-white rounded px-4 py-1 duration-300"
                onClick={() => setOpenFilter(!openFilter)}    
            >
                <FiFilter size={20}/>
            </button>
        
            {openFilter && (
                <section 
                    className="fixed z-10 top-0 right-0 w-full min-h-screen bg-black bg-opacity-50"
                    onClick={handleClickOutside}    
                >
                    <div className="h-screen flex items-center justify-center">
                        <form onSubmit={handleFilter} ref={modalRef} className="max-h-[90vh] overflow-y-auto z-10 relative bg-white shadow-lg w-4/5 md:w-1/2 max-w-2xl p-3 rounded">
                            <div className="mb-4 flex justify-between items-center">
                                <h1 className="font-bold text-lg">Opções de filtro</h1>
                                <button 
                                    className="px-2 rounded text-white bg-red-600 hover:bg-red-400 duration-300" 
                                    onClick={() => setOpenFilter(!openFilter)}
                                >
                                    Fechar
                                </button>
                            </div>

                            <label className="mb-1 text-lg font-medium">Filtrar o status</label>
                            <select className="w-full h-10 border-2 rounded px-2 mb-2" onChange={(e) => setStatus(e.target.value)}>
                                <option value="">Qualquer status</option>
                                <option value="andamento">Em andamento</option>
                                <option value="nao-iniciado">Não iniciado</option>
                                <option value="concluido">Concluído</option>
                            </select>

                            <label className="mb-1 text-lg font-medium">Filtrar a categoria</label>
                            <select className="w-full h-10 border-2 rounded px-2 mb-4" onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Qualquer categoria</option>
                                <option value="audiencia">Audiência</option>
                                <option value="prazo">Prazo</option>
                                <option value="consultoria">Consultoria</option>
                                <option value="doc">Elaboração de documentos</option>
                                <option value="atendimento">Atendimento</option>
                            </select>

                            <label className="mb-1 text-lg font-medium">Filtrar o prazo</label>
                            <select className="w-full h-10 border-2 rounded px-2 mb-4" onChange={(e) => setDeadline(e.target.value)}>
                                <option value="">Qualquer prazo</option>
                                <option value="ultrapassado">Ultrapassado</option>
                                <option value="prazo">No prazo</option>
                            </select>

                            <button
                                className="font-medium bg-gray-900 hover:opacity-85 text-white rounded w-full h-10 duration-300"
                                type="submit"
                            >
                                Filtrar
                            </button>
                        </form>
                    </div>
                    
                </section>
            )}
        </>
    )
}