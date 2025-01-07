import { Content } from "./components/content";
import { Suspense } from "react";
import Loading from "@/app/dashboard/loading"

export default async function Customer(){
    
    return(
        <Suspense fallback={<Loading/>}>
            <Content/>
        </Suspense>
    )
}