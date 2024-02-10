import {
  Navigate,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom'
import AuthenticatedRoute from '@/router/AuthenticatedRoute'
import UnauthenticatedRoute from '@/router/UnauthenticatedRoute'
import Login from '@/views/Auth/Login'

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <>
            <Route element={<UnauthenticatedRoute isAuthenticated={false} />}>
              <Route path="login" element={<Login />} />
            </Route>

            <Route element={<AuthenticatedRoute isAuthenticated={false} />}>
              <Route path="home" element={<div>Home</div>} />
            </Route>

            <Route path="" element={<Navigate to={'/login'} />} />
            <Route path="*" element={<Navigate to={'/login'} />} />
          </>
        </Route>
      </Routes>
    </Router>
  )
}
