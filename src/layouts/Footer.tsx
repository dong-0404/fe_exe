import { Link } from 'react-router-dom'
import { routes } from '../config/routes'
import './Footer.css'

export const Footer = () => {
    return (
        <footer className="tutorlink-footer">
            <div className="container">
                <div className="row g-4">
                    {/* Column 1: Contact Info */}
                    <div className="col-lg-3 col-md-6">
                        <h5 className="footer-heading">Liên hệ với chúng tôi</h5>
                        <ul className="footer-list">
                            <li className="footer-item">
                                <strong>SĐT:</strong> 0963069400
                            </li>
                            <li className="footer-item">
                                <strong>Gmail:</strong> tutorlink@gmail.com
                            </li>
                            <li className="footer-item">
                                <strong>Địa chỉ:</strong> Số 6 ngõ 15 Vương Thừa Vũ, Thanh Xuân, Hà Nội
                            </li>
                        </ul>
                    </div>

                    {/* Column 2: About TutorLink */}
                    <div className="col-lg-3 col-md-6">
                        <h5 className="footer-heading">Về TutorLink</h5>
                        <ul className="footer-links">
                            <li>
                                <Link to={routes.about} className="footer-link">Giới thiệu</Link>
                            </li>
                            <li>
                                <Link to={routes.contact} className="footer-link">Liên hệ</Link>
                            </li>
                            <li>
                                <Link to={routes.privacyPolicy} className="footer-link">Chính sách bảo mật</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Why Choose Us */}
                    <div className="col-lg-3 col-md-6">
                        <h5 className="footer-heading">Tại Sao Nên Chọn Chúng Tôi</h5>
                        <ul className="footer-features">
                            <li className="footer-feature">
                                <span className="feature-icon">✓</span>
                                Mạng lưới gia sư nhiều khả năng tính thành
                            </li>
                            <li className="footer-feature">
                                <span className="feature-icon">✓</span>
                                Đã đăng môn học – nhiều cấp độ uy tín, chất lượng
                            </li>
                            <li className="footer-feature">
                                <span className="feature-icon">✓</span>
                                Gia sư được tuyển chọn và xác minh kỹ lưỡng
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Connect With Us */}
                    <div className="col-lg-3 col-md-6">
                        <h5 className="footer-heading">Kết Nối Với Chúng Tôi</h5>
                        <div className="social-links">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a href="mailto:tutorlink@gmail.com" className="social-link" aria-label="Email">
                                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                </svg>
                            </a>
                            <a href="tel:0963069400" className="social-link" aria-label="Phone">
                                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="footer-bottom">
                    <div className="footer-logo-section">
                        <div className="d-flex align-items-center gap-2 mb-2">
                            <div className="footer-logo-icon">
                                <div className="bg-white text-primary rounded d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px' }}>
                                    T
                                </div>
                            </div>
                            <span className="footer-brand">TutorLink</span>
                        </div>
                        <p className="footer-tagline">
                            Nền tảng kết nối gia sư với học sinh minh bạch, uy tín.
                            Đồng hành cùng với các sĩ tử chinh phục kiến thức
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

