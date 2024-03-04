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
import Register from '@/views/Auth/Register'
import Home from '@/views/Home'
import Page404 from '@/views/Page404'
import RoutinesCreate from '@/views/Routines/RoutinesCreate'
import RoutinesEdit from '@/views/Routines/RoutinesEdit'
import RoutinesIndex from '@/views/Routines/RoutinesIndex'
import RoutinesShow from '@/views/Routines/RoutinesShow'
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
                  <Route path="register" element={<Register />} />
                </Route>

                <Route
                  element={<AuthenticatedRoute isAuthenticated={!!user.id} />}
                >
                  <Route path="home" element={<Home />} />
                  <Route path="routines" element={<RoutinesIndex />} />
                  <Route path="routines/:id" element={<RoutinesShow />} />
                  <Route path="routines/:id/edit" element={<RoutinesEdit />} />
                  <Route path="routines/create" element={<RoutinesCreate />} />
                </Route>

                <Route path="404" element={<Page404 />} />
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
