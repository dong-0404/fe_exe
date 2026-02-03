import './ProfileHeader.css'

interface ProfileHeaderProps {
    title: string
    description: string
}

export const ProfileHeader = ({ title, description }: ProfileHeaderProps) => {
    return (
        <div className="profile-header">
            <h2 className="profile-title">{title}</h2>
            <p className="profile-description">{description}</p>
        </div>
    )
}
