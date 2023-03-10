import { getProducts, IMAGES_BASE_URL } from "@/api"
import { useEffect, useState } from "react"

interface myProps{
    productID: string | string[] | undefined
}

export const ProductDetails = ({productID}: myProps) => {
    const [product, setProduct] = useState<string[] | undefined>()

    useEffect(() => {
        const productsGetter = async () => {
            const response = await getProducts()
    
            response.data.map((product: any) => product.id == productID && setProduct([...product.images]))
        }
    
        productsGetter()
    }, [])

    return(
        <div className="flex">
            <div className="w-[35%]" ></div>
            <div className="grid grid-cols-2 w-[65%]" >
                {product?.map((img) => {
                    return <img className='max-h-[300px] max-w-[300px] m-auto' src={`${IMAGES_BASE_URL}${img}`} />
                })}
            </div>
        </div>
    )
}