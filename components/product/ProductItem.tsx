import React from "react"
import { AiOutlineEllipsis } from "react-icons/ai"

const ProductItem = () => {
    return (
        <div className="py-10 px-6 bg-white row justify-between items-center border-b">
            <div className="row items-center gap-4">
                <div>
                    IMAGE
                </div>

                <div className="col gap-1">
                    <div>
                        Hong Kong Dim Sum
                    </div>
                    <div>
                        Recurring
                    </div>
                </div>
            </div>

            <div className="row gap-8 items-center">
                <div>
                    02 June 2022
                </div>

                <div>
                    02 June 2022
                </div>

                <AiOutlineEllipsis size={30} />
            </div>
        </div>
    )
}

export default ProductItem