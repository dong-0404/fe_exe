import { useState } from 'react'
import { Form, InputGroup, Button, Alert } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'
import { authApi } from '../../api/authApi'
import { routes } from '../../../../config/routes'
import { saveAuthData, getRedirectPath } from '../../utils/authHelpers'
import '../AuthForm.css'
import './LoginForm.css'

interface LocationState {
    message?: string
    from?: { pathname: string }
}

export const LoginForm = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const state = location.state as LocationState

    // Load saved email if remember me was checked
    const savedEmail = localStorage.getItem('savedEmail') || ''
    const wasRemembered = localStorage.getItem('rememberMe') === 'true'

    const [email, setEmail] = useState(savedEmail)
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(wasRemembered)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [successMessage] = useState<string | null>(state?.message || null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        // Basic validation
        if (!email.trim()) {
            setError('Vui lòng nhập email')
            return
        }

        if (!password) {
            setError('Vui lòng nhập mật khẩu')
            return
        }

        try {
            setLoading(true)

            const response = await authApi.login({
                email: email.trim(),
                password: password,
            })

            if (response.success && response.data) {
                // Cast user data với đúng type
                const userData = {
                    ...response.data.user,
                    role: response.data.user.role as 1 | 2 | 3
                }

                // Lưu thông tin authentication
                saveAuthData(
                    response.data.token,
                    userData,
                    response.data.profileCompleted,
                    response.data.profile
                )

                // Remember me
                if (rememberMe) {
                    localStorage.setItem('rememberMe', 'true')
                    localStorage.setItem('savedEmail', email.trim())
                } else {
                    localStorage.removeItem('rememberMe')
                    localStorage.removeItem('savedEmail')
                }

                // Redirect về trang user đang cố truy cập, hoặc dựa trên role
                const from = state?.from?.pathname
                const redirectPath = from || getRedirectPath(
                    response.data.user.role,
                    response.data.profileCompleted
                )
                navigate(redirectPath, { replace: true })
            } else {
                setError(response.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.')
            }
        } catch (err: unknown) {
            console.error('Login error:', err)
            const error = err as { response?: { data?: { message?: string } }; message?: string }
            setError(
                error.response?.data?.message ||
                error.message ||
                'Đã có lỗi xảy ra. Vui lòng thử lại.'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login-form-container">
            <div className="login-form-wrapper">
                <h1 className="login-title">Đăng nhập</h1>

                {successMessage && (
                    <Alert variant="success" dismissible>
                        {successMessage}
                    </Alert>
                )}

                {error && (
                    <Alert variant="danger" dismissible onClose={() => setError(null)}>
                        {error}
                    </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Nhập email của bạn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="auth-input"
                            disabled={loading}
                        />
                    </Form.Group>

                    {/* Password Input */}
                    <Form.Group className="mb-3">
                        <Form.Label>Mật Khẩu</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Nhập mật khẩu của bạn"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="auth-input"
                                disabled={loading}
                            />
                            <Button
                                variant="outline-secondary"
                                onClick={() => setShowPassword(!showPassword)}
                                className="password-toggle"
                                disabled={loading}
                            >
                                {showPassword ? (
                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                                    </svg>
                                ) : (
                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                    </svg>
                                )}
                            </Button>
                        </InputGroup>
                    </Form.Group>

                    {/* Remember Me & Forgot Password */}
                    <div className="login-options">
                        <Form.Check
                            type="checkbox"
                            id="rememberMe"
                            label="Ghi nhớ tôi ?"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="remember-me"
                        />
                        <a href="/forgot-password" className="forgot-password">
                            Quên mật khẩu?
                        </a>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="auth-button"
                        size="lg"
                        disabled={loading}
                    >
                        {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                    </Button>

                    {/* Sign Up Link */}
                    <div className="auth-link">
                        Bạn chưa có tài khoản?{' '}
                        <a
                            href={routes.register}
                            className="auth-link-text"
                            onClick={(e) => {
                                e.preventDefault()
                                navigate(routes.register)
                            }}
                        >
                            Đăng ký ngay
                        </a>
                    </div>
                </Form>
            </div>
        </div>
    )
}

