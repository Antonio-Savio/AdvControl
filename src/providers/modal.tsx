"use client"

import { createContext, ReactNode, useContext, useState } from 'react'
import { DemandProps } from '@/utils/demand.type'
import { CardCustomerProps } from '@/utils/customer.type'
import { Modal } from '@/components/modal'

interface ModalContextData{
    visible: boolean;
    handleModalVisibility: () => void;
    demand: DemandInfo | undefined;
    handleModalDetails: (detail: DemandInfo) => void;
    filteredDemands: filteredDemandProps[] | null;
    setFilters: (filters: filteredDemandProps[]) => void;
}

interface filteredDemandProps extends DemandProps {
    customer: CardCustomerProps | null;
}

interface DemandInfo{
    demand: DemandProps;
    customer: CardCustomerProps | null;
}

export const ModalContext = createContext({} as ModalContextData)

export function ModalProvider({ children }: { children: ReactNode }){
    const [visible, setVisible] = useState(false)
    const [demand, setDemand] = useState<DemandInfo>()
    const [filteredDemands, setFilteredDemands] = useState<filteredDemandProps[] | null>(null)

    function handleModalVisibility(){
        setVisible(!visible)
    }

    function handleModalDetails(detail: DemandInfo){
        setDemand(detail)
    }

    function setFilters(filters: filteredDemandProps[]){
        setFilteredDemands(filters)
    }

    return(
        <ModalContext.Provider value={{ visible, handleModalVisibility, demand, handleModalDetails, filteredDemands, setFilters }}>
            {visible && <Modal/>}
            {children}
        </ModalContext.Provider>
    )
}