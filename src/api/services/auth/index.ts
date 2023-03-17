import { INSTANCE } from '../../constants/index'

export const Login = (data: any) => {
  return INSTANCE.post('/auth/login', data)
}

export const getProducts = () => {
  return INSTANCE.get('/products')
}

export const postProduct = (data: any) => {
  return INSTANCE.post('/products', data)
}

export const deleteProduct = (id: any, config: any) => {
  return INSTANCE.delete(`/products/${id}`, config)
}

export const editProduct = (id: any, data: any, config: any) => {
  return INSTANCE.put(`/products/${id}`, data, config)
}

export const getOrders = () => {
  return INSTANCE.get('/orders')
}

export const uploadImg = (data: any, config: any) => {
  return INSTANCE.post('/upload', data, config)
}
