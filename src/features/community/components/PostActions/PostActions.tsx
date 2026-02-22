import { useState } from 'react'
import './PostActions.css'

interface PostActionsProps {
  likes: number
  commentsCount?: number
  shares: number
  isLiked: boolean
  onLike: () => void
  onComment: () => void
  onShare: () => void
  onEdit?: () => void
  onDelete?: () => void
  showEditDelete?: boolean
}

export const PostActions = ({
  likes,
  commentsCount,
  shares,
  isLiked,
  onLike,
  onComment,
  onShare,
  onEdit,
  onDelete,
  showEditDelete = false
}: PostActionsProps) => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className="post-actions">
      <div className="post-actions__main">
        <button
          className={`post-actions__btn ${isLiked ? 'post-actions__btn--liked' : ''}`}
          onClick={onLike}
          aria-label="Like"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span>{likes}</span>
        </button>

        <button
          className="post-actions__btn"
          onClick={onComment}
          aria-label="Comment"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span>{commentsCount}</span>
        </button>

        <button
          className="post-actions__btn"
          onClick={onShare}
          aria-label="Share"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          <span>{shares}</span>
        </button>
      </div>

      {showEditDelete && (
        <div className="post-actions__menu">
          <button
            className="post-actions__menu-btn"
            onClick={() => {
              setShowMenu(!showMenu)
            }}
            aria-label="More options"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>

          {showMenu && (
            <div className="post-actions__dropdown">
              {onEdit && (
                <button
                  className="post-actions__dropdown-item"
                  onClick={() => {
                    onEdit()
                    setShowMenu(false)
                  }}
                >
                  Chỉnh sửa
                </button>
              )}
              {onDelete && (
                <button
                  className="post-actions__dropdown-item post-actions__dropdown-item--danger"
                  onClick={() => {
                    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
                      onDelete()
                    }
                    setShowMenu(false)
                  }}
                >
                  Xóa
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
