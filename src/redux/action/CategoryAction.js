import { CATEGORY_LIST } from '../action-type'

export const getCategoryList = value => {
  return { type: CATEGORY_LIST, data: value }
}
