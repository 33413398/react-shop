import { PRODUCT_lIST, CATEGORY_LIST } from '../action-type'
let initProductList = []

export default function LoginReducer(preState = initProductList, action) {
  const { type, data } = action
  let newState
  switch (type) {
    case PRODUCT_lIST:
      newState = data
      return newState
    case CATEGORY_LIST:
      newState = data
      return newState
    default:
      return preState
  }
}
