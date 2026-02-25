import { useState, useEffect } from 'react'
import { Row, Col, Form, Button, Card, Alert, Spinner, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ProfileLayout } from '../../layouts/ProfileLayout'
import { ProfileHeader } from '../../features/profile/components/ProfileHeader'
import { AvatarUpload } from '../../features/profile/components/AvatarUpload'
import { getCurrentUser } from '../../features/auth/utils/authHelpers'
import { UserRole } from '../../features/auth/types'
import { profileApi } from '../../features/profile/api/profileApi'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchTutorDetail } from '../../features/findTutor/findTutorThunks'
import { selectTutorDetail, selectLoadingDetail } from '../../features/findTutor/findTutorSelector'
import { tutorApi } from '../../features/findTutor/api'
import { routes } from '../../config/routes'
import type { Subject, Grade } from '../../features/findTutor/types'
import './ProfilePage.css'

export const TutorProfilePage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const currentUser = getCurrentUser()
    const userId = currentUser?._id

    // Redux state
    const tutorDetail = useAppSelector(selectTutorDetail)
    const loadingDetail = useAppSelector(selectLoadingDetail)

    const [activeTab, setActiveTab] = useState('profile')
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [hasFetched, setHasFetched] = useState(false) // Track if we've attempted to fetch
    const [selectedCertificateImage, setSelectedCertificateImage] = useState<string | null>(null) // For lightbox modal

    // Subjects and Grades for dropdowns
    const [subjects, setSubjects] = useState<Subject[]>([])
    const [grades, setGrades] = useState<Grade[]>([])


    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        email: currentUser?.email || '',
        phone: currentUser?.phone || '',
        dateOfBirth: '',
        placeOfBirth: '',
        gender: 1,
        hourlyRate: '',
        teachingArea: '',
        identityNumber: '',
        schoolName: '',
        major: '',
        educationStatus: 0,
        certificateImages: [] as string[],
        subjects: [] as string[],
        grades: [] as string[],
        availableDays: [] as number[],
        availableTimeSlots: [] as string[],
        avatar: ''
    })

    // Load tutor detail and subjects/grades on mount
    useEffect(() => {
        const loadData = async () => {
            if (!userId) {
                navigate(routes.setupTutor, { replace: true })
                return
            }

            // Mark that we've attempted to fetch
            setHasFetched(true)

            // Fetch tutor detail using Redux thunk (same as TutorDetailPage)
            dispatch(fetchTutorDetail(userId))

            // Load subjects and grades
            try {
                const [subjectsResponse, gradesResponse] = await Promise.all([
                    tutorApi.getSubjects(),
                    tutorApi.getGrades()
                ])

                if (subjectsResponse.success && subjectsResponse.data) {
                    setSubjects(subjectsResponse.data)
                }
                if (gradesResponse.success && gradesResponse.data) {
                    setGrades(gradesResponse.data)
                }
            } catch (err) {
                console.error('Load subjects/grades error:', err)
            }
        }

        loadData()
    }, [userId, dispatch, navigate])

    // Update form data when tutorDetail is loaded
    useEffect(() => {
        if (tutorDetail) {
            // Format date for input[type="date"]
            const formattedDate = tutorDetail.dateOfBirth
                ? new Date(tutorDetail.dateOfBirth).toISOString().split('T')[0]
                : ''

            // Extract certificate info (use first certificate if available)
            const firstCert = tutorDetail.certificates && tutorDetail.certificates.length > 0
                ? tutorDetail.certificates[0]
                : null

            // Extract all certificate images
            const allCertImages = tutorDetail.certificates
                ? tutorDetail.certificates.flatMap(cert => cert.images || [])
                : []

            setFormData({
                fullName: tutorDetail.fullName || '',
                email: tutorDetail.userId?.email || currentUser?.email || '',
                phone: tutorDetail.userId?.phone || currentUser?.phone || '',
                dateOfBirth: formattedDate,
                placeOfBirth: tutorDetail.placeOfBirth || '',
                gender: Number(tutorDetail.gender) || 1,
                hourlyRate: tutorDetail.hourlyRate?.toString() || '',
                teachingArea: tutorDetail.teachingArea || '',
                identityNumber: tutorDetail.identityNumber || '',
                schoolName: firstCert?.schoolName || '',
                major: firstCert?.major || '',
                educationStatus: firstCert?.educationStatus || 0,
                certificateImages: allCertImages,
                subjects: tutorDetail.subjects?.map(s => s._id) || [],
                grades: tutorDetail.grades?.map(g => g._id) || [],
                availableDays: tutorDetail.availableDays || [],
                availableTimeSlots: tutorDetail.availableTimeSlots || [],
                avatar: tutorDetail.avatarUrl || ''
            })
        }
    }, [tutorDetail, currentUser?.email, currentUser?.phone])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        // Clear messages when user types
        setError(null)
        setSuccessMessage(null)
    }

    const handleMultiSelectChange = (name: string, value: string) => {
        setFormData(prev => {
            const currentValues = prev[name as keyof typeof prev] as string[]
            const newValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value]
            return { ...prev, [name]: newValues }
        })
    }

    const handleDayToggle = (day: number) => {
        setFormData(prev => {
            const newDays = prev.availableDays.includes(day)
                ? prev.availableDays.filter(d => d !== day)
                : [...prev.availableDays, day]
            return { ...prev, availableDays: newDays }
        })
    }

    const handleTimeSlotToggle = (slot: string) => {
        setFormData(prev => {
            const newSlots = prev.availableTimeSlots.includes(slot)
                ? prev.availableTimeSlots.filter(s => s !== slot)
                : [...prev.availableTimeSlots, slot]
            return { ...prev, availableTimeSlots: newSlots }
        })
    }

    const validateForm = (): boolean => {
        if (!formData.fullName.trim()) {
            setError('Vui lòng nhập họ và tên')
            return false
        }
        if (!formData.dateOfBirth) {
            setError('Vui lòng chọn ngày sinh')
            return false
        }
        if (!formData.hourlyRate || isNaN(Number(formData.hourlyRate))) {
            setError('Vui lòng nhập học phí hợp lệ')
            return false
        }
        if (formData.subjects.length === 0) {
            setError('Vui lòng chọn ít nhất 1 môn học')
            return false
        }
        if (formData.grades.length === 0) {
            setError('Vui lòng chọn ít nhất 1 lớp')
            return false
        }
        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        try {
            setSaving(true)
            setError(null)
            setSuccessMessage(null)

            // Prepare payload
            const payload = {
                fullName: formData.fullName,
                dateOfBirth: formData.dateOfBirth,
                placeOfBirth: formData.placeOfBirth,
                gender: Number(formData.gender),
                hourlyRate: Number(formData.hourlyRate),
                teachingArea: formData.teachingArea,
                identityNumber: formData.identityNumber,
                schoolName: formData.schoolName,
                major: formData.major,
                educationStatus: formData.educationStatus,
                subjects: formData.subjects,
                grades: formData.grades,
                availableDays: formData.availableDays,
                availableTimeSlots: formData.availableTimeSlots,
            }

            const response = await profileApi.updateTutorProfile(payload, avatarFile || undefined)

            if (response.success) {
                setSuccessMessage('Cập nhật hồ sơ thành công!')

                // Clear avatar file after successful upload
                setAvatarFile(null)

                // Auto hide success message after 3 seconds
                setTimeout(() => setSuccessMessage(null), 3000)
            }
        } catch (err) {
            console.error('Save profile error:', err)
            const errorMessage = err instanceof Error ? err.message : 'Không thể lưu thông tin hồ sơ'
            setError(errorMessage)
        } finally {
            setSaving(false)
        }
    }

    const handleAvatarChange = (file: File) => {
        setAvatarFile(file)
        // Create preview URL
        const previewUrl = URL.createObjectURL(file)
        setFormData(prev => ({ ...prev, avatar: previewUrl }))
    }

    // Loading state - show spinner while loading OR before first fetch
    if (loadingDetail || !hasFetched) {
        return (
            <ProfileLayout
                role={UserRole.TUTOR}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            >
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                    <Spinner animation="border" variant="primary" />
                    <span className="ms-3">Đang tải thông tin...</span>
                </div>
            </ProfileLayout>
        )
    }

    // If finished loading but no tutor detail, redirect to setup
    // Only redirect after we've attempted to fetch (hasFetched = true)
    if (hasFetched && !loadingDetail && !tutorDetail) {
        navigate(routes.setupTutor, { replace: true })
        return null
    }

    return (
        <ProfileLayout
            role={UserRole.TUTOR}
            activeTab={activeTab}
            onTabChange={setActiveTab}
        >
            {activeTab === 'profile' && (
                <>
                    <ProfileHeader
                        title="Hồ sơ gia sư"
                        description="Quản lý thông tin hồ sơ gia sư của bạn"
                    />

                    {/* Success/Error Messages */}
                    {successMessage && (
                        <Alert variant="success" dismissible onClose={() => setSuccessMessage(null)}>
                            {successMessage}
                        </Alert>
                    )}
                    {error && (
                        <Alert variant="danger" dismissible onClose={() => setError(null)}>
                            {error}
                        </Alert>
                    )}

                    <Card className="profile-card">
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col lg={8}>
                                        {/* Basic Info Section */}
                                        <h5 className="section-title mb-4">Thông tin cơ bản</h5>

                                        {/* Họ và tên */}
                                        <Form.Group className="mb-3 profile-form-group">
                                            <Row>
                                                <Col sm={3}>
                                                    <Form.Label className="profile-label">Họ và tên</Form.Label>
                                                </Col>
                                                <Col sm={9}>
                                                    <Form.Control
                                                        type="text"
                                                        name="fullName"
                                                        value={formData.fullName}
                                                        onChange={handleChange}
                                                        placeholder="Nhập họ và tên"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        {/* Ngày sinh */}
                                        <Form.Group className="mb-3 profile-form-group">
                                            <Row>
                                                <Col sm={3}>
                                                    <Form.Label className="profile-label">Ngày sinh</Form.Label>
                                                </Col>
                                                <Col sm={9}>
                                                    <Form.Control
                                                        type="date"
                                                        name="dateOfBirth"
                                                        value={formData.dateOfBirth}
                                                        onChange={handleChange}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        {/* Nơi sinh */}
                                        <Form.Group className="mb-3 profile-form-group">
                                            <Row>
                                                <Col sm={3}>
                                                    <Form.Label className="profile-label">Nơi sinh</Form.Label>
                                                </Col>
                                                <Col sm={9}>
                                                    <Form.Control
                                                        type="text"
                                                        name="placeOfBirth"
                                                        value={formData.placeOfBirth}
                                                        onChange={handleChange}
                                                        placeholder="Nhập nơi sinh"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        {/* Giới tính */}
                                        <Form.Group className="mb-3 profile-form-group">
                                            <Row>
                                                <Col sm={3}>
                                                    <Form.Label className="profile-label">Giới tính</Form.Label>
                                                </Col>
                                                <Col sm={9}>
                                                    <div className="d-flex gap-4">
                                                        <Form.Check
                                                            type="radio"
                                                            label="Nam"
                                                            name="gender"
                                                            value="1"
                                                            checked={formData.gender === 1}
                                                            onChange={() => setFormData(prev => ({ ...prev, gender: 1 }))}
                                                        />
                                                        <Form.Check
                                                            type="radio"
                                                            label="Nữ"
                                                            name="gender"
                                                            value="2"
                                                            checked={formData.gender === 2}
                                                            onChange={() => setFormData(prev => ({ ...prev, gender: 2 }))}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        {/* Học phí/giờ */}
                                        <Form.Group className="mb-3 profile-form-group">
                                            <Row>
                                                <Col sm={3}>
                                                    <Form.Label className="profile-label">Học phí/giờ (VNĐ)</Form.Label>
                                                </Col>
                                                <Col sm={9}>
                                                    <Form.Control
                                                        type="number"
                                                        name="hourlyRate"
                                                        value={formData.hourlyRate}
                                                        onChange={handleChange}
                                                        placeholder="Nhập học phí"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        {/* Khu vực dạy */}
                                        <Form.Group className="mb-3 profile-form-group">
                                            <Row>
                                                <Col sm={3}>
                                                    <Form.Label className="profile-label">Khu vực dạy</Form.Label>
                                                </Col>
                                                <Col sm={9}>
                                                    <Form.Control
                                                        type="text"
                                                        name="teachingArea"
                                                        value={formData.teachingArea}
                                                        onChange={handleChange}
                                                        placeholder="Nhập khu vực dạy"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        {/* Identity Section */}
                                        <h5 className="section-title mb-4 mt-5">Thông tin định danh</h5>

                                        {/* CCCD/CMND */}
                                        <Form.Group className="mb-3 profile-form-group">
                                            <Row>
                                                <Col sm={3}>
                                                    <Form.Label className="profile-label">CCCD/CMND</Form.Label>
                                                </Col>
                                                <Col sm={9}>
                                                    <Form.Control
                                                        type="text"
                                                        name="identityNumber"
                                                        value={formData.identityNumber}
                                                        onChange={handleChange}
                                                        placeholder="Nhập số CCCD/CMND"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        {/* Education Section */}
                                        <h5 className="section-title mb-4 mt-5">Thông tin học vấn</h5>

                                        {/* Trường học */}
                                        <Form.Group className="mb-3 profile-form-group">
                                            <Row>
                                                <Col sm={3}>
                                                    <Form.Label className="profile-label">Trường học</Form.Label>
                                                </Col>
                                                <Col sm={9}>
                                                    <Form.Control
                                                        type="text"
                                                        name="schoolName"
                                                        value={formData.schoolName}
                                                        onChange={handleChange}
                                                        placeholder="Nhập tên trường"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        {/* Ngành học */}
                                        <Form.Group className="mb-3 profile-form-group">
                                            <Row>
                                                <Col sm={3}>
                                                    <Form.Label className="profile-label">Ngành học</Form.Label>
                                                </Col>
                                                <Col sm={9}>
                                                    <Form.Control
                                                        type="text"
                                                        name="major"
                                                        value={formData.major}
                                                        onChange={handleChange}
                                                        placeholder="Nhập ngành học"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        {/* Trạng thái học tập */}
                                        <Form.Group className="mb-3 profile-form-group">
                                            <Row>
                                                <Col sm={3}>
                                                    <Form.Label className="profile-label">Trạng thái</Form.Label>
                                                </Col>
                                                <Col sm={9}>
                                                    <Form.Select
                                                        name="educationStatus"
                                                        value={formData.educationStatus}
                                                        onChange={handleChange}
                                                    >
                                                        <option value={0}>Chọn trạng thái</option>
                                                        <option value={1}>Đang học</option>
                                                        <option value={2}>Đã tốt nghiệp</option>
                                                    </Form.Select>
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        {/* Certificate Images */}
                                        <Form.Group className="mb-3 profile-form-group">
                                            <Row>
                                                <Col sm={3}>
                                                    <Form.Label className="profile-label">Chứng chỉ</Form.Label>
                                                </Col>
                                                <Col sm={9}>
                                                    {formData.certificateImages.length > 0 ? (
                                                        <>
                                                            <div className="d-flex flex-wrap gap-2">
                                                                {formData.certificateImages.map((imageUrl, index) => (
                                                                    <div
                                                                        key={index}
                                                                        style={{
                                                                            width: '150px',
                                                                            height: '150px',
                                                                            position: 'relative',
                                                                            cursor: 'pointer'
                                                                        }}
                                                                        onClick={() => setSelectedCertificateImage(imageUrl)}
                                                                    >
                                                                        <img
                                                                            src={imageUrl}
                                                                            alt={`Certificate ${index + 1}`}
                                                                            style={{
                                                                                width: '100%',
                                                                                height: '100%',
                                                                                objectFit: 'cover',
                                                                                borderRadius: '8px',
                                                                                border: '1px solid #dee2e6',
                                                                                transition: 'transform 0.2s'
                                                                            }}
                                                                            onMouseEnter={(e) => {
                                                                                e.currentTarget.style.transform = 'scale(1.05)'
                                                                            }}
                                                                            onMouseLeave={(e) => {
                                                                                e.currentTarget.style.transform = 'scale(1)'
                                                                            }}
                                                                            onError={(e) => {
                                                                                e.currentTarget.style.display = 'none'
                                                                            }}
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <small className="text-muted d-block mt-2">
                                                                Click vào ảnh để xem phóng to. Để cập nhật chứng chỉ, vui lòng liên hệ quản trị viên
                                                            </small>
                                                        </>
                                                    ) : (
                                                        <div className="text-muted">
                                                            <small>Chưa có chứng chỉ nào được upload</small>
                                                        </div>
                                                    )}
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        {/* Teaching Info Section */}
                                        <h5 className="section-title mb-4 mt-5">Thông tin giảng dạy</h5>

                                        {/* Môn học */}
                                        <Form.Group className="mb-3 profile-form-group">
                                            <Row>
                                                <Col sm={3}>
                                                    <Form.Label className="profile-label">Môn học</Form.Label>
                                                </Col>
                                                <Col sm={9}>
                                                    {subjects.length > 0 ? (
                                                        <div className="d-flex flex-wrap gap-2">
                                                            {subjects.map(subject => {
                                                                const isChecked = formData.subjects.includes(subject._id)
                                                                return (
                                                                    <Form.Check
                                                                        key={subject._id}
                                                                        type="checkbox"
                                                                        id={`subject-${subject._id}`}
                                                                        label={subject.name}
                                                                        checked={isChecked}
                                                                        onChange={() => handleMultiSelectChange('subjects', subject._id)}
                                                                    />
                                                                )
                                                            })}
                                                        </div>
                                                    ) : (
                                                        <div className="text-muted">
                                                            <small>Đang tải danh sách môn học...</small>
                                                        </div>
                                                    )}
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        {/* Lớp */}
                                        <Form.Group className="mb-3 profile-form-group">
                                            <Row>
                                                <Col sm={3}>
                                                    <Form.Label className="profile-label">Lớp</Form.Label>
                                                </Col>
                                                <Col sm={9}>
                                                    {grades.length > 0 ? (
                                                        <div className="d-flex flex-wrap gap-2">
                                                            {grades.map(grade => {
                                                                const isChecked = formData.grades.includes(grade._id)
                                                                return (
                                                                    <Form.Check
                                                                        key={grade._id}
                                                                        type="checkbox"
                                                                        id={`grade-${grade._id}`}
                                                                        label={grade.name}
                                                                        checked={isChecked}
                                                                        onChange={() => handleMultiSelectChange('grades', grade._id)}
                                                                    />
                                                                )
                                                            })}
                                                        </div>
                                                    ) : (
                                                        <div className="text-muted">
                                                            <small>Đang tải danh sách lớp...</small>
                                                        </div>
                                                    )}
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        {/* Ngày có thể dạy */}
                                        <Form.Group className="mb-3 profile-form-group">
                                            <Row>
                                                <Col sm={3}>
                                                    <Form.Label className="profile-label">Ngày có thể dạy</Form.Label>
                                                </Col>
                                                <Col sm={9}>
                                                    <div className="d-flex flex-wrap gap-2">
                                                        {[
                                                            { value: 2, label: 'Thứ 2' },
                                                            { value: 3, label: 'Thứ 3' },
                                                            { value: 4, label: 'Thứ 4' },
                                                            { value: 5, label: 'Thứ 5' },
                                                            { value: 6, label: 'Thứ 6' },
                                                            { value: 7, label: 'Thứ 7' },
                                                            { value: 8, label: 'Chủ nhật' }
                                                        ].map(day => (
                                                            <Form.Check
                                                                key={day.value}
                                                                type="checkbox"
                                                                id={`day-${day.value}`}
                                                                label={day.label}
                                                                checked={formData.availableDays.includes(day.value)}
                                                                onChange={() => handleDayToggle(day.value)}
                                                            />
                                                        ))}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        {/* Khung giờ */}
                                        <Form.Group className="mb-3 profile-form-group">
                                            <Row>
                                                <Col sm={3}>
                                                    <Form.Label className="profile-label">Khung giờ</Form.Label>
                                                </Col>
                                                <Col sm={9}>
                                                    <div className="d-flex flex-wrap gap-2">
                                                        {[
                                                            { value: 'morning', label: 'Sáng (6h-12h)' },
                                                            { value: 'afternoon', label: 'Chiều (12h-18h)' },
                                                            { value: 'evening', label: 'Tối (18h-22h)' }
                                                        ].map(slot => (
                                                            <Form.Check
                                                                key={slot.value}
                                                                type="checkbox"
                                                                id={`slot-${slot.value}`}
                                                                label={slot.label}
                                                                checked={formData.availableTimeSlots.includes(slot.value)}
                                                                onChange={() => handleTimeSlotToggle(slot.value)}
                                                            />
                                                        ))}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        {/* Submit Button */}
                                        <div className="text-center mt-4">
                                            <Button
                                                type="submit"
                                                className="btn-save-profile"
                                                disabled={saving}
                                            >
                                                {saving ? (
                                                    <>
                                                        <Spinner
                                                            as="span"
                                                            animation="border"
                                                            size="sm"
                                                            role="status"
                                                            aria-hidden="true"
                                                            className="me-2"
                                                        />
                                                        Đang lưu...
                                                    </>
                                                ) : (
                                                    'Lưu'
                                                )}
                                            </Button>
                                        </div>
                                    </Col>

                                    {/* Avatar Upload */}
                                    <Col lg={4}>
                                        <AvatarUpload
                                            currentAvatar={formData.avatar}
                                            onAvatarChange={handleAvatarChange}
                                        />
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </>
            )}

            {activeTab === 'password' && (
                <div>
                    <ProfileHeader
                        title="Đổi mật khẩu"
                        description="Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác"
                    />
                    <Card className="profile-card">
                        <Card.Body>
                            <p>Đổi mật khẩu content here...</p>
                        </Card.Body>
                    </Card>
                </div>
            )}

            {activeTab === 'schedule' && (
                <div>
                    <ProfileHeader
                        title="Quản lý lịch dạy"
                        description="Xem và quản lý lịch dạy của bạn"
                    />
                    <Card className="profile-card">
                        <Card.Body>
                            <p>Lịch dạy content here...</p>
                        </Card.Body>
                    </Card>
                </div>
            )}

            {activeTab === 'students' && (
                <div>
                    <ProfileHeader
                        title="Quản lý học viên"
                        description="Danh sách học viên của bạn"
                    />
                    <Card className="profile-card">
                        <Card.Body>
                            <p>Danh sách học viên content here...</p>
                        </Card.Body>
                    </Card>
                </div>
            )}

            {activeTab === 'earnings' && (
                <div>
                    <ProfileHeader
                        title="Thống kê thu nhập"
                        description="Xem thống kê thu nhập của bạn"
                    />
                    <Card className="profile-card">
                        <Card.Body>
                            <p>Thống kê thu nhập content here...</p>
                        </Card.Body>
                    </Card>
                </div>
            )}

            {/* Certificate Image Lightbox Modal */}
            <Modal
                show={selectedCertificateImage !== null}
                onHide={() => setSelectedCertificateImage(null)}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Chứng chỉ</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center p-0">
                    {selectedCertificateImage && (
                        <img
                            src={selectedCertificateImage}
                            alt="Certificate"
                            style={{
                                width: '100%',
                                height: 'auto',
                                maxHeight: '80vh',
                                objectFit: 'contain'
                            }}
                        />
                    )}
                </Modal.Body>
            </Modal>
        </ProfileLayout>
    )
}
