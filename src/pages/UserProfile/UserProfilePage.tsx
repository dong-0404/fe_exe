import { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useStartChat } from '../../features/chat/hooks'
import { PostFeed } from '../../features/community/components'
import { useCommunity } from '../../features/community/hooks'
import type { User } from '../../features/community/types'
import { routes } from '../../config/routes'
import './UserProfilePage.css'

export const UserProfilePage = () => {
  const { userId } = useParams<{ userId: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const { startChat } = useStartChat()

  const [userInfo, setUserInfo] = useState<User | null>(null)

  const currentUserId = localStorage.getItem('userId') || undefined

  const {
    posts,
    loading: postsLoading,
    error: communityError,
    hasMore,
    loadPosts,
    loadMore,
    setFilters,
    likePost,
    addComment,
    likeComment,
    deleteComment,
    sharePost,
    deletePost
  } = useCommunity()

  const stateUser = location.state?.user as User | undefined

  useEffect(() => {
    if (!userId) return
    if (stateUser && stateUser._id === userId) {
      setUserInfo(stateUser)
    }
    setFilters({ authorId: userId })
    loadPosts({ page: 1, limit: 20, filters: { authorId: userId } })
  }, [userId])

  useEffect(() => {
    if (userInfo) return
    if (stateUser && stateUser._id === userId) {
      setUserInfo(stateUser)
      return
    }
    if (posts.length > 0 && posts[0].authorId) {
      setUserInfo(posts[0].authorId)
    } else if (!postsLoading && posts.length === 0 && userId) {
      setUserInfo({
        _id: userId,
        email: '',
        fullName: 'Người dùng',
        avatarUrl: undefined,
        role: undefined
      })
    }
  }, [posts, postsLoading, stateUser, userId, userInfo])

  const handleMessage = async () => {
    if (!userId) return
    await startChat(userId)
  }

  const handleLikePost = async (postId: string) => {
    try {
      await likePost(postId).unwrap()
    } catch (err) {
      console.error('Failed to like post:', err)
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

  const handleSharePost = async (postId: string) => {
    try {
      await sharePost(postId).unwrap()
    } catch (err) {
      console.error('Failed to share post:', err)
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) return
    try {
      await deletePost(postId).unwrap()
    } catch (err) {
      console.error('Failed to delete post:', err)
    }
  }

  if (!userId) {
    return (
      <div className="user-profile-page">
        <div className="user-profile-error">Không tìm thấy người dùng</div>
        <button className="btn btn-primary mt-3" onClick={() => navigate(routes.community)}>
          Quay lại Cộng đồng
        </button>
      </div>
    )
  }

  if (postsLoading && !userInfo && !stateUser) {
    return (
      <div className="user-profile-page">
        <div className="user-profile-loading">Đang tải...</div>
      </div>
    )
  }

  if (communityError && !userInfo) {
    return (
      <div className="user-profile-page">
        <div className="user-profile-error">{communityError}</div>
        <button className="btn btn-primary mt-3" onClick={() => navigate(routes.community)}>
          Quay lại Cộng đồng
        </button>
      </div>
    )
  }

  const displayName = userInfo?.fullName || userInfo?.email?.split('@')[0] || 'Người dùng'
  const isOwnProfile = currentUserId === userId

  if (!userInfo) {
    return (
      <div className="user-profile-page">
        <div className="user-profile-loading">Đang tải...</div>
      </div>
    )
  }

  return (
    <div className="user-profile-page">
      <div className="user-profile-cover" />

      <div className="user-profile-content">
        <div className="user-profile-header">
          <div className="user-profile-avatar-wrapper">
            {userInfo?.avatarUrl ? (
              <img
                src={userInfo.avatarUrl}
                alt={displayName}
                className="user-profile-avatar"
              />
            ) : (
              <div className="user-profile-avatar-placeholder">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="user-profile-info">
            <h1 className="user-profile-name">{displayName}</h1>
            {!isOwnProfile && (
              <button
                className="user-profile-message-btn"
                onClick={handleMessage}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>Nhắn tin</span>
              </button>
            )}
          </div>
        </div>

        <div className="user-profile-posts">
          <h2 className="user-profile-posts-title">Bài viết của {displayName}</h2>
          <PostFeed
            posts={posts}
            currentUserId={currentUserId}
            loading={postsLoading}
            onLike={handleLikePost}
            onComment={handleAddComment}
            onLikeComment={handleLikeComment}
            onDeleteComment={handleDeleteComment}
            onShare={handleSharePost}
            onDelete={isOwnProfile ? handleDeletePost : undefined}
            onLoadMore={hasMore ? loadMore : undefined}
            hasMore={hasMore}
          />
        </div>
      </div>
    </div>
  )
}
