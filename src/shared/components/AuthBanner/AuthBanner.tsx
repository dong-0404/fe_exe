import './AuthBanner.css'

interface AuthBannerProps {
    imageSrc?: string
    alt?: string
}

export const AuthBanner = ({
    imageSrc = '/src/assets/images/back-login.png',
    alt = 'TutorLink Banner'
}: AuthBannerProps) => {
    return (
        <div className="auth-banner">
            <img
                src={imageSrc}
                alt={alt}
                className="auth-banner-image"
            />
        </div>
    )
}

