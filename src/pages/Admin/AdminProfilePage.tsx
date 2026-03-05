import { useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap'
import { adminApi } from '../../features/admin/api/adminApi'

type AdminProfileView = 'profile' | 'edit' | 'password'

export const AdminProfilePage = () => {
  const [view, setView] = useState<AdminProfileView>('profile')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '2003-01-01',
    phone: '',
    gender: 'Nam',
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const loadProfile = async () => {
    const response = await adminApi.getAdminProfile()
    if (response.success) {
      setForm((prev) => ({
        ...prev,
        fullName: response.data.fullName || response.data.email?.split('@')[0] || 'Admin',
        email: response.data.email || '',
        phone: response.data.phone || '',
      }))
    }
  }

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true)
        setError(null)
        await loadProfile()
      } catch (err) {
        console.error(err)
        setError('Không thể tải thông tin tài khoản admin')
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  const handleSaveProfile = async () => {
    try {
      setSaving(true)
      setError(null)
      setSuccess(null)
      await adminApi.updateAdminProfile({ email: form.email, phone: form.phone })
      setSuccess('Cập nhật thông tin thành công')
      setView('profile')
      await loadProfile()
    } catch (err) {
      console.error(err)
      setError('Không thể cập nhật thông tin admin')
    } finally {
      setSaving(false)
    }
  }

  const handleSavePassword = async () => {
    try {
      setSaving(true)
      setError(null)
      setSuccess(null)
      await adminApi.changeAdminPassword(passwordForm)
      setSuccess('Đổi mật khẩu thành công')
      setView('profile')
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      console.error(err)
      setError('Không thể đổi mật khẩu. Vui lòng kiểm tra lại thông tin.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <Card className="border border-primary-subtle shadow-sm" style={{ borderRadius: 12 }}><Card.Body className="p-4">Đang tải...</Card.Body></Card>
  }

  return (
    <Card className="border border-primary-subtle shadow-sm" style={{ borderRadius: 12 }}>
      <Card.Body className="p-4">
        {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
        {success && <Alert variant="success" className="mb-3">{success}</Alert>}

        {view === 'profile' && (
          <>
            <h5 className="text-center fw-semibold mb-3">Thông tin tài khoản</h5>

            <div className="d-flex flex-column align-items-center">
              <img
                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=220&q=80"
                alt="admin-avatar"
                style={{ width: 120, height: 120, borderRadius: 8, objectFit: 'cover', border: '1px solid #e5e7eb' }}
              />

              <div className="mt-3 text-center" style={{ maxWidth: 560 }}>
                <div className="d-flex justify-content-center gap-5 mb-2">
                  <div><span className="fw-semibold">Chức vụ:</span> ADMIN</div>
                  <div><span className="fw-semibold">Email:</span> {form.email}</div>
                </div>
                <div className="d-flex justify-content-center gap-5 mb-3">
                  <div><span className="fw-semibold">Ngày sinh:</span> 15/10/2025</div>
                  <div><span className="fw-semibold">Giới tính:</span> Nữ</div>
                  <div><span className="fw-semibold">Số điện thoại:</span> {form.phone}</div>
                </div>

                <div className="d-flex justify-content-center gap-3">
                  <Button variant="primary" onClick={() => setView('edit')}>Sửa thông tin</Button>
                  <Button variant="danger" onClick={() => setView('password')}>Đổi mật khẩu</Button>
                </div>
              </div>
            </div>
          </>
        )}

        {view === 'edit' && (
          <>
            <h5 className="text-center fw-semibold mb-3">Cập nhật thông tin tài khoản</h5>

            <Row className="g-3 align-items-start">
              <Col md={2} className="text-center">
                <img
                  src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=220&q=80"
                  alt="admin-avatar"
                  style={{ width: 110, height: 110, borderRadius: 8, objectFit: 'cover', border: '1px solid #e5e7eb' }}
                />
                <Button size="sm" variant="outline-secondary" className="mt-2">Chọn ảnh</Button>
              </Col>

              <Col md={10}>
                <Row className="g-2">
                  <Col md={6}>
                    <Form.Label>Họ và tên</Form.Label>
                    <Form.Control value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
                  </Col>
                  <Col md={6}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </Col>
                  <Col md={6}>
                    <Form.Label>Ngày sinh</Form.Label>
                    <Form.Control type="date" value={form.dateOfBirth} onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })} />
                  </Col>
                  <Col md={6}>
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </Col>
                  <Col md={6}>
                    <Form.Label>Giới tính</Form.Label>
                    <Form.Select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                      <option>Nam</option>
                      <option>Nữ</option>
                      <option>Khác</option>
                    </Form.Select>
                  </Col>
                </Row>

                <div className="d-flex justify-content-end gap-2 mt-3">
                  <Button variant="outline-primary" onClick={() => setView('profile')} disabled={saving}>Hủy</Button>
                  <Button variant="primary" onClick={handleSaveProfile} disabled={saving}>{saving ? 'Đang lưu...' : 'Cập nhật'}</Button>
                </div>
              </Col>
            </Row>
          </>
        )}

        {view === 'password' && (
          <>
            <h5 className="text-center fw-semibold mb-3">Đổi mật khẩu</h5>

            <Row className="g-2">
              <Col md={6}>
                <Form.Label>Mật khẩu hiện tại</Form.Label>
                <Form.Control
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                />
              </Col>
              <Col md={6}></Col>
              <Col md={6}>
                <Form.Label>Mật khẩu mới</Form.Label>
                <Form.Control
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                />
              </Col>
              <Col md={6}>
                <Form.Label>Xác nhận mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                />
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button variant="outline-primary" onClick={() => setView('profile')} disabled={saving}>Hủy</Button>
              <Button variant="primary" onClick={handleSavePassword} disabled={saving}>{saving ? 'Đang lưu...' : 'Cập nhật'}</Button>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  )
}
