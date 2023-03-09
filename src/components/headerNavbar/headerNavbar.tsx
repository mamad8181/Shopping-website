import { getProducts } from "@/api"
import Link from "next/link";
import { useEffect, useState } from "react"

interface myProps{
    subCategory: string,
    setShowNavbar: any
}

export const HeaderNavbar = ({subCategory, setShowNavbar}: myProps) => {
    let productSubCategory: string;
    const filteredCategories: string[]= [];
    const [products, setProducts] = useState<object[]>()
    
    switch(subCategory){
        case 'صورت':
            productSubCategory = 'face'
            break;
        case 'چشم':
            productSubCategory = 'eye'
            break;
    }

    useEffect(() => {
        const productsGetter = async () => {
            const response = await getProducts()
    
            setProducts([...response.data])
        }
    
        productsGetter()
    }, [])

    products?.filter((product: any) => product.subcategory == productSubCategory && !filteredCategories.includes(product.category) && filteredCategories.push(product.category))

    return (
        <div onMouseLeave={() => setShowNavbar(null)} >
            <ul className="flex justify-between w-3/5 m-auto py-[10px] px-[50px]">
                {filteredCategories.map((route: any) => <li className="cursor-pointer font-bold">
                    <Link href={`/products/${productSubCategory}/${route}`}>{route}</Link>
                </li>)}
            </ul>
        </div>
    )
}