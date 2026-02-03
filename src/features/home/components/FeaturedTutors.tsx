import { Card } from 'react-bootstrap'

const tutors = [
  {
    name: 'Thầy: Bùi Văn A',
    quote: 'Chuyên gia Toán học với 10 năm kinh nghiệm',
  },
  {
    name: 'Thầy: Nguyễn Thế Trường',
    quote: 'Giảng viên Vật lý, phương pháp dạy hiện đại',
  },
  {
    name: 'Cô: Đặng Kim Dung',
    quote: 'Chuyên gia Ngữ văn, truyền cảm hứng học tập',
  },
  {
    name: 'Cô: Đặng Tú Anh',
    quote: 'Giáo viên Tiếng Anh, giao tiếp tự nhiên',
  },
]

export const FeaturedTutors = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center text-primary mb-5 fw-bold display-5">Gia Sư Tiêu Biểu</h2>
        <div className="row g-4">
          {tutors.map((tutor, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="bg-secondary rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '120px', height: '120px' }}>
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                      <circle cx="30" cy="30" r="30" fill="#ccc" />
                      <circle cx="30" cy="20" r="10" fill="#999" />
                      <path d="M15 50 Q15 35 30 35 Q45 35 45 50" fill="#999" />
                    </svg>
                  </div>
                  <Card.Title className="text-primary fw-semibold mb-2">{tutor.name}</Card.Title>
                  <Card.Text className="text-muted small fst-italic">{tutor.quote}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
