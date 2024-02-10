import { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Navigate,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom'
import AuthenticatedRoute from '@/router/AuthenticatedRoute'
import UnauthenticatedRoute from '@/router/UnauthenticatedRoute'
import { verifyAuthRequest } from '@/store/thunks/authThunk'
import Login from '@/views/Auth/Login'
import Loader from '@/components/Loader'

export const AppRouter = () => {
  const dispatch = useDispatch()
  const { verifying, user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(verifyAuthRequest())
  }, [dispatch])

  if (!verifying) {
    return (
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Outlet />}>
              <>
                <Route
                  element={<UnauthenticatedRoute isAuthenticated={!!user.id} />}
                >
                  <Route path="login" element={<Login />} />
                </Route>

                <Route element={<AuthenticatedRoute isAuthenticated={!!user.id} />}>
                  <Route path="home" element={<div>Home</div>} />
                </Route>

                <Route path="" element={<Navigate to={'/login'} />} />
                <Route path="*" element={<Navigate to={'/login'} />} />
              </>
            </Route>
          </Routes>
        </Suspense>
      </Router>
    )
  }
}
