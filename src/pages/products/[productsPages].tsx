import { Header } from "@/layouts";
import { ProductDetails, ProductsScreen } from "@/screens";
import { useRouter } from "next/router";



const ProductsPages = () => {
    const router = useRouter()

    const page: string | string[] | undefined = router.query.managementPages

    return(
        <>
            <Header/>
            <ProductDetails section={page} />
        </>
    )
}

export default ProductsPages;