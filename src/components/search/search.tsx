import { TextField } from "../index"



interface myProps{
  className: string,
  onChange? : () => string,
  ref? : any
}

export const Search = ({ className, onChange, ref }: myProps) => {
  return (
    <div className={className}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="absolute m-1.5 ml-[110px] bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
        <TextField type="text" ref={ref} onChange={onChange} className='w-4/5 text-base outline-none float-left bg-transparent' placeholder='جستوجو' />
    </div>
  )
}
