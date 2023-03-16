import { getProducts, IMAGES_BASE_URL } from '@/api'
import { Button } from '@/components'
import { counterActions } from '@/store/productCounter'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import poster from '../../assets/images/Home-Poster.png'
import secoundPoster from '../../assets/images/secound-poster.png'
import thirdPoster from '../../assets/images/third-poster.png'


export const HomeScreen = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [exampleProducts, setExampleProducts] = useState<object[]>([])
  
  useEffect(() => {
    let tempProducts: object[]= []
    let products: object[]= []
    let randomProductsArr: number[]= []

    const productsGetter = async () => {
      const response = await getProducts()

      products = [...response.data]

      for(let i: number= 0 ; tempProducts.length < 4 ; i++){
        const randomproduct: any = products[Math.floor(Math.random() * products.length)]
        if(randomProductsArr.length == 0){
          tempProducts.push(randomproduct)
          randomProductsArr.push(randomproduct)
        }
        else{
          randomProductsArr.includes(randomproduct) == false && tempProducts.push(randomproduct)
          randomProductsArr.push(randomproduct)
        }
        console.log(randomproduct.id)
      }
      // console.log(tempProducts)
      setExampleProducts([...tempProducts])
    }

    productsGetter()
  }, [])

  const bagProductsAdder = (product: any) => {
    dispatch(counterActions.increment(product))
  }



  return (
    <div>
        <div className='relative'>
          <img src={poster.src} />
          <p className="absolute top-[150px] left-[75px] w-[400px] text-center text-[50px] font-bold text-black" >بهترین کیفیت! بهترین قیمت!</p>
          <p className="absolute top-[300px] left-[75px] w-[400px] text-center text-[25px] font-bold text-black" >با ما تجربه کنید</p>
        </div>
        <div className='px-[40px]' >
          <b className='block text-[48px] mb-[30px]' >برخی از محصولات</b>
          <div className='flex gap-[10px] mb-[80px]' >
            {exampleProducts.map((product: any) => {
              const productPrice: number = +product.price
              return(
                <div key={product.id} className='w-[25%] flex flex-col justify-between rounded-[8px] shadow-lg mt-[20px]' >
                  <div>
                    <img className='max-h-[300px] m-auto' src={`${IMAGES_BASE_URL}${product.images[0]}`}/>
                  </div>
                  <div className='text-center pb-[20px]'>
                      <b className='block mb-[35px]'>{product.category} {product.brand}</b>
                      <b className='block mb-[10px]'>{productPrice.toLocaleString()} تومان</b>
                      <p>{product.model}</p><br/>
                      <Button onClick={() => router.push(`/products/${product.id}`)} className='rounded-full py-[10px] px-[20px] pt-[8px] ml-[10px] bg-white text-black border border-black text-center' >مشاهده محصول</Button>
                      <Button onClick={() => bagProductsAdder(product)} className='rounded-full  py-[10px] px-[20px] pt-[8px] bg-[#CE4545] text-white hover:bg-red-700' >افزودن به سبد خرید</Button>
                  </div>
                </div>
              )
            })}
          </div>
          <div className='relative mb-[20px]'>
            <img src={secoundPoster.src} />
            <b className='absolute top-[40px] text-[48px]' >محصولات بیشتری مشاهده کنید</b>
            <div className='absolute bottom-[25px] right-[70px]'>
              <b className='text-[30px] block mb-[10px]'>صورت</b>
              <b className='underline cursor-pointer' >
                <Link href={'/products/face/کرم%E2%80%8Cپودر'}>
                  جستوجو
                </Link>
              </b>
            </div>
            <div className='absolute bottom-[25px] right-[405px]'>
              <b className='text-[30px] block mb-[10px]'>ابرو</b>
              <b className='underline cursor-pointer'>
                <Link href={''}>
                  جستوجو
                </Link>
              </b>
            </div>
            <div className='absolute bottom-[25px] left-[630px]'>
              <b className='text-[30px] block mb-[10px]'>چشم</b>
              <b className='underline cursor-pointer'>
                <Link href={'/products/eye/خط%E2%80%8Cچشم'}>
                  جستوجو
                </Link>
              </b>
            </div>
            <div className='absolute bottom-[25px] left-[305px]'>
              <b className='text-[30px] block mb-[10px]'>لب</b>
              <b className='underline cursor-pointer'>
                <Link href={''}>
                  جستوجو
                </Link>
              </b>
            </div>
          </div>
        </div>
        <div>
          <img src={thirdPoster.src} className='w-full'/>
        </div>
    </div>
  )
}
