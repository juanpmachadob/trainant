// #region Dependencies
import { combineReducers } from 'redux'
import auth from '@/store/slices/authSlice'
import exercises from '@/store/slices/exercisesSlice'
// #endregion Dependencies

const rootReducer = combineReducers({
  auth,
  exercises
})

export default rootReducer
