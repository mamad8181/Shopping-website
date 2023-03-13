import { IMAGES_BASE_URL } from "@/api"
import { useDispatch, useSelector } from "react-redux"


interface myProps{
    setBagModal: any
}

export const BagModal = ({setBagModal}: myProps) => {
    const bagProducts: [] = useSelector((state: any) => state.counter.bagProducts)

    return(
        <div className="absolute border-2 w-[400px] z-[1] bg-white left-0 top-[50px]" >
            <>
                <div className='border-b '>
                    <button type="button" onClick={() => setBagModal(false)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <h5 className="mb-[20px] text-center mr-2 pt-[15px] text-xl font-medium text-gray-900 dark:text-white">سبد خرید شما</h5>
                </div>
                <div className="flex flex-col" >
                    {bagProducts.length == 0 ? <p className="text-center my-[50px]" >محصولی در سبد وجود ندارد</p> : bagProducts.map((product: any) => {
                        const productPrice: number = +product.price
                        return (
                            <div className="flex py-[5px] px-[15px]">
                                <div className="w-[50%] py-[15px]" >
                                    <p className="font-bold text-[20px]" >{product.category} {product.brand}</p>
                                    <p className="mt-[5px]" >{product.model}</p>
                                    <p className="mt-[30px]" >تعداد: {product.quantity}</p>
                                    <p>{productPrice.toLocaleString()} تومان</p>
                                </div>
                                <div className="w-[50%]" >
                                    <img className='max-h-[200px] max-w-[100%] m-auto' src={`${IMAGES_BASE_URL}${product.images[0]}`} />
                                </div>
                            </div>
                        )
                    }) }

                </div>
            </>
        </div>
    )
}