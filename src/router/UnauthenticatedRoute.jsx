import { Navigate, Outlet } from 'react-router-dom'

/**
 * Route that checks if the user is not authenticated
 */
const UnauthenticatedRoute = ({ isAuthenticated }) => {
  if (isAuthenticated) return <Navigate to="/home" />
  return <Outlet />
}

export default UnauthenticatedRoute
