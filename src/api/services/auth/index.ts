import { INSTANCE } from '../../constants/index'

export const adminLogin = (data: any) => {
  return INSTANCE.post('/auth/login', data)
}

export const getProducts = () => {
  return INSTANCE.get('/products')
}

export const uploadImg = (data: any, config: any) => {
  return INSTANCE.post('/upload', data, config)
}
