import { createAsyncThunk } from '@reduxjs/toolkit'
import { communityApi, type FetchPostsParams } from './api'
import { parseApiError } from '../../api/errorHandler'
import type { CreatePostPayload, CreateCommentPayload } from './types'

// Fetch posts with filters and pagination
export const fetchPosts = createAsyncThunk(
  'community/fetchPosts',
  async (params: FetchPostsParams = {}, { rejectWithValue }) => {
    try {
      const response = await communityApi.fetchPosts(params)
      
      // Backend returns: { success, message, data: Post[], pagination: {...} }
      // Map to expected format: { posts, total, page, limit, totalPages }
      return {
        posts: response.data || [],
        total: response.pagination?.total || 0,
        page: response.pagination?.page || 1,
        limit: response.pagination?.limit || 10,
        totalPages: response.pagination?.totalPages || 0
      }
    } catch (error) {
      const apiError = parseApiError(error)
      return rejectWithValue(apiError)
    }
  }
)

// Get single post by ID
export const fetchPostById = createAsyncThunk(
  'community/fetchPostById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await communityApi.getPostById(id)
      return response.data
    } catch (error) {
      const apiError = parseApiError(error)
      return rejectWithValue(apiError)
    }
  }
)

// Create new post
export const createPost = createAsyncThunk(
  'community/createPost',
  async (payload: CreatePostPayload, { rejectWithValue }) => {
    try {
      const response = await communityApi.createPost(payload)
      return response.data
    } catch (error) {
      const apiError = parseApiError(error)
      return rejectWithValue(apiError)
    }
  }
)

// Like/Unlike post
export const likePost = createAsyncThunk(
  'community/likePost',
  async (postId: string, { rejectWithValue }) => {
    try {
      const response = await communityApi.likePost(postId)
      return response.data
    } catch (error) {
      const apiError = parseApiError(error)
      return rejectWithValue(apiError)
    }
  }
)

// Share post
export const sharePost = createAsyncThunk(
  'community/sharePost',
  async (postId: string, { rejectWithValue }) => {
    try {
      const response = await communityApi.sharePost(postId)
      return response.data
    } catch (error) {
      const apiError = parseApiError(error)
      return rejectWithValue(apiError)
    }
  }
)

// Delete post
export const deletePost = createAsyncThunk(
  'community/deletePost',
  async (postId: string, { rejectWithValue }) => {
    try {
      await communityApi.deletePost(postId)
      return postId
    } catch (error) {
      const apiError = parseApiError(error)
      return rejectWithValue(apiError)
    }
  }
)

// Add comment to post
export const addComment = createAsyncThunk(
  'community/addComment',
  async (
    { postId, payload }: { postId: string; payload: CreateCommentPayload },
    { rejectWithValue }
  ) => {
    try {
      const response = await communityApi.addComment(postId, payload)
      return { postId, comment: response.data }
    } catch (error) {
      const apiError = parseApiError(error)
      return rejectWithValue(apiError)
    }
  }
)

// Like/Unlike comment
export const likeComment = createAsyncThunk(
  'community/likeComment',
  async (
    { postId, commentId }: { postId: string; commentId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await communityApi.likeComment(postId, commentId)
      return { postId, commentId, comment: response.data }
    } catch (error) {
      const apiError = parseApiError(error)
      return rejectWithValue(apiError)
    }
  }
)

// Delete comment
export const deleteComment = createAsyncThunk(
  'community/deleteComment',
  async (
    { postId, commentId }: { postId: string; commentId: string },
    { rejectWithValue }
  ) => {
    try {
      await communityApi.deleteComment(postId, commentId)
      return { postId, commentId }
    } catch (error) {
      const apiError = parseApiError(error)
      return rejectWithValue(apiError)
    }
  }
)
