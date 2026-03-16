import { useMemo, useState } from 'react'
import { Form } from 'react-bootstrap'
import type { CertificatesInfoFormData } from '../../types/tutorProfile'

interface Step3CertificatesInfoProps {
    data: CertificatesInfoFormData
    onChange: (data: CertificatesInfoFormData) => void
    errors: Partial<Record<keyof CertificatesInfoFormData, string>>
}

export const Step3CertificatesInfo = ({ data, onChange, errors }: Step3CertificatesInfoProps) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    // Tạo URL preview cho các file hiện có mỗi lần render
    const previewUrls = useMemo(
        () => data.images.map((file) => URL.createObjectURL(file)),
        [data.images]
    )

    const handleChange = (field: keyof CertificatesInfoFormData, value: string | number) => {
        onChange({ ...data, [field]: value })
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(e.target.files || [])

        if (newFiles.length === 0) return

        // Check limit: tối đa 5 ảnh
        const currentCount = data.images.length
        const remainingSlots = 5 - currentCount

        if (remainingSlots <= 0) {
            alert('Bạn chỉ có thể upload tối đa 5 ảnh')
            e.target.value = ''
            return
        }

        // Chỉ lấy số ảnh còn được phép thêm
        const filesToAdd = newFiles.slice(0, remainingSlots)

        if (filesToAdd.length < newFiles.length) {
            alert(`Chỉ có thể thêm ${remainingSlots} ảnh nữa. Đã chọn ${filesToAdd.length} ảnh.`)
        }

        // Append new files to existing files
        const updatedFiles = [...data.images, ...filesToAdd]
        onChange({ ...data, images: updatedFiles })

        // Reset input để có thể chọn cùng file lại
        e.target.value = ''
    }

    const handleRemoveFile = (index: number) => {
        const newFiles = data.images.filter((_, i) => i !== index)
        onChange({ ...data, images: newFiles })
    }

    return (
        <div className="form-content">
            <h3 className="form-section-title">Bằng cấp, chứng chỉ</h3>

            <div className="form-subsection">
                <h4 className="form-subsection-title">Thông tin bằng cấp</h4>

                <Form.Group className="mb-3">
                    <Form.Label>
                        Email <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                        type="email"
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
                        Tên trường <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ví dụ: Đại học Bách Khoa Hà Nội"
                        value={data.schoolName}
                        onChange={(e) => handleChange('schoolName', e.target.value)}
                        isInvalid={!!errors.schoolName}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.schoolName}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>
                        Ngành học <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ví dụ: Khoa học Máy tính"
                        value={data.major}
                        onChange={(e) => handleChange('major', e.target.value)}
                        isInvalid={!!errors.major}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.major}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>
                        Trạng thái học tập <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select
                        value={data.educationStatus}
                        onChange={(e) => handleChange('educationStatus', Number(e.target.value))}
                        isInvalid={!!errors.educationStatus}
                    >
                        <option value={0}>Chọn trạng thái</option>
                        <option value={1}>Đang học</option>
                        <option value={2}>Đã tốt nghiệp</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        {errors.educationStatus}
                    </Form.Control.Feedback>
                </Form.Group>
            </div>

            <div className="form-subsection">
                <h4 className="form-subsection-title">Thông tin chứng chỉ</h4>

                <Form.Group className="mb-3">
                    <Form.Label>
                        Hình ảnh chứng chỉ, bằng cấp <span className="text-danger">*</span>
                    </Form.Label>

                    {/* Grid layout cho preview và upload */}
                    <div className="certificates-grid">
                        {/* Preview existing images */}
                        {previewUrls.map((url, index) => (
                            <div key={index} className="certificate-card">
                                <div
                                    className="certificate-preview"
                                    onClick={() => setSelectedImage(url)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <img src={url} alt={`Certificate ${index + 1}`} className="certificate-image" />
                                    <button
                                        type="button"
                                        className="remove-certificate"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleRemoveFile(index)
                                        }}
                                        title="Xóa ảnh"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Upload area - always visible */}
                        <div className="certificate-card certificate-upload-card">
                            <label htmlFor="certificate-upload" className="upload-card-label">
                                <div className="upload-card-content">
                                    <div className="upload-card-icon">📄</div>
                                    <div className="upload-card-text">+ Thêm hình ảnh</div>
                                </div>
                            </label>
                            <Form.Control
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                id="certificate-upload"
                            />
                        </div>
                    </div>

                    <Form.Text className="text-muted d-block mt-2">
                        PNG, JPG (tối đa 5MB/file). Có thể thêm nhiều ảnh.
                    </Form.Text>

                    {errors.images && (
                        <div className="invalid-feedback d-block mt-2">
                            {errors.images}
                        </div>
                    )}
                </Form.Group>
            </div>

            {/* Lightbox xem ảnh chứng chỉ */}
            {selectedImage && (
                <div className="certificate-lightbox" onClick={() => setSelectedImage(null)}>
                    <div className="certificate-lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button
                            type="button"
                            className="certificate-lightbox-close"
                            onClick={() => setSelectedImage(null)}
                            aria-label="Đóng"
                        >
                            ×
                        </button>
                        <img src={selectedImage} alt="Certificate preview" className="certificate-lightbox-image" />
                    </div>
                </div>
            )}
        </div>
    )
}
