import { getProducts, IMAGES_BASE_URL } from '@/api'
import { Button } from '@/components'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import poster from '../../assets/images/Home-Poster.png'
import secoundPoster from '../../assets/images/secound-poster.png'
import thirdPoster from '../../assets/images/third-poster.png'
export const HomeScreen = () => {
  // const [products, setProducts] = useState<object[]>([])
  const [exampleProducts, setExampleProducts] = useState<object[]>([])
  
  useEffect(() => {
    let tempProducts: object[]= []
    let products: object[]= []

    const productsGetter = async () => {
      const response = await getProducts()

      products = [...response.data]

      for(let i: number= 0 ; tempProducts.length < 4 ; i += Math.ceil(products.length / 4)){
        tempProducts.push(products[i])
      }
      console.log(tempProducts)
      setExampleProducts([...tempProducts])
    }

    productsGetter()
  }, [])



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
                <div key={product.id} className='w-[25%] shadow-lg mt-[20px]' >
                  <div>
                    <img className='max-h-[300px] m-auto' src={`${IMAGES_BASE_URL}${product.images[0]}`}/>
                  </div>
                  <div className='text-center pb-[20px]'>
                    <b className='block mb-[35px]'>{product.category} {product.brand}</b>
                    <b className='block mb-[10px]'>{productPrice.toLocaleString()} تومان</b>
                    <p>{product.model}</p><br/>
                    <Button className='rounded-full py-[10px] px-[10px] ml-[15px] bg-white text-black border border-black text-center' >مشاهده محصول</Button>
                    <Button className='rounded-full  py-[10px] px-[10px] bg-black text-white' >افزودن به سبد خرید</Button>
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
