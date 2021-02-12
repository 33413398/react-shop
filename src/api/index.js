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
// 获取商品分页列表
export const reqProductList = (pageNum, pageSize) => MyAxios.get(`${BASE_URL}/manage/product/list`, { params: { pageNum, pageSize } })
// 根据Name/desc搜索产品分页列表
export const reqSearchProduct = (pageNum, pageSize, searchType, keyWord) => MyAxios.get(`${BASE_URL}/manage/product/search`, { params: { pageNum, pageSize, [searchType]: keyWord } }) //中括号内写的就是关键词变量
// 对商品进行上架/下架处理
export const reqUpdateStatus = (productId, status) => MyAxios.post(`${BASE_URL}/manage/product/updateStatus`, { productId, status })
// 根据商品ID获取商品
export const reqProductDetails = productId => MyAxios.get(`${BASE_URL}/manage/product/info`, { params: { productId } }) //中括号内写的就是关键词变量
