import { supabase } from './client'

export const login = async () => {
    const { user, session, error } = await supabase.auth.signIn({
        provider: 'discord',
      })
      console.log(user);
      
}

export const getSession = async () => {
    const session = supabase.auth.session()
    return session
}