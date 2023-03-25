import React from "react"

interface props {
  className? : string
}

export const HeaderLabel = (props: props) => {
  return (
        <div className={`bg-black rounded-full text-center w-4/6 m-auto p-1 ${props.className}`} >
            <p className='text-white' >ارسال رایگان!به ازای خرید بالای 800 هزار تومان</p>
        </div>
  )
}
