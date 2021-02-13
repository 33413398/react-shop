import { combineReducers } from 'redux'
import loginInfoRecuder from './loginReducer'
import ProductReducer from './ProductReducer'
import CATEGORYReducer from './CATEGORYReducer'

export default combineReducers({
  userInfo: loginInfoRecuder,
  productListData: ProductReducer,
  CategoryData: CATEGORYReducer,
})
