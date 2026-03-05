import { apiClient } from '../../../api/client'

interface MonthlyTrendItem {
  month: string
  students: number
  tutors: number
  parents: number
}

export interface LoyalTutorItem {
  tutorId: string
  fullName: string
  avatarUrl: string | null
  joinedAt: string
  email: string | null
  totalSpent: number
}

export interface AdminOverviewData {
  summary: {
    students: number
    tutors: number
    parents: number
  }
  chart: MonthlyTrendItem[]
  loyalTutors: LoyalTutorItem[]
}

interface AdminOverviewResponse {
  success: boolean
  message: string
  data: AdminOverviewData
}

export interface AdminProfile {
  userId: string
  fullName: string
  email: string
  phone: string
  role: number
  status: number
  dateOfBirth: string | null
  gender: number | null
  avatarUrl: string | null
  createdAt: string
  updatedAt: string
}

interface AdminProfileResponse {
  success: boolean
  message: string
  data: AdminProfile
}

interface CommonResponse {
  success: boolean
  message: string
  data: boolean
}

export const adminApi = {
  getOverviewStatistics: async (): Promise<AdminOverviewResponse> => {
    return apiClient.get<AdminOverviewResponse>('/admin/statistics/overview')
  },

  getAdminProfile: async (): Promise<AdminProfileResponse> => {
    return apiClient.get<AdminProfileResponse>('/admin/profile/me')
  },

  updateAdminProfile: async (payload: { email: string; phone: string }): Promise<AdminProfileResponse> => {
    return apiClient.put<AdminProfileResponse>('/admin/profile/me', payload)
  },

  changeAdminPassword: async (payload: { currentPassword: string; newPassword: string; confirmPassword: string }): Promise<CommonResponse> => {
    return apiClient.put<CommonResponse>('/admin/profile/me/password', payload)
  },
}
