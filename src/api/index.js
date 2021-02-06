/* 
包含n个接口请求函数的模块
函数的返回值是promise
*/
import MyAxios from './myAxios'
// import { message } from 'antd'
import { BASE_URL } from '../config'

/* 登陆 */
export const reqLogin = (username, password) => MyAxios.post(`${BASE_URL}/login`, { username, password })
// 分类管理列表
export const reqCategory = () => MyAxios.get(`${BASE_URL}/manage/category/list`)
// 分类管理列表新增
export const reqAddCategory = categoryName => MyAxios.post(`${BASE_URL}/manage/category/add`, { categoryName })
// 分类管理列表修改
export const reqPutCategory = (categoryId, categoryName) => MyAxios.post(`${BASE_URL}/manage/category/update`, { categoryId, categoryName })
