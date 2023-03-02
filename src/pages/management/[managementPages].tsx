import { HeaderManagement } from "@/layouts";
import { OrderManagement, ProductsManagement } from "@/screens";
import { useRouter } from "next/router";


const ManagementPages = () => {
    const router = useRouter()

    const page = router.query.managementPages

    return(
        <>
            {page == 'products' && [<HeaderManagement/>, <ProductsManagement/>]}
            {page == 'orders' && [<HeaderManagement/>, <OrderManagement/>]}
        </>
    )
}

export default ManagementPages;