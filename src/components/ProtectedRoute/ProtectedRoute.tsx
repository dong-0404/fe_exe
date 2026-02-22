import { Navigate, useLocation } from 'react-router-dom'
import { routes } from '../../config/routes'
import { isAuthenticated } from '../../features/auth/utils/authHelpers'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation()
  
  // Check if user is authenticated using the same helper as auth system
  if (!isAuthenticated()) {
    // Redirect to login page, save the attempted location
    return <Navigate to={routes.login} state={{ from: location }} replace />
  }

  return <>{children}</>
}
