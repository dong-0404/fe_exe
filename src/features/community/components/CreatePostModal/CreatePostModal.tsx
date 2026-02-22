import { useEffect } from 'react'
import { CreatePostForm } from '../CreatePostForm'
import './CreatePostModal.css'

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: {
    content: string
    images: string[]
    tags: string[]
    postType: 'findTutor' | 'share'
  }) => void
  isLoading?: boolean
  initialMode?: 'general' | 'photo' | 'tag' | 'findTutor'
}

export const CreatePostModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  isLoading = false,
  initialMode = 'general'
}: CreatePostModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleSubmit = (data: {
    content: string
    images: string[]
    tags: string[]
    postType: 'findTutor' | 'share'
  }) => {
    onSubmit(data)
    onClose()
  }

  const getModalTitle = () => {
    switch (initialMode) {
      case 'photo':
        return 'Thêm ảnh/video vào bài viết'
      case 'tag':
        return 'Thêm tags vào bài viết'
      case 'findTutor':
        return 'Tìm gia sư'
      default:
        return 'Tạo bài viết mới'
    }
  }

  return (
    <div className="create-post-modal" onClick={handleBackdropClick}>
      <div className="create-post-modal__content">
        <div className="create-post-modal__header">
          <h2>{getModalTitle()}</h2>
          <button
            className="create-post-modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="create-post-modal__body">
          <CreatePostForm 
            onSubmit={handleSubmit} 
            isLoading={isLoading}
            initialMode={initialMode}
          />
        </div>
      </div>
    </div>
  )
}
