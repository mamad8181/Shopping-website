import { getProducts, IMAGES_BASE_URL } from "@/api"
import { Button, ProductCard } from "@/components"
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
              return <ProductCard key={product.id} product={product} />
            })}
        </div>
    )
}