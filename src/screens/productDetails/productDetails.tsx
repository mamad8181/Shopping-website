import { getProducts, IMAGES_BASE_URL } from "@/api"
import { useEffect, useState } from "react"

interface myProps{
    productID: string | string[] | undefined
}

export const ProductDetails = ({productID}: myProps) => {
    const [product, setProduct] = useState<any>()

    useEffect(() => {
        const productsGetter = async () => {
            const response = await getProducts()
            // response.data.map((product: any) => product.id == productID && setProduct(product))
            setProduct([...response.data])
        }
        productsGetter()
    }, [])

    console.log(product)

    const productPrice: number = +product.price
    
    return(
        <div className="flex p-[50px]">
            <div >
                <p className="text-[35px] font-bold w-[35%]">
                    {product.category} {product.brand} <span className="text-[25px] float-left mt-[20px]" >{productPrice.toLocaleString()} تومان</span>
                </p>
                <p>
                    {product.model && `مدل ${product.model}`}
                </p>
            </div>
            <div className="grid grid-cols-2 w-[65%]" >
                {product?.images.map((img: string) => {
                    return <img className='max-h-[300px] max-w-[300px] shadow-xl m-auto' src={`${IMAGES_BASE_URL}${img}`} />
                })}
            </div>
        </div>
    )
}