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
// 删除商品图片
export const reqDelImage = name => MyAxios.post(`${BASE_URL}/manage/img/delete`, { name })
//添加商品
export const reqAddProduct = data => MyAxios.post(`${BASE_URL}/manage/product/add`, { ...data })
//修改商品
export const reqUploadProduct = data => MyAxios.post(`${BASE_URL}/manage/product/update`, { ...data })
// 获取角色列表
export const reqRoleList = () => MyAxios.get(`${BASE_URL}/manage/role/list`)
//添加角色
export const reqAddRole = roleName => MyAxios.post(`${BASE_URL}/manage/role/add`, { roleName })
//配置角色权限
export const reqPowerRole = dataobj => MyAxios.post(`${BASE_URL}/manage/role/update`, { ...dataobj, auth_time: Date.now() })
// 获取用户列表
export const reqUserList = () => MyAxios.get(`${BASE_URL}/manage/user/list`)
//添加用户
export const reqAddUser = Useronj => MyAxios.post(`${BASE_URL}/manage/user/add`, { ...Useronj })
//更新用户
export const reqModifyUser = Useronj => MyAxios.post(`${BASE_URL}/manage/user/update`, { ...Useronj })
//删除用户
export const reqDelUser = userId => MyAxios.post(`${BASE_URL}/manage/user/delete`, { userId })
