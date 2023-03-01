import axios from 'axios'

export const BASE_URL = 'http://localhost:3002/'

export const IMAGES_BASE_URL = 'http://localhost:3002/files/'

export const INSTANCE = axios.create({
  baseURL: BASE_URL,
  timeout: 25000
})
