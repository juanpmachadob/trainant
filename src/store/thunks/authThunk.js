import dayjs from 'dayjs'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/services/firebase'
import {
  loadAuthFinish,
  loadAuthStart,
  login,
  logout,
  verifyAuthFinish,
  verifyAuthStart
} from '@/store/slices/authSlice'

export const verifyAuthRequest = () => async (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    dispatch(verifyAuthStart())

    if (!user) {
      dispatch(logout())
      dispatch(verifyAuthFinish())
      return
    }

    const userRef = doc(db, 'users', user.uid)

    getDoc(userRef)
      .then((userDoc) => {
        const userData = {
          ...userDoc.data(),
          id: user.uid,
          email: user.email
        }

        dispatch(login(userData))
      })
      .catch((error) => console.error(error))
      .finally(() => dispatch(verifyAuthFinish()))
  })
}

export const loginWithEmailAndPasswordRequest = (user) => async (dispatch) => {
  dispatch(loadAuthStart())

  signInWithEmailAndPassword(auth, user.email, user.password)
    .catch((error) => console.error(error))
    .finally(() => dispatch(loadAuthFinish()))
}

export const registerWithEmailAndPasswordRequest =
  (user) => async (dispatch) => {
    dispatch(loadAuthStart())

    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((data) => {
        const userRef = doc(db, 'users', data.user.uid)
        const userData = {
          name: user.name,
          gender: user.gender,
          dateOfBirth: dayjs(user.dateOfBirth).toISOString(),
          email: user.email
        }
        return setDoc(userRef, userData)
      })
      .catch((error) => console.error(error))
      .finally(() => dispatch(loadAuthFinish()))
  }

export const logoutRequest = () => async (dispatch) => {
  dispatch(loadAuthStart())
  signOut(auth)
    .then(() => {
      dispatch(logout())
    })
    .catch((error) => console.error(error))
    .finally(() => dispatch(loadAuthFinish()))
}
