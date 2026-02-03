import './Footer.css'

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <div className="logo-icon">H</div>
            <span className="logo-text">Bridgy</span>
          </div>
          <p className="footer-description">
            Nền tảng minh bạch, uy tín kết nối gia sư với học sinh. 
            Đồng hành cùng học sinh chinh phục tri thức.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Văn Phòng tại Hà Nội</h4>
          <p className="footer-address">
            123 Đường ABC, Quận XYZ, Hà Nội
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Chính sách</h4>
          <ul className="footer-links">
            <li><a href="#">Chính sách người dùng</a></li>
            <li><a href="#">Điều khoản sử dụng</a></li>
            <li><a href="#">Chính sách bảo mật và quyền riêng tư</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Liên Hệ</h4>
          <p className="footer-contact">
            <a href="mailto:bridgy@gmail.com">bridgy@gmail.com</a>
          </p>
          <p className="footer-contact">
            <a href="tel:0373975603">0373975603</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

