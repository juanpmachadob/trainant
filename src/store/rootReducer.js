// #region Dependencies
import { combineReducers } from 'redux'
import auth from '@/store/slices/authSlice'
import exercises from '@/store/slices/exercisesSlice'
import routines from '@/store/slices/routinesSlice'
// #endregion Dependencies

const rootReducer = combineReducers({
  auth,
  routines,
  exercises
})

export default rootReducer
