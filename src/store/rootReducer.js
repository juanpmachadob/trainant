// #region Dependencias
import { combineReducers } from 'redux'
import auth from '@/store/slices/authSlice'
// #endregion

const rootReducer = combineReducers({
  auth
})

export default rootReducer
