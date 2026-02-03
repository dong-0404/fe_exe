import './AboutPage.css'

export const AboutPage = () => {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <h1 className="about-title">Giới thiệu về TutorLink</h1>
                    <p className="about-intro">
                        TutorLink là nền tảng kết nối gia sư – phụ huynh – học sinh, được xây dựng với định hướng ứng dụng công nghệ vào quản lý và tuyển chọn gia sư một cách minh bạch, 
                        hiệu quả và chuyên nghiệp.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="about-content">
                <div className="container">
                    {/* Section 1 */}
                    <div className="content-section">
                        <h2 className="section-title">1. Gia sư TutorLink</h2>
                        <p className="section-text">
                            TutorLink hướng tới trở thành nền tảng gia sư uy tín và chất lượng, nơi hội tụ đội ngũ gia sư có kiến thức chuyên môn vững vàng, kỹ năng giảng dạy tốt và tinh thần 
                            trách nhiệm cao.
                        </p>
                        <p className="section-text">
                            Chiến lược phát triển của TutorLink được xây dựng trên 3 yếu tố cốt lõi:
                        </p>
                        <ul className="section-list">
                            <li>Chất lượng gia sư là ưu tiên hàng đầu</li>
                            <li>Trải nghiệm và sự hài lòng của phụ huynh – học sinh</li>
                            <li>Bảo vệ quyền lợi và giá trị nghề nghiệp của gia sư</li>
                        </ul>
                        <p className="section-text">
                            Thông qua việc chuẩn hóa quy trình tuyển chọn và quản lý, TutorLink mang đến sự khác biệt rõ ràng so với các mô hình gia sư truyền thống.
                        </p>
                    </div>

                    {/* Section 2 */}
                    <div className="content-section">
                        <h2 className="section-title">2. Đối với phụ huynh & học sinh</h2>
                        <ul className="section-list">
                            <li>
                                TutorLink cung cấp giải pháp tìm kiếm gia sư đáng tin cậy, phù hợp với nhu cầu học tập cụ thể. Mỗi gia sư đều có hồ sơ rõ ràng, được xét duyệt và đánh giá dựa trên 
                                thông tin, năng lực và phản hồi thực tế.
                            </li>
                            <li>
                                Sự tiện bổ của học sinh và sự an tâm của phụ huynh là mục tiêu mà TutorLink luôn hướng tới.
                            </li>
                        </ul>
                    </div>

                    {/* Section 3 */}
                    <div className="content-section">
                        <h2 className="section-title">3. Đối với gia sư</h2>
                        <p className="section-text">
                            TutorLink tạo ra môi trường làm việc minh bạch và công bằng cho gia sư. Thông tin lớp học được hiển thị đầy đủ trước khi nhận lớp, giúp gia sư chủ động lựa chọn 
                            công việc phù hợp với năng lực và thời gian của mình.
                        </p>
                        <p className="section-text">
                            Quyền lợi của gia sư luôn được đảm bảo trong các tính năng phát sinh, đồng thời mức thu nhập được xây dựng xứng đáng với công sức và chất lượng giảng dạy.
                        </p>
                    </div>

                    {/* Section 4 */}
                    <div className="content-section">
                        <h2 className="section-title">4. Đối với đội ngũ văn hành</h2>
                        <p className="section-text">
                            TutorLink xây dựng môi trường làm việc chuyên nghiệp, để cao tinh thần trách nhiệm và sáng tạo. Nhân sự được đào tạo thường xuyên về chuyên môn, kỹ năng và quy 
                            trình để đảm bảo chất lượng dịch vụ ở mức cao nhất.
                        </p>
                    </div>

                    {/* Section 5 */}
                    <div className="content-section">
                        <h2 className="section-title">5. Đối với cộng đồng</h2>
                        <p className="section-text">
                            TutorLink mong muốn đóng góp tích cực cho xã hội bằng cách nâng cao chất lượng giáo dục, tạo thêm cơ hội việc làm cho sinh viên và giáo viên, đồng thời hỗ trợ học 
                            sinh tiếp cận phương pháp học tập hiệu quả hơn.
                        </p>
                    </div>

                    {/* Vision Section */}
                    <div className="content-section vision-section">
                        <h2 className="section-title">Tầm nhìn & phát triển</h2>
                        <p className="section-text">
                            Với nền tảng công nghệ linh hoạt và định hướng phát triển dài hạn, TutorLink không ngừng hoàn thiện hệ thống để nâng cao trải nghiệm người dùng và chất lượng 
                            dịch vụ.
                        </p>
                        <p className="section-text">
                            Trong giai đoạn đầu, TutorLink tập trung phát triển tại các khu vực trọng điểm. Trong tương lai, nền tảng sẽ được mở rộng trên toàn quốc, hướng tới trở thành hệ sinh 
                            thái gia sư trực tuyến hàng đầu tại Việt Nam.
                        </p>
                    </div>

                    {/* Contact Section */}
                    <div className="contact-section">
                        <h3 className="contact-title">Thông tin liên hệ:</h3>
                        <div className="contact-info">
                            <p className="contact-item">
                                <span className="contact-icon">📞</span>
                                <strong>Hotline/Zalo:</strong> 0963069400
                            </p>
                            <p className="contact-item">
                                <span className="contact-icon">✉️</span>
                                <strong>Email:</strong> tutorlink@gmail.com
                            </p>
                            <p className="contact-item">
                                <span className="contact-icon">📍</span>
                                <strong>Địa chỉ:</strong> Số 6 ngõ 15 Vương Thừa Vũ, Thanh Xuân, Hà Nội
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
