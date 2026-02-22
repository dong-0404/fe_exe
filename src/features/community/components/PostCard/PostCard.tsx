import { useState } from 'react'
import type { Post } from '../../types'
import { formatTimeAgo, getPostTypeDisplay } from '../../types'
import { PostActions } from '../PostActions'
import { CommentSection } from '../CommentSection'
import { ImageLightbox } from '../ImageLightbox'
import './PostCard.css'

interface PostCardProps {
  post: Post
  currentUserId?: string
  onLike: (postId: string) => void
  onComment: (postId: string, content: string, parentId?: string) => void
  onLikeComment: (postId: string, commentId: string) => void
  onDeleteComment: (postId: string, commentId: string) => void
  onShare: (postId: string) => void
  onEdit?: (post: Post) => void
  onDelete?: (postId: string) => void
}

export const PostCard = ({
  post,
  currentUserId,
  onLike,
  onComment,
  onLikeComment,
  onDeleteComment,
  onShare,
  onEdit,
  onDelete
}: PostCardProps) => {
  const [showComments, setShowComments] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Handle missing author data
  if (!post.authorId) {
    console.error('❌ Post missing author data:', post)
    return (
      <div className="post-card">
        <div className="post-card__error">
          Bài viết thiếu thông tin tác giả
        </div>
      </div>
    )
  }

  const isLiked = currentUserId ? post.likedBy?.includes(currentUserId) : false
  const isAuthor = currentUserId ? post.authorId._id === currentUserId : false

  const handleLike = () => {
    onLike(post._id)
  }

  const handleComment = () => {
    setShowComments(!showComments)
  }

  const handleShare = () => {
    onShare(post._id)
  }

  const handleAddComment = (content: string, parentId?: string) => {
    onComment(post._id, content, parentId)
  }

  const handleLikeComment = (commentId: string) => {
    onLikeComment(post._id, commentId)
  }

  const handleDeleteComment = (commentId: string) => {
    onDeleteComment(post._id, commentId)
  }

  const handleImageClick = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const handleLightboxNext = () => {
    if (post.images && lightboxIndex < post.images.length - 1) {
      setLightboxIndex(lightboxIndex + 1)
    }
  }

  const handleLightboxPrev = () => {
    if (lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1)
    }
  }

  return (
    <div className="post-card">
      <div className="post-card__header">
        <div className="post-card__author">
          {post.authorId.avatarUrl ? (
            <img
              src={post.authorId.avatarUrl}
              alt={post.authorId.fullName}
              className="post-card__avatar"
            />
          ) : (
            <div className="post-card__avatar-placeholder">
              {post.authorId.fullName.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="post-card__author-info">
            <div className="post-card__author-name">{post.authorId.fullName}</div>
            <div className="post-card__meta">
              <span className="post-card__type">{getPostTypeDisplay(post.postType)}</span>
              <span className="post-card__time">{formatTimeAgo(post.createdAt)}</span>
            </div>
          </div>
        </div>
        {isAuthor && (
          <div className="post-card__menu">
            {onEdit && (
              <button
                className="post-card__menu-btn"
                onClick={() => onEdit(post)}
                aria-label="Edit"
              >
                ✏️
              </button>
            )}
            {onDelete && (
              <button
                className="post-card__menu-btn"
                onClick={() => onDelete(post._id)}
                aria-label="Delete"
              >
                🗑️
              </button>
            )}
          </div>
        )}
      </div>

      <div className="post-card__content">
        <p className="post-card__text">{post.content}</p>

        {post.tags.length > 0 && (
          <div className="post-card__tags">
            {post.tags.map((tag) => (
              <span key={tag} className="post-card__tag">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {post.images && post.images.length > 0 && (
          <div className={`post-card__images post-card__images--${post.images.length === 1 ? 'single' : 'multiple'}`}>
            {post.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Post image ${index + 1}`}
                className="post-card__image"
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
        )}
      </div>

      <PostActions
        likes={post.likes}
        commentsCount={post.commentsCount}
        shares={post.shares}
        isLiked={isLiked}
        onLike={handleLike}
        onComment={handleComment}
        onShare={handleShare}
        onEdit={onEdit ? () => onEdit(post) : undefined}
        onDelete={onDelete ? () => onDelete(post._id) : undefined}
        showEditDelete={isAuthor}
      />

      {showComments && (
        <CommentSection
          postId={post._id}
          comments={post.comments || []}
          currentUserId={currentUserId}
          onAddComment={handleAddComment}
          onLikeComment={handleLikeComment}
          onDeleteComment={handleDeleteComment}
        />
      )}

      {lightboxOpen && post.images && (
        <ImageLightbox
          images={post.images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNext={handleLightboxNext}
          onPrev={handleLightboxPrev}
        />
      )}
    </div>
  )
}
