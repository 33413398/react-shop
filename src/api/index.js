/* 
包含n个接口请求函数的模块
函数的返回值是promise
*/
import MyAxios from './myAxios'
import { message } from 'antd'
import { BASE_URL } from '../config'

/* 登陆 */
export const reqLogin = ({ username, password }) => MyAxios.post(`${BASE_URL}/login`, { username, password })
