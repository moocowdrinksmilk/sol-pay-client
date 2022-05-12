import { web3 } from "@project-serum/anchor"
import { createContext, useContext } from "react"
import { Product } from "../types/product"

export interface PaymentContextState {
    sendProductTransaction(key: web3.PublicKey, product: Product, productAccountKey: web3.PublicKey): Promise<void>;
    initAuthorities(): Promise<void>;
    addProduct(amount: number): Promise<web3.PublicKey>;
    getProductDetails(publicKey: web3.PublicKey): Promise<any>
}

const DEFAULT_CONTEXT = {
    sendProductTransaction() {
        return Promise.reject(console.error("error"))
    },
    initAuthorities() {
        return Promise.reject(console.error("error"))
    },
    addProduct() {
        return Promise.reject(console.error("error"))
    },
    getProductDetails() {
        return Promise.reject(console.error("error"))
    }
}

export const PaymentContext = createContext<PaymentContextState>(DEFAULT_CONTEXT as PaymentContextState)

export const usePayment = () => {
    return useContext(PaymentContext)
}