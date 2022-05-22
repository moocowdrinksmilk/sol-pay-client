import { useEffect } from "react"
import { getSupabaseClient } from '../supabase/client'

interface AuthProps {
    children: React.ReactNode
}

const SupabaseAuthWrapper = (AuthProps: AuthProps) => {
    useEffect(() => {

    }, [])
    return AuthProps.children
}

export default SupabaseAuthWrapper