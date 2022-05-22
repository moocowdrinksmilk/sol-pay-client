import { getSupabaseClient } from './client'

type Product = {
    id: string,
    authority: string
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

export const addProductSupa = async(id: string, authority: string) => {
    try {
        const supabase = getSupabaseClient()
        const res = await supabase
        .from<Product>('product')
        .insert([
            {
                id,
                authority
            }
        ])
    } catch(e) {
        console.log(e.message);
        
    }
}