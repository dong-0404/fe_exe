import { apiClient } from '../../../api/client'

export interface AdminFeedbackTutorItem {
  tutorId: string
  tutorName: string
  tutorAvatar: string | null
  totalFeedbacks: number
  averageRating: number
}

export interface AdminFeedbackItem {
  id: string
  authorName: string
  authorEmail: string
  tutorId: string
  tutorName: string
  rating: number
  comment: string
  createdAt: string
}

interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export const adminReviewApi = {
  getFeedbackTutors: async (search?: string): Promise<ApiResponse<AdminFeedbackTutorItem[]>> => {
    return apiClient.get<ApiResponse<AdminFeedbackTutorItem[]>>('/admin/feedbacks/tutors', { params: { search } })
  },

  getFeedbacks: async (params: { tutorId?: string; search?: string; page?: number; limit?: number } = {}): Promise<ApiResponse<{ items: AdminFeedbackItem[]; pagination: { page: number; limit: number } }>> => {
    return apiClient.get<ApiResponse<{ items: AdminFeedbackItem[]; pagination: { page: number; limit: number } }>>('/admin/feedbacks', { params })
  },

  deleteFeedback: async (feedbackId: string): Promise<void> => {
    await apiClient.delete(`/admin/feedbacks/${feedbackId}`)
  },
}
