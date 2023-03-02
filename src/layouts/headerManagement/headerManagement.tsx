import { Button } from '@/components'

import managementLogo from '../../assets/images/lab-logo3.png'
import { useRouter } from 'next/router'
import { ManagementRoutes } from '@/routes'
import Link from 'next/link'

export const HeaderManagement = () => {
  const router = useRouter()

  return (
    <div className='bg-white pt-3 px-10 pb-3 shadow-sm shadow-zinc-300' >
      <img className='w-32 float-right bg-none ml-4' src={managementLogo.src} alt='site logo' />
      <div className='bg-black rounded-full text-center w-4/6 m-auto p-1' >
        <p className='text-white' >پنل مدیریت فروشگاه</p>
      </div>
      <Button className={`float-left bg-[#CB4745] hover:text-white w-36 p-2 pt-1 pb-2 mt-[-32px] rounded-full`} onClick={() => router.push('/')} >بازگشت به سایت</Button>
        <div className='mt-4 w-2/5 m-auto text-center mb-2'>
          <ul className='flex justify-between text-center px-5' >
            {ManagementRoutes.map((route) => route.name && <li key={route.name} className='text-center' >
                <Link href={route.path} >{route.name}</Link>
              </li>)
            }
          </ul>
        </div>
    </div>
  )
}
