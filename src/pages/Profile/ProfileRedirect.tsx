import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../../features/auth/utils/authHelpers'
import { UserRole } from '../../features/auth/types'
import { routes } from '../../config/routes'

/**
 * ProfileRedirect component
 * Tự động điều hướng đến trang profile phù hợp dựa trên role của user
 */
export const ProfileRedirect = () => {
    const navigate = useNavigate()
    const currentUser = getCurrentUser()

    useEffect(() => {
        if (!currentUser) {
            // Nếu chưa đăng nhập, redirect về login
            navigate(routes.login, { replace: true })
            return
        }

        // Redirect dựa trên role
        switch (currentUser.role) {
            case UserRole.STUDENT:
                navigate(routes.studentProfile, { replace: true })
                break
            case UserRole.TUTOR:
                navigate(routes.tutorProfile, { replace: true })
                break
            case UserRole.PARENT:
                navigate(routes.parentProfile, { replace: true })
                break
            default:
                // Fallback về home nếu role không xác định
                navigate(routes.home, { replace: true })
        }
    }, [currentUser, navigate])

    // Hiển thị loading trong lúc redirect
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <div className="text-center">
                <div className="spinner-border text-primary mb-3" role="status">
                    <span className="visually-hidden">Đang tải...</span>
                </div>
                <p className="text-muted">Đang chuyển hướng...</p>
            </div>
        </div>
    )
}
