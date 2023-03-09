import { getProducts, IMAGES_BASE_URL } from "@/api"
import { Button } from "@/components"
import { useEffect, useState } from "react"

export const ProductsScreen = ({section}: any) => {
    const [products, setProducts] = useState<object[]>()
    const filteredProducts: object[]= []

    useEffect(() => {
        const productsGetter = async () => {
            const response = await getProducts()
    
            setProducts([...response.data])
        }
    
        productsGetter()
    }, [])

    products?.map((product: any) => product.category == section && filteredProducts.push(product))

    return (
        <div className="grid grid-cols-3 gap-[20px] py-[15px] px-[50px]" >
            {filteredProducts.map((product: any) => {
              const productPrice: number = +product.price
              return(
                <div key={product.id} className='relative cursor-pointer w-full shadow-lg mt-[20px]' >
                  <div>
                    <img className="m-auto" src={`${IMAGES_BASE_URL}${product.images[0]}`} width='400' />
                  </div>
                  <div className='text-center pb-[20px]'>
                    <b className='block mb-[35px]'>{product.category} {product.brand}</b>
                    <b className='block mb-[10px]'>{productPrice.toLocaleString()} تومان</b>
                    <p>{product.model}</p><br/>
                    <Button className='rounded-full py-[10px] px-[10px] bg-black text-white hover:bg-zinc-700' >افزودن به سبد خرید</Button>
                  </div>
                </div>
              )
            })}
        </div>
    )
}