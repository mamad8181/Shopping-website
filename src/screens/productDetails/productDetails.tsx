import { getProducts, IMAGES_BASE_URL } from "@/api"
import { Button } from "@/components"
import { useEffect, useState } from "react"

interface myProps{
    productID: string | string[] | undefined
}

export const ProductDetails = ({productID}: myProps) => {
    const [product, setProduct] = useState<any>()

    useEffect(() => {
        const productsGetter = async () => {
            const response = await getProducts()
            response.data.map((product: any) => product.id == productID && setProduct(product))
        }
        productsGetter()
    }, [])

    const productPrice: number = +product?.price

    return(
        <div className="flex p-[50px] px-[70px] gap-[70px]">
            <div className="w-[35%] " >
                <span className="text-[25px] font-bold float-left mt-[15px]" >{productPrice?.toLocaleString()} تومان</span>
                <p className="text-[35px] w-[250px] font-bold">
                    {product?.category} {product?.brand} 
                </p>
                <p className="text-[20px] font-bold mt-[10px]" >
                    {product?.model && `مدل ${product?.model}`}
                </p>
                <div>
                    {product?.colors[0] == '' ? <p className="mt-[35px] mb-[50px]" >محصول تک رنگ می باشد!</p> : 
                    <select  className="mt-[35px] mb-[50px] rounded-2xl">
                        {product?.colors.map((color: string) => <option value={color} >{color}</option>)}
                    </select> 
                    }
                </div>
                <p className="mb-[50px] font-bold" >{product?.description}</p>
                <Button onClick={e => {
                    e.stopPropagation()
                    // bagProductsAdder(product)
                }} className='w-full rounded-full py-[10px] px-[20px] pt-[6px] bg-[#CE4545] text-white hover:bg-red-700' >افزودن به سبد خرید</Button>            </div>
            <div className={product?.images.length == 1 ? `w-[65%]` : 'w-[65%] grid grid-cols-2 gap-[20px]'} >
                {product?.images?.map((img: string) => {
                    return <img className='max-h-[435px] max-w-[100%] shadow-xl m-auto' src={`${IMAGES_BASE_URL}${img}`} />
                })}
            </div>
        </div>
    )
}