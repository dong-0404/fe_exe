// Community Feature Types

// User info for posts and comments
export interface User {
    _id: string
    email: string
    fullName: string
    avatarUrl?: string
    role?: number // 1 = Student, 2 = Tutor, 3 = Parent
}

// Comment structure
export interface Comment {
    _id: string
    postId: string
    authorId: User
    content: string
    likes: number
    likedBy: string[] // Array of user IDs who liked this comment
    parentId?: string // For nested comments/replies
    replies?: Comment[] // Nested replies
    createdAt: string
    updatedAt?: string
}

// Post structure
export interface Post {
    _id: string
    authorId: User
    content: string
    images?: string[] // Array of image URLs
    tags: string[] // e.g., ["Toán", "Văn", "Lớp 9"]
    postType: 1 | 2 // 1 = findTutor (Tôi muốn tìm gia sư), 2 = share (Tôi muốn chia sẻ)
    likes: number
    likedBy: string[] // Array of user IDs who liked this post
    comments?: Comment[]
    commentsCount?: number // Optional: may not be populated in all API responses
    shares: number
    sharedBy: string[] // Array of user IDs who shared this post
    createdAt: string
    updatedAt?: string
}

// Post creation payload
export interface CreatePostPayload {
    content: string
    images?: string[]
    tags: string[]
    postType: 1 | 2  // 1 = findTutor, 2 = share
}

// Comment creation payload
export interface CreateCommentPayload {
    content: string
    parentId?: string // For nested comments
}

// Post filters
export interface PostFilters {
    tags?: string[]
    postType?: 1 | 2  // 1 = findTutor, 2 = share
    authorId?: string
    sortBy?: 'createdAt' | 'likes' | 'comments'
    sortOrder?: 'asc' | 'desc'
}

// API Response types
export interface PostsResponse {
    success: boolean
    message: string
    data: Post[]  // Backend returns posts array directly in data
    pagination: {
        total: number
        page: number
        limit: number
        totalPages: number
    }
}

export interface PostResponse {
    success: boolean
    message: string
    data: Post
}

export interface CommentResponse {
    success: boolean
    message: string
    data: Comment
}

// Helper utilities
export const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return 'Vừa xong'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} phút trước`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} giờ trước`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} ngày trước`

    return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}

export const getPostTypeDisplay = (type: 1 | 2): string => {
    return type === 1 ? 'Tôi muốn tìm gia sư' : 'Tôi muốn chia sẻ'
}
