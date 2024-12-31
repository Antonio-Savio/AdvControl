"use client"

import { useContext } from "react"
import { ModalContext } from "@/providers/modal"
import { Demand } from "../demand"
import { DemandProps } from "@/utils/demand.type"
import { CardCustomerProps } from "@/utils/customer.type"

interface TableDataProps extends DemandProps{
    customer: CardCustomerProps | null;
}

export function TableData({ demands }: { demands: TableDataProps[] }){
    const { filteredDemands } = useContext(ModalContext)

    return(
        <tbody>
            {filteredDemands && filteredDemands?.length > 0 ? filteredDemands.map( filter => (
                <Demand
                    key={filter.id}
                    demand={filter}
                    customer={filter.customer}
                />
            )) : demands.map( demand => (
                <Demand
                    key={demand.id}
                    customer={demand.customer}
                    demand={demand}    
                />
            ))}
        </tbody>
    )
}