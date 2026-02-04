import { useState } from 'react'
import { Row, Col, Form, Button, Card } from 'react-bootstrap'
import { ProfileLayout } from '../../layouts/ProfileLayout'
import { ProfileHeader } from '../../features/profile/components/ProfileHeader'
import { AvatarUpload } from '../../features/profile/components/AvatarUpload'
import { getCurrentUser } from '../../features/auth/utils/authHelpers'
import { UserRole } from '../../features/auth/types'
import './ProfilePage.css'

export const ParentProfilePage = () => {
    const currentUser = getCurrentUser()
    const [activeTab, setActiveTab] = useState('profile')

    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        email: currentUser?.email || '',
        phone: currentUser?.phone || '',
        gender: 1,
        dateOfBirth: '',
        address: '',
        avatar: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Save parent profile:', formData)
        // TODO: Call API to save profile
    }

    const handleAvatarChange = (file: File) => {
        console.log('Avatar selected:', file)
        // TODO: Upload avatar
    }

    return (
        <ProfileLayout
            role={UserRole.PARENT}
            activeTab={activeTab}
            onTabChange={setActiveTab}
        >
            {activeTab === 'profile' && (
                <>
                    <ProfileHeader
                        title="Hồ sơ phụ huynh"
                        description="Quản lý thông tin hồ sơ để bảo mật tài khoản"
                    />

                    <Card className="profile-card">
                        <Card.Body>
                            <h5 className="section-title mb-4">Thông tin phụ huynh</h5>

                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col lg={8}>
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

                                        {/* Email */}
                                        <Form.Group className="mb-3 profile-form-group">
                                            <Row>
                                                <Col sm={3}>
                                                    <Form.Label className="profile-label">Email</Form.Label>
                                                </Col>
                                                <Col sm={9}>
                                                    <Form.Control
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        disabled
                                                        readOnly
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        {/* Số điện thoại */}
                                        <Form.Group className="mb-3 profile-form-group">
                                            <Row>
                                                <Col sm={3}>
                                                    <Form.Label className="profile-label">Số điện thoại</Form.Label>
                                                </Col>
                                                <Col sm={9}>
                                                    <Form.Control
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        placeholder="Nhập số điện thoại"
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

                                        {/* Ngày sinh */}
                                        <Form.Group className="mb-3 profile-form-group">
                                            <Row>
                                                <Col sm={3}>
                                                    <Form.Label className="profile-label">Ngày sinh</Form.Label>
                                                </Col>
                                                <Col sm={9}>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <Form.Control
                                                            type="text"
                                                            name="dateOfBirth"
                                                            value={formData.dateOfBirth}
                                                            onChange={handleChange}
                                                            placeholder="**/**/1980"
                                                        />
                                                        <Button
                                                            variant="link"
                                                            className="p-0 text-primary"
                                                            style={{ fontSize: '14px' }}
                                                        >
                                                            Thay đổi
                                                        </Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        {/* Địa chỉ */}
                                        <Form.Group className="mb-4 profile-form-group">
                                            <Row>
                                                <Col sm={3}>
                                                    <Form.Label className="profile-label">Địa chỉ</Form.Label>
                                                </Col>
                                                <Col sm={9}>
                                                    <Form.Control
                                                        type="text"
                                                        name="address"
                                                        value={formData.address}
                                                        onChange={handleChange}
                                                        placeholder="Nhập địa chỉ"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>

                                        {/* Submit Button */}
                                        <div className="text-center">
                                            <Button
                                                type="submit"
                                                className="btn-save-profile"
                                            >
                                                Lưu
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

            {activeTab === 'children' && (
                <div>
                    <ProfileHeader
                        title="Quản lý con cái"
                        description="Thông tin các con bạn đang học"
                    />
                    <Card className="profile-card">
                        <Card.Body>
                            <p>Danh sách con cái content here...</p>
                        </Card.Body>
                    </Card>
                </div>
            )}

            {activeTab === 'schedule' && (
                <div>
                    <ProfileHeader
                        title="Lịch học của con"
                        description="Xem và quản lý lịch học của các con"
                    />
                    <Card className="profile-card">
                        <Card.Body>
                            <p>Lịch học content here...</p>
                        </Card.Body>
                    </Card>
                </div>
            )}

            {activeTab === 'payment' && (
                <div>
                    <ProfileHeader
                        title="Quản lý thanh toán"
                        description="Lịch sử thanh toán và hóa đơn"
                    />
                    <Card className="profile-card">
                        <Card.Body>
                            <p>Lịch sử thanh toán content here...</p>
                        </Card.Body>
                    </Card>
                </div>
            )}
        </ProfileLayout>
    )
}
