import { GETLOGININFO } from '../action-type'

let initState = 0

export default function LoginReducer(preState = initState, action) {
  const { type, data } = action
  let newState
  switch (type) {
    case GETLOGININFO:
      newState = preState + data
      return newState
    default:
      return preState
  }
}
