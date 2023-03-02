import { getOrders } from "@/api"
import { TextField } from "@/components"
import { useEffect, useState } from "react"
import 'tailwindcss/tailwind.css'

type dataObj= Record<string, unknown>


export const OrderManagement = () => {
  const [orders, setOrders] = useState<dataObj[]>([])


    useEffect(() => {
        const ordersGetter = async () => {
          const response = await getOrders()
          setOrders([...response.data])
        }
        ordersGetter()
    }, [])

  return (
    <div className="relative p-10 pt-16">
        <b className='text-2xl m-10' >جدول مدیریت سفارشات</b>
        <div className={`absolute left-[328px] top-[135px] bg-gray-100 w-36 p-2 pt-1 pb-2 rounded-full`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="absolute m-1.5 mr-1 bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
            <TextField className='w-4/5 text-base outline-none float-left bg-transparent' placeholder='جستوجو' />
        </div>
            <select className="absolute left-[480px] top-[135px] inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                <option>
                    Last 30 days
                </option>
            </select>
            <div className=" shadow-md sm:rounded-lg w-3/5 h-96 m-auto mt-20">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className=" text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="flex" >
                <th scope="col" className="text-center p-4 w-[40%]">
                    نام کاربر
                </th>
                <th scope="col" className="text-center px-6 py-4 w-[20%]">
                    مجموع قیمت
                </th>
                <th scope="col" className="text-center px-6 py-4 w-[30%]">
                    زمان ثبت سفارش
                </th>
                <th scope="col" className="text-center px-1 py-4 w-[10%]">
                    بررسی سفارش
                </th>
            </tr>
        </thead>
        <tbody>
            {orders.map((order: any) => {
                return(
                    <tr className="bg-white flex border-b h-[80px] dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={order.id}>
                        <th className="px-6 py-7 w-[40%] text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {order.username} {order.lastname}
                        </th>
                        <td className="px-6 py-7 w-[20%] text-center font-semibold text-gray-900 dark:text-white">
                            {order.prices} تومان
                        </td>
                        <td className="px-6 py-7 w-[30%] text-center">
                            {order.createdAt}
                        </td>
                        <td className="px-6 py-7 w-[10%] text-center">
                            <p className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">بررسی</p>
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
