import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { adminLogin } from '../../../api'
import { useRouter } from 'next/router'

const adminLoginSchema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required()
  })
  .required()

export const useAdminLogin = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(adminLoginSchema),
    mode: 'onChange'
  })

  const adminLoginFormHandler = async (data: {username: string, password: string | number}) => {
    setLoading(true)
    try {
      const response = await adminLogin(data)
      toast.success(response.data.message)
      localStorage.setItem(
        'accessToken', response.data.accessToken
      )
      localStorage.setItem(
        'refreshToken', response.data.refreshToken
      )
      setLoading(false)
      router.push('/management')
    } catch (error: any) {
      setLoading(false)
      if (error.response?.data?.message) return error.response.data.message
      return toast.error(error.message)
    }
  }

  return { handleSubmit, adminLoginFormHandler, getValues, register, errors, loading }
}
