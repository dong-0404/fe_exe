import { useEffect, useMemo, useState } from 'react'
import { Alert, Button, Card, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap'
import { communityApi } from '../../features/community/api/communityApi'
import type { Post } from '../../features/community/types'

function formatDate(date: string): string {
  return new Date(date).toLocaleString('vi-VN')
}

export const AdminPostManagementPage = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [postTypeFilter, setPostTypeFilter] = useState<string>('')
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null)

  const fetchPosts = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await communityApi.fetchPosts({
        page: 1,
        limit: 50,
        sortBy: 'createdAt',
        sortOrder,
        postType: postTypeFilter ? (Number(postTypeFilter) as 1 | 2) : undefined,
      })

      if (response.success) {
        setPosts(response.data)
      } else {
        setError('Không thể tải danh sách bài đăng')
      }
    } catch (err) {
      console.error(err)
      setError('Không thể tải danh sách bài đăng')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOrder, postTypeFilter])

  const filteredPosts = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return posts

    return posts.filter((post) => {
      const text = [
        post.content,
        post.authorId?.fullName,
        post.authorId?.email,
        ...(post.tags || []),
        ...(post.comments || []).map((c) => c.content),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return text.includes(q)
    })
  }, [posts, search])

  const handleDeletePost = async (postId: string) => {
    try {
      setDeletingPostId(postId)
      await communityApi.deletePost(postId)
      await fetchPosts()
    } catch (err) {
      console.error(err)
      setError('Không thể xóa bài đăng')
    } finally {
      setDeletingPostId(null)
    }
  }

  return (
    <Card className="border border-primary-subtle shadow-sm" style={{ borderRadius: 12 }}>
      <Card.Body>
        <h5 className="fw-semibold mb-3">Danh sách bài đăng</h5>

        <Row className="g-2 mb-3">
          <Col md={4}>
            <InputGroup>
              <InputGroup.Text>⌕</InputGroup.Text>
              <Form.Control placeholder="Nhập dữ liệu" value={search} onChange={(e) => setSearch(e.target.value)} />
            </InputGroup>
          </Col>
          <Col md={3}>
            <Form.Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}>
              <option value="desc">Thời gian đăng gần đây</option>
              <option value="asc">Thời gian đăng cũ hơn</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select value={postTypeFilter} onChange={(e) => setPostTypeFilter(e.target.value)}>
              <option value="">Loại bài đăng</option>
              <option value="1">Bài tìm gia sư</option>
              <option value="2">Bài chia sẻ</option>
            </Form.Select>
          </Col>
        </Row>

        <div
          className="d-grid"
          style={{
            gridTemplateColumns: '1fr 1fr',
            background: '#f3f4f6',
            borderRadius: 6,
            padding: '8px 12px',
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          <div>Bài đăng phụ huynh/học sinh</div>
          <div>Phản hồi của gia sư</div>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        {loading ? (
          <div className="py-5 text-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {filteredPosts.map((post) => (
              <div
                key={post._id}
                className="border"
                style={{ borderColor: '#d1d5db', borderRadius: 14, overflow: 'hidden', background: '#fff' }}
              >
                <div
                  className="d-flex justify-content-between align-items-center px-3 py-2"
                  style={{ borderBottom: '1px solid #e5e7eb' }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={post.authorId?.avatarUrl || 'https://via.placeholder.com/22x22?text=U'}
                      alt={post.authorId?.fullName || 'avatar'}
                      style={{ width: 22, height: 22, borderRadius: 3, objectFit: 'cover' }}
                    />
                    <span className="small text-muted">{post.authorId?.fullName || post.authorId?.email || 'Người dùng'}</span>
                  </div>

                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleDeletePost(post._id)}
                    disabled={deletingPostId === post._id}
                    style={{ borderRadius: 18, fontWeight: 600, padding: '4px 12px' }}
                  >
                    {deletingPostId === post._id ? 'Đang xóa...' : 'Xóa bài đăng'}
                  </Button>
                </div>

                <div className="d-grid" style={{ gridTemplateColumns: '1fr 1.6fr', minHeight: 160 }}>
                  <div className="p-2" style={{ borderRight: '1px solid #e5e7eb' }}>
                    <div className="d-flex flex-wrap gap-1 mb-2">
                      {(post.tags || []).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1"
                          style={{
                            fontSize: 12,
                            borderRadius: 999,
                            background: '#eef2ff',
                            color: '#1d4ed8',
                            border: '1px solid #bfdbfe',
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="small" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.55 }}>
                      {post.content
                        .split('\n')
                        .filter((line) => line.trim().length > 0)
                        .map((line, idx) => (
                          <div key={`${post._id}-line-${idx}`}>• {line.trim()}</div>
                        ))}
                    </div>
                  </div>

                  <div className="p-2 d-flex flex-column gap-2">
                    {(post.comments || []).length === 0 ? (
                      <div className="text-muted small">Chưa có phản hồi</div>
                    ) : (
                      (post.comments || []).map((comment) => (
                        <div key={comment._id} className="border" style={{ borderColor: '#d1d5db' }}>
                          <div className="small text-muted px-2 py-1" style={{ borderBottom: '1px solid #e5e7eb' }}>
                            {formatDate(comment.createdAt)}
                          </div>
                          <div className="px-2 py-1 small">
                            <div className="d-flex align-items-center gap-1 text-muted mb-1">
                              <img
                                src={comment.authorId?.avatarUrl || 'https://via.placeholder.com/14x14?text=U'}
                                alt="avatar"
                                style={{ width: 14, height: 14, borderRadius: 2, objectFit: 'cover' }}
                              />
                              <span>{comment.authorId?.fullName || comment.authorId?.email || 'Gia sư'}</span>
                            </div>
                            <div style={{ whiteSpace: 'pre-wrap' }}>{comment.content}</div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ))}

            {filteredPosts.length === 0 && <div className="text-center text-muted py-3">Không có bài đăng phù hợp</div>}
          </div>
        )}
      </Card.Body>
    </Card>
  )
}
