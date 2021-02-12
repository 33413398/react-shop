import { PRODUCT_lIST } from '../action-type'

export const getProductList = value => {
  return { type: PRODUCT_lIST, data: value }
}
