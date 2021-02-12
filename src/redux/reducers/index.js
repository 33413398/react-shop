import { combineReducers } from 'redux'
import loginInfoRecuder from './loginReducer'
import ProductReducer from './ProductReducer'

export default combineReducers({
  userInfo: loginInfoRecuder,
  productListData: ProductReducer,
})
