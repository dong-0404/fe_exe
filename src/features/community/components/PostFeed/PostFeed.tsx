import { useEffect, useRef } from 'react'
import type { Post } from '../../types'
import { PostCard } from '../PostCard'
import './PostFeed.css'

interface PostFeedProps {
  posts: Post[]
  currentUserId?: string
  loading?: boolean
  onLike: (postId: string) => void
  onComment: (postId: string, content: string, parentId?: string) => void
  onLikeComment: (postId: string, commentId: string) => void
  onDeleteComment: (postId: string, commentId: string) => void
  onShare: (postId: string) => void
  onEdit?: (post: Post) => void
  onDelete?: (postId: string) => void
  onLoadMore?: () => void
  hasMore?: boolean
}

export const PostFeed = ({
  posts,
  currentUserId,
  loading = false,
  onLike,
  onComment,
  onLikeComment,
  onDeleteComment,
  onShare,
  onEdit,
  onDelete,
  onLoadMore,
  hasMore = false
}: PostFeedProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!onLoadMore || !hasMore) return

    const currentLoadMoreRef = loadMoreRef.current

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          onLoadMore()
        }
      },
      { threshold: 0.1 }
    )

    if (currentLoadMoreRef) {
      observerRef.current.observe(currentLoadMoreRef)
    }

    return () => {
      if (observerRef.current && currentLoadMoreRef) {
        observerRef.current.unobserve(currentLoadMoreRef)
      }
    }
  }, [onLoadMore, hasMore, loading])

  // Handle undefined or null posts
  if (!posts || !Array.isArray(posts)) {
    return (
      <div className="post-feed">
        <div className="post-feed__loading">Đang tải...</div>
      </div>
    )
  }

  if (loading && posts.length === 0) {
    return (
      <div className="post-feed">
        <div className="post-feed__loading">Đang tải...</div>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="post-feed">
        <div className="post-feed__empty">Chưa có bài viết nào</div>
      </div>
    )
  }

  return (
    <div className="post-feed">
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          currentUserId={currentUserId}
          onLike={onLike}
          onComment={onComment}
          onLikeComment={onLikeComment}
          onDeleteComment={onDeleteComment}
          onShare={onShare}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}

      {hasMore && (
        <div ref={loadMoreRef} className="post-feed__load-more">
          {loading && <div className="post-feed__loading">Đang tải thêm...</div>}
        </div>
      )}
    </div>
  )
}
