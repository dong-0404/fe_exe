import { useState, useEffect } from 'react'
import { Button, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { profileApi } from '../../api'
import { ProgressIndicator } from './ProgressIndicator'
import { Step1BasicInfo } from './Step1BasicInfo'
import { Step2IdentityInfo } from './Step2IdentityInfo'
import { Step3CertificatesInfo } from './Step3CertificatesInfo'
import { Step4TeachingInfo } from './Step4TeachingInfo'
import { getUserRole, getCurrentUser } from '../../../auth/utils/authHelpers'
import { routes } from '../../../../config/routes'
import type {
    BasicInfoFormData,
    IdentityInfoFormData,
    CertificatesInfoFormData,
    TeachingInfoFormData,
} from '../../types/tutorProfile'
import './TutorProfileForm.css'

export const TutorProfileForm = () => {
    const navigate = useNavigate()
    const currentUser = getCurrentUser()
    const userId = currentUser?._id

    const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1)
    const [completedSteps, setCompletedSteps] = useState<number[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    // Form data cho từng step
    const [step1Data, setStep1Data] = useState<BasicInfoFormData>({
        fullName: '',
        email: currentUser?.email || '',
        dateOfBirth: '',
        placeOfBirth: '',
        hourlyRate: '',
        gender: 0,
        teachingArea: '',
    })

    const [step2Data, setStep2Data] = useState<IdentityInfoFormData>({
        email: currentUser?.email || '',
        identityNumber: '',
    })

    const [step3Data, setStep3Data] = useState<CertificatesInfoFormData>({
        email: currentUser?.email || '',
        schoolName: '',
        major: '',
        educationStatus: 0,
        images: [],
    })

    const [step4Data, setStep4Data] = useState<TeachingInfoFormData>({
        email: currentUser?.email || '',
        subjects: [],
        grades: [],
        availableDays: [],
        availableTimeSlots: [],
    })

    const [errors, setErrors] = useState<Record<string, string>>({})

    // Load existing profile data khi component mount
    useEffect(() => {
        const loadProfile = async () => {
            if (!userId) {
                // navigate(routes.login, { replace: true })
                // return
            }

            // Check role
            const role = getUserRole()
            if (role !== 3) { // 3 = Tutor
                // navigate(routes.home, { replace: true })
                // return
            }

            try {
                setLoading(true)
                const response = await profileApi.getTutorProfile(userId || '')

                if (response.success && response.data) {
                    const profile = response.data

                    // Check if profile is already completed
                    if (profile.isProfileComplete || profile.profileStatus === 2) {
                        // Profile đã hoàn thành, redirect về home
                        navigate(routes.home, {
                            replace: true,
                            state: {
                                message: 'Hồ sơ của bạn đã được hoàn thành và đang chờ duyệt.',
                            },
                        })
                        return
                    }

                    // Load data Step 1
                    setStep1Data({
                        fullName: profile.fullName || '',
                        email: profile.userId || currentUser?.email || '',
                        dateOfBirth: profile.dateOfBirth?.split('T')[0] || '',
                        placeOfBirth: profile.placeOfBirth || '',
                        hourlyRate: profile.hourlyRate?.toString() || '',
                        gender: profile.gender || 0,
                        teachingArea: profile.teachingArea || '',
                    })

                    // Load data Step 2
                    setStep2Data({
                        email: currentUser?.email || '',
                        identityNumber: profile.identityNumber || '',
                    })

                    // Load data Step 3
                    setStep3Data({
                        email: currentUser?.email || '',
                        schoolName: profile.schoolName || '',
                        major: profile.major || '',
                        educationStatus: profile.educationStatus || 0,
                        images: [], // Files không load lại được
                    })

                    // Load data Step 4
                    setStep4Data({
                        email: currentUser?.email || '',
                        subjects: profile.subjects || [],
                        grades: profile.grades || [],
                        availableDays: profile.availableDays || [],
                        availableTimeSlots: profile.availableTimeSlots || [],
                    })

                    // Set current step và completed steps
                    setCurrentStep(profile.currentStep || 1)
                    setCompletedSteps(profile.completedSteps || [])
                }
            } catch (err) {
                console.error('Failed to load profile:', err)
                // Không hiện error, chỉ bắt đầu từ step 1
            } finally {
                setLoading(false)
            }
        }

        loadProfile()
    }, [userId, navigate])

    // Validate step 1
    const validateStep1 = (): boolean => {
        const newErrors: Record<string, string> = {}

        if (!step1Data.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ và tên'
        if (!step1Data.email.trim()) {
            newErrors.email = 'Vui lòng nhập email'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(step1Data.email)) {
            newErrors.email = 'Email không hợp lệ'
        }
        if (!step1Data.dateOfBirth) newErrors.dateOfBirth = 'Vui lòng chọn ngày sinh'
        if (!step1Data.placeOfBirth.trim()) newErrors.placeOfBirth = 'Vui lòng nhập nơi sinh'
        if (!step1Data.gender || step1Data.gender === 0) newErrors.gender = 'Vui lòng chọn giới tính'
        if (!step1Data.hourlyRate.trim()) {
            newErrors.hourlyRate = 'Vui lòng nhập học phí'
        } else if (isNaN(Number(step1Data.hourlyRate))) {
            newErrors.hourlyRate = 'Học phí phải là số'
        }
        if (!step1Data.teachingArea.trim()) newErrors.teachingArea = 'Vui lòng nhập khu vực dạy'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Validate step 2
    const validateStep2 = (): boolean => {
        const newErrors: Record<string, string> = {}

        if (!step2Data.email.trim()) {
            newErrors.email = 'Vui lòng nhập email'
        }
        if (!step2Data.identityNumber.trim()) {
            newErrors.identityNumber = 'Vui lòng nhập số CCCD/CMND'
        } else if (!/^\d{9,12}$/.test(step2Data.identityNumber)) {
            newErrors.identityNumber = 'CCCD phải có 12 số hoặc CMND có 9 số'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Validate step 3
    const validateStep3 = (): boolean => {
        const newErrors: Record<string, string> = {}

        if (!step3Data.email.trim()) newErrors.email = 'Vui lòng nhập email'
        if (!step3Data.schoolName.trim()) newErrors.schoolName = 'Vui lòng nhập tên trường'
        if (!step3Data.major.trim()) newErrors.major = 'Vui lòng nhập ngành học'
        if (!step3Data.educationStatus || step3Data.educationStatus === 0) {
            newErrors.educationStatus = 'Vui lòng chọn trạng thái học tập'
        }
        if (step3Data.images.length === 0) {
            newErrors.images = 'Vui lòng upload ít nhất 1 hình ảnh chứng chỉ'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Validate step 4
    const validateStep4 = (): boolean => {
        const newErrors: Record<string, string> = {}

        if (!step4Data.email.trim()) newErrors.email = 'Vui lòng nhập email'
        if (step4Data.subjects.length === 0) newErrors.subjects = 'Vui lòng chọn ít nhất 1 môn'
        if (step4Data.grades.length === 0) newErrors.grades = 'Vui lòng chọn ít nhất 1 lớp'
        if (step4Data.availableDays.length === 0) {
            newErrors.availableDays = 'Vui lòng chọn ít nhất 1 ngày'
        }
        if (step4Data.availableTimeSlots.length === 0) {
            newErrors.availableTimeSlots = 'Vui lòng chọn ít nhất 1 khung giờ'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Save step data to backend
    const saveStepData = async (step: 1 | 2 | 3 | 4): Promise<boolean> => {
        try {
            setLoading(true)
            setError(null)

            let success = false

            switch (step) {
                case 1: {
                    // Step 1 uses POST to create profile
                    const response1 = await profileApi.createTutorProfileStep1({
                        email: step1Data.email,
                        fullName: step1Data.fullName,
                        dateOfBirth: step1Data.dateOfBirth,
                        placeOfBirth: step1Data.placeOfBirth,
                        gender: step1Data.gender,
                        hourlyRate: Number(step1Data.hourlyRate),
                        teachingArea: step1Data.teachingArea,
                    })
                    if (response1.success) {
                        success = true
                    } else {
                        setError(response1.errors || response1.message || 'Lưu thông tin thất bại')
                    }
                    break
                }
                case 2: {
                    // Step 2 uses PUT to update identity
                    const response2 = await profileApi.updateTutorProfileStep2({
                        email: step2Data.email,
                        identityNumber: step2Data.identityNumber,
                    })
                    if (response2.success) {
                        success = true
                    } else {
                        setError(response2.errors || response2.message || 'Lưu thông tin thất bại')
                    }
                    break
                }
                case 3: {
                    // Step 3 - Upload certificate with images
                    const response3 = await profileApi.createCertificate(
                        step3Data.email,
                        step3Data.schoolName,
                        step3Data.major,
                        step3Data.educationStatus,
                        step3Data.images
                    )
                    if (response3.success) {
                        success = true
                        // Update completed steps from profileStatus
                        if (response3.data?.profileStatus) {
                            setCompletedSteps(response3.data.profileStatus.completedSteps)
                        }
                    } else {
                        setError(response3.errors || response3.message || 'Lưu thông tin thất bại')
                    }
                    break
                }
                case 4: {
                    // Step 4 - Final step, update teaching info
                    const response4 = await profileApi.updateTutorProfileStep4({
                        email: step4Data.email,
                        subjects: step4Data.subjects,
                        grades: step4Data.grades,
                        availableDays: step4Data.availableDays,
                        availableTimeSlots: step4Data.availableTimeSlots,
                    })
                    if (response4.success) {
                        success = true
                        // Profile is now complete
                        if (response4.data?.isProfileComplete) {
                            localStorage.setItem('profileCompleted', 'true')
                        }
                    } else {
                        setError(response4.errors || response4.message || 'Lưu thông tin thất bại')
                    }
                    break
                }
            }

            if (success) {
                setSuccess('Đã lưu thông tin thành công!')

                // Update completed steps
                if (!completedSteps.includes(step)) {
                    setCompletedSteps([...completedSteps, step])
                }

                return true
            }
            return false
        } catch (err) {
            console.error('Save step error:', err)
            setError('Đã có lỗi xảy ra. Vui lòng thử lại.')
            return false
        } finally {
            setLoading(false)
        }
    }

    // Handle next step
    const handleNext = async () => {
        setError(null)
        setSuccess(null)

        let isValid = false
        switch (currentStep) {
            case 1:
                isValid = validateStep1()
                break
            case 2:
                isValid = validateStep2()
                break
            case 3:
                isValid = validateStep3()
                break
            case 4:
                isValid = validateStep4()
                break
        }

        if (!isValid) return

        // Save to backend
        const saved = await saveStepData(currentStep)
        if (!saved) return

        // Move to next step
        if (currentStep < 4) {
            setCurrentStep((currentStep + 1) as 1 | 2 | 3 | 4)
            window.scrollTo(0, 0)
        }
    }

    // Handle previous step
    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep((currentStep - 1) as 1 | 2 | 3 | 4)
            setError(null)
            setSuccess(null)
            window.scrollTo(0, 0)
        }
    }

    // Handle complete
    const handleComplete = async () => {
        if (!validateStep4()) return

        // Save step 4 (final step)
        const saved = await saveStepData(4)
        if (!saved) return

        // After step 4, profile is complete
        // Redirect to home
        navigate(routes.home, {
            replace: true,
            state: { message: 'Hoàn tất đăng ký thông tin gia sư! Hồ sơ của bạn đang chờ duyệt.' },
        })
    }

    // Render current step
    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <Step1BasicInfo
                        data={step1Data}
                        onChange={setStep1Data}
                        errors={errors}
                    />
                )
            case 2:
                return (
                    <Step2IdentityInfo
                        data={step2Data}
                        onChange={setStep2Data}
                        errors={errors}
                    />
                )
            case 3:
                return (
                    <Step3CertificatesInfo
                        data={step3Data}
                        onChange={setStep3Data}
                        errors={errors}
                    />
                )
            case 4:
                return (
                    <Step4TeachingInfo
                        data={step4Data}
                        onChange={setStep4Data}
                        errors={errors}
                    />
                )
        }
    }

    if (loading && currentStep === 1 && !step1Data.dateOfBirth) {
        return (
            <div className="tutor-profile-container">
                <div className="text-center text-white">
                    <div className="loading-spinner" style={{ width: 40, height: 40 }}></div>
                    <div className="mt-3">Đang tải thông tin...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="tutor-profile-container">
            <div className="tutor-profile-wrapper">
                <h1 className="tutor-profile-title">Đăng ký trở thành gia sư</h1>

                <ProgressIndicator currentStep={currentStep} completedSteps={completedSteps} />

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

                {renderStep()}

                <div className="form-actions">
                    <Button
                        variant="outline-secondary"
                        className="btn-back"
                        onClick={handleBack}
                        disabled={currentStep === 1 || loading}
                    >
                        Quay lại
                    </Button>

                    {currentStep < 4 ? (
                        <Button
                            className="btn-next"
                            onClick={handleNext}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="loading-spinner me-2"></span>
                                    Đang lưu...
                                </>
                            ) : (
                                'Tiếp theo'
                            )}
                        </Button>
                    ) : (
                        <Button
                            className="btn-complete"
                            onClick={handleComplete}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="loading-spinner me-2"></span>
                                    Đang xử lý...
                                </>
                            ) : (
                                'Hoàn tất'
                            )}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
