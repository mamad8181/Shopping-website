import { IMAGES_BASE_URL } from '@/api'
import { useRef, useState } from 'react'

export const EdditProductModal= ({product, setEdditModal}: any) => {
    const insideWindow = useRef<HTMLDivElement>(null)
    let subcategory: string=''
    const productPrice: number = +product.price
    
    
    const closeModalHandler = (event: Event | undefined) => {
        
    }

    switch (product.subcategory){
        case 'face':
            subcategory = 'صورت'
            break;
        case 'eye':
            subcategory = 'چشم'
            break;
    }

    return (
        <div onClick={() => closeModalHandler(event)} id="authentication-modal" aria-hidden="true" className={`fixed top-0 left-0 right-0 z-50 w-full bg-black bg-opacity-80 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full`}>
    <div ref={insideWindow} className="relative mx-auto mt-[100px] w-3/5 h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className='border-b '>
            <button type="button" onClick={() => setEdditModal(null)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
            </button>
                <h3 className="mb-[20px] text-center mr-2 pt-[15px] text-xl font-medium text-gray-900 dark:text-white">اطلاعات محصول</h3>
            </div>
            <div className="flex px-6 py-3 lg:px-8">
                <div className='flex'>
                    <div className='w-[50%]'>
                    <p className='font-bold'>نام محصول:</p>
                    <p className='mb-[15px]'>{product.category}</p>
                    <p className='font-bold'>دسته بندی محصول:</p>
                    <p className='mb-[15px]'>{subcategory}</p>
                    <p className='font-bold'>مدل:</p>
                    <p className='mb-[15px]'>{product.model ? product.model : <p className='text-zinc-500'>محصول تک مدل می باشد!</p>}</p>
                    <p className='font-bold'>برند:</p>
                    <p className='mb-[15px]'>{product.brand}</p>
                    <p className='font-bold'>نوع محصول:</p>
                    <p className='mb-[15px]'>{product.region == 'inside' ? 'ایرانی' : 'خارجی'}</p>
                    <p className='font-bold'>قیمت:</p>
                    <p className='mb-[15px]'> {productPrice.toLocaleString()} تومان</p>
                    </div>
                    <div className='w-[50%] pl-6'>
                    <p className='font-bold'>رنگ(ها):</p>
                    {product.colors.length != 0 ? product.colors.map((color: string) => <p>{color}</p>) : <p className='text-zinc-500'>محصول بدون رنگ بندی می باشد!</p>}
                    <p className='font-bold mt-[15px]'>توضیحات:</p>
                    <p className='mb-[15px]'>{product.description}</p>
                    </div>
                </div>
                <div className='border-r pr-6'>
                    <p className='font-bold text-center mb-[65px]'>عکس(های)محصول</p>
                    <div>
                        {/* {itemsToDisplay.map((image: string) => (
                        <div key={image}>
                            <img src={`${IMAGES_BASE_URL}${image}`} className='w-[500px]'/>
                        </div>
                        ))} */}
                        
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> 
    )
}