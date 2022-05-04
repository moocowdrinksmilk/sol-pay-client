import { useAnchorWallet } from '@solana/wallet-adapter-react'
import type { NextPage } from 'next'
import React from 'react'
import { usePayment } from '../context/usePayment'
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';


const Home: NextPage = () => {
  const payment = usePayment()
  const wallet = useAnchorWallet()
  console.log(wallet?.publicKey);


  return (
    <div className="h-screen flex flex-row items-center justify-center">
      <button className="p-2 bg-blue-200 rouded-md" onClick={payment.initAuthorities}>
        Add Authority
      </button>
      <WalletModalProvider>
        <WalletMultiButton />
      </WalletModalProvider>
    </div>
  )
}

export default Home
