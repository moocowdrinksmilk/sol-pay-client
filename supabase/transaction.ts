import { supabase } from "./client"

type Transaction = {
    id: string,
    product: string,
    authority: string
}

export const addTransactionSupa = async (id: string, product: string, authority: string) => {
    try {
        await supabase
        .from<Transaction>("transaction")
        .insert({
            id,
            product,
            authority
        })
    }
    catch (e) {
        console.log(e.message);
    }
}