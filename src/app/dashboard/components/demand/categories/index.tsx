import { ReactNode } from "react";

export const categoriesMap: Record<string, ReactNode> = {
    audiencia: (
        <span className="bg-yellow-300 px-2 py-1 rounded truncate">
            Audiência
        </span>
    ),
    prazo: (
        <span className="bg-emerald-300 px-2 py-1 rounded truncate">
            Prazo
        </span>
    ),
    consultoria: (
        <span className="bg-violet-300 px-2 py-1 rounded truncate">
            Consultoria
        </span>
    ),
    doc: (
        <span className="bg-blue-300 px-2 py-1 rounded truncate">
            Elaboração de documentos
        </span>
    ), 
    atendimento: (
        <span className="bg-orange-300 px-2 py-1 rounded truncate">
            Atendimento
        </span>
    )
}