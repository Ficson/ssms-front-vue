import axios from 'axios'
import {getToken} from './auth'

const http = axios.create({
  baseURL: 'https://57c1c3b4-697a-49a8-8e5a-50b666795676.mock.pstmn.io/'
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 如果本次请求的不是 /login 接口，就加入请求头
  if (config.url !== '/login') {
    config.headers['Authorization'] = getToken()
  }

  // return config 就好比 next() 允许通过
  // 通过之后才要真正的发起请求
  return config
}, function (error) { // 当请求出错的时候会调用到第二个参数函数
  // Do something with request error
  return Promise.reject(error)
})

// 通过定义插件的配置来扩展 Vue 本身
const httpPlugin = {}

httpPlugin.install = function (Vue, options) {
  Vue.prototype.$http = http
}

export default httpPlugin

// Vue.use(httpPlugin)
