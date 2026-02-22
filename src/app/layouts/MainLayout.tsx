import { Link } from 'react-router-dom'
import { routes } from '../../config/routes'
import { Footer } from './Footer'
import './MainLayout.css'

interface MainLayoutProps {
    children: React.ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="main-layout">
            <header className="header">
                <div className="header-container">
                    <Link to={routes.home} className="header-logo">
                        <div className="logo-icon">H</div>
                        <span className="logo-text">Bridgy</span>
                    </Link>
                    <nav className="header-nav">
                        <Link to={routes.home}>Trang chủ</Link>
                        <Link to={routes.findTutor}>Tìm kiếm gia sư</Link>
                        <Link to={routes.community}>Post bài</Link>
                        <Link to={routes.schedule}>Lịch học</Link>
                    </nav>
                    <Link to={routes.login} className="header-login">
                        <span>Đăng nhập</span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z" fill="currentColor" />
                            <path d="M10 12C5.58172 12 2 13.7909 2 16V20H18V16C18 13.7909 14.4183 12 10 12Z" fill="currentColor" />
                        </svg>
                    </Link>
                </div>
            </header>
            <main className="main-content">{children}</main>
            <Footer />
        </div>
    )
}

