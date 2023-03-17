import { IMAGES_BASE_URL } from "@/api"
import { Button, ProductsQtyBtns, TextField } from "@/components"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { useRef, useState } from "react"
import { counterActions } from "@/store/productCounter"


export const Bag = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const textField = useRef<HTMLInputElement>(null)
    const [offerError, setOfferError] = useState<boolean>(false)
    const [offerSucsses, setOfferSucsses] = useState<boolean>(false)
    const [finalytotal, setFinalytotal] = useState<number>(0)
    const [reRender, setReRender] = useState<boolean>(false)
    const bagCounter = useSelector((state: any) => state.counter.bagCounter)
    const bagProducts: any = useSelector((state: any) => state.counter.bagProducts)
    let subtotal: number= 0

    const offerHandler = (subtotal: number) => {
        if(textField?.current?.value == 'takhfif'){
            console.log(subtotal * 0.95)
            setFinalytotal(subtotal * 0.95)
            textField.current.value = ''
            setOfferSucsses(true)
        }
        else if(textField?.current?.value != null){
            textField.current.value = ''
            setOfferError(true)
        }
    }

    const showError = () => {
        setTimeout(() => {
            setOfferError(false)
        }, 5000)
    }

    const removeProduct = (product: any) => {
        dispatch(counterActions.removeProduct(product))
    }

    const bagProductsAdder = (product: any) => {
        dispatch(counterActions.addProduct(product))
    }

    const removeOneHandler = (product: any) => {
        dispatch(counterActions.removeOne(product))
        setReRender(!reRender)
        console.log(reRender)
    }

    const orderPageRouter = (subtotal: number) => {
        dispatch(counterActions.subtotalHandler(subtotal))
        router.push('/order')
    }

    return(
        <div className="flex p-[50px] px-[150px] gap-[70px]">
            <div className="w-[65%]">
                <div className="mb-[50px]" >
                    <p className="font-bold text-center text-[30px] mb-[5px]" >سبد خرید ({bagCounter})</p>
                    <p className="text-center" >ارسال رایگان به ازای خرید بالای 800 هزار تومان</p>
                </div>
                {bagProducts.length == 0 ? <p className="text-center mt-[200px]" >محصولی در سبد خرید شما وجود ندارد</p> : <div className="flex flex-col gap-[20px]" >
                    {bagProducts.map((product: any) => {
                        const productPrice: number = +product.price
                        const productSubtotal: number= +product.price * product.inBag
                        subtotal += productSubtotal
                        return(
                            <div className="relative shadow-md border-2 rounded-md pr-[2px] h-[250px]" >
                                <Button onClick={() => removeProduct(product)} type="button" className="absolute top-3 left-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </Button>
                                <div className="flex" >
                                    <div className="w-[27%]" >
                                        <img onClick={() => router.push(`/products/${product.id}`)} className='cursor-pointer max-h-[245px] max-w-[100%]' src={`${IMAGES_BASE_URL}${product.images[0]}`} />
                                    </div>
                                    <div className="w-[73%]" >
                                        <p onClick={() => router.push(`/products/${product.id}`)} className="cursor-pointer w-[250px] hover:text-zinc-500 font-bold text-[25px] mt-[20px] mb-[10px]" >{product.category} {product.brand}</p>
                                        <p className="mb-[50px]" >{product.model}</p>
                                        <div className="flex" >
                                            <div className="w-[27%]" >
                                                <div className="flex items-center space-x-3 justify-center">
                                                    <button className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ml-3" onClick={() => removeOneHandler(product)} type="button">
                                                        <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                                                    </button>
                                                    <div className='' >
                                                        <input className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center" value={product.inBag}/>
                                                    </div>
                                                    <button className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={() => bagProductsAdder(product)} type="button">
                                                        <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="w-[20%] mr-[15px] mt-[4px]" >{productPrice.toLocaleString()}</p>
                                            <p className="font-bold text-left text-[20px] ml-[50px] mt-[2px] w-[53%]" >{productSubtotal.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>}
            </div>
            <div className="w-[35%]">
                <div className="bg-[#F0F0F0] p-[20px] rounded-lg" >
                    <div className="flex justify-between text-[18px] mb-[10px]" >
                        <p className="font-bold" >قیمت کل :</p>
                        <p className="font-bold" >{subtotal.toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between text-[18px] mb-[10px]" >
                        <p className="font-bold" >هزینه ارسال :</p>
                        {subtotal >= 800000 ? <p className="font-bold" >رایگان</p> : (() => {
                            {subtotal > 0 && (subtotal += 80000)}
                            return <p className="font-bold" >{subtotal != 0 ? ((80000).toLocaleString()) : (0)}</p>
                        })()}
                    </div>
                    <div className="bg-white p-[20px] rounded-lg" >
                        <div className="flex justify-between text-[18px] mb-[10px]" >
                            <p className="font-bold" >ارسال فوری</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="mt-[25px] bi bi-house-door" viewBox="0 0 16 16">
                                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z"/>
                            </svg>
                        </div>
                        <p className="text-[12px]" >ارسال رایگان به ازای خرید بالای 800 هزار تومان</p>
                    </div>
                </div>
                <div className="bg-[#F0F0F0] p-[20px] rounded-lg mt-[20px]" >
                    <div className="text-[18px] mb-[10px]" >
                        <>
                            <p className="font-bold" >کد تخفیف :</p>
                            <div className="flex justify-between gap-[10px] mt-[10px]" >
                                <input ref={textField} placeholder="کد تخفیف را وارد کنید" className='w-full py-[15px] px-[10px] outline-none border-2' />
                                <Button onClick={() => offerHandler(subtotal)} className="w-[30%] py-[15px] px-[10px] outline-none border-2 bg-white" >اعمال</Button>
                            </div>
                            {offerError && <p className="text-red-600 text-[12px]" >کد تخفیف مجاز نمی باشد</p>}
                            {offerError && showError()}
                            {offerSucsses && <p className="text-green-500 text-[12px]" >5 درصد تخفیف اعمال شد</p>}
                        </>
                    </div>
                </div>
                <div className="bg-[#F0F0F0] p-[20px] rounded-lg mt-[20px]" >
                        <div className="flex justify-between text-[18px] mb-[50px]" >
                            <p className="font-bold" >قیمت نهایی :</p>
                            <p className="font-bold" >{finalytotal != 0 ? finalytotal.toLocaleString() : subtotal.toLocaleString()}</p>
                        </div>      
                        <Button onClick={() => orderPageRouter(finalytotal != 0 ? finalytotal : subtotal)} className={`w-full rounded-xl py-[10px] px-[20px] pt-[8px] bg-[#CE4545] text-white hover:bg-red-700`}>ادامه فرایند خرید</Button>   
                </div>
            </div>
        </div>
    )
}