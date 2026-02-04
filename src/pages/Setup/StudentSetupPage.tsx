import { AuthBanner } from '../../shared/components/AuthBanner'
import { StudentProfileForm } from '../../features/profile/components/StudentProfileForm/StudentProfileForm'
import '../Auth/AuthPage.css'

/**
 * StudentSetupPage - Trang điền thông tin student lần đầu sau khi verify OTP
 * Có AuthBanner bên trái, form bên phải (giống trang Auth)
 */
export const StudentSetupPage = () => {
    return (
        <div className="auth-page">
            <AuthBanner />
            <StudentProfileForm />
        </div>
    )
}
