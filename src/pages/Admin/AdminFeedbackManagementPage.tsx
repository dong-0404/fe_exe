import { useEffect, useMemo, useState } from 'react'
import { Alert, Card, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap'
import { adminFeedbackApi, type AdminFeedbackItem } from '../../features/admin/api/adminFeedbackApi'

function formatDate(date: string): string {
  return new Date(date).toLocaleString('vi-VN')
}

function renderStars(rating: number): string {
  return '★'.repeat(Math.max(0, Math.min(5, rating)))
}

export const AdminFeedbackManagementPage = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [items, setItems] = useState<AdminFeedbackItem[]>([])
  const [search, setSearch] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await adminFeedbackApi.getFeedbackList({ search, page: 1, limit: 50 })
      if (response.success) {
        setItems(response.data.items)
      }
    } catch (err) {
      console.error(err)
      setError('Không thể tải danh sách đánh giá')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const grouped = useMemo(() => {
    const map = new Map<string, AdminFeedbackItem[]>()
    items.forEach((item) => {
      const key = item.authorName || item.authorEmail
      if (!map.has(key)) map.set(key, [])
      map.get(key)?.push(item)
    })
    return Array.from(map.entries())
  }, [items])

  const handleDelete = async (feedbackId: string) => {
    try {
      setDeletingId(feedbackId)
      await adminFeedbackApi.deleteFeedback(feedbackId)
      await fetchData()
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
            <Form.Select>
              <option>Thời gian đánh giá</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Control type="date" />
          </Col>
        </Row>

        <div className="text-center fw-semibold py-2 mb-3" style={{ background: '#f3f4f6' }}>
          Đánh giá từ phụ huynh/học sinh
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        {loading ? (
          <div className="py-5 text-center"><Spinner animation="border" /></div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {grouped.map(([author, feedbacks]) => (
              <div key={author} className="border rounded p-2" style={{ borderColor: '#e5e7eb' }}>
                <div className="small text-muted mb-2">{author}</div>

                {feedbacks.map((fb) => (
                  <div key={fb.id} className="border rounded p-2 mb-2" style={{ borderColor: '#e5e7eb' }}>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <div className="small text-muted">{formatDate(fb.createdAt)} | <span style={{ color: '#f59e0b' }}>{renderStars(fb.rating)}</span></div>
                      <button
                        type="button"
                        onClick={() => handleDelete(fb.id)}
                        disabled={deletingId === fb.id}
                        style={{ border: 'none', background: 'transparent', color: '#ef4444', fontSize: 16 }}
                      >
                        🗑
                      </button>
                    </div>
                    <div className="small text-muted mb-1">{fb.tutorName}</div>
                    <div className="small" style={{ whiteSpace: 'pre-wrap' }}>{fb.comment}</div>
                  </div>
                ))}
              </div>
            ))}

            {grouped.length === 0 && <div className="text-center text-muted py-3">Không có đánh giá</div>}
          </div>
        )}
      </Card.Body>
    </Card>
  )
}
