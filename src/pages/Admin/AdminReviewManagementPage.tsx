import { useEffect, useState } from 'react'
import { Alert, Card, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import { adminReviewApi, type AdminFeedbackItem, type AdminFeedbackTutorItem } from '../../features/admin/api/adminReviewApi'

function formatDate(date: string): string {
  return new Date(date).toLocaleString('vi-VN')
}

function ratingStars(rating: number): string {
  const safe = Math.max(1, Math.min(5, rating || 5))
  return '★'.repeat(safe)
}

export const AdminReviewManagementPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [timeFilter, setTimeFilter] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const selectedTutorId = searchParams.get('tutorId')
  const [selectedTutor, setSelectedTutor] = useState<AdminFeedbackTutorItem | null>(null)
  const [tutors, setTutors] = useState<AdminFeedbackTutorItem[]>([])
  const [items, setItems] = useState<AdminFeedbackItem[]>([])

  const fetchTutors = async () => {
    const res = await adminReviewApi.getFeedbackTutors(search)
    if (res.success) setTutors(res.data)
  }

  const fetchFeedbacks = async (tutorId: string) => {
    const res = await adminReviewApi.getFeedbacks({ tutorId, search, page: 1, limit: 100 })
    if (res.success) setItems(res.data.items)
  }

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true)
        setError(null)

        if (!selectedTutorId) {
          setSelectedTutor(null)
          setItems([])
          await fetchTutors()
        } else {
          const tutorRes = await adminReviewApi.getFeedbackTutors()
          if (tutorRes.success) {
            const found = tutorRes.data.find((t) => t.tutorId === selectedTutorId) || null
            setSelectedTutor(found)
          }
          await fetchFeedbacks(selectedTutorId)
        }
      } catch (err) {
        console.error(err)
        setError('Không thể tải dữ liệu đánh giá')
      } finally {
        setLoading(false)
      }
    }

    const timeout = setTimeout(run, 250)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, selectedTutorId])

  const filteredByTime = items.filter((it) => {
    if (!timeFilter) return true
    if (timeFilter === 'today') return new Date(it.createdAt).toDateString() === new Date().toDateString()
    if (timeFilter === 'week') return Date.now() - new Date(it.createdAt).getTime() <= 7 * 24 * 60 * 60 * 1000
    return true
  })

  const handleDelete = async (id: string) => {
    if (!selectedTutorId) return
    try {
      setDeletingId(id)
      await adminReviewApi.deleteFeedback(id)
      await fetchFeedbacks(selectedTutorId)
    } catch (err) {
      console.error(err)
      setError('Không thể xóa đánh giá')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <Card className="border border-primary-subtle shadow-sm" style={{ borderRadius: 12 }}>
      <Card.Body>
        <h5 className="fw-semibold mb-3">Danh sách đánh giá</h5>

        <Row className="g-2 mb-3">
          <Col md={4}>
            <InputGroup>
              <InputGroup.Text>⌕</InputGroup.Text>
              <Form.Control placeholder="Nhập dữ liệu" value={search} onChange={(e) => setSearch(e.target.value)} />
            </InputGroup>
          </Col>
          <Col md={3}>
            <Form.Select disabled>
              <option>Thời gian đánh giá</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
              <option value="">Chọn thời gian</option>
              <option value="today">Hôm nay</option>
              <option value="week">7 ngày gần đây</option>
            </Form.Select>
          </Col>
        </Row>

        {error && <Alert variant="danger">{error}</Alert>}

        {loading ? (
          <div className="py-5 text-center"><Spinner animation="border" /></div>
        ) : !selectedTutorId ? (
          <div className="d-flex flex-column gap-2">
            {tutors.map((tutor) => (
              <button
                key={tutor.tutorId}
                type="button"
                className="btn btn-light border text-start d-flex justify-content-between align-items-center"
                onClick={() => setSearchParams({ tutorId: tutor.tutorId })}
              >
                <span className="d-flex align-items-center gap-2">
                  <img src={tutor.tutorAvatar || 'https://via.placeholder.com/24x24?text=T'} alt={tutor.tutorName} style={{ width: 24, height: 24, borderRadius: 4 }} />
                  <span>{tutor.tutorName}</span>
                </span>
                <span className="small text-muted">{tutor.totalFeedbacks} đánh giá • {tutor.averageRating}★</span>
              </button>
            ))}
            {tutors.length === 0 && <div className="text-center text-muted py-3">Không có gia sư nào có đánh giá</div>}
          </div>
        ) : (
          <>
            <div className="fw-semibold mb-3">Đánh giá của gia sư: {selectedTutor?.tutorName || '-'}</div>

            <div className="d-flex flex-column gap-3">
              {filteredByTime.map((item) => (
                <div key={item.id} className="border rounded p-2" style={{ borderColor: '#e5e7eb' }}>
                  <div className="d-flex align-items-center gap-2 mb-1 small text-muted">
                    <img src="https://via.placeholder.com/18x18?text=U" alt="author" style={{ width: 18, height: 18, borderRadius: 4 }} />
                    <span>{item.authorName}</span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <div className="small text-muted">{formatDate(item.createdAt)} | <span style={{ color: '#f59e0b' }}>{ratingStars(item.rating)}</span></div>
                    <button
                      type="button"
                      className="btn btn-link p-0 text-danger text-decoration-none"
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      title="Xóa đánh giá"
                    >
                      {deletingId === item.id ? '...' : '🗑'}
                    </button>
                  </div>

                  <div className="small" style={{ whiteSpace: 'pre-wrap' }}>{item.comment}</div>
                </div>
              ))}

              {filteredByTime.length === 0 && <div className="text-center text-muted py-3">Gia sư này chưa có đánh giá phù hợp</div>}
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  )
}
