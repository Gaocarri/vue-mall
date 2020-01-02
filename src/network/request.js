import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://123.307.43.42:8000/api',
    // 为避免接口暴露，此处是错误的地址
    timeout: 10000
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