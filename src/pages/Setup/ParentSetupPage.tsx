import { AuthBanner } from '../../shared/components/AuthBanner'
import '../Auth/AuthPage.css'

/**
 * ParentSetupPage - Trang điền thông tin parent lần đầu sau khi verify OTP
 * Có AuthBanner bên trái, form bên phải (giống trang Auth)
 * TODO: Implement ParentProfileForm component
 */
export const ParentSetupPage = () => {
    return (
        <div className="auth-page">
            <AuthBanner />
            <div className="container py-5">
                <h2>Parent Setup Form</h2>
                <p>TODO: Implement parent profile form</p>
            </div>
        </div>
    )
}
