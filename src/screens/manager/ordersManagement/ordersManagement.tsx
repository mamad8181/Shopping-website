import { getOrders } from "@/api"
import moment from 'jalali-moment';
import { useEffect, useRef, useState } from "react"
import 'tailwindcss/tailwind.css'

type dataObj= Record<string, unknown>


export const OrderManagement = () => {
  const [orders, setOrders] = useState<dataObj[]>([])
  const selectElement = useRef<HTMLSelectElement>(null)
  const searchElement = useRef<HTMLInputElement>(null)
  const filterElement = useRef<HTMLSelectElement>(null)
  const [ordersArray, setOrdersArray] = useState<dataObj[]>()
  const filterTemp: dataObj[] = []



    useEffect(() => {
        const ordersGetter = async () => {
          const response = await getOrders()
          setOrders([...response.data])
        }
        ordersGetter()
    }, [])

    const filtering = () => {
        const searchTemp: dataObj[] = []
        if (selectElement.current!.value !== 'all') {
          orders.map((order) => selectElement.current!.value === order.delivered && filterTemp.push(order))
          switch (filterElement.current!.value){
            case 'newer':
              filterTemp.sort((a, b) => {
                return (b.createdAt as number) - (a.createdAt as number)
              })
              break;
            case 'older':
              filterTemp.sort((a, b) => {
                return (a.createdAt as number) - (b.createdAt as number)
              })
              break;
            default:
              break;
          }
          if (searchElement.current?.value) {
            filterTemp.map((order) => `${order.username} ${order.lastname}`.includes(searchElement.current!.value) && searchTemp.push(order))
          } else {
            filterTemp.map((order) => searchTemp.push(order))
          }
        } else {
            orders.map((order) => filterTemp.push(order))
            switch (filterElement.current!.value){
                case 'newer':
                  filterTemp.sort((a, b) => {
                    return (b.createdAt as number) - (a.createdAt as number)
                  })
                  break;
                case 'older':
                  filterTemp.sort((a, b) => {
                    return (a.createdAt as number) - (b.createdAt as number)
                  })
                  break;
                default:
                  break;
              }
          if (searchElement.current?.value) {
            filterTemp.map((order) => `${order.username} ${order.lastname}`.includes(searchElement.current!.value) && searchTemp.push(order))
          } else {
            filterTemp.map((order) => searchTemp.push(order))
          }
        }
        setOrdersArray([...searchTemp])
      }

  return (
    <div className="relative p-10 pt-16">
        <b className='text-2xl m-10' >جدول مدیریت سفارشات</b>
        <div className={`absolute left-[328px] top-[135px] bg-gray-100 w-[200px] p-2 pt-1 pb-2 rounded-full`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="absolute m-1.5 mr-1 bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
            <input onChange={filtering} ref={searchElement}  className='w-4/5 text-base outline-none float-left bg-transparent' placeholder='جستوجوی نام خریدار' />
        </div>
            <select onChange={filtering} ref={selectElement} className="absolute left-[535px] top-[135px] inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                <option value='all' selected >
                    دسته بندی سفارشات (همه)
                </option>
                <option value='true' >
                    سفارشات تحویل داده شده
                </option>
                <option value='false' >
                    سفارشات در انتظار تحویل
                </option>
            </select>
            <div className={`absolute top-[126px] left-[755px] w-[200px] border-b-2 border-gray-200`} >
            <select onChange={filtering} ref={filterElement} className="py-2.5 inline px-0 w-[173px] text-sm text-gray-500 bg-transparent border-0 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                <option value='all' >فیلتر ها (همه)</option>
                <option value='newer' >جدیدترین سفارش ها</option>
                <option value='older' >قدیمی ترین سفارش ها</option>
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="inline mr-2 bi bi-funnel" viewBox="0 0 16 16">
              <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
            </svg>
          </div>
            <div className=" shadow-md sm:rounded-lg overflow-x-auto w-3/5 h-96 m-auto mt-20">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className=" text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="flex" >
                <th scope="col" className="text-center p-4 w-[40%]">
                    نام کاربر
                </th>
                <th scope="col" className="text-center px-6 py-4 w-[20%]">
                    مجموع قیمت
                </th>
                <th scope="col" className="text-center px-6 py-4 w-[20%]">
                    زمان ثبت سفارش
                </th>
                <th scope="col" className="text-center px-1 py-4 w-[10%]">
                    بررسی سفارش
                </th>
                <th scope="col" className="text-center px-1 py-4 w-[10%]">
                    وضعیت تحویل
                </th>
            </tr>
        </thead>
        <tbody>
            {(!ordersArray ? orders : ordersArray).map((order: any) => {
                const timestamp = order.createdAt;
                const persianDate = moment(timestamp).format('jYYYY/jM/jD');

                return(
                    <tr className="bg-white flex border-b h-[80px] dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={order.id}>
                        <th className="px-6 py-7 w-[40%] text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {order.username} {order.lastname}
                        </th>
                        <td className="px-6 py-7 w-[20%] text-center font-semibold text-gray-900 dark:text-white">
                            {order.prices} تومان
                        </td>
                        <td className="px-6 py-7 w-[20%] text-center">
                            {persianDate}
                        </td>
                        <td className="px-6 py-7 w-[10%] text-center">
                            <p className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">بررسی</p>
                        </td>
                        <td className="px-6 py-7 w-[10%] text-center">
                            {order.delivered == 'true' ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-check-fill text-green-500 text-center mr-[9px] mt-[5px]" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-dash-fill text-red-500 text-center mr-[9px] mt-[5px]" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM6 6a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H6z"/>
                            </svg>}
                        </td>
                    </tr>
                )
            })}
        </tbody>
    </table>
            </div>
</div>
   
  )
}
