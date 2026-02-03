import { apiClient } from '../../../api/client'
import type { Tutor, Subject, Grade, TutorDetailResponse, FeedbacksResponse } from '../types'

// API endpoints
const ENDPOINTS = {
    TUTORS: '/tutors',
    TUTOR_DETAIL: (id: string) => `/tutors/${id}`,
    TUTOR_DETAIL_FULL: (id: string) => `/tutors/${id}/detail`,
    TUTOR_FEEDBACKS: (id: string) => `/tutors/${id}/feedbacks`,
    TUTOR_SEARCH: '/tutors/search',
    SUBJECTS: '/subjects',
    GRADES: '/grades'
} as const

// Request/Response types
export interface SearchTutorsParams {
    name?: string
    subjects?: string  // Subject ID
    grades?: string    // Grade ID
    teachingArea?: string
    page?: number
    limit?: number
    sortBy?: 'hourlyRate' | 'averageRating' | 'createdAt'
    sortOrder?: 'asc' | 'desc'
}

export interface TutorSearchResponse {
    success: boolean
    message: string
    data: {
        tutors: Tutor[]
        total: number
        page: number
        limit: number
        totalPages: number
    }
}

export interface TutorSearchDetailResponse {
    success: boolean
    message: string
    data: Tutor
}

export interface FeedbacksParams {
    page?: number
    limit?: number
}

export interface SubjectsResponse {
    success: boolean
    message: string
    data: Subject[]
}

export interface GradesResponse {
    success: boolean
    message: string
    data: Grade[]
}

export const tutorApi = {
    searchTutors: async (params: SearchTutorsParams): Promise<TutorSearchResponse> => {
        return apiClient.get<TutorSearchResponse>(ENDPOINTS.TUTOR_SEARCH, { params })
    },

    getTutorById: async (id: string): Promise<TutorSearchDetailResponse> => {
        return apiClient.get<TutorSearchDetailResponse>(ENDPOINTS.TUTOR_DETAIL(id))
    },

    // API mới cho tutor detail page (có đầy đủ thông tin hơn)
    getTutorDetail: async (id: string): Promise<TutorDetailResponse> => {
        return apiClient.get<TutorDetailResponse>(ENDPOINTS.TUTOR_DETAIL_FULL(id))
    },

    // API mới cho feedbacks
    getTutorFeedbacks: async (id: string, params?: FeedbacksParams): Promise<FeedbacksResponse> => {
        return apiClient.get<FeedbacksResponse>(ENDPOINTS.TUTOR_FEEDBACKS(id), { params })
    },

    getSubjects: async (): Promise<SubjectsResponse> => {
        return apiClient.get<SubjectsResponse>(ENDPOINTS.SUBJECTS)
    },

    getGrades: async (): Promise<GradesResponse> => {
        return apiClient.get<GradesResponse>(ENDPOINTS.GRADES)
    },

    createTutor: async (data: Partial<Tutor>): Promise<Tutor> => {
        return apiClient.post<Tutor>(ENDPOINTS.TUTORS, data)
    },

    updateTutor: async (id: string, data: Partial<Tutor>): Promise<Tutor> => {
        return apiClient.put<Tutor>(ENDPOINTS.TUTOR_DETAIL(id), data)
    },

    deleteTutor: async (id: string): Promise<void> => {
        return apiClient.delete<void>(ENDPOINTS.TUTOR_DETAIL(id))
    }
}


