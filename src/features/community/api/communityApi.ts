import { apiClient } from '../../../api/client'
import type { CreatePostPayload, CreateCommentPayload, PostsResponse, PostResponse, CommentResponse } from '../types'

// API endpoints
const ENDPOINTS = {
  POSTS: '/community/posts',
  POST: (id: string) => `/community/posts/${id}`,
  POST_LIKE: (id: string) => `/community/posts/${id}/like`,
  POST_SHARE: (id: string) => `/community/posts/${id}/share`,
  COMMENTS: (postId: string) => `/community/posts/${postId}/comments`,
  COMMENT: (postId: string, commentId: string) => `/community/posts/${postId}/comments/${commentId}`,
  COMMENT_LIKE: (postId: string, commentId: string) => `/community/posts/${postId}/comments/${commentId}/like`
} as const

// Request params
export interface FetchPostsParams {
  page?: number
  limit?: number
  tags?: string[]
  postType?: 1 | 2  // 1 = findTutor, 2 = share
  authorId?: string
  sortBy?: 'createdAt' | 'likes' | 'comments'
  sortOrder?: 'asc' | 'desc'
}

// Community API
export const communityApi = {
  // Fetch posts with filters and pagination
  fetchPosts: async (params: FetchPostsParams = {}): Promise<PostsResponse> => {
    return apiClient.get<PostsResponse>(ENDPOINTS.POSTS, { params })
  },

  // Get single post by ID
  getPostById: async (id: string): Promise<PostResponse> => {
    return apiClient.get<PostResponse>(ENDPOINTS.POST(id))
  },

  // Create new post
  createPost: async (payload: CreatePostPayload): Promise<PostResponse> => {
    return apiClient.post<PostResponse>(ENDPOINTS.POSTS, payload)
  },

  // Like/Unlike post
  likePost: async (postId: string): Promise<PostResponse> => {
    return apiClient.post<PostResponse>(ENDPOINTS.POST_LIKE(postId))
  },

  // Share post
  sharePost: async (postId: string): Promise<PostResponse> => {
    return apiClient.post<PostResponse>(ENDPOINTS.POST_SHARE(postId))
  },

  // Delete post
  deletePost: async (postId: string): Promise<{ success: boolean; message: string }> => {
    return apiClient.delete<{ success: boolean; message: string }>(ENDPOINTS.POST(postId))
  },

  // Add comment to post
  addComment: async (postId: string, payload: CreateCommentPayload): Promise<CommentResponse> => {
    return apiClient.post<CommentResponse>(ENDPOINTS.COMMENTS(postId), payload)
  },

  // Like/Unlike comment
  likeComment: async (postId: string, commentId: string): Promise<CommentResponse> => {
    return apiClient.post<CommentResponse>(ENDPOINTS.COMMENT_LIKE(postId, commentId))
  },

  // Delete comment
  deleteComment: async (postId: string, commentId: string): Promise<{ success: boolean; message: string }> => {
    return apiClient.delete<{ success: boolean; message: string }>(ENDPOINTS.COMMENT(postId, commentId))
  }
}
