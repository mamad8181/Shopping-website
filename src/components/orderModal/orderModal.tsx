import moment from 'jalali-moment';


export const OrderModal = ({order, setOrderModal}: any) => {
    const timestamp = order.createdAt;
    const persianDate = moment(timestamp).format('jYYYY/jM/jD');
    const orderPrices: number = +order.prices

    return(
        <div onClick={() => setOrderModal(null)} id="authentication-modal" aria-hidden="true" className={`fixed top-0 left-0 right-0 z-50 w-full bg-black bg-opacity-80 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full`}>
    <div className="relative mx-auto mt-[100px] w-3/5 h-full md:h-auto">
        <div onClick={e => e.stopPropagation()} className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className='border-b '>
            <button type="button" onClick={() => setOrderModal(null)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
            </button>
                <h3 className="mb-[20px] text-center mr-2 pt-[15px] text-xl font-medium text-gray-900 dark:text-white">اطلاعات سفارش</h3>
            </div>
            <div className="flex px-6 py-3 lg:px-8">
                <div className='flex w-[60%]'>
                    <div className='w-[50%]'>
                    <p className='font-bold'>نام خریدار:</p>
                    <p className='mb-[15px]'>{order.username} {order.lastname}</p>
                    <p className='font-bold'>نشانی:</p>
                    <p className='mb-[15px]'>{order.address}</p>
                    <p className='font-bold'>شماره تلفن:</p>
                    <p className='mb-[15px]'>{order.phone}</p>
                    <p className='font-bold'>زمان ثبت سفارش:</p>
                    <p className='mb-[15px]'>{persianDate}</p>
                    <p className='font-bold'>مجموع قیمت:</p>
                    <p className='mb-[15px]'>{orderPrices.toLocaleString()} تومان</p>
                    <p className='font-bold'>وضعیت سفارش:</p>
                    <p className='mb-[15px]' >{order.delivered == true ? 'تحویل داده شده' : "در انتظار تحویل"}</p>
                    </div>
                    {/* <div className='w-[50%] pl-6'>
                    <p className='font-bold'>رنگ(ها):</p>
                    {product.colors.length != 0 ? product.colors.map((color: string) => <p>{color}</p>) : <p className='text-zinc-500'>محصول بدون رنگ بندی می باشد!</p>}
                    <p className='font-bold mt-[15px]'>توضیحات:</p>
                    <p className='mb-[15px]'>{product.description}</p>
                    <p className='font-bold mt-[15px]'>تاریخ اضافه شدن محصول:</p>
                    <p className='mb-[15px]'>{persianDate}</p>
                    </div>
                </div>
                <div className='border-r pr-6 w-[40%]'>
                    <p className='font-bold text-center mb-[15px]'>عکس(های)محصول</p>
                    <div>
                        {pagination.length == 0 ? <p className="text-center mt-[150px] " >تصویری برای این محصول وجود ندارد.</p> : pagination.map((img: string) => {
                            return <img src={`${IMAGES_BASE_URL}${img}`} className='m-auto max-h-[270px]' width='200px'/>  
                        })}
                        <Pagination className="mt-[20px]" list={product.images} itemInPage={1} setPagination={setPagination}/>
                    </div> */}
                </div>
            </div>
        </div>
    </div>
</div> 
    )
}