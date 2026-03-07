import { useEffect, useMemo, useState } from 'react'
import { Card, Col, Container, Row, Table, Spinner, Alert } from 'react-bootstrap'
import { adminApi, type AdminOverviewData } from '../../features/admin/api/adminApi'

const roleSeries = [
  { key: 'students', label: 'Học sinh', color: '#2563eb' },
  { key: 'tutors', label: 'Gia sư', color: '#16a34a' },
  { key: 'parents', label: 'Phụ huynh', color: '#f97316' },
] as const

type RoleSeriesKey = (typeof roleSeries)[number]['key']

function formatCurrencyVND(value: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value)
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('vi-VN')
}

function buildLinePath(data: AdminOverviewData['chart'], key: RoleSeriesKey, width: number, height: number, maxValue: number): string {
  if (!data.length || maxValue <= 0) return ''

  return data
    .map((item, index) => {
      const x = (index / Math.max(1, data.length - 1)) * width
      const y = height - ((item[key] || 0) / maxValue) * height
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')
}

function buildAreaPath(data: AdminOverviewData['chart'], key: RoleSeriesKey, width: number, height: number, maxValue: number): string {
  if (!data.length || maxValue <= 0) return ''

  const line = buildLinePath(data, key, width, height, maxValue)
  return `${line} L ${width} ${height} L 0 ${height} Z`
}

export const AdminStatisticsPage = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<AdminOverviewData | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await adminApi.getOverviewStatistics()
        if (response.success) {
          setData(response.data)
        } else {
          setError('Không thể tải dữ liệu thống kê admin')
        }
      } catch (err) {
        console.error(err)
        setError('Không thể tải dữ liệu thống kê admin')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])


  const maxChartValue = useMemo(() => {
    if (!data?.chart?.length) return 0
    return Math.max(
      ...data.chart.flatMap((item) => [item.students, item.tutors, item.parents])
    )
  }, [data])

  const chartHeight = 300
  const effectiveChartWidth = 840

  const hoveredData = hoveredIndex !== null && data?.chart?.[hoveredIndex]
    ? data.chart[hoveredIndex]
    : null

  const handleChartMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (!data?.chart?.length) return

    const rect = event.currentTarget.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const clampedX = Math.max(0, Math.min(mouseX, effectiveChartWidth))

    const ratio = clampedX / effectiveChartWidth
    const nearestIndex = Math.round(ratio * Math.max(1, data.chart.length - 1))
    setHoveredIndex(nearestIndex)
  }

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    )
  }

  if (error || !data) {
    return (
      <Container className="py-4">
        <Alert variant="danger">{error || 'Không có dữ liệu thống kê'}</Alert>
      </Container>
    )
  }

  return (
    <Container fluid className="py-4 px-4" style={{ background: '#f5f6f8', minHeight: '100vh' }}>
      <h3 className="mb-1">Thống kê</h3>
      <p className="text-muted mb-4">Thống kê tổng quan admin</p>

      <Row className="g-3 mb-3">
        <Col md={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="text-muted">Học sinh</div>
              <h3 className="mb-0 text-primary">{data.summary.students.toLocaleString('vi-VN')}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="text-muted">Gia sư</div>
              <h3 className="mb-0 text-success">{data.summary.tutors.toLocaleString('vi-VN')}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="text-muted">Phụ huynh</div>
              <h3 className="mb-0" style={{ color: '#f97316' }}>{data.summary.parents.toLocaleString('vi-VN')}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-3 mb-3">
        <Col md={12}>
          <Card className="border-0 shadow-sm" style={{ borderRadius: 16 }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Biểu đồ tăng trưởng theo tháng</h5>
                <div className="d-flex gap-3 flex-wrap">
                  {roleSeries.map((series) => (
                    <div key={series.key} className="d-flex align-items-center gap-2 px-2 py-1" style={{ background: '#f8fafc', borderRadius: 12 }}>
                      <span
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          display: 'inline-block',
                          backgroundColor: series.color,
                        }}
                      />
                      <span className="small text-muted">{series.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ width: '100%', position: 'relative' }}>
                <svg
                  width="100%"
                  height={chartHeight + 42}
                  viewBox={`0 0 ${effectiveChartWidth} ${chartHeight + 42}`}
                  preserveAspectRatio="none"
                  role="img"
                  aria-label="Biểu đồ học sinh gia sư phụ huynh"
                  onMouseMove={handleChartMouseMove}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{ cursor: 'crosshair', display: 'block' }}
                >
                  <defs>
                    <linearGradient id="studentsArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity="0.24" />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="tutorsArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#16a34a" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="parentsArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  <rect x={0} y={0} width={effectiveChartWidth} height={chartHeight} rx={12} fill="#ffffff" />

                  {[0.2, 0.4, 0.6, 0.8].map((ratio) => (
                    <line
                      key={ratio}
                      x1={0}
                      y1={chartHeight * ratio}
                      x2={effectiveChartWidth}
                      y2={chartHeight * ratio}
                      stroke="#e5e7eb"
                      strokeDasharray="4 6"
                    />
                  ))}

                  <path d={buildAreaPath(data.chart, 'students', effectiveChartWidth, chartHeight, Math.max(1, maxChartValue))} fill="url(#studentsArea)" />
                  <path d={buildAreaPath(data.chart, 'tutors', effectiveChartWidth, chartHeight, Math.max(1, maxChartValue))} fill="url(#tutorsArea)" />
                  <path d={buildAreaPath(data.chart, 'parents', effectiveChartWidth, chartHeight, Math.max(1, maxChartValue))} fill="url(#parentsArea)" />

                  {roleSeries.map((series) => (
                    <path
                      key={series.key}
                      d={buildLinePath(data.chart, series.key, effectiveChartWidth, chartHeight, Math.max(1, maxChartValue))}
                      fill="none"
                      stroke={series.color}
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ))}

                  {hoveredIndex !== null && hoveredData && (
                    <line
                      x1={(hoveredIndex / Math.max(1, data.chart.length - 1)) * effectiveChartWidth}
                      y1={0}
                      x2={(hoveredIndex / Math.max(1, data.chart.length - 1)) * effectiveChartWidth}
                      y2={chartHeight}
                      stroke="#64748b"
                      strokeDasharray="4 4"
                    />
                  )}

                  {hoveredIndex !== null && hoveredData && roleSeries.map((series) => {
                    const cx = (hoveredIndex / Math.max(1, data.chart.length - 1)) * effectiveChartWidth
                    const cy = chartHeight - ((hoveredData[series.key] || 0) / Math.max(1, maxChartValue)) * chartHeight
                    return (
                      <g key={`dot-${series.key}`}>
                        <circle cx={cx} cy={cy} r={8} fill={series.color} fillOpacity={0.15} />
                        <circle cx={cx} cy={cy} r={4.5} fill={series.color} stroke="#fff" strokeWidth={2} />
                      </g>
                    )
                  })}

                  {data.chart.map((item, index) => {
                    const x = (index / Math.max(1, data.chart.length - 1)) * effectiveChartWidth
                    return (
                      <text key={item.month + index} x={x} y={chartHeight + 24} fontSize="12" textAnchor="middle" fill="#64748b">
                        {item.month}
                      </text>
                    )
                  })}
                </svg>

                {hoveredData && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      background: 'rgba(15, 23, 42, 0.96)',
                      color: '#fff',
                      borderRadius: 10,
                      padding: '10px 12px',
                      fontSize: 12,
                      lineHeight: 1.55,
                      pointerEvents: 'none',
                      boxShadow: '0 10px 24px rgba(0,0,0,0.18)',
                    }}
                  >
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>Tháng: {hoveredData.month}</div>
                    <div>Học sinh: {hoveredData.students.toLocaleString('vi-VN')}</div>
                    <div>Gia sư: {hoveredData.tutors.toLocaleString('vi-VN')}</div>
                    <div>Phụ huynh: {hoveredData.parents.toLocaleString('vi-VN')}</div>
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Khách hàng thân thiết (Gia sư)</h5>
                <small className="text-muted">Ưu tiên gia sư tham gia sớm, sau đó xét tổng chi tiêu gói</small>
              </div>

              <Table responsive hover className="mb-0 align-middle">
                <thead>
                  <tr>
                    <th>Tên gia sư</th>
                    <th>Email</th>
                    <th>Thời gian gắn bó</th>
                    <th className="text-end">Tổng chi tiêu gói</th>
                  </tr>
                </thead>
                <tbody>
                  {data.loyalTutors.map((tutor) => (
                    <tr key={tutor.tutorId}>
                      <td>{tutor.fullName}</td>
                      <td>{tutor.email || '-'}</td>
                      <td>{formatDate(tutor.joinedAt)}</td>
                      <td className="text-end">{formatCurrencyVND(tutor.totalSpent)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
