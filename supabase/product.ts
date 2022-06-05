import { getSupabaseClient } from './client'

export type Product = {
    id: string
    authority: string
    name: string
    category: string
    pricing_model: string
    price: number
    recurring: boolean
    billing_cycle: number
    shipping: number
    description: string
}

export const getProductSupa = async() => {
    try {
        const supabase = getSupabaseClient()
        const res = await supabase
        .from<Product>('product')
        .select('id')
        .match({
            authority: '623L46fZw5tdnzzx8pqoWTnNVwQem1Zm315aYpc4wFFg'
        })
        return res.data
    } catch(e) {
        console.log(e.message);
        
    }
}

export const addProductSupa = async(
    id: string,
    authority: string,
    name: string,
    category: string,
    pricing_model: string, 
    price: number, 
    recurring: boolean,
    billing_cycle: number,
    shipping: number,
    description: string
    ) => {
    try {
        const supabase = getSupabaseClient()
        const res = await supabase
        .from<Product>('product')
        .insert([
            {
                id,
                authority,
                name,
                category,
                pricing_model,
                price,
                recurring,
                billing_cycle,
                shipping,
                description
            }
        ])
    } catch(e) {
        console.log(e.message);
        
    }
}