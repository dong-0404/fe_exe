import { useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { adminUserApi, type AdminParentDetail } from '../../features/admin/api/adminUserApi'
import { routes } from '../../config/routes'

function formatDateInput(date: string | null): string {
  if (!date) return ''
  const d = new Date(date)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

export const AdminParentDetailPage = () => {
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [detail, setDetail] = useState<AdminParentDetail | null>(null)

  const [parentForm, setParentForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    hometown: '',
  })
  const [childForm, setChildForm] = useState({
    id: '',
    fullName: '',
    dateOfBirth: '',
    gender: '',
    grade: '',
    phone: '',
    school: '',
    learningMode: 'online',
    area: '',
  })

  const loadData = async () => {
    if (!userId) return
    const response = await adminUserApi.getParentDetail(userId)
    if (!response.success) return

    const d = response.data
    setDetail(d)
    setParentForm({
      fullName: d.parent.fullName || '',
      email: d.email || '',
      phone: d.phone || '',
      address: d.parent.address || '',
      hometown: d.parent.hometown || '',
    })

    const child = d.children[0]
    setChildForm({
      id: child?.id || '',
      fullName: child?.fullName || '',
      dateOfBirth: formatDateInput(child?.dateOfBirth || null),
      gender: child?.gender ? String(child.gender) : '',
      grade: child?.grade || '',
      phone: child?.phone || d.phone || '',
      school: child?.school || '',
      learningMode: child?.learningMode || 'online',
      area: child?.area || d.parent.address || '',
    })
  }

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true)
        setError(null)
        await loadData()
      } catch (err) {
        console.error(err)
        setError('Không thể tải thông tin chi tiết phụ huynh')
      } finally {
        setLoading(false)
      }
    }
    run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  const handleSubmit = async () => {
    if (!userId) return
    try {
      setSubmitting(true)
      setError(null)
      await adminUserApi.updateParentDetail(userId, {
        fullName: parentForm.fullName,
        phone: parentForm.phone,
        address: parentForm.address,
        child: {
          id: childForm.id,
          fullName: childForm.fullName,
          dateOfBirth: childForm.dateOfBirth || null,
          gender: childForm.gender ? Number(childForm.gender) : null,
          grade: childForm.grade,
          school: childForm.school,
        },
      })
      await loadData()
    } catch (err) {
      console.error(err)
      setError('Không thể cập nhật thông tin phụ huynh')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="py-5 text-center"><Spinner animation="border" /></div>
  if (error || !detail) return <Alert variant="danger">{error || 'Không có dữ liệu'}</Alert>

  return (
    <Card className="border border-primary-subtle shadow-sm" style={{ borderRadius: 0 }}>
      <Card.Body className="p-3 p-md-4">
        <h5 className="fw-semibold text-center mb-3">Thông tin chi tiết phụ huynh</h5>

        <Row className="g-3">
          <Col md={2} className="text-center">
            <img src={detail.parent.avatarUrl || 'https://via.placeholder.com/130x130?text=Avatar'} alt={detail.parent.fullName} style={{ width: 110, height: 110, borderRadius: 8, objectFit: 'cover', border: '1px solid #e5e7eb' }} />
            <div className="small mt-2 text-success fw-semibold">{detail.userStatus === 1 ? 'Trạng thái: Đang hoạt động' : 'Trạng thái: Ngưng hoạt động'}</div>
          </Col>

          <Col md={10}>
            <h6 className="mb-2">Thông tin phụ huynh</h6>
            <Row className="g-2 mb-3">
              <Col md={6}><Form.Label>Họ và tên</Form.Label><Form.Control value={parentForm.fullName} onChange={(e) => setParentForm({ ...parentForm, fullName: e.target.value })} /></Col>
              <Col md={6}><Form.Label>Email</Form.Label><Form.Control value={parentForm.email} disabled /></Col>
              <Col md={6}><Form.Label>Số điện thoại</Form.Label><Form.Control value={parentForm.phone} onChange={(e) => setParentForm({ ...parentForm, phone: e.target.value })} /></Col>
              <Col md={6}><Form.Label>Quê quán</Form.Label><Form.Control value={parentForm.hometown} onChange={(e) => setParentForm({ ...parentForm, hometown: e.target.value })} /></Col>
              <Col md={12}><Form.Label>Địa chỉ</Form.Label><Form.Control value={parentForm.address} onChange={(e) => setParentForm({ ...parentForm, address: e.target.value })} /></Col>
            </Row>

            <h6 className="mb-2">Thông tin học sinh</h6>
            <Row className="g-2 mb-3">
              <Col md={6}><Form.Label>Họ và tên</Form.Label><Form.Control value={childForm.fullName} onChange={(e) => setChildForm({ ...childForm, fullName: e.target.value })} /></Col>
              <Col md={6}><Form.Label>Lớp học</Form.Label><Form.Control value={childForm.grade} onChange={(e) => setChildForm({ ...childForm, grade: e.target.value })} /></Col>
              <Col md={6}><Form.Label>Ngày sinh</Form.Label><Form.Control type="date" value={childForm.dateOfBirth} onChange={(e) => setChildForm({ ...childForm, dateOfBirth: e.target.value })} /></Col>
              <Col md={6}><Form.Label>Số điện thoại</Form.Label><Form.Control value={childForm.phone} onChange={(e) => setChildForm({ ...childForm, phone: e.target.value })} /></Col>
              <Col md={6}><Form.Label>Giới tính</Form.Label><Form.Select value={childForm.gender} onChange={(e) => setChildForm({ ...childForm, gender: e.target.value })}><option value="">Chọn</option><option value="1">Nam</option><option value="2">Nữ</option><option value="3">Khác</option></Form.Select></Col>
              <Col md={6}><Form.Label>Trường học</Form.Label><Form.Control value={childForm.school} onChange={(e) => setChildForm({ ...childForm, school: e.target.value })} /></Col>
              <Col md={6}><Form.Label>Hình thức học</Form.Label><Form.Control value={childForm.learningMode} onChange={(e) => setChildForm({ ...childForm, learningMode: e.target.value })} /></Col>
              <Col md={6}><Form.Label>Khu vực học</Form.Label><Form.Control value={childForm.area} onChange={(e) => setChildForm({ ...childForm, area: e.target.value })} /></Col>
            </Row>
          </Col>
        </Row>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <Button variant="outline-secondary" onClick={() => navigate(`${routes.adminUsers}?role=parent`)} disabled={submitting}>Hủy</Button>
          <Button variant="primary" onClick={handleSubmit} disabled={submitting}>{submitting ? 'Đang xử lý...' : 'Cập nhật'}</Button>
        </div>
      </Card.Body>
    </Card>
  )
}
