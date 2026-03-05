import { Navigate, useLocation } from 'react-router-dom'
import { routes } from '../../config/routes'
import { isAuthenticated } from '../../features/auth/utils/authHelpers'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: number[]
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const location = useLocation()

  // Check if user is authenticated using the same helper as auth system
  if (!isAuthenticated()) {
    // Redirect to login page, save the attempted location
    return <Navigate to={routes.login} state={{ from: location }} replace />
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const currentRole = Number(localStorage.getItem('userRole'))
    if (!allowedRoles.includes(currentRole)) {
      return <Navigate to={routes.home} replace />
    }
  }

  return <>{children}</>
}
