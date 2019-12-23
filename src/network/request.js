import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/v2',
    // 备用服务器
    // baseURL:'http://106.54.54.237:8000/api/v1' 
    timeout: 5000
  })

  // 拦截请求
  instance.interceptors.request.use(config => {
    // 添加要做的事情
    return config
  }, err => {})

  //拦截响应
  instance.interceptors.response.use(res => {
    // 添加要做的事情
    return res.data
  }, err => {
    console.log(err)
  })

  return instance(config)
}