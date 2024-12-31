"use client"
import { useRef, useContext } from "react"
import { ModalContext } from "@/providers/modal"
import { fixLocalDate } from "@/utils/fix-date"
import { categoriesMap } from "@/app/dashboard/components/demand/categories"
 
export function Modal(){
    const { handleModalVisibility, demand } = useContext(ModalContext)
    const modalRef = useRef<HTMLDivElement>(null)

    function handleClickOutside(e: React.MouseEvent<HTMLElement>){
        if (modalRef.current && !modalRef.current.contains(e.target as Node)){
            handleModalVisibility();
        }
    }

    return(
        <section 
            className="fixed z-10 w-full min-h-screen bg-black bg-opacity-50"
            onClick={handleClickOutside}
        >
            <div className="h-screen flex items-center justify-center">
                <div ref={modalRef} className="max-h-[90vh] overflow-y-auto z-10 bg-white shadow-lg w-4/5 md:w-1/2 max-w-2xl p-3 rounded">
                    <div className="flex justify-between mb-4">
                        <h1 className="text-lg font-bold">Detalhes da demanda</h1>
                        <button className="px-2 rounded text-white bg-red-600 hover:bg-red-400 duration-300" onClick={handleModalVisibility}>
                            Fechar
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold">Título:</h2>
                        <p>{demand?.demand.name}</p>
                    </div>

                    <div className="flex flex-col gap-1 mb-2">
                        <h2 className="font-bold">Descrição:</h2>
                        <p className="whitespace-break-spaces leading-5">{demand?.demand.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold">Categoria:</h2>
                        <p>{demand && categoriesMap[demand.demand.type]}</p>
                    </div>

                    {demand?.demand.deadline && (
                        <div className="flex flex-wrap gap-1 mb-2">
                            <h2 className="font-bold">Prazo:</h2>
                            <p>{fixLocalDate(demand?.demand.deadline)}</p>
                        </div>
                    )}

                    <div className="w-full border-b-2 my-4"></div>
                    <h2 className="text-lg font-bold mb-4">Detalhes do cliente</h2>

                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold">Nome:</h2>
                        <p>{demand?.customer?.name}</p>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold">Telefone:</h2>
                        <p>{demand?.customer?.phone}</p>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold">Email:</h2>
                        <p>{demand?.customer?.email}</p>
                    </div>

                    {demand?.customer?.address && (
                        <div className="flex flex-wrap gap-1 mb-2">
                            <h2 className="font-bold">Endereço:</h2>
                            <p>{demand?.customer?.address}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}