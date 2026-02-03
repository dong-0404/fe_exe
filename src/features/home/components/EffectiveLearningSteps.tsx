import { Card } from 'react-bootstrap'

const learningCards = [
  {
    title: 'KẾT NỐI GIA SƯ PHÙ HỢP',
    items: [
      'Lựa chọn gia sư theo môn học, trình độ',
      'Xem hồ sơ, đánh giá, lịch học minh bạch',
      'Đặt lịch nhanh chóng, xác nhận dễ dàng'
    ]
  },
  {
    title: 'HỌC TẬP CHỦ ĐỘNG',
    items: [
      'Giao tiếp 1-1 với gia sư qua video hoặc gặp trực tiếp',
      'Bài học thiết kế cá nhân hóa theo năng lực',
      'Không khí học tích cực, tương tác liên tục'
    ]
  },
  {
    title: 'LUYỆN TẬP & HỎI ĐÁP',
    items: [
      'Làm bài tập sau mỗi buổi học',
      'Hỏi đáp trực tiếp với gia sư hoặc hỗ trợ online',
      'Theo dõi tiến bộ qua hệ thống điểm và nhận xét'
    ]
  },
  {
    title: 'ĐÁNH GIÁ & CẢI THIỆN',
    items: [
      'Báo cáo tiến độ sau mỗi giai đoạn',
      'Đề xuất điều chỉnh nội dung học',
      'Giúp học viên tự tin và tiến bộ rõ rệt'
    ]
  }
]

export const EffectiveLearningSteps = () => {
  return (
    <section className="py-5" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="container">
        <h2 className="text-center text-primary mb-5 fw-bold" style={{ fontSize: '2.5rem' }}>
          Các bước học tập hiệu quả
        </h2>
        <div className="row g-4">
          {learningCards.map((card, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <Card className="h-100 border-0 shadow-sm rounded-4">
                <Card.Body className="p-4">
                  <Card.Title className="text-primary fw-bold mb-4" style={{ fontSize: '1.1rem' }}>
                    {card.title}
                  </Card.Title>
                  <ul className="list-unstyled mb-0">
                    {card.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="mb-3 d-flex align-items-start">
                        <span className="text-success me-2 fw-bold" style={{ fontSize: '1.2rem' }}>✓</span>
                        <span className="text-dark" style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
