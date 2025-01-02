import { FiLoader } from "react-icons/fi";

export default function Loading(){
    return(
        <div className="h-[calc(100vh-5rem)] flex justify-center items-center gap-2 font-bold">
            Carregando <FiLoader className="animate-spin" />
        </div>
    )
}