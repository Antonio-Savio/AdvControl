import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }){
    return(
        <div className="px-2 max-w-7xl mx-auto">
            {children}
        </div>
    )
}