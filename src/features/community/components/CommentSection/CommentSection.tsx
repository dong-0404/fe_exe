import { useState } from 'react'
import type { Comment } from '../../types'
import { formatTimeAgo } from '../../types'
import './CommentSection.css'

interface CommentSectionProps {
    postId: string
    comments: Comment[]
    currentUserId?: string
    onAddComment: (content: string, parentId?: string) => void
    onLikeComment: (commentId: string) => void
    onDeleteComment: (commentId: string) => void
    isLoading?: boolean
}

export const CommentSection = ({
    comments,
    currentUserId,
    onAddComment,
    onLikeComment,
    onDeleteComment,
    isLoading = false
}: CommentSectionProps) => {
    const [newComment, setNewComment] = useState('')
    const [replyingTo, setReplyingTo] = useState<string | null>(null)
    const [replyContent, setReplyContent] = useState('')

    const handleSubmitComment = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newComment.trim()) return

        onAddComment(newComment.trim())
        setNewComment('')
    }

    const handleSubmitReply = (e: React.FormEvent, parentId: string) => {
        e.preventDefault()
        if (!replyContent.trim()) return

        onAddComment(replyContent.trim(), parentId)
        setReplyContent('')
        setReplyingTo(null)
    }

    const handleLikeComment = (commentId: string) => {
        onLikeComment(commentId)
    }

    const handleDeleteComment = (commentId: string) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa bình luận này?')) {
            onDeleteComment(commentId)
        }
    }

    const isCommentLiked = (comment: Comment): boolean => {
        return currentUserId ? comment.likedBy.includes(currentUserId) : false
    }

    const canDeleteComment = (comment: Comment): boolean => {
        return currentUserId ? comment.authorId._id === currentUserId : false
    }

    return (
        <div className="comment-section">
            <div className="comment-section__list">
                {comments.length === 0 ? (
                    <div className="comment-section__empty">Chưa có bình luận nào</div>
                ) : (
                    comments.map((comment) => (
                        <CommentItem
                            key={comment._id}
                            comment={comment}
                            currentUserId={currentUserId}
                            isLiked={isCommentLiked(comment)}
                            canDelete={canDeleteComment(comment)}
                            onLike={() => handleLikeComment(comment._id)}
                            onDelete={() => handleDeleteComment(comment._id)}
                            onReply={() => {
                                setReplyingTo(comment._id)
                                setReplyContent('') // Reset content khi chuyển sang comment khác
                            }}
                            isReplying={replyingTo === comment._id}
                            replyContent={replyContent}
                            onReplyChange={setReplyContent}
                            onSubmitReply={(e) => handleSubmitReply(e, comment._id)}
                            onCancelReply={() => {
                                setReplyingTo(null)
                                setReplyContent('')
                            }}
                            isCommentLiked={isCommentLiked}
                            canDeleteComment={canDeleteComment}
                            onLikeComment={handleLikeComment}
                            onDeleteComment={handleDeleteComment}
                            onAddComment={onAddComment}
                            replyingTo={replyingTo}
                            setReplyingTo={setReplyingTo}
                            setReplyContent={setReplyContent}
                        />
                    ))
                )}
            </div>

            <form className="comment-section__input" onSubmit={handleSubmitComment}>
                <input
                    type="text"
                    placeholder="Viết bình luận..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading || !newComment.trim()}>
                    Đăng
                </button>
            </form>
        </div>
    )
}

interface CommentItemProps {
    comment: Comment
    currentUserId?: string
    isLiked: boolean
    canDelete: boolean
    onLike: () => void
    onDelete: () => void
    onReply: () => void
    isReplying: boolean
    replyContent: string
    onReplyChange: (value: string) => void
    onSubmitReply: (e: React.FormEvent) => void
    onCancelReply: () => void
    // Helper functions for nested replies
    isCommentLiked?: (comment: Comment) => boolean
    canDeleteComment?: (comment: Comment) => boolean
    onLikeComment?: (commentId: string) => void
    onDeleteComment?: (commentId: string) => void
    onAddComment?: (content: string, parentId?: string) => void
    replyingTo?: string | null
    setReplyingTo?: (id: string | null) => void
    setReplyContent?: (content: string) => void
}

const CommentItem = ({
    comment,
    currentUserId,
    isLiked,
    canDelete,
    onLike,
    onDelete,
    onReply,
    isReplying,
    replyContent,
    onReplyChange,
    onSubmitReply,
    onCancelReply,
    isCommentLiked,
    canDeleteComment,
    onLikeComment,
    onDeleteComment,
    onAddComment,
    replyingTo,
    setReplyingTo,
    setReplyContent
}: CommentItemProps) => {
    const [showReplies, setShowReplies] = useState(false)
    const hasReplies = comment.replies && comment.replies.length > 0

    return (
        <div className="comment-item">
            <div className="comment-item__avatar">
                {comment.authorId.avatarUrl ? (
                    <img src={comment.authorId.avatarUrl} alt={comment.authorId.fullName} />
                ) : (
                    <div className="comment-item__avatar-placeholder">
                        {comment.authorId.fullName.charAt(0).toUpperCase()}
                    </div>
                )}
            </div>

            <div className="comment-item__content">
                <div className="comment-item__header">
                    <span className="comment-item__author">{comment.authorId.fullName}</span>
                    <span className="comment-item__time">{formatTimeAgo(comment.createdAt)}</span>
                </div>

                <div className="comment-item__text">{comment.content}</div>

                <div className="comment-item__actions">
                    <button
                        className={`comment-item__action ${isLiked ? 'comment-item__action--liked' : ''}`}
                        onClick={onLike}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        <span>{comment.likes}</span>
                    </button>
                    <button className="comment-item__action" onClick={onReply}>
                        Trả lời
                    </button>
                    {canDelete && (
                        <button className="comment-item__action comment-item__action--danger" onClick={onDelete}>
                            Xóa
                        </button>
                    )}
                    {hasReplies && (
                        <button
                            className="comment-item__action comment-item__action--toggle"
                            onClick={() => setShowReplies(!showReplies)}
                        >
                            {showReplies ? '▼' : '▶'} {comment.replies!.length} phản hồi
                        </button>
                    )}
                </div>

                {isReplying && (
                    <form className="comment-item__reply-form" onSubmit={onSubmitReply}>
                        <input
                            type="text"
                            placeholder="Viết phản hồi..."
                            value={replyContent}
                            onChange={(e) => onReplyChange(e.target.value)}
                            autoFocus
                        />
                        <button type="submit" disabled={!replyContent.trim()}>
                            Đăng
                        </button>
                        <button type="button" onClick={onCancelReply}>
                            Hủy
                        </button>
                    </form>
                )}

                {showReplies && comment.replies && comment.replies.length > 0 && isCommentLiked && canDeleteComment && onLikeComment && onDeleteComment && onAddComment && setReplyingTo && setReplyContent && (
                    <div className="comment-item__replies">
                        {comment.replies.map((reply) => (
                            <CommentItem
                                key={reply._id}
                                comment={reply}
                                currentUserId={currentUserId}
                                isLiked={isCommentLiked(reply)}
                                canDelete={canDeleteComment(reply)}
                                onLike={() => onLikeComment(reply._id)}
                                onDelete={() => onDeleteComment(reply._id)}
                                onReply={() => {
                                    // Set replyingTo to this reply's ID, not parent comment's ID
                                    setReplyingTo(reply._id)
                                    setReplyContent('')
                                }}
                                isReplying={replyingTo === reply._id}
                                replyContent={replyContent}
                                onReplyChange={onReplyChange}
                                onSubmitReply={(e) => {
                                    // Submit with this reply's ID as parentId
                                    e.preventDefault()
                                    if (replyContent.trim() && onReplyChange && onCancelReply) {
                                        onAddComment(replyContent.trim(), reply._id)
                                        onReplyChange('')
                                        onCancelReply()
                                    }
                                }}
                                onCancelReply={onCancelReply}
                                isCommentLiked={isCommentLiked}
                                canDeleteComment={canDeleteComment}
                                onLikeComment={onLikeComment}
                                onDeleteComment={onDeleteComment}
                                onAddComment={onAddComment}
                                replyingTo={replyingTo}
                                setReplyingTo={setReplyingTo}
                                setReplyContent={setReplyContent}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
