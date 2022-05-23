import React, { useEffect, useState } from 'react'
import { SiDiscord } from 'react-icons/si'
import CardPages from '../components/CardPages'
import { login } from '../supabase/discord'


const Home = () => {

    const loginWithDiscord = async () => {
        await login()
    }
    return (
        <div className="relative h-screen bg-blue-100">
            <CardPages />
        </div>
    )
}

export default Home
