import { useState, useEffect } from 'react'
import { Form, Spinner } from 'react-bootstrap'
import { profileApi } from '../../api'
import type { TeachingInfoFormData, Subject, Grade } from '../../types/tutorProfile'

interface Step4TeachingInfoProps {
    data: TeachingInfoFormData
    onChange: (data: TeachingInfoFormData) => void
    errors: Partial<Record<keyof TeachingInfoFormData, string>>
}

// Days mapping (2=Monday, 3=Tuesday, etc.)
const DAYS = [
    { value: 2, label: 'Thứ 2' },
    { value: 3, label: 'Thứ 3' },
    { value: 4, label: 'Thứ 4' },
    { value: 5, label: 'Thứ 5' },
    { value: 6, label: 'Thứ 6' },
    { value: 7, label: 'Thứ 7' },
    { value: 8, label: 'Chủ Nhật' },
]

// Time slots
const TIME_SLOTS = [
    { value: 'morning', label: 'Buổi sáng' },
    { value: 'afternoon', label: 'Buổi chiều' },
    { value: 'evening', label: 'Buổi tối' },
]

export const Step4TeachingInfo = ({ data, onChange, errors }: Step4TeachingInfoProps) => {
    const [subjects, setSubjects] = useState<Subject[]>([])
    const [grades, setGrades] = useState<Grade[]>([])
    const [loading, setLoading] = useState(true)

    // Fetch subjects and grades from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const [subjectsRes, gradesRes] = await Promise.all([
                    profileApi.getSubjects(),
                    profileApi.getGrades()
                ])

                if (subjectsRes.success) {
                    setSubjects(subjectsRes.data)
                }
                if (gradesRes.success) {
                    setGrades(gradesRes.data)
                }
            } catch (err) {
                console.error('Failed to fetch subjects/grades:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const handleSubjectChange = (subjectId: string, checked: boolean) => {
        const newSubjects = checked
            ? [...data.subjects, subjectId]
            : data.subjects.filter((id) => id !== subjectId)
        onChange({ ...data, subjects: newSubjects })
    }

    const handleGradeChange = (gradeId: string, checked: boolean) => {
        const newGrades = checked
            ? [...data.grades, gradeId]
            : data.grades.filter((id) => id !== gradeId)
        onChange({ ...data, grades: newGrades })
    }

    const handleDayChange = (dayValue: number, checked: boolean) => {
        const newDays = checked
            ? [...data.availableDays, dayValue]
            : data.availableDays.filter((d) => d !== dayValue)
        onChange({ ...data, availableDays: newDays })
    }

    const handleTimeSlotChange = (slot: string, checked: boolean) => {
        const newSlots = checked
            ? [...data.availableTimeSlots, slot]
            : data.availableTimeSlots.filter((s) => s !== slot)
        onChange({ ...data, availableTimeSlots: newSlots })
    }

    if (loading) {
        return (
            <div className="form-content text-center py-5">
                <Spinner animation="border" variant="primary" />
                <div className="mt-3">Đang tải dữ liệu...</div>
            </div>
        )
    }

    return (
        <div className="form-content">
            <h3 className="form-section-title">Thông tin giảng dạy</h3>

            {/* Email */}
            <Form.Group className="mb-4">
                <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                <Form.Control
                    type="email"
                    value={data.email}
                    disabled
                />
                <Form.Text className="text-muted">
                    Email của bạn (không thể thay đổi)
                </Form.Text>
            </Form.Group>

            {/* Môn dạy */}
            <div className="form-subsection">
                <h4 className="form-subsection-title">
                    Môn dạy <span className="text-danger">*</span>
                </h4>
                <div className="checkbox-grid">
                    {subjects.map((subject) => (
                        <div key={subject._id} className="checkbox-item">
                            <Form.Check
                                type="checkbox"
                                id={`subject-${subject._id}`}
                                label={subject.name}
                                checked={data.subjects.includes(subject._id)}
                                onChange={(e) => handleSubjectChange(subject._id, e.target.checked)}
                            />
                        </div>
                    ))}
                </div>
                {errors.subjects && (
                    <div className="invalid-feedback d-block">{errors.subjects}</div>
                )}
            </div>

            {/* Lớp dạy */}
            <div className="form-subsection">
                <h4 className="form-subsection-title">
                    Lớp dạy <span className="text-danger">*</span>
                </h4>
                <div className="checkbox-grid">
                    {grades.map((grade) => (
                        <div key={grade._id} className="checkbox-item">
                            <Form.Check
                                type="checkbox"
                                id={`grade-${grade._id}`}
                                label={grade.name}
                                checked={data.grades.includes(grade._id)}
                                onChange={(e) => handleGradeChange(grade._id, e.target.checked)}
                            />
                        </div>
                    ))}
                </div>
                {errors.grades && (
                    <div className="invalid-feedback d-block">{errors.grades}</div>
                )}
            </div>

            {/* Ngày trong tuần */}
            <div className="form-subsection">
                <h4 className="form-subsection-title">
                    Ngày dạy trong tuần <span className="text-danger">*</span>
                </h4>
                <div className="checkbox-grid">
                    {DAYS.map((day) => (
                        <div key={day.value} className="checkbox-item">
                            <Form.Check
                                type="checkbox"
                                id={`day-${day.value}`}
                                label={day.label}
                                checked={data.availableDays.includes(day.value)}
                                onChange={(e) => handleDayChange(day.value, e.target.checked)}
                            />
                        </div>
                    ))}
                </div>
                {errors.availableDays && (
                    <div className="invalid-feedback d-block">{errors.availableDays}</div>
                )}
            </div>

            {/* Khung giờ */}
            <div className="form-subsection">
                <h4 className="form-subsection-title">
                    Khung giờ có thể dạy <span className="text-danger">*</span>
                </h4>
                <div className="checkbox-grid">
                    {TIME_SLOTS.map((slot) => (
                        <div key={slot.value} className="checkbox-item">
                            <Form.Check
                                type="checkbox"
                                id={`slot-${slot.value}`}
                                label={slot.label}
                                checked={data.availableTimeSlots.includes(slot.value)}
                                onChange={(e) => handleTimeSlotChange(slot.value, e.target.checked)}
                            />
                        </div>
                    ))}
                </div>
                {errors.availableTimeSlots && (
                    <div className="invalid-feedback d-block">{errors.availableTimeSlots}</div>
                )}
                <Form.Text className="text-muted">
                    Chọn các khung giờ bạn có thể dạy
                </Form.Text>
            </div>
        </div>
    )
}
