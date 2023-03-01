import { HeaderLabel, Search } from '@/components'
import React from 'react'


import classes from './Header.module.css'

import logo from '../../assets/images/lab-logo3.png'
import { WebRoutes } from '@/routes'
import Link from 'next/link'
import Image from 'next/image'


export const Header = () => {


  return (
    <div className='bg-white pt-3 px-10 pb-3' >
      <img className='w-32 float-right bg-none ml-4' src={logo.src} alt='site logo' />
      <HeaderLabel/>
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className={`${classes.home_bag_icon} float-left bi bi-handbag cursor-pointer`} viewBox="0 0 16 16">
        <path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2zm3 4V3a3 3 0 1 0-6 0v2H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11zm-1 1v1.5a.5.5 0 0 0 1 0V6h1.639a.5.5 0 0 1 .494.426l1.028 6.851A1.5 1.5 0 0 1 12.678 15H3.322a1.5 1.5 0 0 1-1.483-1.723l1.028-6.851A.5.5 0 0 1 3.36 6H5v1.5a.5.5 0 1 0 1 0V6h4z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className={`${classes.home_user_icon} float-left bi bi-person cursor-pointer`} viewBox="0 0 16 16">
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
      </svg>
      <Search className={`${classes.home_search_box} float-left bg-gray-100 w-36 p-2 pt-1 pb-2 rounded-full`} />
        <div className='mt-4 w-1/2 m-auto mb-2'>
          <ul className='flex gap-10 justify-between px-5' >
            {WebRoutes.map((route) =><li key={route.name} >
                <Link href={route.path} >{route.name}</Link>
              </li>)
            }
          </ul>
        </div>
    </div>
  )
}
