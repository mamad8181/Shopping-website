import { Header } from "@/layouts";
import { ProductsScreen } from "@/screens";
import { useRouter } from "next/router";

import facePoster from "../../../assets/images/face-poster .jpg"

const FaceProducts = () => {
    const router = useRouter()

    const page: string | string[] | undefined = router.query.faceSections

    return(
        <>
            <Header/>
            <div className="relative">
                <img src={facePoster.src}/>
                <p className="absolute top-[100px] right-[560px] w-[400px] text-center text-[50px] font-bold text-white" >لوازم آرایشی صورت با بهترین کیفیت</p>
            </div>
            <ProductsScreen section={page} />
        </>
    )
}

export default FaceProducts;