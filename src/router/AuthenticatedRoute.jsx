import { Navigate, Outlet } from 'react-router-dom'

/**
 * Route that checks if the user is authenticated
 *
 * @param {boolean} isAuthenticated - Value that indicates if the user is authenticated
 */
const AuthenticatedRoute = ({ isAuthenticated }) => {
  if (!isAuthenticated) return <Navigate to="/login" />
  return <Outlet />
}

export default AuthenticatedRoute
