import { useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { adminUserApi, type AdminStudentDetail } from '../../features/admin/api/adminUserApi'
import { routes } from '../../config/routes'

function formatDateInput(date: string | null): string {
  if (!date) return ''
  const d = new Date(date)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

export const AdminStudentDetailPage = () => {
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [detail, setDetail] = useState<AdminStudentDetail | null>(null)
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    grade: '',
    school: '',
  })

  const loadData = async () => {
    if (!userId) return
    const response = await adminUserApi.getStudentDetail(userId)
    if (!response.success) return

    const d = response.data
    setDetail(d)
    setForm({
      fullName: d.student.fullName || '',
      email: d.email || '',
      phone: d.phone || '',
      dateOfBirth: formatDateInput(d.student.dateOfBirth),
      gender: d.student.gender ? String(d.student.gender) : '',
      grade: d.student.grade || '',
      school: d.student.school || '',
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
        setError('Không thể tải thông tin chi tiết học sinh')
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
      await adminUserApi.updateStudentDetail(userId, {
        fullName: form.fullName,
        phone: form.phone,
        dateOfBirth: form.dateOfBirth || null,
        gender: form.gender ? Number(form.gender) : null,
        grade: form.grade,
        school: form.school,
      })
      await loadData()
    } catch (err) {
      console.error(err)
      setError('Không thể cập nhật thông tin học sinh')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="py-5 text-center"><Spinner animation="border" /></div>
  if (error || !detail) return <Alert variant="danger">{error || 'Không có dữ liệu'}</Alert>

  return (
    <Card className="border border-primary-subtle shadow-sm" style={{ borderRadius: 0 }}>
      <Card.Body className="p-3 p-md-4">
        <h5 className="fw-semibold text-center mb-3">Thông tin chi tiết học sinh</h5>

        <Row className="g-3">
          <Col md={2} className="text-center">
            <img src={detail.student.avatarUrl || 'https://via.placeholder.com/130x130?text=Avatar'} alt={detail.student.fullName} style={{ width: 110, height: 110, borderRadius: 8, objectFit: 'cover', border: '1px solid #e5e7eb' }} />
            <div className="small mt-2 text-success fw-semibold">{detail.userStatus === 1 ? 'Trạng thái: Đang hoạt động' : 'Trạng thái: Ngưng hoạt động'}</div>
          </Col>

          <Col md={10}>
            <h6 className="mb-2">Thông tin học sinh</h6>
            <Row className="g-2 mb-3">
              <Col md={6}><Form.Label>Họ và tên</Form.Label><Form.Control value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} /></Col>
              <Col md={6}><Form.Label>Email</Form.Label><Form.Control value={form.email} disabled /></Col>
              <Col md={6}><Form.Label>Ngày sinh</Form.Label><Form.Control type="date" value={form.dateOfBirth} onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })} /></Col>
              <Col md={6}><Form.Label>Số điện thoại</Form.Label><Form.Control value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Col>
              <Col md={6}><Form.Label>Giới tính</Form.Label><Form.Select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}><option value="">Chọn</option><option value="1">Nam</option><option value="2">Nữ</option><option value="3">Khác</option></Form.Select></Col>
              <Col md={6}><Form.Label>Lớp học</Form.Label><Form.Control value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} /></Col>
              <Col md={12}><Form.Label>Trường học</Form.Label><Form.Control value={form.school} onChange={(e) => setForm({ ...form, school: e.target.value })} /></Col>
            </Row>
          </Col>
        </Row>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <Button variant="outline-secondary" onClick={() => navigate(`${routes.adminUsers}?role=student`)} disabled={submitting}>Hủy</Button>
          <Button variant="primary" onClick={handleSubmit} disabled={submitting}>{submitting ? 'Đang xử lý...' : 'Cập nhật'}</Button>
        </div>
      </Card.Body>
    </Card>
  )
}
