import { Header } from "@/layouts";
import { ProductDetails } from "@/screens";
import { useRouter } from "next/router";



const ProductsPages = () => {
    const router = useRouter()

    const page: string | string[] | undefined = router.query.productsPages

    return(
        <>
            <Header/>
            <ProductDetails productID={page} />
        </>
    )
}

export default ProductsPages;