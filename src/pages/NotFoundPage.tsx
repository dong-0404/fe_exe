import { Link } from 'react-router-dom'
import { routes } from '../config/routes'

export const NotFoundPage = () => {
    return (
        <div className="container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
            <h1 className="display-1 fw-bold">404</h1>
            <p className="fs-4 mb-4">Page Not Found</p>
            <Link to={routes.home} className="btn btn-primary">
                Về trang chủ
            </Link>
        </div>
    )
}

