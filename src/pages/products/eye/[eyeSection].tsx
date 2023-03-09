import { Header } from "@/layouts";
import { ProductsScreen } from "@/screens";
import { useRouter } from "next/router";

import eyePoster from "../../../assets/images/eye-poster.png"

const EyeProducts = () => {
    const router = useRouter()

    const page: string | string[] | undefined = router.query.eyeSection

    return(
        <>
            <Header/>
            <div className="relative">
                <img src={eyePoster.src}/>
                <p className="absolute top-[150px] right-[320px] w-[900px] text-center text-[65px] font-bold text-white" >لوازم آرایشی چشم با بهترین کیفیت</p>
            </div>
            <ProductsScreen section={page} />
        </>
    )
}

export default EyeProducts;