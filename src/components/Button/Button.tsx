import React from 'react'

import { Spinner } from 'flowbite-react'

type props = {
  className: string,
  children: React.ReactNode,
  type? : any,
  onClick? : (event: any) => void,
  loading? : boolean,
  disabled? : any
}

export function Button ({ className, onClick, children, loading, type, disabled}: props) {

  return (
    <button className={className} disabled={disabled} type={type} onClick={onClick} >{loading ? <Spinner size="sm" /> : children}</button>
  )
}
