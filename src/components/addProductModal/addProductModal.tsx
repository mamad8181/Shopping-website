import { IMAGES_BASE_URL, postProduct, uploadImg } from "@/api"
import { useRef, useState } from "react"
import { Button } from "../Button/Button"
import { Pagination } from "../pagination/pagination"

export const AddProductModal = ({setAddModal}: any) => {
    const nameField = useRef<HTMLInputElement>(null)
    const subCategoryField = useRef<HTMLSelectElement>(null)
    const modelField = useRef<HTMLInputElement>(null)
    const brandField = useRef<HTMLInputElement>(null)
    const regionField = useRef<HTMLSelectElement>(null)
    const priceField = useRef<HTMLInputElement>(null)
    const qtyField = useRef<HTMLInputElement>(null)
    const colorsField = useRef<HTMLInputElement>(null)
    const descriptionField = useRef<HTMLInputElement>(null)
    const [errorState, setErrorState] = useState<boolean>(false)
    const [images, setImages] = useState<string[]>([])
    const [pagination, setPagination] = useState<[]>([])
    
    const addproductHandler = async () => {
        let errorFlag = false
        const colorArray = colorsField.current?.value.split(',')
        const currentDate = new Date()
        const dateInMs = currentDate.getTime()

        const data = {
            "region": regionField.current!.value ? regionField.current!.value : errorFlag = true,
            "subcategory": subCategoryField.current!.value ? subCategoryField.current!.value : errorFlag = true,
            "category": nameField.current!.value ? nameField.current!.value : errorFlag = true,
            "brand": brandField.current!.value ? brandField.current!.value : errorFlag = true,
            "model": modelField.current?.value,
            "images": [...images],
            "colors": colorArray ? [...colorArray] : [],
            "description": descriptionField.current!.value ? descriptionField.current!.value : errorFlag = true,
            "price": priceField.current!.value ? priceField.current!.value : errorFlag = true,
            "createdAt": dateInMs,
            "quantity": +qtyField.current!.value ? qtyField.current!.value : errorFlag = true,
        }

        if(errorFlag == true) setErrorState(true)
        else {
            const response = await postProduct(data)
            if(response.status == 201){
                setAddModal(false)
                location.reload()
            }
        }
    }

    const showError = () => {
        setTimeout(() => {
            setErrorState(false)
        }, 5000)
    }

    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            token: localStorage.getItem('accessToken')
        }
    }

    const sendImg = async (pic: any) => {
        const formData = new FormData()
        formData.append('image', pic)
        const response = await uploadImg(formData, config)
        setImages([...images, `${response.data.filename}`])
    }

    console.log(pagination)

    return(
        <div className={`fixed top-0 left-0 right-0 z-50 w-full bg-black bg-opacity-80 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full`}>
        <div className="relative mx-auto mt-[100px] w-3/5 h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className='border-b '>
                <button type="button" onClick={() => setAddModal(false)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Close modal</span>
                </button>
                    <h3 className="mb-[20px] text-center mr-2 pt-[15px] text-xl font-medium text-gray-900 dark:text-white">اضافه کردن محصول</h3>
                </div>
                <div className="flex">
                <div className='flex border-b py-[15px] px-[25px] w-[60%]'>
                    <div className='w-[50%]'>
                    <p className='font-bold'>نام محصول*:</p>
                    <input ref={nameField} className='bg-zinc-200 focus:bg-white px-[5px] border-2 border-zinc-500 rounded-lg mb-[15px]'/>
                    <p className='font-bold'>دسته بندی محصول*:</p>
                    <select ref={subCategoryField} className='bg-zinc-200 w-[194px] focus:bg-white px-[5px] py-0 border-2 border-zinc-500 rounded-lg mb-[15px]'>
                        <option value='' selected >انتخاب دسته بندی</option>
                        <option value='face'>صورت</option>
                        <option value='eye'>چشم</option>
                        <option value='lips'>لب</option>
                        <option value='eyebrow'>ابرو</option>
                    </select>
                    <p className='font-bold'>مدل:</p>
                    <input ref={modelField} className='bg-zinc-200 focus:bg-white px-[5px] border-2 border-zinc-500 rounded-lg mb-[15px]'/>
                    <p className='font-bold'>برند*:</p>
                    <input ref={brandField} className='bg-zinc-200 focus:bg-white px-[5px] border-2 border-zinc-500 rounded-lg mb-[15px]'/>
                    <p className='font-bold'>نوع محصول*:</p>
                    <select ref={regionField} className='bg-zinc-200 w-[194px] focus:bg-white px-[5px] py-0 border-2 border-zinc-500 rounded-lg mb-[15px]'>
                        <option value='' selected >انتخاب نوع</option>
                        <option value='inside'>ایرانی</option>
                        <option value='outside'>خارجی</option>
                    </select>
                    <p className='font-bold'>قیمت*:</p>
                    <input type='number' ref={priceField} className='py-0 bg-zinc-200 focus:bg-white px-[5px] border-2 border-zinc-500 rounded-lg mb-[15px]'/>
                    </div>
                    <div className='w-[50%] pl-6'>
                    <p className='font-bold'>تعداد*:</p>
                    <input type='number' ref={qtyField} className='py-0 bg-zinc-200 focus:bg-white px-[5px] border-2 border-zinc-500 rounded-lg mb-[15px]'/>
                    <p className='font-bold'>رنگ(ها):</p>
                    <input ref={colorsField} className='bg-zinc-200 focus:bg-white px-[5px] border-2 border-zinc-500 rounded-lg mb-[15px]'/>
                    <p className='font-bold mt-[15px]'>توضیحات*:</p>
                    <input ref={descriptionField} className='bg-zinc-200 focus:bg-white px-[5px] border-2 border-zinc-500 rounded-lg mb-[15px]'/>
                    <p className='font-bold mt-[15px]'>انتخاب عکس:</p>
                    <input type='file' onChange={(event) => {
                        const target = event.target as HTMLInputElement;
                        if (target instanceof HTMLInputElement && target.files?.length) {
                            sendImg(target.files[0]);
                        }
                    }}/>
                    </div>
                </div>
                <div className='border-r border-b py-[15px] px-[25px] w-[40%]'>
                    <p className='font-bold text-center mb-[15px]'>عکس(های)محصول</p>
                    <div>
                        {pagination.map((img: string) => {
                            return <img src={`${IMAGES_BASE_URL}${img}`} className='m-auto max-h-[270px]' width='200px'/>
                        })}
                        <Pagination className="mt-[20px]" list={images} itemInPage={1} setPagination={setPagination}/>
                    </div>
                </div>
                </div>
                <div className="relative py-[15px] px-[25px]" >
                    <>
                        <Button onClick={addproductHandler} className="mr-[780px] bg-green-600 hover:bg-green-700 text-white rounded-2xl py-[10px] px-[25px] ">افزودن</Button>
                        {errorState && <p className="absolute top-0 font-bold mt-2 text-sm text-red-500 dark:text-red-400">پر کردن همه بخش های ستاره دار اجباری میباشد!</p>}
                        {errorState && showError()}
                    </>
                </div>
            </div>
        </div>
    </div> 
    )
}