import { deleteProduct } from "@/api"
import { useState } from "react"
import { Button } from "../Button/Button"


export const DeleteProductModal = ({product, setDeleteModal, reRenderHandler}: any) => {
    const [error, setError] = useState(false)

    const deleteHandler = async () => {
        const config = {
            headers: {
              token: localStorage.getItem('accessToken')
            }
        }
    
        await deleteProduct(product.id, config)
        reRenderHandler()
        setDeleteModal(null)
        // response.status == 200 ?  : setError(true)
    }

    return(
        <div id="authentication-modal" className={`fixed top-0 left-0 right-0 z-50 w-full bg-black bg-opacity-80 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full`}>
    <div className="relative mx-auto mt-[200px] w-[500px] h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className='border-b '>
                <Button type="button" onClick={() => setDeleteModal(null)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Close modal</span>
                </Button>
                <h3 className="mb-[20px] text-center mr-2 pt-[15px] text-xl font-medium text-gray-900 dark:text-white">حذف محصول⚠</h3>
            </div>
            <div className="py-[15px] px-[25px]" >
                <p className="text-[20px] mb-[50px]" >آیا از حذف "{product.category} {product.brand}" اطمینان دارید؟</p>
                {error && <p className="absolute top-0 font-bold mt-2 text-sm text-red-500 dark:text-red-400">اخطار: شما اجازه حذف محصول را ندارید(No Token Exist)</p>}
                <div className="text-center" >
                    <Button onClick={deleteHandler} className="bg-green-600 hover:bg-green-700 ml-[15px] text-white rounded-2xl py-[10px] px-[25px] " >بله</Button>
                    <Button  onClick={() => setDeleteModal(null)} className="bg-red-700 hover:bg-red-800 text-white rounded-2xl py-[10px] px-[25px] " >خیر</Button>
                </div>
            </div>
        </div>
    </div>
</div> 
    )
}