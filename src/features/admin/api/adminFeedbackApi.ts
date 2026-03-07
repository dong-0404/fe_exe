import { apiClient } from '../../../api/client'

export interface AdminFeedbackItem {
  id: string
  authorName: string
  authorEmail: string
  tutorName: string
  rating: number
  comment: string
  createdAt: string
}

interface AdminFeedbackResponse {
  success: boolean
  message: string
  data: {
    items: AdminFeedbackItem[]
    pagination: {
      page: number
      limit: number
    }
  }
}

export const adminFeedbackApi = {
  getFeedbackList: async (params?: { search?: string; page?: number; limit?: number }): Promise<AdminFeedbackResponse> => {
    const query = new URLSearchParams()
    if (params?.search) query.set('search', params.search)
    if (params?.page) query.set('page', String(params.page))
    if (params?.limit) query.set('limit', String(params.limit))

    return apiClient.get<AdminFeedbackResponse>(`/admin/feedbacks?${query.toString()}`)
  },

  deleteFeedback: async (feedbackId: string): Promise<void> => {
    await apiClient.delete(`/admin/feedbacks/${feedbackId}`)
  },
}
