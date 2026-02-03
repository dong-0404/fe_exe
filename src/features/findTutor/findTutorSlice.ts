import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Tutor, TutorFilters, Subject, Grade, TutorDetail, Feedback } from './types'
import { mockTutors } from './data/mockTutors'
import {
  fetchTutors,
  searchTutors,
  fetchTutorById,
  fetchTutorDetail,
  fetchTutorFeedbacks,
  fetchSubjects,
  fetchGrades
} from './findTutorThunks'
import type { ApiError } from '../../api/errorHandler'

interface FindTutorState {
  tutors: Tutor[]
  filteredTutors: Tutor[]
  filters: TutorFilters
  currentPage: number
  itemsPerPage: number
  totalPages: number
  totalItems: number
  loading: boolean
  error: string | null
  selectedTutor: Tutor | null
  // New state for tutor detail page
  tutorDetail: TutorDetail | null
  loadingDetail: boolean
  feedbacks: Feedback[]
  feedbackPage: number
  feedbackLimit: number
  feedbackTotal: number
  feedbackTotalPages: number
  loadingFeedbacks: boolean
  // Other states
  subjects: Subject[]
  grades: Grade[]
  loadingSubjects: boolean
  loadingGrades: boolean
  // Flag để biết có dùng API hay mock data
  useApi: boolean
}

const initialState: FindTutorState = {
  tutors: mockTutors,
  filteredTutors: mockTutors,
  filters: {},
  currentPage: 1,
  itemsPerPage: 10,
  totalPages: 1,
  totalItems: mockTutors.length,
  loading: false,
  error: null,
  selectedTutor: null,
  // New state for tutor detail page
  tutorDetail: null,
  loadingDetail: false,
  feedbacks: [],
  feedbackPage: 1,
  feedbackLimit: 10,
  feedbackTotal: 0,
  feedbackTotalPages: 0,
  loadingFeedbacks: false,
  // Other states
  subjects: [],
  grades: [],
  loadingSubjects: false,
  loadingGrades: false,
  useApi: true
}

const findTutorSlice = createSlice({
  name: 'findTutor',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<TutorFilters>) => {
      state.filters = action.payload
      state.currentPage = 1
      state.error = null

      // Chỉ filter local nếu không dùng API
      if (!state.useApi) {
        let result = [...state.tutors]

        if (action.payload.name) {
          const name = action.payload.name.toLowerCase()
          result = result.filter(
            (tutor) =>
              tutor.fullName.toLowerCase().includes(name) ||
              (tutor.subjects && tutor.subjects.some((sub) => sub.name.toLowerCase().includes(name))) ||
              tutor.teachingArea.toLowerCase().includes(name)
          )
        }

        if (action.payload.subjects) {
          result = result.filter((tutor) =>
            tutor.subjects && tutor.subjects.some(sub => sub._id === action.payload.subjects)
          )
        }

        if (action.payload.grades) {
          result = result.filter((tutor) =>
            tutor.grades && tutor.grades.some(grade => grade._id === action.payload.grades)
          )
        }

        if (action.payload.teachingArea) {
          result = result.filter((tutor) =>
            tutor.teachingArea.toLowerCase().includes(action.payload.teachingArea!.toLowerCase())
          )
        }

        state.filteredTutors = result
        state.totalItems = result.length
        state.totalPages = Math.ceil(result.length / state.itemsPerPage)
      }
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setUseApi: (state, action: PayloadAction<boolean>) => {
      state.useApi = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
    clearSelectedTutor: (state) => {
      state.selectedTutor = null
    }
  },
  extraReducers: (builder) => {
    // Fetch tutors
    builder
      .addCase(fetchTutors.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTutors.fulfilled, (state, action) => {
        state.loading = false
        state.tutors = action.payload.data.tutors
        state.filteredTutors = action.payload.data.tutors
        state.totalItems = action.payload.data.total
        state.totalPages = action.payload.data.totalPages
        state.currentPage = action.payload.data.page
        state.itemsPerPage = action.payload.data.limit
      })
      .addCase(fetchTutors.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as ApiError)?.message || 'Không thể tải danh sách gia sư'
      })

    // Search tutors
    builder
      .addCase(searchTutors.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchTutors.fulfilled, (state, action) => {
        state.loading = false
        state.filteredTutors = action.payload.data.tutors
        state.totalItems = action.payload.data.total
        state.totalPages = action.payload.data.totalPages
        state.currentPage = action.payload.data.page
        state.itemsPerPage = action.payload.data.limit
      })
      .addCase(searchTutors.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as ApiError)?.message || 'Không thể tìm kiếm gia sư'
      })

    // Fetch tutor by ID
    builder
      .addCase(fetchTutorById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTutorById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedTutor = action.payload
      })
      .addCase(fetchTutorById.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as ApiError)?.message || 'Không thể tải thông tin gia sư'
      })

    // Fetch subjects
    builder
      .addCase(fetchSubjects.pending, (state) => {
        state.loadingSubjects = true
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.loadingSubjects = false
        state.subjects = action.payload
      })
      .addCase(fetchSubjects.rejected, (state) => {
        state.loadingSubjects = false
      })

    // Fetch grades
    builder
      .addCase(fetchGrades.pending, (state) => {
        state.loadingGrades = true
      })
      .addCase(fetchGrades.fulfilled, (state, action) => {
        state.loadingGrades = false
        state.grades = action.payload
      })
      .addCase(fetchGrades.rejected, (state) => {
        state.loadingGrades = false
      })

    // Fetch tutor detail
    builder
      .addCase(fetchTutorDetail.pending, (state) => {
        state.loadingDetail = true
        state.error = null
      })
      .addCase(fetchTutorDetail.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.tutorDetail = action.payload
      })
      .addCase(fetchTutorDetail.rejected, (state, action) => {
        state.loadingDetail = false
        state.error = (action.payload as ApiError)?.message || 'Không thể tải thông tin chi tiết gia sư'
      })

    // Fetch tutor feedbacks
    builder
      .addCase(fetchTutorFeedbacks.pending, (state) => {
        state.loadingFeedbacks = true
        state.error = null
      })
      .addCase(fetchTutorFeedbacks.fulfilled, (state, action) => {
        state.loadingFeedbacks = false
        state.feedbacks = action.payload.feedbacks
        state.feedbackTotal = action.payload.total
        state.feedbackPage = action.payload.page
        state.feedbackLimit = action.payload.limit
        state.feedbackTotalPages = action.payload.totalPages
      })
      .addCase(fetchTutorFeedbacks.rejected, (state, action) => {
        state.loadingFeedbacks = false
        state.error = (action.payload as ApiError)?.message || 'Không thể tải đánh giá'
      })
  }
})

export const {
  setFilters,
  setCurrentPage,
  setLoading,
  setUseApi,
  clearError,
  clearSelectedTutor
} = findTutorSlice.actions

export default findTutorSlice.reducer



