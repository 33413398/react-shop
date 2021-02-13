import { PRODUCT_lIST, CATEGORY_LIST } from '../action-type'

export const getProductList = value => {
  return { type: PRODUCT_lIST, data: value }
}
export const getCategoryList = value => {
  return { type: CATEGORY_LIST, data: value }
}
