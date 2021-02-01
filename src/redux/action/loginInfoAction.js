import { GET_LOGIN_INFO, DELETE_LOGIN_INFO } from '../action-type'
import jsonp from 'jsonp'
import { message } from 'antd'

export const getLoginInfo = value => {
  let { user, token } = value
  // 将user和token保存local中
  localStorage.setItem('user_key', JSON.stringify(user))
  localStorage.setItem('token_key', token)
  return { type: GET_LOGIN_INFO, data: value }
}
export const deleteUserInfo = value => {
  localStorage.removeItem('user_key')
  localStorage.removeItem('token_key')
  return { type: DELETE_LOGIN_INFO, data: value }
}

export const reqWeather = () => {
  return new Promise((resolve, reject) => {
    const url = `https://tianqiapi.com/api?version=v1&appid=27674338&appsecret=2REbl6Uv`
    // callback函数由jsonp库内部定义__jp0函数调用的 --> callback参数来告诉服务器返回的js代码: __jp(data)
    jsonp(url, {}, (err, data) => {
      if (!err && data) {
        resolve(data)
      } else {
        // reject(new Error('获取天气失败!'))
        message.error('获取天气失败!')
        return new Promise(() => {})
      }
    })
  })
}
