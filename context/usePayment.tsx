import { createContext, useContext } from "react"

export interface PaymentContextState {
    sendProductTransaction(): Promise<void>;
    initAuthorities(): Promise<void>
}

const DEFAULT_CONTEXT = {
    sendProductTransaction() {
        return Promise.reject(console.error("error"))
    },
    initAuthorities() {
        return Promise.reject(console.error("error"))
    }
}

export const PaymentContext = createContext<PaymentContextState>(DEFAULT_CONTEXT as PaymentContextState)

export const usePayment = () => {
    return useContext(PaymentContext)
}