import { useState, useEffect } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'
import { routes } from '../../../../config/routes'
import { profileApi } from '../../api'
import './StudentProfileForm.css'

interface LocationState {
    userId?: string
    email?: string
    phone?: string
    role?: number
    message?: string
}

export const StudentProfileForm = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const state = location.state as LocationState

    const [fullName, setFullName] = useState('')
    const [grade, setGrade] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [gender, setGender] = useState<number>(1) // 1 for Male, 2 for Female
    const [school, setSchool] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [infoMessage] = useState<string | null>(state?.message || null)

    // Redirect if no userId or email
    useEffect(() => {
        if (!state?.userId && !state?.email) {
            navigate(routes.register, { replace: true })
        }
    }, [state, navigate])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        // Validation
        if (!fullName.trim()) {
            setError('Vui lòng nhập họ và tên')
            return
        }

        if (!grade.trim()) {
            setError('Vui lòng nhập lớp học')
            return
        }

        if (!birthDate) {
            setError('Vui lòng chọn ngày sinh')
            return
        }

        if (!school.trim()) {
            setError('Vui lòng nhập trường học')
            return
        }

        if (!state?.userId) {
            setError('Không tìm thấy userId. Vui lòng thử lại.')
            return
        }

        try {
            setLoading(true)

            // Call API to create student profile
            const response = await profileApi.createStudentProfile({
                userId: state.userId,
                fullName: fullName.trim(),
                dateOfBirth: birthDate, // Format: YYYY-MM-DD
                gender: gender,
                grade: grade.trim(),
                school: school.trim(),
                parentId: undefined, // Optional
            })

            if (response.success) {
                // Navigate to login after successful profile creation
                navigate(routes.login, {
                    replace: true,
                    state: { message: 'Hoàn tất đăng ký! Vui lòng đăng nhập.' }
                })
            } else {
                setError(response.errors || response.message || 'Cập nhật thông tin thất bại. Vui lòng thử lại.')
            }
        } catch (err: unknown) {
            console.error('Profile creation error:', err)
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
        <div className="profile-form-container">
            <div className="profile-form-wrapper">
                <h1 className="profile-title">Thông tin học sinh</h1>

                {infoMessage && (
                    <Alert variant="info" dismissible>
                        {infoMessage}
                    </Alert>
                )}

                {error && (
                    <Alert variant="danger" dismissible onClose={() => setError(null)}>
                        {error}
                    </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                    {/* Full Name Input */}
                    <Form.Group className="mb-3">
                        <Form.Label>Họ và tên học sinh</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập họ và tên đầy đủ"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            className="profile-input"
                            disabled={loading}
                        />
                    </Form.Group>

                    {/* Birth Date Input */}
                    <Form.Group className="mb-3">
                        <Form.Label>Ngày sinh</Form.Label>
                        <Form.Control
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            required
                            className="profile-input"
                            disabled={loading}
                        />
                    </Form.Group>

                    {/* Gender Select */}
                    <Form.Group className="mb-3">
                        <Form.Label>Giới tính</Form.Label>
                        <Form.Select
                            value={gender}
                            onChange={(e) => setGender(Number(e.target.value))}
                            required
                            className="profile-input"
                            disabled={loading}
                        >
                            <option value={1}>Nam</option>
                            <option value={2}>Nữ</option>
                        </Form.Select>
                    </Form.Group>

                    {/* Grade Input */}
                    <Form.Group className="mb-3">
                        <Form.Label>Lớp học</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ví dụ: Lớp 11"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                            required
                            className="profile-input"
                            disabled={loading}
                        />
                        <Form.Text className="text-muted">
                            Nhập lớp học của bạn (ví dụ: Lớp 11, Lớp 12)
                        </Form.Text>
                    </Form.Group>

                    {/* School Input */}
                    <Form.Group className="mb-3">
                        <Form.Label>Trường học</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập tên trường học"
                            value={school}
                            onChange={(e) => setSchool(e.target.value)}
                            required
                            className="profile-input"
                            disabled={loading}
                        />
                    </Form.Group>

                    {/* Parent ID Input (Optional) */}
                    {/* <Form.Group className="mb-4">
                        <Form.Label>Parent ID (Tùy chọn)</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập Parent ID (nếu có)"
                            value={parentId}
                            onChange={(e) => setParentId(e.target.value)}
                            className="profile-input"
                            disabled={loading}
                        />
                        <Form.Text className="text-muted">
                            Có thể bỏ trống nếu chưa có phụ huynh
                        </Form.Text>
                    </Form.Group> */}

                    {/* Learning Format Select */}
                    {/* <Form.Group className="mb-3">
                        <Form.Label>Hình thức học</Form.Label>
                        <Form.Select
                            value={learningFormat}
                            onChange={(e) => setLearningFormat(e.target.value)}
                            required
                            className="profile-input"
                            disabled={loading}
                        >
                            <option value="">Chọn hình thức học</option>
                            {learningFormats.map((format) => (
                                <option key={format} value={format}>
                                    {format}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group> */}

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="profile-button"
                        size="lg"
                        disabled={loading}
                    >
                        {loading ? 'Đang xử lý...' : 'Hoàn tất'}
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

