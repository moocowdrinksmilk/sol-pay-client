import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react'
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { usePayment } from '../context/usePayment'
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { web3 } from '@project-serum/anchor';
import axios from 'axios';
import { Product } from '../types/product';
import { getProductSupa } from '../supabase/product';


const Home: NextPage = () => {
  const payment = usePayment()
  const wallet = useAnchorWallet()
  const wallet1 = useWallet()
  console.log(wallet?.publicKey);
  const [product, setProduct] = useState<Product>()

  // useEffect(() => {
  //   if (wallet1 && wallet1.signMessage && wallet1.connected) {

    // const message = new TextEncoder().encode("Login")
    // const signed = wallet1.signMessage(message).then(res => {
    //   console.log(res);
    //   axios.post("/api/login", {
    //     body: {
    //       signature: res,
    //       pubkey: wallet?.publicKey.toString(),
    //       message: "hello"
    //     }
    //   })
    // })
  // }
  // }, [wallet1])

  useEffect(() => {
    getProductSupa()
  }, [])

  const add = async () => {
    const account = await payment.addProduct(1)
    console.log(account.toBase58());
    
    const product = await payment.getProductDetails(account)
    console.log(product);
    setProduct(product)
    
  }



  return (
    <div className="h-screen flex flex-row gap-4 items-center justify-center">
      <button className="p-2 bg-blue-200 rouded-md" onClick={payment.initAuthorities}>
        Add Authority
      </button>
      <WalletModalProvider>
        <WalletMultiButton />
      </WalletModalProvider>
      <button className="p-2 bg-blue-200 rouded-md" onClick={add}>
        Add Product
      </button>
      <button className="p-2 bg-blue-200 rouded-md" onClick={add}>
        Login
      </button>
      <div className="flex flex-col">
        <div>
          {
            product && product.payee.toBase58()
          }
        </div>
        <div>
          {
            product && product.price.toNumber()
          }
        </div>
      </div>
    </div>
  )
}

export default Home
