import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { adminLogin } from '@/api'
import { useNavigate } from 'react-router'

interface person{
  data: {
    username: string | number,
    password: string | number
  }
}

const adminLoginSchema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required()
  })
  .required()

export const useAdminLogin = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(adminLoginSchema),
    mode: 'onChange'
  })

  const adminLoginFormHandler = async (data: person) => {
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
      navigate('/management/store')
    } catch (error: any) {
      setLoading(false)
      if (error.response?.data?.message) return error.response.data.message
      return toast.error(error.message)
    }
  }

  return { handleSubmit, adminLoginFormHandler, register, errors, loading }
}
