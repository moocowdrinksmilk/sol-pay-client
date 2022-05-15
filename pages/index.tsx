import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react'
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { usePayment } from '../context/usePayment'
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { web3 } from '@project-serum/anchor';
import axios from 'axios';
import { Product } from '../types/product';
import { addProductSupa, getProductSupa } from '../supabase/product';
import {SiDiscord} from 'react-icons/si'


const Home = () => {
    return (
        <div className="relative h-screen bg-blue-100">
            <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white px-4 py-14 rounded-lg lg:w-4/12 w-8/12 flex flex-col gap-8 items-center">
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl font-bold mb-4">
                        Create Account
                    </h1>
                    <h2 className="text-lg text-gray-500">
                        Already have an account? <a href="">Sign in</a>
                    </h2>
                </div>

                <button className="flex flex-row justify-center items-center gap-2 py-2 w-full bg-indigo-400 hover:bg-indigo-500 rounded-lg font-semibold text-lg text-white">
                    <SiDiscord size={25} />
                    <div>Sign up with discord</div>
                </button>
            </div>
        </div>
    )
}

export default Home
