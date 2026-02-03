import './PrivacyPolicyPage.css'

export const PrivacyPolicyPage = () => {
    return (
        <div className="privacy-policy-page">
            {/* Hero Section */}
            <section className="privacy-hero">
                <div className="container">
                    <h1 className="privacy-title">Chính sách bảo mật</h1>
                    <p className="privacy-intro">
                        TutorLink cam kết tôn trọng và bảo vệ quyền riêng tư của người dùng, bao gồm phụ huynh, gia sư, đối tác và khách truy cập website. Chính sách bảo mật này nhằm 
                        giúp bạn hiểu rõ cách TutorLink thu thập, sử dụng, lưu trữ và bảo vệ thông tin cá nhân khi bạn sử dụng các dịch vụ trên nền tảng TutorLink.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="privacy-content">
                <div className="container">
                    {/* Section 1 */}
                    <div className="content-section">
                        <h2 className="section-title">1. Thu thập thông tin</h2>
                        <p className="section-text">
                            TutorLink thu thập thông tin người dùng thông qua các biểu mẫu được cung cấp trên website, bao gồm nhưng không giới hạn ở các thông tin như: họ tên, số điện 
                            thoại, email, thông tin học tập, thông tin giảng dạy và các dữ liệu cần thiết khác.
                        </p>
                        <p className="section-text">
                            Tất cả biểu mẫu đều được hiển thị minh bạch, rõ ràng và người dùng luôn được thông báo rằng thông tin sẽ được gửi về hệ thống TutorLink khi thực hiện thao tác 
                            nhập và xác nhận.
                        </p>
                    </div>

                    {/* Section 2 */}
                    <div className="content-section">
                        <h2 className="section-title">2. Lưu trữ và bảo mật thông tin</h2>
                        <p className="section-text">
                            Thông tin cá nhân của người dùng được lưu trữ trên hệ thống máy chủ của TutorLink và được bảo vệ bằng các biện pháp kỹ thuật phù hợp nhằm ngăn chặn truy cập 
                            trái phép.
                        </p>
                        <p className="section-text">
                            Đối với mật khẩu tài khoản, TutorLink áp dụng các tiêu chuẩn mã hóa bảo mật trước khi lưu trữ. Sau khi được mã hóa, mật khẩu không thể được giải mã ngược, đảm 
                            bảo chỉ chính chủ tài khoản mới có quyền truy cập.
                        </p>
                        <p className="section-text">
                            TutorLink cam kết thực hiện các biện pháp cần thiết để bảo vệ dữ liệu người dùng trong suốt quá trình lưu trữ và sử dụng.
                        </p>
                    </div>

                    {/* Section 3 */}
                    <div className="content-section">
                        <h2 className="section-title">3. Sử dụng thông tin</h2>
                        <p className="section-text">
                            Thông tin cá nhân được TutorLink sử dụng nhằm mục đích:
                        </p>
                        <ul className="section-list">
                            <li>Kết nối phụ huynh, học sinh với gia sư phù hợp</li>
                            <li>Hỗ trợ gia sư tìm kiếm và nhận lớp giảng dạy</li>
                            <li>Cung cấp, vận hành và cải thiện chất lượng dịch vụ</li>
                            <li>Liên hệ hỗ trợ khi cần thiết</li>
                        </ul>
                        <p className="section-text">
                            TutorLink cam kết không chia sẻ, mua bán hoặc trao đổi thông tin cá nhân của người dùng cho bên thứ ba, ngoại trừ trường hợp có yêu cầu hợp pháp từ cơ quan nhà 
                            nước có thẩm quyền theo quy định của pháp luật.
                        </p>
                    </div>

                    {/* Section 4 */}
                    <div className="content-section">
                        <h2 className="section-title">4. Bảo vệ thông tin</h2>
                        <p className="section-text">
                            TutorLink đặc biệt coi trọng việc bảo vệ quyền riêng tư của trẻ em khi sử dụng Internet. Chúng tôi khuyến khích phụ huynh và người giám hộ chủ động theo dõi, 
                            hướng dẫn và giám sát các hoạt động trực tuyến của trẻ khi sử dụng nền tảng TutorLink.
                        </p>
                    </div>

                    {/* Section 5 */}
                    <div className="content-section">
                        <h2 className="section-title">5. Sự đồng ý của người dùng</h2>
                        <p className="section-text">
                            Bằng việc truy cập và sử dụng website TutorLink, bạn xác nhận đã đọc, hiểu và đồng ý với Chính sách bảo mật này, cũng như các Điều khoản và Điều kiện liên quan 
                            của TutorLink.
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
