import { AuthBanner } from '../../shared/components/AuthBanner'
import { RegisterForm } from '../../features/auth/components'
import './AuthPage.css'

export const RegisterPage = () => {
    return (
        <div className="auth-page">
            <AuthBanner />
            <RegisterForm />
        </div>
    )
}

