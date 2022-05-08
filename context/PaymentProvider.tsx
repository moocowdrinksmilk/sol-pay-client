import { ConnectionProvider, WalletProvider, useAnchorWallet } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, sendAndConfirmTransaction, Transaction } from '@solana/web3.js';
import React, { useMemo, useState } from 'react';
import { PaymentContext } from './usePayment'
import { BN, Program, Provider, web3 } from '@project-serum/anchor';
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
            console.log(newAuthoritiesAccount.publicKey.toBase58());
            
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
        console.log(amount);
        
        try {
            const provider = await getProvider(wallet) as Provider
            const program = await getProgram(provider)
            const newProduct = web3.Keypair.generate()

            const tokenAccount = await getTokenAccount(NATIVE_MINT)
            console.log(tokenAccount, "returned token account");

            const tx = program.transaction.initProduct(
                new BN(amount * LAMPORTS_PER_SOL), {
                    accounts: {
                        signer: wallet.publicKey,
                        product: newProduct.publicKey,
                        tokenAccount: tokenAccount,
                        authorityGroup: new web3.PublicKey("623L46fZw5tdnzzx8pqoWTnNVwQem1Zm315aYpc4wFFg"),
                        systemProgram: web3.SystemProgram.programId
                    }
                }
            )
            tx.feePayer = wallet.publicKey
            let blockhashObj = await provider?.connection.getLatestBlockhash()
            tx.recentBlockhash = blockhashObj?.blockhash
            tx.sign(newProduct)
            const signedTx = await wallet.signTransaction(tx)
            const txId = await provider?.connection.sendRawTransaction(signedTx.serialize())
            await provider?.connection.confirmTransaction(txId as string)
            return newProduct.publicKey
        } catch(e) {
            console.log(e);
            
            notification.error({
                message: e.message,
                placement: "bottomLeft"
            })
        }
    }

    const getProductDetails = async (publicKey: web3.PublicKey) => {
        if (!wallet) {
            console.log("no wallet");
            
            return
        }
        const provider = await getProvider(wallet) as Provider
        const program = await getProgram(provider)
        const productAccount = await program.account.product.fetch(publicKey)
        console.log(productAccount);
        
        return productAccount
    }

    const getTokenAccount = async (mint: web3.PublicKey) => {        
        if (!wallet) {
            return
        }

        const provider = await getProvider(wallet) as Provider
        const program = await getProgram(provider)
        const tokenAccount = await getAssociatedTokenAddress(
            mint,
            wallet?.publicKey as web3.PublicKey
        )
        console.log(tokenAccount, "token account");
        try {
            const tokenAccountTransaction = new Transaction().add(
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
            const signedTx = await wallet?.signTransaction(tokenAccountTransaction)
            console.log(signedTx);
            
            const txId = await provider.connection.sendRawTransaction(signedTx?.serialize())
            console.log(txId);
            
            await provider.connection.confirmTransaction(txId)
            return tokenAccount
        } catch(e) {
            console.log(e);
            
        } 
        finally {
            return tokenAccount
        }
        
    }

    return (

            <PaymentContext.Provider value={{
                sendProductTransaction,
                initAuthorities,
                addProduct,
                getProductDetails
            }}>
                {props.children}
            </PaymentContext.Provider>
    )
}

export default PaymentProvider