import { postOrder } from '@/api'
import { Button, SucssesPayment } from '@/components'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import paymentImg from '../../assets/images/payment.png'

export const PaymentScreen = () => {
    const [sucssesModal, setSucssesModal] = useState<boolean>(false)
    const subtotal = useSelector((state: any) => state.counter.subtotal)
    const data = useSelector((state: any) => state.counter.order)
    const router = useRouter()

    const orderPoster = async () => {
        const response = await postOrder(data)
        if(response.status == 201){
            setSucssesModal(true)
        }
    }

    return(
        <div className='relative'>
            <img className='' width='100%' src={paymentImg.src}/>
            <Button onClick={orderPoster} className='absolute rounded-full py-[10px] w-[240px] top-[540px] right-[450px] bg-green-400 text-white' >پرداخت</Button>
            <Button onClick={() => router.push('/order')} className='absolute rounded-full py-[10px] w-[100px] top-[540px] right-[695px] bg-yellow-300 text-white' >انصراف</Button>
            <div className="absolute bg-white text-green-400 py-[10px] flex justify-between text-[18px] w-[330px] top-[540px] right-[965px]" >
                <p className="font-bold" >مبلغ قابل پرداخت:</p>
                <p className="font-bold">{subtotal.toLocaleString()} تومان</p>
            </div>
            {sucssesModal && <SucssesPayment/>}
        </div>
    )
}