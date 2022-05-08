import { supabase } from './client'

type Product = {
    id: string,
    authority: string
}

export const getProductSupa = async() => {
    const res = await supabase
        .from<Product>('product')
        .select('id')
        .match({
            authority: '623L46fZw5tdnzzx8pqoWTnNVwQem1Zm315aYpc4wFFg'
        })
    console.log(res);
    
}