/*
 * @Description:
 * @Author: caixg
 * @Date: 2021-01-27 11:05:37
 * @LastEditors: leslie-choi
 * @LastEditTime: 2021-01-31 10:38:00
 */
import axios from 'axios'
import { Message } from 'element-ui'

import { getToken } from '@/utils/auth'

const request = axios.create({
  timeout: 30000,
  // withCredentials: true,
  xsrfHeaderName: 'x-csrf-token',
  headers: {
    'Content-Type': 'application/json'
  }
})

// 拦截器
request.interceptors.request.use(config => {
  // NProgress.start()
  config.headers.Authorization = getToken('Authorization')
  // 在最后必须 return config
  return config
})

request.interceptors.response.use(res => {
  // TODO 判断失效状态
  // if (res.data.state !== 200) {
  //   Message({
  //     type: 'error',
  //     message: '重新登录'
  //   })
  //   window.location.href = '/login'
  // }
  if (res.data.state === 200 && res.config.method === 'post') {
    Message({
      type: 'success',
      message: res.data.message
    })
  }
  return res
})

export default request
