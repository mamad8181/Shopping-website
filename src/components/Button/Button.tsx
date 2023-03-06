import React from 'react'

import { Spinner } from 'flowbite-react'

type props = {
  className: string,
  children: React.ReactNode,
  type? : any,
  onClick? : () => void,
  loading? : boolean
}

export function Button ({ className, onClick, children, loading, type }: props) {

  return (
    <button className={className} type={type} onClick={onClick} >{loading ? <Spinner size="sm" /> : children}</button>
  )
}
