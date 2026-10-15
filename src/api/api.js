import { get, post, put, del } from '@/utils/request.js'
import request from '@/utils/request.js'

export const getapi = data => get('/url', data)
export const postapi = data => request.post('/url', data)
