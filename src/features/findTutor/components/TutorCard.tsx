import { Button } from 'react-bootstrap'
import type { Tutor } from '../types'
import { getGenderDisplay } from '../types'

interface TutorCardProps {
  tutor: Tutor
  onRegister?: (tutorId: string) => void
  onViewDetails?: (tutorId: string) => void
}

interface InfoRowProps {
  label: string
  value: React.ReactNode
  bold?: boolean
}

const InfoRow = ({ label, value, bold = false }: InfoRowProps) => (
  <>
    <div className="d-flex align-items-center py-3" style={{ width: '100%' }}>
      <span className="text-dark" style={{ flexShrink: 0 }}>{label}:</span>
      <span
        className={bold ? 'fw-bold text-dark' : 'text-dark'}
        style={{
          textAlign: 'left',
          flex: 1,
          paddingLeft: '250px'
        }}
      >
        {value}
      </span>
    </div>
    <hr className="my-0" style={{ borderColor: '#000', borderWidth: '1px' }} />
  </>
)

export const TutorCard = ({ tutor, onRegister, onViewDetails }: TutorCardProps) => {
  const formatPrice = (price?: number) => {
    if (!price) return '0'
    return price.toLocaleString('vi-VN')
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.getFullYear().toString()
  }

  return (
    <div
      className="mb-4"
      style={{
        backgroundColor: '#FAF9F6',
        borderRadius: '20px',
        padding: '24px',
        maxWidth: '100%',
        border: '2px solid #E0E0E0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      <div className="row g-0">
        {/* Left: Tutor Image */}
        <div className="col-md-4 col-lg-3 pe-md-3">
          <div className="position-relative" style={{ width: '100%', aspectRatio: '3/4' }}>
            <div
              className="position-absolute w-100 h-100"
              style={{
                backgroundColor: '#E0E0E0',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              <svg width="80%" height="80%" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="100" fill="#D0D0D0" />
                <circle cx="100" cy="70" r="30" fill="#999" />
                <path d="M40 160 Q40 120 100 120 Q160 120 160 160" fill="#999" />
              </svg>
            </div>
            {/* Logo placeholder ở góc dưới trái */}
            <div
              className="position-absolute"
              style={{
                bottom: '8px',
                left: '8px',
                width: '45px',
                height: '45px',
                backgroundColor: '#FF8C00',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              <span style={{ color: '#fff', fontSize: '11px', fontWeight: 'bold' }}>Logo</span>
            </div>
          </div>
        </div>

        {/* Right: Tutor Information */}
        <div className="col-md-8 col-lg-9">
          <div style={{ paddingLeft: '16px' }}>
            <InfoRow label="Họ và tên" value={tutor.fullName || 'Chưa cập nhật'} bold />
            <InfoRow label="Năm sinh" value={formatDate(tutor.dateOfBirth)} />
            <InfoRow label="Giới tính" value={getGenderDisplay(tutor.gender)} />
            <div className="py-3">
              <div className="d-flex align-items-start" style={{ width: '100%' }}>
                <span className="text-dark" style={{ flexShrink: 0 }}>Các môn:</span>
                <div
                  className="d-flex flex-wrap gap-4"
                  style={{
                    flex: 1,
                    paddingLeft: '250px',
                    justifyContent: 'left'
                  }}
                >
                  {tutor.subjects && tutor.subjects.length > 0 ? (
                    tutor.subjects.map((subject, index) => (
                      <span
                        key={`${subject._id}-${index}`}
                        style={{
                          backgroundColor: '#E8E8E8',
                          color: '#000',
                          padding: '5px 14px',
                          borderRadius: '6px',
                          fontSize: '0.9rem',
                          fontWeight: 'normal',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {subject.name}
                      </span>
                    ))
                  ) : (
                    <span style={{ color: '#999', fontStyle: 'italic' }}>
                      Chưa có thông tin
                    </span>
                  )}
                </div>
              </div>
            </div>
            <hr className="my-0" style={{ borderColor: '#000', borderWidth: '1px' }} />
            <div className="py-3">
              <div className="d-flex align-items-start" style={{ width: '100%' }}>
                <span className="text-dark" style={{ flexShrink: 0 }}>Lớp dạy:</span>
                <div
                  className="d-flex flex-wrap gap-4"
                  style={{
                    flex: 1,
                    paddingLeft: '250px',
                    justifyContent: 'left'
                  }}
                >
                  {tutor.grades && tutor.grades.length > 0 ? (
                    tutor.grades.map((grade, index) => (
                      <span
                        key={`${grade._id}-${index}`}
                        style={{
                          backgroundColor: '#E8E8E8',
                          color: '#000',
                          padding: '5px 14px',
                          borderRadius: '6px',
                          fontSize: '0.9rem',
                          fontWeight: 'normal',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {grade.name}
                      </span>
                    ))
                  ) : (
                    <span style={{ color: '#999', fontStyle: 'italic' }}>
                      Chưa có thông tin
                    </span>
                  )}
                </div>
              </div>
            </div>
            <hr className="my-0" style={{ borderColor: '#000', borderWidth: '1px' }} />
            <InfoRow label="Khu vực" value={tutor.teachingArea || 'Chưa cập nhật'} />
            <InfoRow
              label="Giá"
              value={`${formatPrice(tutor.hourlyRate)} VNĐ/giờ`}
            />
          </div>

          {/* Action Buttons */}
          <div className="d-flex gap-3 mt-4" style={{ paddingLeft: '16px' }}>
            <Button
              variant="danger"
              className="flex-fill"
              style={{
                borderRadius: '8px',
                padding: '12px',
                fontSize: '1rem',
                fontWeight: 'bold',
                backgroundColor: '#DC3545',
                borderColor: '#DC3545'
              }}
              onClick={() => onRegister?.(tutor._id)}
            >
              Đăng kí học ngay
            </Button>
            <Button
              variant="primary"
              className="flex-fill"
              style={{
                borderRadius: '8px',
                padding: '12px',
                fontSize: '1rem',
                fontWeight: 'bold',
                backgroundColor: '#0066FF',
                borderColor: '#0066FF'
              }}
              onClick={() => onViewDetails?.(tutor._id)}
            >
              Xem chi tiết
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}



