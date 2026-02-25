import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../../features/auth/utils/authHelpers'
import { UserRole } from '../../features/auth/types'
import { routes } from '../../config/routes'
import { profileApi } from '../../features/profile/api/profileApi'

/**
 * ProfileRedirect component
 * Tự động điều hướng đến trang profile phù hợp dựa trên role của user
 * Nếu chưa có profile thì redirect đến trang setup
 */
export const ProfileRedirect = () => {
    const navigate = useNavigate()
    const currentUser = getCurrentUser()
    const [checking, setChecking] = useState(true)

    useEffect(() => {
        const checkAndRedirect = async () => {
            if (!currentUser) {
                // Nếu chưa đăng nhập, redirect về login
                navigate(routes.login, { replace: true })
                return
            }

            try {
                // Check if user has profile based on role
                switch (currentUser.role) {
                    case UserRole.STUDENT: {
                        try {
                            const response = await profileApi.getStudentProfile()
                            if (response.success && response.data) {
                                // Có profile rồi, redirect đến trang profile
                                navigate(routes.studentProfile, { replace: true })
                            } else {
                                // Chưa có profile, redirect đến trang setup
                                navigate(routes.setupStudent, { replace: true })
                            }
                        } catch {
                            // Lỗi hoặc chưa có profile, redirect đến setup
                            navigate(routes.setupStudent, { replace: true })
                        }
                        break
                    }
                    case UserRole.TUTOR: {
                        try {
                            const response = await profileApi.getTutorProfile(currentUser._id)
                            if (response.success && response.data) {
                                // Có profile rồi, redirect đến trang profile
                                navigate(routes.tutorProfile, { replace: true })
                            } else {
                                // Chưa có profile, redirect đến trang setup
                                navigate(routes.setupTutor, { replace: true })
                            }
                        } catch {
                            // Lỗi hoặc chưa có profile, redirect đến setup
                            navigate(routes.setupTutor, { replace: true })
                        }
                        break
                    }
                    case UserRole.PARENT: {
                        // TODO: Implement parent profile check when API is ready
                        navigate(routes.parentProfile, { replace: true })
                        break
                    }
                    default:
                        // Fallback về home nếu role không xác định
                        navigate(routes.home, { replace: true })
                }
            } finally {
                setChecking(false)
            }
        }

        checkAndRedirect()
    }, [currentUser, navigate])

    // Hiển thị loading trong lúc check và redirect
    if (checking) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <div className="text-center">
                    <div className="spinner-border text-primary mb-3" role="status">
                        <span className="visually-hidden">Đang tải...</span>
                    </div>
                    <p className="text-muted">Đang kiểm tra thông tin...</p>
                </div>
            </div>
        )
    }

    return null
}
