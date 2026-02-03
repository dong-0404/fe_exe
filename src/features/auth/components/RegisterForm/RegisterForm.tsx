import { useState } from 'react'
import { Form, InputGroup, Button, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../../../config/routes'
import { authApi } from '../../api/authApi'
import { UserRole, RoleLabels } from '../../types'
import '../AuthForm.css'
import './RegisterForm.css'

export const RegisterForm = () => {
    const navigate = useNavigate()
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setRole] = useState<UserRole>(UserRole.STUDENT)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        // Validation
        // if (!fullName.trim()) {
        //     setError('Vui lòng nhập họ và tên')
        //     return
        // }

        if (!phoneNumber.trim()) {
            setError('Vui lòng nhập số điện thoại')
            return
        }

        // Phone validation (Vietnamese phone format)
        const phoneRegex = /^(0|\+84)[0-9]{9}$/
        if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
            setError('Số điện thoại không hợp lệ')
            return
        }

        if (!email.trim()) {
            setError('Vui lòng nhập email')
            return
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setError('Email không hợp lệ')
            return
        }

        if (!password) {
            setError('Vui lòng nhập mật khẩu')
            return
        }

        if (password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự')
            return
        }

        if (password !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp')
            return
        }

        try {
            setLoading(true)

            // Call register API
            const response = await authApi.register({
                email: email.trim(),
                phone: phoneNumber.trim().replace(/\s/g, ''),
                password: password, // Backend will hash this
                role: role,
            })

            if (response.success) {
                // Show success message briefly before navigating
                console.log('Registration successful:', response.message || response.data?.message)

                // Navigate to OTP verification page with all registration data
                navigate(routes.otpVerification, {
                    state: {
                        email: email.trim(),
                        phone: phoneNumber.trim().replace(/\s/g, ''),
                        password: password,
                        role: role,
                        message: response.message || response.data?.message
                    }
                })
            } else {
                setError(response.errors || response.message || 'Đăng ký thất bại. Vui lòng thử lại.')
            }
        } catch (err: unknown) {
            console.error('Registration error:', err)
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
        <div className="register-form-container">
            <div className="register-form-wrapper">
                <h1 className="register-title">Đăng Ký</h1>

                {error && (
                    <Alert variant="danger" dismissible onClose={() => setError(null)}>
                        {error}
                    </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                    {/* Full Name Input */}
                    {/* <Form.Group className="mb-3">
                        <Form.Label>Họ và tên</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập họ và tên"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            className="auth-input"
                            disabled={loading}
                        />
                    </Form.Group> */}

                    {/* Phone Number Input */}
                    <Form.Group className="mb-3">
                        <Form.Label>Số Điện Thoại</Form.Label>
                        <Form.Control
                            type="tel"
                            placeholder="Nhập số điện thoại của bạn"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            className="auth-input"
                            disabled={loading}
                        />
                    </Form.Group>

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

                    {/* Confirm Password Input */}
                    <Form.Group className="mb-3">
                        <Form.Label>Nhập lại mật khẩu</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Nhập mật khẩu của bạn"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="auth-input"
                                disabled={loading}
                            />
                            <Button
                                variant="outline-secondary"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="password-toggle"
                                disabled={loading}
                            >
                                {showConfirmPassword ? (
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

                    {/* Role Selection */}
                    <Form.Group className="mb-4">
                        <Form.Label>Vai trò</Form.Label>
                        <div className="role-selection">
                            <Form.Check
                                inline
                                type="radio"
                                id="role-student"
                                name="role"
                                label={RoleLabels[UserRole.STUDENT]}
                                value={UserRole.STUDENT}
                                checked={role === UserRole.STUDENT}
                                onChange={() => setRole(UserRole.STUDENT)}
                                className="role-radio"
                                disabled={loading}
                            />
                            <Form.Check
                                inline
                                type="radio"
                                id="role-parent"
                                name="role"
                                label={RoleLabels[UserRole.PARENT]}
                                value={UserRole.STUDENT}
                                checked={role === UserRole.PARENT}
                                onChange={() => setRole(UserRole.PARENT)}
                                className="role-radio"
                                disabled={loading}
                            />
                            <Form.Check
                                inline
                                type="radio"
                                id="role-tutor"
                                name="role"
                                label={RoleLabels[UserRole.TUTOR]}
                                value={UserRole.TUTOR}
                                checked={role === UserRole.TUTOR}
                                onChange={() => setRole(UserRole.TUTOR)}
                                className="role-radio"
                                disabled={loading}
                            />
                        </div>
                    </Form.Group>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="auth-button"
                        size="lg"
                        disabled={loading}
                    >
                        {loading ? 'Đang xử lý...' : 'Đăng ký'}
                    </Button>

                    {/* Login Link */}
                    <div className="auth-link">
                        Bạn đã có tài khoản?{' '}
                        <a
                            href={routes.login}
                            className="auth-link-text"
                            onClick={(e) => {
                                e.preventDefault()
                                navigate(routes.login)
                            }}
                        >
                            Đăng nhập ngay
                        </a>
                    </div>
                </Form>
            </div>
        </div>
    )
}
