import axios from 'axios'
import { message } from 'antd'
import store from '../redux/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { deleteUserInfo } from '../redux/action/loginInfoAction'
import qs from 'querystring'
const instance = axios.create({
  timeout: 4000,
})

instance.interceptors.request.use(
  config => {
    NProgress.start()
    let { data, method } = config
    if (method.toLowerCase() === 'post') {
      if (data instanceof Object) {
        config.data = qs.stringify(data)
      }
    }
    // 如果有token , 添加到请求头中: Authorization
    const token = store.getState().userInfo.token
    if (token) {
      // config当前请求的配置
      config.headers['Authorization'] = 'atguigu_' + token
    }

    return config
  },
  error => {
    NProgress.start()
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    NProgress.done()
    return response.data
  },
  error => {
    NProgress.done()
    if (error.response.status === 401) {
      message.error('身份校验失败，请重新登录！', 1)
      // 分发一个删除用户信息的action
      store.dispatch(deleteUserInfo())
    } else {
      // 若请求失败，提示错误，这里可以处理所有异常
      message.error(error.message, 1)
    }
    return Promise.reject(error)
  }
)

export default instance
