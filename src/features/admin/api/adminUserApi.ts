import { apiClient } from '../../../api/client'

export interface AdminUserItem {
  id: string
  userId: string
  code: string
  fullName: string
  phone: string
  email: string
  teachingArea: string
  status: number
  role: number
  createdAt: string
}

export interface AdminUserPagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

interface AdminUserListData {
  items: AdminUserItem[]
  pagination: AdminUserPagination
}

interface AdminUserListResponse {
  success: boolean
  message: string
  data: AdminUserListData
}

export interface AdminUserListParams {
  role: 1 | 2 | 3
  status?: number
  search?: string
  page?: number
  limit?: number
}

export interface AdminTutorDetail {
  id: string | null
  userId: string
  avatarUrl: string | null
  fullName: string
  email: string
  phone: string
  dateOfBirth: string | null
  gender: number | null
  address: string
  placeOfBirth: string
  identityNumber: string
  teachingArea: string
  profileStatus: number | null
  userStatus: number
  subjects: string[]
  grades: string[]
  availableDays: number[]
  availableTimeSlots: string[]
  bio?: string
  hourlyRate?: number
  certificates: Array<{
    id: string
    schoolName: string
    major: string
    educationStatus: number
    images: string[]
  }>
}

export interface AdminParentDetail {
  userId: string
  email: string
  phone: string
  userStatus: number
  parent: {
    id: string | null
    fullName: string
    avatarUrl: string | null
    dateOfBirth: string | null
    gender: number | null
    address: string
    hometown: string
  }
  children: Array<{
    id: string
    fullName: string
    dateOfBirth: string | null
    gender: number | null
    grade: string
    phone: string
    school: string
    learningMode: string
    area: string
  }>
}

export interface AdminStudentDetail {
  userId: string
  email: string
  phone: string
  userStatus: number
  student: {
    id: string | null
    fullName: string
    avatarUrl: string | null
    dateOfBirth: string | null
    gender: number | null
    grade: string
    school: string
  }
}

interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

interface ReferenceData {
  subjects: string[]
  grades: string[]
}

export const adminUserApi = {
  getReferenceData: async (): Promise<ApiResponse<ReferenceData>> => {
    return apiClient.get<ApiResponse<ReferenceData>>('/admin/reference-data')
  },

  getUserList: async (params: AdminUserListParams): Promise<AdminUserListResponse> => {
    const query = new URLSearchParams()
    query.set('role', String(params.role))

    if (params.status) query.set('status', String(params.status))
    if (params.search) query.set('search', params.search)
    if (params.page) query.set('page', String(params.page))
    if (params.limit) query.set('limit', String(params.limit))

    return apiClient.get<AdminUserListResponse>(`/admin/users?${query.toString()}`)
  },

  getTutorDetail: async (userId: string): Promise<ApiResponse<AdminTutorDetail>> => {
    return apiClient.get<ApiResponse<AdminTutorDetail>>(`/admin/users/tutors/${userId}/detail`)
  },

  updateTutorDetail: async (userId: string, payload: Record<string, unknown>): Promise<ApiResponse<AdminTutorDetail>> => {
    return apiClient.put<ApiResponse<AdminTutorDetail>>(`/admin/users/tutors/${userId}/detail`, payload)
  },

  getParentDetail: async (userId: string): Promise<ApiResponse<AdminParentDetail>> => {
    return apiClient.get<ApiResponse<AdminParentDetail>>(`/admin/users/parents/${userId}/detail`)
  },

  updateParentDetail: async (userId: string, payload: Record<string, unknown>): Promise<ApiResponse<AdminParentDetail>> => {
    return apiClient.put<ApiResponse<AdminParentDetail>>(`/admin/users/parents/${userId}/detail`, payload)
  },

  getStudentDetail: async (userId: string): Promise<ApiResponse<AdminStudentDetail>> => {
    return apiClient.get<ApiResponse<AdminStudentDetail>>(`/admin/users/students/${userId}/detail`)
  },

  updateStudentDetail: async (userId: string, payload: Record<string, unknown>): Promise<ApiResponse<AdminStudentDetail>> => {
    return apiClient.put<ApiResponse<AdminStudentDetail>>(`/admin/users/students/${userId}/detail`, payload)
  },

  updateUserStatus: async (userId: string, status: number): Promise<void> => {
    await apiClient.patch(`/admin/users/${userId}/status`, { status })
  },
}
