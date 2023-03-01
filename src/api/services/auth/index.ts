import { INSTANCE } from 'api/constants'

export const adminLogin = (data) => {
  return INSTANCE.post('/auth/login', data)
}

export const getProducts = () => {
  return INSTANCE.get('/products')
}

export const uploadImg = (data, config) => {
  return INSTANCE.post('/upload', data, config)
}
