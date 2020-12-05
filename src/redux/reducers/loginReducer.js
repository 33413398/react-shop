import { GET_LOGIN_INFO, DELETE_LOGIN_INFO } from '../action-type'
let user = JSON.parse(localStorage.getItem('user_key'))
let token = localStorage.getItem('token_key')
let initUserInfo = {
  token: token || '',
  user: user || {},
  isLogin: user && token ? true : false,
}

export default function LoginReducer(preState = initUserInfo, action) {
  const { type, data } = action
  let newState
  switch (type) {
    case GET_LOGIN_INFO:
      newState = { user: data.user, token: data.token, isLogin: true }
      return newState
    case DELETE_LOGIN_INFO:
      newState = { user: {}, token: '', isLogin: false }
      return newState
    default:
      return preState
  }
}
