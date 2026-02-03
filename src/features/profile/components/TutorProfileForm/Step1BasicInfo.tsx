import { Form } from 'react-bootstrap'
import type { BasicInfoFormData } from '../../types/tutorProfile'

interface Step1BasicInfoProps {
    data: BasicInfoFormData
    onChange: (data: BasicInfoFormData) => void
    errors: Partial<Record<keyof BasicInfoFormData, string>>
}

export const Step1BasicInfo = ({ data, onChange, errors }: Step1BasicInfoProps) => {
    const handleChange = (field: keyof BasicInfoFormData, value: string | number) => {
        onChange({ ...data, [field]: value })
    }

    return (
        <div className="form-content">
            <h3 className="form-section-title">Thông tin cơ bản</h3>

            <Form.Group className="mb-3">
                <Form.Label>
                    Họ và tên <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nhập họ và tên đầy đủ"
                    value={data.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    isInvalid={!!errors.fullName}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.fullName}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>
                    Email <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Nhập email"
                    value={data.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.email}
                </Form.Control.Feedback>
            </Form.Group>

            <div className="row">
                <div className="col-md-6">
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Ngày sinh <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="date"
                            value={data.dateOfBirth}
                            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                            isInvalid={!!errors.dateOfBirth}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.dateOfBirth}
                        </Form.Control.Feedback>
                    </Form.Group>
                </div>

                <div className="col-md-6">
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Nơi sinh <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập nơi sinh"
                            value={data.placeOfBirth}
                            onChange={(e) => handleChange('placeOfBirth', e.target.value)}
                            isInvalid={!!errors.placeOfBirth}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.placeOfBirth}
                        </Form.Control.Feedback>
                    </Form.Group>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Giới tính <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Select
                            value={data.gender}
                            onChange={(e) => handleChange('gender', Number(e.target.value))}
                            isInvalid={!!errors.gender}
                        >
                            <option value="">Chọn giới tính</option>
                            <option value="1">Nam</option>
                            <option value="2">Nữ</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {errors.gender}
                        </Form.Control.Feedback>
                    </Form.Group>
                </div>

                <div className="col-md-6">
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Học phí (VNĐ/giờ) <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ví dụ: 150000"
                            value={data.hourlyRate}
                            onChange={(e) => handleChange('hourlyRate', e.target.value)}
                            isInvalid={!!errors.hourlyRate}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.hourlyRate}
                        </Form.Control.Feedback>
                        <Form.Text className="text-muted">
                            Ví dụ: 150000 (150k/giờ)
                        </Form.Text>
                    </Form.Group>
                </div>
            </div>

            <Form.Group className="mb-3">
                <Form.Label>
                    Khu vực dạy <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ví dụ: Quận 1, Quận 3, Bình Thạnh"
                    value={data.teachingArea}
                    onChange={(e) => handleChange('teachingArea', e.target.value)}
                    isInvalid={!!errors.teachingArea}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.teachingArea}
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                    Nhập các quận/huyện bạn có thể dạy, cách nhau bởi dấu phẩy
                </Form.Text>
            </Form.Group>
        </div>
    )
}
