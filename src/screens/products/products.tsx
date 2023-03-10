import { getProducts, IMAGES_BASE_URL } from "@/api"
import { Button, ProductCard } from "@/components"
import { useEffect, useRef, useState } from "react"

type dataObj= Record<string, unknown>

export const ProductsScreen = ({section}: any) => {
    const [products, setProducts] = useState<object[]>()
    const [productsArray, setProductsArray] = useState<dataObj[]>()
    const searchElement = useRef<HTMLInputElement>(null)
    const filterElement = useRef<HTMLSelectElement>(null)
    const filteredProducts: dataObj[]= []
    // const filterTemp: dataObj[] = []


    useEffect(() => {
        const productsGetter = async () => {
            const response = await getProducts()
    
            setProducts([...response.data])
        }
    
        productsGetter()
    }, [])

    products?.map((product: any) => product.category == section && filteredProducts.push(product))

    const filtering = () => {
        const searchTemp: dataObj[] = []
          switch (filterElement.current!.value){
            case 'high':
              filteredProducts.sort((a, b) => {
                return +(b.price as number) - +(a.price as number)
              })
              break;
            case 'low':
              filteredProducts.sort((a, b) => {
                return +(a.price as number) - +(b.price as number)
              })
              break;
            default:
              break;
          }
          if (searchElement.current?.value) {
            filteredProducts.map((product) => `${product.category} ${product.brand}`.includes(searchElement.current!.value) && searchTemp.push(product))
          } else {
            filteredProducts.map((product) => searchTemp.push(product))
          }
        setProductsArray([...searchTemp])
      }

    return (
        <div className="py-[15px] px-[50px]" >
            <div>
            <div className={`float-right w-[160px] border-gray-200`} >
            <select onChange={filtering} ref={filterElement} className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 w-[150px] focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                <option value='all' >فیلتر ها (همه)</option>
                <option value='high' >گران ترین</option>
                <option value='low' >ارزان ترین</option>
            </select>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="inline mr-2 bi bi-funnel" viewBox="0 0 16 16">
              <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
            </svg> */}
            </div>
            <div className={`float-left mt-[6px] bg-gray-100 w-[200px] p-2 pt-1 pb-2 rounded-full`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="absolute m-1.5 mr-1 bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
                <input onChange={filtering} ref={searchElement} className='w-4/5 text-base outline-none float-left bg-transparent' placeholder='جستوجو' />
            </div>
            </div>
          <div className="mt-[50px] grid grid-cols-3 gap-[20px]" >
            {(!productsArray ? filteredProducts : productsArray).map((product: any) => {
              return <ProductCard key={product.id} product={product} />
            })}
          </div>
        </div>
    )
}