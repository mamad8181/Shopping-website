
import React from 'react'

interface myProps{
  type: string
  className: string,
  placeholder? : string,
  label? : string,
  onChange? : () => string,
  value? : string | number,
  htmlFor? : string,
  error? : string
}

export const TextField = ({ label, onChange, value, placeholder, className, htmlFor, error }: myProps) => {

  return (
    <div>
        <label htmlFor={htmlFor}>{label}</label>
        <input onChange={onChange} value={value} id={htmlFor} placeholder={placeholder} className={className} />
        {error && <p className="mt-2 text-sm text-red-500 dark:text-red-400">
            {error}
        </p>}
    </div>
  )
}
