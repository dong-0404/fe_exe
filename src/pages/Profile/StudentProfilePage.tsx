import { useState } from 'react'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import { ProfileSidebar } from '../../features/profile/components/ProfileSidebar'
import { ProfileHeader } from '../../features/profile/components/ProfileHeader'
import { AvatarUpload } from '../../features/profile/components/AvatarUpload'
import { getCurrentUser } from '../../features/auth/utils/authHelpers'
import { UserRole } from '../../features/auth/types'
import './ProfilePage.css'

export const StudentProfilePage = () => {
    const currentUser = getCurrentUser()
    const [activeTab, setActiveTab] = useState('profile')

    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        email: currentUser?.email || '',
        phone: currentUser?.phone || '',
        grade: '',
        school: '',
        gender: 1,
        dateOfBirth: '',
        address: '',
        learningMode: 'online',
        avatar: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Save profile:', formData)
        // TODO: Call API to save profile
    }

    const handleAvatarChange = (file: File) => {
        console.log('Avatar selected:', file)
        // TODO: Upload avatar
    }

    return (
        <div className="profile-page">
            <Container fluid className="px-0">
                <Row className="g-0">
                    {/* Sidebar */}
                    <Col lg={3} className="profile-sidebar-col">
                        <ProfileSidebar
                            role={UserRole.STUDENT}
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                        />
                    </Col>

                    {/* Main Content */}
                    <Col lg={9} className="profile-content-col">
                        <div className="profile-content">
                            {activeTab === 'profile' && (
                                <>
                                    <ProfileHeader
                                        title="Hồ sơ của tôi"
                                        description="Quản lý thông tin hồ sơ để bảo mật tài khoản"
                                    />

                                    <Card className="profile-card">
                                        <Card.Body>
                                            <h5 className="section-title mb-4">Thông tin học sinh</h5>

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

                                                        {/* Học sinh lớp */}
                                                        <Form.Group className="mb-3 profile-form-group">
                                                            <Row>
                                                                <Col sm={3}>
                                                                    <Form.Label className="profile-label">Học sinh lớp</Form.Label>
                                                                </Col>
                                                                <Col sm={9}>
                                                                    <div className="d-flex align-items-center gap-2">
                                                                        <Form.Control
                                                                            type="text"
                                                                            name="grade"
                                                                            value={formData.grade}
                                                                            onChange={handleChange}
                                                                            placeholder="7"
                                                                            style={{ width: '80px' }}
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

                                                        {/* Trường học */}
                                                        <Form.Group className="mb-3 profile-form-group">
                                                            <Row>
                                                                <Col sm={3}>
                                                                    <Form.Label className="profile-label">Trường học</Form.Label>
                                                                </Col>
                                                                <Col sm={9}>
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="school"
                                                                        value={formData.school}
                                                                        onChange={handleChange}
                                                                        placeholder="Trung học cơ sở Yên Bình"
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
                                                                            placeholder="**/**/2003"
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

                                                        {/* Khu vực sống */}
                                                        <Form.Group className="mb-3 profile-form-group">
                                                            <Row>
                                                                <Col sm={3}>
                                                                    <Form.Label className="profile-label">Khu vực sống</Form.Label>
                                                                </Col>
                                                                <Col sm={9}>
                                                                    <div className="d-flex align-items-center gap-2">
                                                                        <Form.Control
                                                                            type="text"
                                                                            name="address"
                                                                            value={formData.address}
                                                                            onChange={handleChange}
                                                                            placeholder="Nam Định"
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

                                                        {/* Hình thức học */}
                                                        <Form.Group className="mb-4 profile-form-group">
                                                            <Row>
                                                                <Col sm={3}>
                                                                    <Form.Label className="profile-label">Hình thức học</Form.Label>
                                                                </Col>
                                                                <Col sm={9}>
                                                                    <Form.Select
                                                                        name="learningMode"
                                                                        value={formData.learningMode}
                                                                        onChange={handleChange}
                                                                    >
                                                                        <option value="online">Học trực tuyến</option>
                                                                        <option value="offline">Học tại nhà</option>
                                                                        <option value="both">Cả hai</option>
                                                                    </Form.Select>
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
                                    {/* Password change form will be here */}
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
                                        title="Quản lý lịch học"
                                        description="Xem và quản lý lịch học của bạn"
                                    />
                                    <Card className="profile-card">
                                        <Card.Body>
                                            <p>Lịch học content here...</p>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
