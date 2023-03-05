// import { getProducts } from 'api'
// import { useEffect, useState } from 'react'
import poster from '../../assets/images/Home-Poster.png'
export const HomeScreen = () => {
  // const [products, setProducts] = useState([])

  // useEffect(() => {
  //   const productsGetter = async () => {
  //     const response = await getProducts()
  //     console.log(response)
  //   }
  //   productsGetter()
  // }, [])

  return (
    <div>
        <img src={poster.src} />
    </div>
  )
}
