import request from '@/utils/request.js'

export const getapi = data => request.get('/url',{params:data})
export const postapi = data => request.post('/url',data)