import { Form } from 'react-bootstrap'
import type { IdentityInfoFormData } from '../../types/tutorProfile'

interface Step2IdentityInfoProps {
    data: IdentityInfoFormData
    onChange: (data: IdentityInfoFormData) => void
    errors: Partial<Record<keyof IdentityInfoFormData, string>>
}

export const Step2IdentityInfo = ({ data, onChange, errors }: Step2IdentityInfoProps) => {
    const handleChange = (field: keyof IdentityInfoFormData, value: string) => {
        onChange({ ...data, [field]: value })
    }

    return (
        <div className="form-content">
            <h3 className="form-section-title">Thông tin định danh</h3>

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
                    disabled
                />
                <Form.Control.Feedback type="invalid">
                    {errors.email}
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                    Email của bạn (không thể thay đổi)
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>
                    Số CCCD/CMND <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nhập số CCCD/CMND"
                    value={data.identityNumber}
                    onChange={(e) => handleChange('identityNumber', e.target.value)}
                    isInvalid={!!errors.identityNumber}
                    maxLength={12}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.identityNumber}
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                    Nhập đúng 12 số CCCD hoặc 9 số CMND của bạn
                </Form.Text>
            </Form.Group>

            <div className="alert alert-info">
                <strong>Lưu ý:</strong> Thông tin CCCD/CMND được sử dụng để xác minh danh tính của bạn.
                Chúng tôi cam kết bảo mật thông tin cá nhân theo quy định pháp luật.
            </div>
        </div>
    )
}
