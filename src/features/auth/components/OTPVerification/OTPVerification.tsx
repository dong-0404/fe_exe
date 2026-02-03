import { useState, useRef, useEffect } from 'react'
import type { KeyboardEvent } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './OTPVerification.css'

interface OTPVerificationProps {
    email?: string
    onVerify?: (otp: string) => void
    onResend?: () => void
}

export const OTPVerification: React.FC<OTPVerificationProps> = ({
    email = 'user@example.com',
    onVerify,
    onResend
}) => {
    const navigate = useNavigate()
    const [otp, setOtp] = useState<string[]>(['', '', '', ''])
    const [timeLeft, setTimeLeft] = useState(180) // 3 minutes = 180 seconds
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    // Countdown timer
    useEffect(() => {
        if (timeLeft <= 0) return

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [timeLeft])

    // Format time as MM:SS
    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    const handleChange = (index: number, value: string) => {
        // Only allow numbers
        if (value && !/^\d$/.test(value)) return

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        // Auto focus to next input
        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        // Handle backspace
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text').slice(0, 4)

        if (!/^\d+$/.test(pastedData)) return

        const newOtp = [...otp]
        pastedData.split('').forEach((char, index) => {
            if (index < 4) {
                newOtp[index] = char
            }
        })
        setOtp(newOtp)

        // Focus last filled input or last input
        const lastIndex = Math.min(pastedData.length, 3)
        inputRefs.current[lastIndex]?.focus()
    }

    const handleSubmit = () => {
        const otpCode = otp.join('')
        if (otpCode.length === 4) {
            onVerify?.(otpCode)
            // Navigate to login after successful verification
            // navigate('/login')
        }
    }

    const handleResend = () => {
        setTimeLeft(180) // Reset timer
        setOtp(['', '', '', '']) // Clear OTP
        inputRefs.current[0]?.focus() // Focus first input
        onResend?.()
    }

    const handleBack = () => {
        navigate(-1) // Go back to previous page
    }

    // Auto focus first input on mount
    useEffect(() => {
        inputRefs.current[0]?.focus()
    }, [])

    const isOtpComplete = otp.every(digit => digit !== '')

    return (
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

                <div className="otp-inputs" onPaste={handlePaste}>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => {
                                inputRefs.current[index] = el
                            }}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="otp-input"
                            inputMode="numeric"
                            pattern="\d*"
                        />
                    ))}
                </div>

                <div className="otp-actions">
                    <Button
                        variant="outline-primary"
                        className="otp-button otp-button-back"
                        onClick={handleBack}
                    >
                        Quay lại
                    </Button>
                    <Button
                        variant="primary"
                        className="otp-button otp-button-submit"
                        onClick={handleSubmit}
                        disabled={!isOtpComplete}
                    >
                        Xác nhận
                    </Button>
                </div>

                <div className="otp-resend">
                    {timeLeft > 0 ? (
                        <span className="otp-resend-text">
                            Không nhận được mã?{' '}
                            <button
                                className="otp-resend-link disabled"
                                disabled
                            >
                                Gửi lại ({formatTime(timeLeft)})
                            </button>
                        </span>
                    ) : (
                        <span className="otp-resend-text">
                            Không nhận được mã?{' '}
                            <button
                                className="otp-resend-link"
                                onClick={handleResend}
                            >
                                Gửi lại ngay
                            </button>
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

