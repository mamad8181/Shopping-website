import { deleteProduct, editProduct, IMAGES_BASE_URL, postProduct, uploadImg } from '@/api'
import { FormEvent, useRef, useState } from 'react'
import { Button, HeaderLabel, TextField } from '../../../components'

export const StoreManagement = () => {
  const [product, setProduct] = useState<string>()
  const productInput = useRef<HTMLInputElement>(null)

  // const config = {
  //   headers: {
  //     'content-type': 'multipart/form-data',
  //     token: localStorage.getItem('accessToken')
  //   }
  // }

  // const hhhh = async (pic) => {
  //   const formData = new FormData()
  //   formData.append('image', pic)
  //   const response = await uploadImg(formData, config)
  //   console.log(response)
  // }

  const uploadHandler = async (e: FormEvent) => {
    e.preventDefault()

    // const data = {
    //   'name': productInput.current?.value
    // }

    // const response = await postProduct(data)
    // if(response.status == 201){
    //   console.log(productInput.current)
    // }

    // const config = {
    //     headers: {
    //       token: localStorage.getItem('accessToken')
    //     }
    //   }

    // const response = await deleteProduct(34, config)


  //   const config = {
  //         headers: {
  //           token: localStorage.getItem('accessToken')
  //         }
  //       }

  //   const data = {
  //     'name': productInput.current?.value
  //   }

  //   const res = await editProduct(36, data, config)

  }

  return (
    <div className='p-10 pt-16 relative' >
      <b className='text-2xl m-10' > مدیریت فروشگاه:</b>
      <form onSubmit={uploadHandler} className='w-3/4 px-20 py-10 border-2 border-black rounded-3xl m-auto mt-10'>
        <p>کنترل لیبل بالای فروشگاه:</p>
        <input ref={productInput} className='border-2 rounded-full mt-3 mb-5 w-1/2 px-1.5 outline-none py-1' />
        <Button type='submit' className='bg-green-400' >upload</Button>
        <p>پس از اجرا:</p>
        <HeaderLabel className='mt-3' />
      </form>
    {/* <input type='file' onChange={() => hhhh(event.target.files[0])}/>
    <img src={`${IMAGES_BASE_URL}e84ddf0abe7137a895fd8056902f7114`} width='50' height='50' /> */}
    </div>

  )
}
