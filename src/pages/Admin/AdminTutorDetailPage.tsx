import { useEffect, useMemo, useState } from 'react'
import { Alert, Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { adminUserApi, type AdminTutorDetail } from '../../features/admin/api/adminUserApi'
import { routes } from '../../config/routes'

type DetailTab = 'general' | 'experience' | 'pricing'

const defaultSubjects = ['Toán', 'Văn', 'Tiếng Anh', 'Vật lý', 'Hóa học', 'Sinh học', 'Lịch sử', 'Địa lý', 'Tin học']
const defaultGrades = Array.from({ length: 12 }, (_, i) => `Lớp ${i + 1}`)
const dayOptions = [
  { value: 2, label: 'Thứ 2' },
  { value: 3, label: 'Thứ 3' },
  { value: 4, label: 'Thứ 4' },
  { value: 5, label: 'Thứ 5' },
  { value: 6, label: 'Thứ 6' },
  { value: 7, label: 'Thứ 7' },
  { value: 8, label: 'Chủ nhật' },
]

function formatDateInput(date: string | null): string {
  if (!date) return ''
  const d = new Date(date)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

export const AdminTutorDetailPage = () => {
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState<DetailTab>('general')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [detail, setDetail] = useState<AdminTutorDetail | null>(null)
  const [subjectOptions, setSubjectOptions] = useState<string[]>(defaultSubjects)
  const [gradeOptions, setGradeOptions] = useState<string[]>(defaultGrades)
  const [selfThought, setSelfThought] = useState('')

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    placeOfBirth: '',
    address: '',
    teachingArea: '',
    identityNumber: '',
    bio: '',
    hourlyRate: '',
    subjects: [] as string[],
    grades: [] as string[],
    availableDays: [] as number[],
  })

  const certificate = detail?.certificates?.[0]

  const loadData = async () => {
    if (!userId) return
    const [detailRes, refRes] = await Promise.all([
      adminUserApi.getTutorDetail(userId),
      adminUserApi.getReferenceData(),
    ])

    if (detailRes.success) {
      const d = detailRes.data
      setDetail(d)
      setForm({
        fullName: d.fullName || '',
        email: d.email || '',
        phone: d.phone || '',
        dateOfBirth: formatDateInput(d.dateOfBirth),
        gender: d.gender ? String(d.gender) : '',
        placeOfBirth: d.placeOfBirth || '',
        address: d.address || '',
        teachingArea: d.teachingArea || '',
        identityNumber: d.identityNumber || '',
        bio: d.bio || '',
        hourlyRate: d.hourlyRate ? String(d.hourlyRate) : '',
        subjects: d.subjects || [],
        grades: d.grades || [],
        availableDays: d.availableDays || [],
      })
      setSelfThought(d.bio || '')
    }

    if (refRes.success) {
      setSubjectOptions(refRes.data.subjects.length ? refRes.data.subjects : defaultSubjects)
      setGradeOptions(refRes.data.grades.length ? refRes.data.grades : defaultGrades)
    }
  }

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true)
        setError(null)
        await loadData()
      } catch (err) {
        console.error(err)
        setError('Không thể tải chi tiết gia sư')
      } finally {
        setLoading(false)
      }
    }
    run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  const toggleValue = (arr: string[], value: string) => arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value]
  const toggleDay = (arr: number[], value: number) => arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value]

  const actionLabel = detail?.userStatus === 3 ? 'Duyệt hồ sơ' : 'Cập nhật'

  const handleSubmit = async () => {
    if (!userId || !detail) return
    try {
      setSubmitting(true)
      setError(null)

      if (detail.userStatus === 3) {
        await adminUserApi.updateUserStatus(userId, 1)
      }

      await adminUserApi.updateTutorDetail(userId, {
        fullName: form.fullName,
        phone: form.phone,
        dateOfBirth: form.dateOfBirth || null,
        gender: form.gender ? Number(form.gender) : null,
        placeOfBirth: form.placeOfBirth,
        address: form.address,
        teachingArea: form.teachingArea,
        identityNumber: form.identityNumber,
        bio: form.bio,
        hourlyRate: form.hourlyRate ? Number(form.hourlyRate) : 0,
        subjects: form.subjects,
        grades: form.grades,
        availableDays: form.availableDays,
      })

      await loadData()
    } catch (err) {
      console.error(err)
      setError('Không thể cập nhật thông tin gia sư')
    } finally {
      setSubmitting(false)
    }
  }

  const educationStatus = certificate?.educationStatus || 0
  const certificateImages = useMemo(() => (certificate?.images || []).slice(0, 2), [certificate?.images])

  if (loading) return <div className="py-5 text-center"><Spinner animation="border" /></div>
  if (error || !detail) return <Alert variant="danger">{error || 'Không có dữ liệu'}</Alert>

  return (
    <Card className="border border-primary-subtle shadow-sm" style={{ borderRadius: 0 }}>
      <Card.Body className="p-3 p-md-4">
        <h5 className="fw-semibold text-center mb-2">Thông tin chi tiết gia sư</h5>

        <div className="d-flex gap-4 mb-3" style={{ borderBottom: '1px solid #d1d5db' }}>
          <button type="button" className="btn btn-link p-0 pb-1 text-decoration-none" onClick={() => setActiveTab('general')} style={{ color: activeTab === 'general' ? '#0d6efd' : '#4b5563' }}>Thông tin chung</button>
          <button type="button" className="btn btn-link p-0 pb-1 text-decoration-none" onClick={() => setActiveTab('experience')} style={{ color: activeTab === 'experience' ? '#0d6efd' : '#4b5563' }}>Kinh nghiệm/Sở trường</button>
          <button type="button" className="btn btn-link p-0 pb-1 text-decoration-none" onClick={() => setActiveTab('pricing')} style={{ color: activeTab === 'pricing' ? '#0d6efd' : '#4b5563' }}>Chi phí</button>
        </div>

        {activeTab === 'general' && (
          <Row className="g-3">
            <Col md={2} className="text-center">
              <img src={detail.avatarUrl || 'https://via.placeholder.com/130x130?text=Avatar'} alt={detail.fullName} style={{ width: 110, height: 110, borderRadius: 8, objectFit: 'cover', border: '1px solid #e5e7eb' }} />
              <div className="small mt-2 text-warning fw-semibold">{detail.userStatus === 3 ? 'Trạng thái chờ duyệt' : detail.userStatus === 1 ? 'Đang hoạt động' : 'Ngưng hoạt động'}</div>
            </Col>

            <Col md={10}>
              <h6>Thông tin cá nhân</h6>
              <Row className="g-2 mb-3">
                <Col md={6}><Form.Label>Họ và tên</Form.Label><Form.Control value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} /></Col>
                <Col md={6}><Form.Label>Email</Form.Label><Form.Control value={form.email} disabled /></Col>
                <Col md={6}><Form.Label>Ngày sinh</Form.Label><Form.Control type="date" value={form.dateOfBirth} onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })} /></Col>
                <Col md={6}><Form.Label>Số điện thoại</Form.Label><Form.Control value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Col>
                <Col md={6}><Form.Label>Giới tính</Form.Label><Form.Select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}><option value="">Chọn</option><option value="1">Nam</option><option value="2">Nữ</option><option value="3">Khác</option></Form.Select></Col>
                <Col md={6}><Form.Label>Nơi sinh</Form.Label><Form.Control value={form.placeOfBirth} onChange={(e) => setForm({ ...form, placeOfBirth: e.target.value })} /></Col>
                <Col md={6}><Form.Label>Địa chỉ</Form.Label><Form.Control value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></Col>
                <Col md={6}><Form.Label>Khu vực dạy</Form.Label><Form.Control value={form.teachingArea} onChange={(e) => setForm({ ...form, teachingArea: e.target.value })} /></Col>
              </Row>

              <h6>Thông tin định danh</h6>
              <Row className="g-2 mb-3">
                <Col md={6}><Form.Label>CCCD</Form.Label><Form.Control value={form.identityNumber} onChange={(e) => setForm({ ...form, identityNumber: e.target.value })} /></Col>
              </Row>

              <h6>Thông tin giảng dạy</h6>
              <div className="mb-2 fw-medium">Môn dạy</div>
              <Row className="mb-3">
                {subjectOptions.map((s) => (
                  <Col md={4} key={s} className="mb-1"><Form.Check type="checkbox" label={s} checked={form.subjects.includes(s)} onChange={() => setForm({ ...form, subjects: toggleValue(form.subjects, s) })} /></Col>
                ))}
              </Row>

              <div className="mb-2 fw-medium">Lớp dạy</div>
              <Row className="mb-3">
                {gradeOptions.map((g) => (
                  <Col md={4} key={g} className="mb-1"><Form.Check type="checkbox" label={g} checked={form.grades.includes(g)} onChange={() => setForm({ ...form, grades: toggleValue(form.grades, g) })} /></Col>
                ))}
              </Row>

              <div className="mb-2 fw-medium">Thời gian giảng dạy</div>
              <Row className="mb-3">
                {dayOptions.map((d) => (
                  <Col md={3} key={d.value} className="mb-1"><Form.Check type="checkbox" label={d.label} checked={form.availableDays.includes(d.value)} onChange={() => setForm({ ...form, availableDays: toggleDay(form.availableDays, d.value) })} /></Col>
                ))}
              </Row>

              <h6>Thông tin bằng cấp</h6>
              <Row className="g-2 mb-2">
                <Col md={6}><Form.Label>Trường đại học</Form.Label><Form.Control value={certificate?.schoolName || ''} readOnly /></Col>
                <Col md={6}><Form.Label>Ngành đang học</Form.Label><Form.Control value={certificate?.major || ''} readOnly /></Col>
              </Row>

              <div className="mb-2 fw-medium">Trình độ học tập</div>
              <div className="d-flex gap-5 mb-3">
                <Form.Check type="radio" label="Sinh viên" checked={educationStatus === 1} disabled />
                <Form.Check type="radio" label="Đã tốt nghiệp" checked={educationStatus === 2} disabled />
              </div>

              <div className="mb-2 fw-medium">Thông tin chứng chỉ</div>
              <Row className="g-2">
                {certificateImages.map((img) => (
                  <Col md={3} key={img}><img src={img} alt="certificate" style={{ width: '100%', height: 170, objectFit: 'cover', border: '1px solid #e5e7eb' }} /></Col>
                ))}
                <Col md={3}>
                  <div style={{ height: 170, border: '1px solid #d1d5db', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: '#4b5563' }}>
                    + Thêm hình ảnh
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        )}

        {activeTab === 'experience' && (
          <>
            <Form.Label className="fw-semibold">Kinh nghiệm/Sở trường</Form.Label>
            <Form.Control as="textarea" rows={4} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Nhập kinh nghiệm/sở trường của bạn" className="mb-3" />

            <Form.Label className="fw-semibold">Cảm nghĩ của bạn về bản thân</Form.Label>
            <Form.Control as="textarea" rows={4} value={selfThought} onChange={(e) => setSelfThought(e.target.value)} placeholder="Nhập cảm nghĩ" />
          </>
        )}

        {activeTab === 'pricing' && (
          <Row className="g-2">
            <Col md={6}><Form.Label>Học phí theo giờ</Form.Label><Form.Control type="number" value={form.hourlyRate} onChange={(e) => setForm({ ...form, hourlyRate: e.target.value })} /></Col>
          </Row>
        )}

        <div className="d-flex justify-content-end gap-2 mt-3">
          <Button variant="outline-secondary" onClick={() => navigate(`${routes.adminUsers}?role=tutor`)} disabled={submitting}>Hủy</Button>
          <Button variant="primary" onClick={handleSubmit} disabled={submitting}>{submitting ? 'Đang xử lý...' : actionLabel}</Button>
        </div>
      </Card.Body>
    </Card>
  )
}
