import { CATEGORY_LIST } from '../action-type'
let initProductList = []

export default function LoginReducer(preState = initProductList, action) {
  const { type, data } = action
  let newState
  switch (type) {
    case CATEGORY_LIST:
      newState = [...data] //深拷贝，可以避免一些错误
      return newState
    default:
      return preState
  }
}
