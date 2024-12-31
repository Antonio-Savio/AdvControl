import { ReactNode } from "react";
import { DashboardHeader } from "./components/header";

export default function DashBoardLayout({ children }: { children: ReactNode }){
    return(
        <>
            <DashboardHeader/>
            {children}
        </>
    )
}