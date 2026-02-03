import { AuthBanner } from '../../shared/components/AuthBanner'
import { LoginForm } from '../../features/auth/components'
import './AuthPage.css'

export const LoginPage = () => {
    return (
        <div className="auth-page">
            <AuthBanner />
            <LoginForm />
        </div>
    )
}

