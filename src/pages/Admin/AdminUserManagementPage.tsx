import { useEffect, useMemo, useState } from 'react'
import { Card, Col, Form, InputGroup, Pagination, Row, Spinner, Table, Alert } from 'react-bootstrap'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { adminUserApi, type AdminUserItem } from '../../features/admin/api/adminUserApi'

type RoleTab = 'tutor' | 'parent' | 'student'

const roleConfig: Record<RoleTab, { label: string; value: 1 | 2 | 3 }> = {
  tutor: { label: 'Gia sư', value: 2 },
  parent: { label: 'Phụ huynh', value: 3 },
  student: { label: 'Học sinh', value: 1 },
}

function parseRoleParam(role: string | null): RoleTab {
  if (role === 'parent') return 'parent'
  if (role === 'student') return 'student'
  return 'tutor'
}

function statusStyle(status: number) {
  if (status === 1) {
    return {
      background: '#dcfce7',
      color: '#059669',
      border: '1px solid #86efac',
    }
  }

  if (status === 2) {
    return {
      background: '#fee2e2',
      color: '#dc2626',
      border: '1px solid #fca5a5',
    }
  }

  return {
    background: '#fef3c7',
    color: '#d97706',
    border: '1px solid #fcd34d',
  }
}

export const AdminUserManagementPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [activeRole, setActiveRole] = useState<RoleTab>(parseRoleParam(searchParams.get('role')))
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [items, setItems] = useState<AdminUserItem[]>([])
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const limit = 8

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await adminUserApi.getUserList({
        role: roleConfig[activeRole].value,
        search: search.trim() || undefined,
        status: statusFilter ? Number(statusFilter) : undefined,
        page,
        limit,
      })

      if (response.success) {
        setItems(response.data.items)
        setTotalPages(response.data.pagination.totalPages)
        setTotal(response.data.pagination.total)
      } else {
        setError('Không thể tải danh sách tài khoản')
      }
    } catch (err) {
      console.error(err)
      setError('Không thể tải danh sách tài khoản')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const roleFromQuery = parseRoleParam(searchParams.get('role'))
    if (roleFromQuery !== activeRole) {
      setActiveRole(roleFromQuery)
      setPage(1)
      setStatusFilter('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  useEffect(() => {
    fetchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRole, search, statusFilter, page])

  const handleChangeStatus = async (userId: string, nextStatus: number) => {
    try {
      setUpdatingUserId(userId)
      await adminUserApi.updateUserStatus(userId, nextStatus)
      await fetchUsers()
    } catch (err) {
      console.error(err)
      setError('Không thể cập nhật trạng thái')
    } finally {
      setUpdatingUserId(null)
    }
  }

  const paginationItems = useMemo(() => {
    const arr = []
    for (let i = 1; i <= totalPages; i++) {
      arr.push(
        <Pagination.Item key={i} active={i === page} onClick={() => setPage(i)}>
          {i}
        </Pagination.Item>
      )
    }
    return arr
  }, [page, totalPages])

  const roleTitle = roleConfig[activeRole].label.toLowerCase()
  const roleCodeLabel = activeRole === 'tutor' ? 'Mã gia sư' : activeRole === 'parent' ? 'Mã phụ huynh' : 'Mã học sinh'
  const allowPendingStatus = activeRole === 'tutor'

  return (
    <div>
      <Card className="border border-primary-subtle shadow-sm" style={{ borderRadius: 0 }}>
        <Card.Body className="p-4">
          <h5 className="fw-semibold mb-3" style={{ fontSize: 34 }}>Danh sách {roleTitle}</h5>

          <Row className="g-2 mb-3">
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text>⌕</InputGroup.Text>
                <Form.Control
                  placeholder="Nhập dữ liệu"
                  value={search}
                  onChange={(e) => {
                    setPage(1)
                    setSearch(e.target.value)
                  }}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <Form.Select
                value={statusFilter}
                onChange={(e) => {
                  setPage(1)
                  setStatusFilter(e.target.value)
                }}
              >
                <option value="">Trạng thái hồ sơ</option>
                <option value="1">Đang hoạt động</option>
                <option value="2">Ngưng hoạt động</option>
                {allowPendingStatus && <option value="3">Chờ duyệt</option>}
              </Form.Select>
            </Col>
          </Row>

          {error && <Alert variant="danger">{error}</Alert>}

          {loading ? (
            <div className="py-5 text-center">
              <Spinner animation="border" />
            </div>
          ) : (
            <>
              <Table responsive hover className="align-middle mb-3">
                <thead>
                  <tr>
                    <th>{roleCodeLabel}</th>
                    <th>Họ và tên</th>
                    <th>Số điện thoại</th>
                    <th>Email</th>
                    <th>Khu vực dạy</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr
                      key={item.id}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        if (activeRole === 'tutor') navigate(`/admin/users/tutors/${item.userId}`)
                        if (activeRole === 'parent') navigate(`/admin/users/parents/${item.userId}`)
                        if (activeRole === 'student') navigate(`/admin/users/students/${item.userId}`)
                      }}
                    >
                      <td>{item.code}</td>
                      <td>{item.fullName}</td>
                      <td>{item.phone}</td>
                      <td>{item.email}</td>
                      <td>{item.teachingArea}</td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <Form.Select
                          size="sm"
                          value={item.status}
                          disabled={updatingUserId === item.id}
                          onChange={(e) => handleChangeStatus(item.id, Number(e.target.value))}
                          style={{
                            maxWidth: 170,
                            fontWeight: 600,
                            ...statusStyle(item.status),
                          }}
                        >
                          <option value={1}>Đang hoạt động</option>
                          <option value={2}>Ngưng hoạt động</option>
                          {allowPendingStatus && <option value={3}>Chờ duyệt</option>}
                        </Form.Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">Hiển thị {items.length}/{total}</small>
                <Pagination className="mb-0">
                  <Pagination.Prev onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1} />
                  {paginationItems}
                  <Pagination.Next onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages} />
                </Pagination>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}
