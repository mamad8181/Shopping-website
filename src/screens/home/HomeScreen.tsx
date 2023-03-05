import { getProducts, IMAGES_BASE_URL } from '@/api'
import { Button } from '@/components'
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

      for(let i: number= 0 ; tempProducts.length < 4 ; i += products.length / 4){
        tempProducts.push(products[i])
      }

      setExampleProducts([...tempProducts])
    }

    productsGetter()
  }, [])



  return (
    <div>
        <img src={poster.src} />
        <div className='px-[40px]' >
          <b className='block text-[48px] mb-[30px]' >برخی از محصولات</b>
          <div className='flex gap-[10px] mb-[80px]' >
            {exampleProducts.map((product: any) => {
              const productPrice: number = +product.price
              return(
                <div key={product.id} className='w-[25%] shadow-lg mt-[20px]' >
                  <div>
                    <img onMouseEnter={() => console.log('aaa')} src={`${IMAGES_BASE_URL}${product.images[0]}`}/>
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
              <b className='underline cursor-pointer' >جستوجو</b>
            </div>
            <div className='absolute bottom-[25px] right-[405px]'>
              <b className='text-[30px] block mb-[10px]'>ابرو</b>
              <b className='underline cursor-pointer'>جستوجو</b>
            </div>
            <div className='absolute bottom-[25px] left-[630px]'>
              <b className='text-[30px] block mb-[10px]'>چشم</b>
              <b className='underline cursor-pointer'>جستوجو</b>
            </div>
            <div className='absolute bottom-[25px] left-[305px]'>
              <b className='text-[30px] block mb-[10px]'>لب</b>
              <b className='underline cursor-pointer'>جستوجو</b>
            </div>
          </div>
        </div>
        <div>
          <img src={thirdPoster.src} className='w-full'/>
        </div>
    </div>
  )
}
