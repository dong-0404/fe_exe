import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import { AuthBanner } from '../../shared/components/AuthBanner'
import { OTPVerification } from '../../features/auth/components'
import { authApi } from '../../features/auth/api/authApi'
import { UserRole } from '../../features/auth/types'
import { routes } from '../../config/routes'
import './AuthPage.css'

interface LocationState {
    email?: string
    phone?: string
    password?: string
    role?: UserRole
    message?: string
}

export const OTPVerificationPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const state = location.state as LocationState
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    // Redirect to register if missing required data
    useEffect(() => {
        if (!state?.email) {
            navigate(routes.register, { replace: true })
        }
    }, [state, navigate])

    const handleVerify = async (otp: string) => {
        setError(null)
        setSuccess(null)

        try {
            const response = await authApi.verifyOTP({
                email: state.email!,
                otp: otp,
            })

            if (response.success && response.data) {
                // API message: "Registration completed successfully. You can now login."
                setSuccess(response.message || 'Xác thực thành công! Đang chuyển đến trang điền thông tin...')

                // Store userId and role in localStorage for later use
                localStorage.setItem('userId', response.data.userId)
                localStorage.setItem('userRole', response.data.role.toString())

                // Use role from API response to determine profile page
                const userRole = response.data.role
                let profileRoute: string = routes.login

                switch (userRole) {
                    case UserRole.STUDENT:
                        profileRoute = routes.studentProfile
                        break
                    case UserRole.TUTOR:
                        // profileRoute = routes.tutorProfile // TODO: Create tutor profile page
                        profileRoute = routes.login // Temporary redirect to login
                        break
                    case UserRole.PARENT:
                        // profileRoute = routes.parentProfile // TODO: Create parent profile page
                        profileRoute = routes.login // Temporary redirect to login
                        break
                    default:
                        profileRoute = routes.login
                }

                // Redirect to profile page after 2 seconds
                setTimeout(() => {
                    navigate(profileRoute, {
                        replace: true,
                        state: {
                            userId: response.data?.userId,  // Use userId from API response
                            email: response.data?.email || state.email,
                            phone: state.phone,
                            role: response.data?.role
                        }
                    })
                }, 2000)
            } else {
                setError(response.errors || response.message || 'Mã OTP không chính xác. Vui lòng thử lại.')
            }
        } catch (err: unknown) {
            console.error('OTP verification error:', err)
            const error = err as { response?: { data?: { message?: string } }; message?: string }
            setError(
                error.response?.data?.message ||
                error.message ||
                'Đã có lỗi xảy ra. Vui lòng thử lại.'
            )
        }
    }

    const handleResend = async () => {
        setError(null)
        setSuccess(null)

        try {
            const response = await authApi.resendOTP(state.phone!)

            if (response.success) {
                setSuccess(response.data?.message || response.message || 'Đã gửi lại mã OTP. Vui lòng kiểm tra email.')
            } else {
                setError(response.errors || response.message || 'Không thể gửi lại mã OTP. Vui lòng thử lại.')
            }
        } catch (err: unknown) {
            console.error('Resend OTP error:', err)
            const error = err as { response?: { data?: { message?: string } }; message?: string }
            setError(
                error.response?.data?.message ||
                error.message ||
                'Đã có lỗi xảy ra. Vui lòng thử lại.'
            )
        }
    }

    if (!state?.phone) {
        return null
    }

    return (
        <div className="auth-page">
            <AuthBanner />
            <div style={{ flex: 1, position: 'relative' }}>
                {(error || success) && (
                    <div style={{
                        position: 'absolute',
                        top: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '90%',
                        maxWidth: '500px',
                        zIndex: 1000
                    }}>
                        {error && (
                            <Alert variant="danger" dismissible onClose={() => setError(null)}>
                                {error}
                            </Alert>
                        )}
                        {success && (
                            <Alert variant="success" dismissible onClose={() => setSuccess(null)}>
                                {success}
                            </Alert>
                        )}
                    </div>
                )}
                <OTPVerification
                    email={state.email}
                    onVerify={handleVerify}
                    onResend={handleResend}
                />
            </div>
        </div>
    )
}
