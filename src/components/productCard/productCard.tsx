import { IMAGES_BASE_URL } from "@/api"
import { counterActions } from "@/store/productCounter"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { Button } from "../Button/Button"

interface myProps{
    product: any
}

export const ProductCard = ({product}: myProps) => {
  const dispatch = useDispatch()
    const router = useRouter()

    const productPrice: number = +product.price

    const bagProductsAdder = (product: any) => {
      dispatch(counterActions.increment(product))
    }

    return(
        <div onClick={() => router.push(`/products/${product.id}`)} className='relative  flex flex-col justify-between cursor-pointer rounded-[8px] w-full shadow-lg mt-[20px]' >
          <div>
            <img className='max-h-[300px] max-w-[300px] m-auto' src={`${IMAGES_BASE_URL}${product.images[0]}`} width='400' />
          </div>
          <div className='text-center pb-[20px]'>
            <b className='block mb-[35px]'>{product.category} {product.brand}</b>
            <b className='block mb-[10px]'>{productPrice.toLocaleString()} تومان</b>
            <p>{product.model}</p><br/>
            <Button onClick={e => {
              e.stopPropagation()
              bagProductsAdder(product)
              }} className='rounded-full py-[10px] px-[20px] pt-[8px] bg-[#CE4545] text-white hover:bg-red-700' >افزودن به سبد خرید</Button>
          </div>
        </div>
      )
}