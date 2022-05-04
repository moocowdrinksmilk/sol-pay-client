import { useAnchorWallet } from '@solana/wallet-adapter-react'
import type { NextPage } from 'next'
import React from 'react'
import { usePayment } from '../context/usePayment'
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { web3 } from '@project-serum/anchor';


const Home: NextPage = () => {
  const payment = usePayment()
  const wallet = useAnchorWallet()
  console.log(wallet?.publicKey);

  const add = async () => {
    const account = await payment.addProduct(1)
    console.log(account);
    
    const product = await payment.getProductDetails(account)
    console.log(product);
    
    
  }

  return (
    <div className="h-screen flex flex-row items-center justify-center">
      <button className="p-2 bg-blue-200 rouded-md" onClick={payment.initAuthorities}>
        Add Authority
      </button>
      <WalletModalProvider>
        <WalletMultiButton />
      </WalletModalProvider>
      <button className="p-2 bg-blue-200 rouded-md" onClick={add}>
        Add Product
      </button>
      <div>
        {}
      </div>
    </div>
  )
}

export default Home
