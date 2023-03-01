
import React from 'react'

interface myProps{
  className: string,
  type? : string
  placeholder? : string,
  label? : string,
  onChange? : () => void | string,
  value? : string | number,
  htmlFor? : string,
  error? : any,
  validation? : any,
  ref? : any
}

export const TextField = ({ label, onChange, ref, value, placeholder, className, htmlFor, error, validation }: myProps) => {

  return (
    <div>
        <label htmlFor={htmlFor}>{label}</label>
        <input onChange={onChange} ref={ref} value={value} id={htmlFor} placeholder={placeholder} className={className} {...validation} />
        {error && <p className="mt-2 text-sm text-red-500 dark:text-red-400">
            {error}
        </p>}
    </div>
  )
}
