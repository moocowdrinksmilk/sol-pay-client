import { ConnectionProvider, WalletProvider, useAnchorWallet } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, sendAndConfirmTransaction, Transaction } from '@solana/web3.js';
import React, { useMemo, useState } from 'react';
import { PaymentContext } from './usePayment'
import { BN, Provider, web3 } from '@project-serum/anchor';
import { getProgram } from './utils/program';
import { getProvider } from './utils/provider';
import { notification } from 'antd';
import {
    createAssociatedTokenAccount,
    createMint,
    TOKEN_PROGRAM_ID, NATIVE_MINT, createSyncNativeInstruction, getAccount, createAssociatedTokenAccountInstruction, getAssociatedTokenAddress, getOrCreateAssociatedTokenAccount
  } from "@solana/spl-token";

interface props {
    children: React.ReactNode
}

const PaymentProvider = (props: props) => {
    const wallet = useAnchorWallet()
    const [authority, setAuthority] = useState("")
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
            setAuthority(newAuthoritiesAccount.publicKey.toBase58())
        } catch (e) {
            notification.error({
                message: e.message,
                placement: "bottomLeft"
            })
        }
    }

    const addProduct = async (amount:number) => {
        if (!wallet) {
            return
        }

        try {
            const provider = await getProvider(wallet) as Provider
            const program = await getProgram(provider)
            const newProduct = web3.Keypair.generate()

            const tokenAccount = getTokenAccount(provider, NATIVE_MINT)

            const tx = program.transaction.initProduct(
                new BN(amount * LAMPORTS_PER_SOL), {
                    accounts: {
                        signer: wallet.publicKey,
                        product: newProduct.publicKey,
                        tokenAccount: tokenAccount,
                        authorityGroup: new web3.PublicKey(authority),
                        systemProgram: web3.SystemProgram.programId
                    }
                }
            )
            tx.feePayer = wallet.publicKey
            let blockhashObj = await provider?.connection.getLatestBlockhash()
            tx.recentBlockhash = blockhashObj?.blockhash
            tx.sign(newAuthoritiesAccount)
            const signedTx = await wallet.signTransaction(tx)
            const txId = await provider?.connection.sendRawTransaction(signedTx.serialize())
        } catch(e) {
            notification.error({
                message: e.message,
                placement: "bottomLeft"
            })
        }
    }

    const getTokenAccount = async (provider: Provider, mint: web3.PublicKey) => {

        const tokenAccount = await getAssociatedTokenAddress(
            mint,
            wallet?.publicKey as web3.PublicKey
        )
        const tokenAccountTransaction = new web3.Transaction().add(
            createAssociatedTokenAccountInstruction(
                wallet?.publicKey as web3.PublicKey,
                tokenAccount,
                wallet?.publicKey as web3.PublicKey,
                mint
            )
        )
        tokenAccountTransaction.feePayer = wallet?.publicKey
        let blockhashObj = await provider?.connection.getLatestBlockhash()
        tokenAccountTransaction.recentBlockhash = blockhashObj?.blockhash
        const signedTx = await wallet?.signTransaction(tokenAccountTransaction) as Transaction
        const txId = await provider.connection.sendRawTransaction(signedTx?.serialize())

        await provider.connection.confirmTransaction(txId)
        return tokenAccount
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