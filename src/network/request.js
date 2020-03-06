import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://123.207', // 此处为暴露接口，使用的是错误的url
    timeout: 10000
  })

  // 拦截请求
  instance.interceptors.request.use(config => {
    // 添加要做的事情
    return config
  }, err => { })

  //拦截响应
  instance.interceptors.response.use(res => {
    // 添加要做的事情
    return res.data
  }, err => {
    console.log(err)
  })

  return instance(config)
}