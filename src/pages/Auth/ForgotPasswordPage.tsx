import { useState, useRef, useEffect } from 'react'
import type { KeyboardEvent } from 'react'
import { Form, Button, Alert, InputGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { AuthBanner } from '../../shared/components/AuthBanner'
import { authApi } from '../../features/auth/api/authApi'
import { routes } from '../../config/routes'
import { getErrorMessage } from '../../api/errorHandler'
import './AuthPage.css'
import '../../features/auth/components/OTPVerification/OTPVerification.css'

type Step = 'email' | 'otp' | 'password'

export const ForgotPasswordPage = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', ''])
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [timeLeft, setTimeLeft] = useState(180)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (step === 'otp') {
      setTimeLeft(180)
      setOtpDigits(['', '', '', ''])
      inputRefs.current[0]?.focus()
    }
  }, [step])

  useEffect(() => {
    if (step === 'password') {
      setError(null)
      setSuccess(null)
    }
  }, [step])

  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setInterval(() => setTimeLeft((p) => p - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await authApi.forgotPassword(email)
      setError(null)
      setStep('otp')
    } catch (err: unknown) {
      const errMsg = getErrorMessage(err) || ''
      const statusCode = (err as { response?: { status?: number } })?.response?.status
      // Nếu lỗi "Failed to send" hoặc 500: email có thể đã gửi → chuyển sang OTP
      if (
        statusCode === 500 ||
        errMsg.toLowerCase().includes('failed to send') ||
        errMsg.includes('password reset') ||
        errMsg.includes('Lỗi máy chủ')
      ) {
        setError(null)
        setStep('otp')
      } else {
        setError(errMsg || 'Không thể gửi mã OTP. Vui lòng thử lại.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
    setError(null)
    setLoading(true)
    try {
      await authApi.resendForgotPasswordOtp(email)
      setError(null)
      setOtpDigits(['', '', '', ''])
      setTimeLeft(180)
    } catch (err: unknown) {
      setError(getErrorMessage(err) || 'Không thể gửi lại mã OTP.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (otpDigits.some((d) => !d)) {
      setError('Vui lòng nhập đủ 4 số OTP.')
      return
    }
    setStep('password')
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const otpCode = otpDigits.join('')
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.')
      return
    }
    if (newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự.')
      return
    }
    setLoading(true)
    try {
      const res = await authApi.resetPassword({ email, otp: otpCode, newPassword })
      setError(null)
      setSuccess(res?.message || 'Đặt mật khẩu mới thành công! Đang chuyển đến trang đăng nhập...')
      setTimeout(() => {
        navigate(routes.login, { state: { message: 'Đặt mật khẩu thành công. Vui lòng đăng nhập.' } })
      }, 2000)
    } catch (err: unknown) {
      setError(getErrorMessage(err) || 'Không thể đặt mật khẩu. Vui lòng kiểm tra mã OTP.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <AuthBanner />
      {step === 'email' ? (
        <div className="forgot-password-form-container">
          <div className="forgot-password-form-wrapper">
            <h1 className="forgot-password-title">Quên mật khẩu</h1>
            <Form onSubmit={handleSendOtp}>
              <p className="forgot-password-description">
                Hãy nhập email của bạn vào bên dưới để bắt đầu quá trình khôi phục mật khẩu
              </p>
              {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
              <Form.Group className="mb-4">
                <Form.Label className="forgot-password-label">Email</Form.Label>
                <Form.Control
                  type="email"
                  className="forgot-password-input"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <div className="forgot-password-actions">
                <Button
                  variant="outline-primary"
                  className="forgot-password-btn-back"
                  onClick={() => navigate(routes.login)}
                  disabled={loading}
                >
                  Quay lại
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="forgot-password-btn-confirm"
                  disabled={loading}
                >
                  {loading ? 'Đang gửi...' : 'Xác nhận'}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      ) : step === 'otp' ? (
        <div className="otp-form-container">
          <div className="otp-form-wrapper">
            <h1 className="otp-title">Nhập mã OTP</h1>
            <p className="otp-description">
              Vui lòng nhập OTP vừa được gửi qua <strong>Email</strong> đến<br />
              <strong>{email}</strong>
              <br />
              <span className="otp-timer">
                (Mã OTP có thời hạn <strong>{formatTime(timeLeft)}</strong>)
              </span>
            </p>

            <Form onSubmit={handleVerifyOtp}>
              <div
                className="otp-inputs"
                onPaste={(e) => {
                  e.preventDefault()
                  const pasted = e.clipboardData.getData('text').slice(0, 4)
                  if (!/^\d+$/.test(pasted)) return
                  const arr = [...otpDigits]
                  pasted.split('').forEach((c, i) => { if (i < 4) arr[i] = c })
                  setOtpDigits(arr)
                  inputRefs.current[Math.min(pasted.length, 3)]?.focus()
                }}
              >
                {otpDigits.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el }}
                    type="text"
                    maxLength={1}
                    value={d}
                    onChange={(e) => {
                      const v = e.target.value
                      if (v && !/^\d$/.test(v)) return
                      const arr = [...otpDigits]
                      arr[i] = v
                      setOtpDigits(arr)
                      if (v && i < 3) inputRefs.current[i + 1]?.focus()
                    }}
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === 'Backspace' && !otpDigits[i] && i > 0) {
                        inputRefs.current[i - 1]?.focus()
                      }
                    }}
                    className="otp-input"
                    inputMode="numeric"
                    pattern="\d*"
                  />
                ))}
              </div>

              {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

              <div className="otp-actions">
                <Button
                  type="button"
                  variant="outline-primary"
                  className="otp-button otp-button-back"
                  onClick={() => setStep('email')}
                  disabled={loading}
                >
                  Quay lại
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="otp-button otp-button-submit"
                  disabled={loading || otpDigits.some((d) => !d)}
                >
                  Xác nhận
                </Button>
              </div>

              <div className="otp-resend">
                {timeLeft > 0 ? (
                  <span className="otp-resend-text">
                    Không nhận được mã?{' '}
                    <button type="button" className="otp-resend-link disabled" disabled>
                      Gửi lại ({formatTime(timeLeft)})
                    </button>
                  </span>
                ) : (
                  <span className="otp-resend-text">
                    Không nhận được mã?{' '}
                    <button
                      type="button"
                      className="otp-resend-link"
                      onClick={handleResendOtp}
                      disabled={loading}
                    >
                      Gửi lại ngay
                    </button>
                  </span>
                )}
              </div>
            </Form>
          </div>
        </div>
      ) : (
        <div className="forgot-password-form-container">
          <div className="forgot-password-form-wrapper new-password-form">
            <h1 className="forgot-password-title">Tạo mật khẩu mới</h1>

            <Form onSubmit={handleResetPassword}>
              <Form.Group className="mb-3">
                <Form.Label className="forgot-password-label">Mật Khẩu mới</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showNewPassword ? 'text' : 'password'}
                    className="forgot-password-input"
                    placeholder="Nhập mật khẩu của bạn"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="password-toggle"
                  >
                    {showNewPassword ? (
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
                <Form.Text className="password-requirement-note">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="me-1" style={{ verticalAlign: 'middle' }}>
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                  </svg>
                  Mật khẩu tối thiểu có 6 ký tự, có ít nhất 1 chữ số và 1 chữ cái
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="forgot-password-label">Nhập lại mật khẩu mới</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="forgot-password-input"
                    placeholder="Nhập lại mật khẩu của bạn"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="password-toggle"
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

              {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
              {success && <Alert variant="success" className="mb-3">{success}</Alert>}

              <div className="forgot-password-actions">
                <Button
                  type="button"
                  variant="outline-primary"
                  className="forgot-password-btn-back"
                  onClick={() => setStep('otp')}
                  disabled={loading}
                >
                  Quay lại
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="forgot-password-btn-confirm"
                  disabled={loading}
                >
                  {loading ? 'Đang xử lý...' : 'Xác nhận'}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </div>
  )
}
