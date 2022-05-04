import { ConnectionProvider, WalletProvider, useAnchorWallet } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl, Connection } from '@solana/web3.js';
import React, { useMemo } from 'react';
import { PaymentContext } from './usePayment'
import { Provider, web3 } from '@project-serum/anchor';
import { getProgram } from './utils/program';
import { getProvider } from './utils/provider';
import { notification } from 'antd';

interface props {
    children: React.ReactNode
}

const PaymentProvider = (props: props) => {
    const wallet = useAnchorWallet()
    const sendProductTransaction = async () => {

    }

    // const initProduct = async () => {
    //     if (!wallet) {
    //         return 
    //     }
    //     const provider = await getProvider(wallet)
    //     const program = await getProgram(provider as Provider)
    //     const newProductAccount = web3.Keypair.generate()
    //     const tx = program.transaction.initProduct()
    // }

    const initAuthorities = async () => {
        console.log("Hello");
        console.log(wallet);
        

        if (!wallet) {
            return
        }
        console.log("bye");

        try {
            const provider = await getProvider(wallet)
            const program = await getProgram(provider as Provider)
            const newAuthoritiesAccount = web3.Keypair.generate()
            const tx = program.transaction.initAuthorities({
                accounts: {
                    signer: wallet.publicKey,
                    authorities: newAuthoritiesAccount.publicKey,
                    systemProgram: web3.SystemProgram.programId
                }
            })
            tx.feePayer = wallet.publicKey
            let blockhashObj = await provider?.connection.getLatestBlockhash()
            tx.recentBlockhash = blockhashObj?.blockhash
            tx.sign(newAuthoritiesAccount)
            const signedTx = await wallet.signTransaction(tx)
            const txId = await provider?.connection.sendRawTransaction(signedTx.serialize())

            await provider?.connection.confirmTransaction(txId as string)
        } catch (e) {
            notification.error({
                message: e.message,
                placement: "bottomLeft"
            })
        }


    }

    return (

            <PaymentContext.Provider value={{
                sendProductTransaction,
                initAuthorities
            }}>
                {props.children}
            </PaymentContext.Provider>
    )
}

export default PaymentProvider