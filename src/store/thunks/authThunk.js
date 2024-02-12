import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/services/firebase'
import { loadAuthFinish, loadAuthStart, login, logout, verifyAuthFinish, verifyAuthStart } from '@/store/slices/authSlice'

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
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
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
    .then(() => dispatch(verifyAuthRequest()))
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
