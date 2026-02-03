import { useRef } from 'react'
import { Button } from 'react-bootstrap'
import './AvatarUpload.css'

interface AvatarUploadProps {
    currentAvatar?: string
    onAvatarChange: (file: File) => void
}

export const AvatarUpload = ({ currentAvatar, onAvatarChange }: AvatarUploadProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            onAvatarChange(file)
        }
    }

    const handleButtonClick = () => {
        fileInputRef.current?.click()
    }

    return (
        <div className="avatar-upload-container">
            <div className="avatar-preview">
                {currentAvatar ? (
                    <img src={currentAvatar} alt="Avatar" className="avatar-image" />
                ) : (
                    <div className="avatar-placeholder">
                        <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none">
                            <circle cx="100" cy="100" r="100" fill="#E0E7FF" />
                            <circle cx="100" cy="75" r="35" fill="#6366F1" />
                            <path d="M30 160 Q30 110 100 110 Q170 110 170 160" fill="#6366F1" />
                        </svg>
                    </div>
                )}
            </div>
            
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
            />
            
            <Button 
                variant="outline-primary" 
                className="btn-choose-avatar"
                onClick={handleButtonClick}
            >
                Chọn ảnh
            </Button>
            
            <p className="avatar-note">
                Dụng lượng file tối đa 1 MB<br />
                Định dạng: .JPEG, .PNG
            </p>
        </div>
    )
}
