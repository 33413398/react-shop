import { combineReducers } from 'redux'
import loginInfoRecuder from './loginReducer'

export default combineReducers({
  logininfo: loginInfoRecuder,
})
