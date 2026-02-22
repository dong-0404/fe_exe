import { useEffect, useState } from 'react'
import { useCommunity } from '../../features/community/hooks'
import { CreatePostModal, PostFeed } from '../../features/community/components'
import './CommunityPage.css'

export const CommunityPage = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState<'general' | 'photo' | 'tag' | 'findTutor'>('general')

    const {
        posts,
        loading,
        error,
        hasMore,
        loadPosts,
        createPost,
        likePost,
        sharePost,
        deletePost,
        addComment,
        likeComment,
        deleteComment,
        loadMore
    } = useCommunity()

    // Get current user ID from localStorage (set during login)
    const currentUserId = localStorage.getItem('userId') || undefined

    useEffect(() => {
        // Load initial posts
        loadPosts({ page: 1, limit: 10 })
    }, [loadPosts])

    const handleCreatePost = async (data: {
        content: string
        images: string[]
        tags: string[]
        postType: 'findTutor' | 'share'
    }) => {
        try {
            // Convert postType from string to number for API
            const payload = {
                ...data,
                postType: (data.postType === 'findTutor' ? 1 : 2) as 1 | 2
            }
            await createPost(payload).unwrap()
            // Reload posts to show the new one
            loadPosts({ page: 1, limit: 10 })
        } catch (err) {
            console.error('Failed to create post:', err)
        }
    }

    const handleLikePost = async (postId: string) => {
        try {
            await likePost(postId).unwrap()
        } catch (err) {
            console.error('Failed to like post:', err)
        }
    }

    const handleSharePost = async (postId: string) => {
        try {
            await sharePost(postId).unwrap()
        } catch (err) {
            console.error('Failed to share post:', err)
        }
    }

    const handleDeletePost = async (postId: string) => {
        // Show confirmation dialog
        const confirmed = window.confirm(
            'Bạn có chắc chắn muốn xóa bài viết này?\n\nHành động này không thể hoàn tác.'
        )

        if (!confirmed) {
            return
        }

        try {
            await deletePost(postId).unwrap()
        } catch (err) {
            console.error('Failed to delete post:', err)
            alert('Không thể xóa bài viết. Vui lòng thử lại sau.')
        }
    }

    const handleAddComment = async (postId: string, content: string, parentId?: string) => {
        try {
            await addComment(postId, { content, parentId }).unwrap()
        } catch (err) {
            console.error('Failed to add comment:', err)
        }
    }

    const handleLikeComment = async (postId: string, commentId: string) => {
        try {
            await likeComment(postId, commentId).unwrap()
        } catch (err) {
            console.error('Failed to like comment:', err)
        }
    }

    const handleDeleteComment = async (postId: string, commentId: string) => {
        try {
            await deleteComment(postId, commentId).unwrap()
        } catch (err) {
            console.error('Failed to delete comment:', err)
        }
    }

    return (
        <div className="community-page">
            <div className="community-page__container">
                <div className="community-page__header">
                    <h1>Cộng đồng</h1>
                    <p>Chia sẻ, học hỏi và kết nối với cộng đồng</p>
                </div>

                {/* Create Post Card */}
                <div className="community-page__create-card">
                    <div className="community-page__create-top">
                        <div className="community-page__user-avatar">
                            <div className="community-page__avatar-placeholder">
                                {localStorage.getItem('userEmail')?.charAt(0).toUpperCase() || 'U'}
                            </div>
                        </div>
                        <button
                            className="community-page__create-input"
                            onClick={() => {
                                setModalMode('general')
                                setIsCreateModalOpen(true)
                            }}
                        >
                            Bạn đang nghĩ gì?
                        </button>
                    </div>

                    <div className="community-page__create-divider"></div>

                    <div className="community-page__create-actions">
                        <button
                            className="community-page__action-btn"
                            onClick={() => {
                                setModalMode('photo')
                                setIsCreateModalOpen(true)
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                            </svg>
                            <span>Ảnh/Video</span>
                        </button>
                        <button
                            className="community-page__action-btn"
                            onClick={() => {
                                setModalMode('tag')
                                setIsCreateModalOpen(true)
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                                <line x1="7" y1="7" x2="7.01" y2="7" />
                            </svg>
                            <span>Tags</span>
                        </button>
                        <button
                            className="community-page__action-btn community-page__action-btn--primary"
                            onClick={() => {
                                setModalMode('findTutor')
                                setIsCreateModalOpen(true)
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                            <span>Tìm gia sư</span>
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="community-page__error">
                        {error}
                    </div>
                )}

                <PostFeed
                    posts={posts}
                    currentUserId={currentUserId}
                    loading={loading}
                    onLike={handleLikePost}
                    onComment={handleAddComment}
                    onLikeComment={handleLikeComment}
                    onDeleteComment={handleDeleteComment}
                    onShare={handleSharePost}
                    onDelete={handleDeletePost}
                    onLoadMore={hasMore ? loadMore : undefined}
                    hasMore={hasMore}
                />
            </div>

            <CreatePostModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreatePost}
                isLoading={loading}
                initialMode={modalMode}
            />
        </div>
    )
}
