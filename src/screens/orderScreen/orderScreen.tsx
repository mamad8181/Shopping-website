import { postOrder, postProduct } from "@/api"
import { Button } from "@/components"
import { counterActions } from "@/store/productCounter"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"


export const OrderScreen = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [errorState, setErrorState] = useState<boolean>(false)
    const username = useRef<HTMLInputElement>(null)
    const lastname = useRef<HTMLInputElement>(null)
    const address = useRef<HTMLInputElement>(null)
    const phone = useRef<HTMLInputElement>(null)
    const subtotal = useSelector((state: any) => state.counter.subtotal)
    const products = useSelector((state: any) => state.counter.bagProducts)

    const orderHandler = async () => {
        let errorFlag = false
        const currentDate = new Date()
        const dateInMs = currentDate.getTime()

        const data = {
            "username": username.current!.value ? username.current!.value : errorFlag = true,
            "lastname": lastname.current!.value ? lastname.current!.value : errorFlag = true,
            "address": address.current!.value ? address.current!.value : errorFlag = true,
            "phone": phone.current!.value ? phone.current!.value : errorFlag = true,
            "products": products,
            "prices": subtotal,
            "delivered": false,
            "createdAt": dateInMs,
        }

        if(errorFlag == true) setErrorState(true)
        else {
            dispatch(counterActions.orderSetter(data))
            router.push('/payment')
        }
    }

    const showError = () => {
        setTimeout(() => {
            setErrorState(false)
        }, 5000)
    }

    return(
        <div className='p-[60px] pt-[30px] relative' >
          <b className='text-2xl m-10' >ثبت سفارش</b>
        <div className="relative mx-auto w-[30%] h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className='border-b '>
                    <h3 className="mb-[20px] text-center mr-2 pt-[15px] text-xl font-medium text-gray-900 dark:text-white">مشخصات</h3>
                </div>
                <div className="flex flex-col border-b-2 p-[20px] px-[62px]">
                    <p className='font-bold'>نام:</p>
                    <input ref={username} className='bg-zinc-200 w-[300px] focus:bg-white px-[5px] border-2 border-zinc-500 rounded-lg mb-[15px]'/>
                    <p className='font-bold'>نام خانوادگی:</p>
                    <input ref={lastname} className='bg-zinc-200 w-[300px] focus:bg-white px-[5px] border-2 border-zinc-500 rounded-lg mb-[15px]'/>
                    <p className='font-bold'>آدرس:</p>
                    <input ref={address} className='bg-zinc-200 w-[300px] focus:bg-white px-[5px] border-2 border-zinc-500 rounded-lg mb-[15px]'/>
                    <p className='font-bold'>شماره تلفن:</p>
                    <input ref={phone} className='bg-zinc-200 w-[300px] focus:bg-white px-[5px] border-2 border-zinc-500 rounded-lg mb-[15px]'/>
                </div>
                <div className="relative py-[15px] px-[25px] text-center" >
                    <>
                        <Button onClick={() => router.push('/shoppingbag')} className="m-auto w-[125px] ml-[20px] bg-red-600 hover:bg-red-700 text-white rounded-2xl py-[10px] px-[25px] ">بازگشت</Button>
                        <Button onClick={orderHandler} className="m-auto bg-green-600 hover:bg-green-700 text-white rounded-2xl py-[10px] px-[25px] ">ثبت و ادامه</Button>
                        {errorState && <p className="font-bold mt-2 text-sm text-red-500 dark:text-red-400">پر کردن همه بخش هااجباری میباشد!</p>}
                        {errorState && showError()}
                    </>
                </div>
            </div>
        </div>
    </div> 
    )
}