import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Login } from '../../../api'
import { useRouter } from 'next/router'

const userLoginSchema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required()
  })
  .required()

export const useUserLogin = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(userLoginSchema),
    mode: 'onChange'
  })

  const userLoginFormHandler = async (data: {username: string, password: string | number}) => {
    setLoading(true)
    try {
      const response = await Login(data)
      toast.success(response.data.message)
      localStorage.setItem(
        'userAccessToken', response.data.accessToken
      )
      localStorage.setItem(
        'userRefreshToken', response.data.refreshToken
      )
      setLoading(false)
      router.push('/management')
    } catch (error: any) {
      setLoading(false)
      if (error.response?.data?.message) return error.response.data.message
      return toast.error(error.message)
    }
  }

  return { handleSubmit, userLoginFormHandler, getValues, register, errors, loading }
}
