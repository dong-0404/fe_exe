import { createAsyncThunk } from '@reduxjs/toolkit'
import { tutorApi, type SearchTutorsParams } from './api'
import type { TutorFilters } from './types'
import { parseApiError } from '../../api/errorHandler'

// Fetch tutors với pagination (giờ dùng chung searchTutors)
export const fetchTutors = createAsyncThunk(
    'findTutor/fetchTutors',
    async (params: { page: number; limit: number }, { rejectWithValue }) => {
        try {
            const searchParams: SearchTutorsParams = {
                page: params.page,
                limit: params.limit
            }
            const response = await tutorApi.searchTutors(searchParams)
            return response
        } catch (error) {
            const apiError = parseApiError(error)
            return rejectWithValue(apiError)
        }
    }
)

// Search tutors với filters
export const searchTutors = createAsyncThunk(
    'findTutor/searchTutors',
    async (
        params: { filters: TutorFilters; page: number; limit: number },
        { rejectWithValue }
    ) => {
        try {
            const searchParams: SearchTutorsParams = {
                name: params.filters.name,
                subjects: params.filters.subjects,
                grades: params.filters.grades,
                teachingArea: params.filters.teachingArea,
                sortBy: params.filters.sortBy,
                sortOrder: params.filters.sortOrder,
                page: params.page,
                limit: params.limit
            }

            const response = await tutorApi.searchTutors(searchParams)
            return response
        } catch (error) {
            const apiError = parseApiError(error)
            return rejectWithValue(apiError)
        }
    }
)

// Fetch tutor detail (for search/list - simple data)
export const fetchTutorById = createAsyncThunk(
    'findTutor/fetchTutorById',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await tutorApi.getTutorById(id)
            return response.data
        } catch (error) {
            const apiError = parseApiError(error)
            return rejectWithValue(apiError)
        }
    }
)

// Fetch tutor detail (for detail page - full data with certificates)
export const fetchTutorDetail = createAsyncThunk(
    'findTutor/fetchTutorDetail',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await tutorApi.getTutorDetail(id)
            return response.data
        } catch (error) {
            const apiError = parseApiError(error)
            return rejectWithValue(apiError)
        }
    }
)

// Fetch tutor feedbacks with pagination
export const fetchTutorFeedbacks = createAsyncThunk(
    'findTutor/fetchTutorFeedbacks',
    async (params: { tutorId: string; page?: number; limit?: number }, { rejectWithValue }) => {
        try {
            const response = await tutorApi.getTutorFeedbacks(params.tutorId, {
                page: params.page || 1,
                limit: params.limit || 10
            })
            return response.data
        } catch (error) {
            const apiError = parseApiError(error)
            return rejectWithValue(apiError)
        }
    }
)

// Fetch subjects
export const fetchSubjects = createAsyncThunk(
    'findTutor/fetchSubjects',
    async (_, { rejectWithValue }) => {
        try {
            const response = await tutorApi.getSubjects()
            return response.data
        } catch (error) {
            const apiError = parseApiError(error)
            return rejectWithValue(apiError)
        }
    }
)

// Fetch grades
export const fetchGrades = createAsyncThunk(
    'findTutor/fetchGrades',
    async (_, { rejectWithValue }) => {
        try {
            const response = await tutorApi.getGrades()
            return response.data
        } catch (error) {
            const apiError = parseApiError(error)
            return rejectWithValue(apiError)
        }
    }
)

