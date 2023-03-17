
import { Button, TextField } from '@/components'
import { SubmitHandler } from 'react-hook-form/dist/types'
import { useUserLogin } from './useUserLogin'
import 'tailwindcss/tailwind.css'


export const UserLoginScreen = () => {
  const { handleSubmit, userLoginFormHandler, register, errors, loading } = useUserLogin()

  const submitHandler = (value: any) => {
    userLoginFormHandler({username: value.username, password: value.password})
  }

  return (
    <div className='py-16' >
        <form className='w-2/6 border-2 m-auto' onSubmit={handleSubmit(submitHandler)}>
            <div className='border-b-4 py-3 border-black text-center w-full' >
                <b className='text-xl' >ورود</b>
            </div>
            <div className='px-10 py-12' >
            <div>
              <TextField error={errors.username?.message} label='نام کاربری:' className='border-2 p-3 outline-none mb-0 block w-full' placeholder='*نام کاربری را وارد کنید' validation={{ ...register('username') }} />
            </div>
            <div className='mt-2' >
              <TextField error={errors.password?.message} label='رمز عبور:' className='border-2 p-3 outline-none mb-0 block w-full' placeholder='*رمز عبور را وارد کنید' validation={{ ...register('password') }} />
            </div>
            <a href='*' className='mb-1 mt-5 w-48 border-b-2 border-black block hover:text-gray-500' >رمز عبور را فراموش کرده اید؟</a>
            <a href='*' className='hover:text-gray-500 border-b-2 border-black'>تغییر نام کاربری</a>
            <Button className='bg-black text-white rounded-full w-full mt-7 p-[12px]' loading={loading} ><p>ورود</p></Button>
            </div>
        </form>
    </div>
  )
}
