import { getProducts, IMAGES_BASE_URL } from '@/api'
import { AddProductModal, Button, InfoProductModal, ProductsQtyBtns } from '@/components'
import { DeleteProductModal } from '@/components/deleteProductModal/deleteProductModal'
import { useEffect, useRef, useState } from 'react'

type dataObj= Record<string, unknown>

export const ProductsManagement = () => {
  const selectElement = useRef<HTMLSelectElement>(null)
  const searchElement = useRef<HTMLInputElement>(null)
  const filterElement = useRef<HTMLSelectElement>(null)
  const [products, setProducts] = useState<dataObj[]>([])
  const [productsArray, setProductsArray] = useState<dataObj[]>()
  const [infoModal, setInfoModal] = useState(null)
  const [deleteModal, setDeleteModal] = useState(null)
  const [addModal, setAddModal] = useState(false)
  const filterTemp: dataObj[] = []

  useEffect(() => {
    const productsGetter = async () => {
      const response = await getProducts()
      setProducts([...response.data])
    }
    productsGetter()
  }, [])

  const getterQuantity= (number: number) => {
    // console.log(number)
  }

  const filtering = () => {
    const searchTemp: dataObj[] = []
    if (selectElement.current!.value !== 'all') {
      products.map((product) => selectElement.current!.value === product.subcategory && filterTemp.push(product))
      switch (filterElement.current!.value){
        case 'high':
          filterTemp.sort((a, b) => {
            return +(b.price as number) - +(a.price as number)
          })
          break;
        case 'low':
          filterTemp.sort((a, b) => {
            return +(a.price as number) - +(b.price as number)
          })
          break;
        case 'qty-high':
          filterTemp.sort((a, b) => {
            return (b.quantity as number) - (a.quantity as number)
          })
          break;
        case 'qty-low':
          filterTemp.sort((a, b) => {
            return (a.quantity as number) - (b.quantity as number)
          })
          break;
        default:
          break;
      }
      if (searchElement.current?.value) {
        filterTemp.map((product) => `${product.category} ${product.brand}`.includes(searchElement.current!.value) && searchTemp.push(product))
      } else {
        filterTemp.map((product) => searchTemp.push(product))
      }
    } else {
      products.map((product) => filterTemp.push(product))
      switch (filterElement.current!.value){
        case 'high':
          filterTemp.sort((a, b) => {
            return +(b.price as number) - +(a.price as number)
          })
          break;
        case 'low':
          filterTemp.sort((a, b) => {
            return +(a.price as number) - +(b.price as number)
          })
          break;
        case 'qty-high':
          filterTemp.sort((a, b) => {
            return (b.quantity as number) - (a.quantity as number)
          })
          break;
        case 'qty-low':
          filterTemp.sort((a, b) => {
            return (a.quantity as number) - (b.quantity as number)
          })
          break;
        default:
          break;
      }
      if (searchElement.current?.value) {
        console.log(searchElement.current.value)
        filterTemp.map((product) => `${product.category} ${product.brand}`.includes(searchElement.current!.value) && searchTemp.push(product))
      } else {
        filterTemp.map((product) => searchTemp.push(product))
      }
    }
    setProductsArray([...searchTemp])
  }

  return (
    <div className='p-10 pt-16 relative' >
          <b className='text-2xl m-10' >جدول مدیریت محصولات</b>
          <select onChange={filtering} ref={selectElement} className="absolute left-[605px] top-[132px] inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              <option value='all' selected>دسته بندی ها (همه)</option>
              <option value='face'>محصولات صورت</option>
              <option value='eye'>محصولات چشم</option>
          </select>
          <div className={`absolute top-[124px] left-[785px] w-[160px] border-b-2 border-gray-200`} >
            <select onChange={filtering} ref={filterElement} className="py-2.5 inline px-0 w-[130px] text-sm text-gray-500 bg-transparent border-0 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                <option value='all' >فیلتر ها (همه)</option>
                <option value='high' >گران ترین</option>
                <option value='low' >ارزان ترین</option>
                <option value='qty-high' >بیشترین تعداد</option>
                <option value='qty-low' >کم ترین تعداد</option>
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="inline mr-2 bi bi-funnel" viewBox="0 0 16 16">
              <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
            </svg>
          </div>
        <Button onClick={() => setAddModal(true)} className={`left-[330px] top-[130px] absolute bg-green-500 rounded-full py-1.5 px-5 text-white`} >افزودن کالا</Button>
        <div className={`absolute top-[130px] left-[450px] bg-gray-100 w-36 p-2 pt-1 pb-2 rounded-full`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="absolute m-1.5 mr-1 bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
        <input onChange={filtering} ref={searchElement} className='w-4/5 text-base outline-none float-left bg-transparent' placeholder='جستوجو' />
    </div>
      <div className="relative w-3/5 overflow-x-auto h-96 shadow-md sm:rounded-lg m-auto mt-20">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3 text-center">
                        عکس
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        محصول
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        تعداد موجودی
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        قیمت
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        گزینه ها
                    </th>
                </tr>
            </thead>
            <tbody>
                {(!productsArray ? products : productsArray).map((product: any) => {
                  const productPrice: number = +product.price
                  return (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={product.id} >
                            <td className="w-32 p-4 text-center">
                                <img src={`${IMAGES_BASE_URL}${product.images[0]}`} className='m-auto' width='40' height='40'/>
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-center">
                                {product.category} {product.brand} مدل {product.model}
                            </td>
                            <td className="px-6 py-4 text-center">
                                <ProductsQtyBtns quantity={product.quantity} getterQuantity={getterQuantity} />
                            </td>
                            <td className="px-2 py-4 font-semibold text-gray-900 dark:text-white">
                                {productPrice.toLocaleString()} تومان
                            </td>
                            <td className="px-6 py-8 flex gap-1.5">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" onClick={() => setDeleteModal(product)} className="bi bi-trash3-fill text-red-700 cursor-pointer" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                              </svg>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square text-green-500 cursor-pointer" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                              </svg>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" onClick={() => setInfoModal(product)} className="bi bi-info-circle cursor-pointer" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                              </svg>
                            </td>
                        </tr>
                  )
                })}
            </tbody>
        </table>
      </div>
      {infoModal && <InfoProductModal setInfoModal={setInfoModal} product={infoModal} />}
      {deleteModal && <DeleteProductModal setDeleteModal={setDeleteModal} product={deleteModal} />}
      {addModal && <AddProductModal setAddModal={setAddModal} />}
    </div>
  )
}
