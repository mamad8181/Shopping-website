import React from 'react'

import { Spinner } from 'flowbite-react'

type props = {
  className: string,
  children: React.ReactNode,
  onClick? : () => void,
  loading? : boolean
}

export function Button ({ className, onClick, children, loading }: props) {

  return (
    <button className={className} onClick={onClick} >{loading ? <Spinner size="sm" /> : children}</button>
  )
}
