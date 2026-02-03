import { AuthBanner } from '../../shared/components/AuthBanner'
import { StudentProfileForm } from '../../features/profile/components'
import '../Auth/AuthPage.css'

export const StudentProfilePage = () => {
    return (
        <div className="auth-page">
            <AuthBanner />
            <StudentProfileForm />
        </div>
    )
}

