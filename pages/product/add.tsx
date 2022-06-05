import FormItem from "../../components/product/FormItem"
import { useForm, SubmitHandler } from "react-hook-form";
import { Image } from 'antd';
import { FaChevronLeft } from 'react-icons/fa'
import Link from 'next/link'
import { usePayment } from "../../context/usePayment";
import React from "react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { addProductSupa, Product } from '../../supabase/product'
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { getAuthorityFromUserPubKey } from "../../supabase/authority";

export interface IFormInput {
    name: string
    category: string
    description: string
    pricingModel: string
    price: number
    billingCycle: string
    shipping: number
}

const Add = () => {
    const { register, handleSubmit } = useForm<IFormInput>();
    const payment = usePayment()
    const wallet = useAnchorWallet()

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        if (!wallet) {
            return
        }
        const authority = await getAuthorityFromUserPubKey(wallet.publicKey.toBase58())
        if (!authority) {
            return
        }

        const pubkey = await payment.addProduct(data.price)
        const product = {
            name: data.name,
            id: pubkey.toBase58(),
            category: data.category,
            description: data.description,
            pricing_model: data.pricingModel,
            price: data.price,
            billing_cycle: 2,
            shipping: data.shipping
        }

        await addProductSupa(
            pubkey.toBase58(),
            authority?.id,
            data.name,
            data.category,
            data.pricingModel,
            data.price,
            false,
            2,
            data.shipping,
            data.description
        )
    };


    return (
        <div className="col relative">
            <div className="row w-full px-20 pt-6">
                <Link href="/product">
                    <FaChevronLeft size={20} className="cursor-pointer" />
                </Link>
            </div>
            <div className="px-20 py-10">
                <h1 className="text-2xl font-semibold">
                    Product Information
                </h1>
                <form className="flex-1" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row w-full gap-10">


                        <div className="flex-1 col gap-8 py-10">
                            <FormItem
                                title="Product Name"
                                description="Do not exceed 20 characters when entering the product name"
                                register={register("name", { required: true, maxLength: 20 })}
                            />

                            <FormItem
                                title="Category"
                                register={register("category", { required: true, maxLength: 20 })}
                            />

                            <FormItem
                                title="Description"
                                register={register("description", { required: false, maxLength: 500 })}
                                inputType="textarea"
                                description="Do not exceed 500 characters when entering the product name"
                            />

                            <h1 className="text-xl font-bold">
                                Price Information
                            </h1>

                            <FormItem
                                title="Pricing Model"
                                register={register("pricingModel", { required: true })}
                                inputType="select"
                                options={["Standard Pricing", "Non-Standard Pricing"]}
                            />

                            <FormItem
                                title="Price"
                                inputType="number"
                                register={register("price", { required: true })}
                            />

                            <div className="row w-full gap-10">
                                <button className="flex-1 py-2 text-center border-2 border-blue-300 rounded-md">
                                    Recurring
                                </button>

                                <button className="flex-1 py-4 text-center border-2 border-gray-300 rounded-md">
                                    One Time
                                </button>
                            </div>

                            <FormItem
                                title="Billing Cycle"
                                register={register("billingCycle", { required: true })}
                                inputType="select"
                                options={["Monthly", "Weekly", "Yearly"]}
                            />

                            <FormItem
                                title="Shipping Fee"
                                inputType="number"
                                register={register("shipping", { required: true })}
                            />

                            <input type="submit" className="w-2/6 bg-blue-500 text-white py-2 rounded-md" value="Save & Add Product" />
                            <WalletModalProvider>
                                <WalletMultiButton />
                            </WalletModalProvider>
                        </div>

                        <div className="flex-1 col items-center gap-20">

                            <div>
                                <div className="grid grid-cols-2 gap-2">
                                    <Image
                                        width={200}
                                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                    />
                                    <Image
                                        width={200}
                                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                    />
                                    <Image
                                        width={200}
                                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                    />
                                    <Image
                                        width={200}
                                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                    />
                                </div>
                            </div>


                        </div>

                    </div>
                </form>

            </div>
        </div>
    )
}

export default Add