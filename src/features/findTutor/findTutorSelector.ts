import type { RootState } from '../../app/store'
import type { Tutor } from './types'

export const selectTutors = (state: RootState) => state.findTutor.tutors
export const selectFilteredTutors = (state: RootState) => state.findTutor.filteredTutors
export const selectFilters = (state: RootState) => state.findTutor.filters
export const selectCurrentPage = (state: RootState) => state.findTutor.currentPage
export const selectItemsPerPage = (state: RootState) => state.findTutor.itemsPerPage
export const selectLoading = (state: RootState) => state.findTutor.loading
export const selectError = (state: RootState) => state.findTutor.error
export const selectSelectedTutor = (state: RootState) => state.findTutor.selectedTutor
export const selectUseApi = (state: RootState) => state.findTutor.useApi
export const selectTotalItems = (state: RootState) => state.findTutor.totalItems
export const selectSubjects = (state: RootState) => state.findTutor.subjects
export const selectGrades = (state: RootState) => state.findTutor.grades
export const selectLoadingSubjects = (state: RootState) => state.findTutor.loadingSubjects
export const selectLoadingGrades = (state: RootState) => state.findTutor.loadingGrades

export const selectPaginatedTutors = (state: RootState): Tutor[] => {
  const { filteredTutors, currentPage, itemsPerPage, useApi } = state.findTutor

  // Nếu dùng API, data đã được paginate từ server
  if (useApi) {
    return filteredTutors
  }

  // Nếu dùng mock data, paginate ở client
  const startIndex = (currentPage - 1) * itemsPerPage
  return filteredTutors.slice(startIndex, startIndex + itemsPerPage)
}

export const selectTotalPages = (state: RootState): number => {
  const { totalPages, useApi, filteredTutors, itemsPerPage } = state.findTutor

  // Nếu dùng API, dùng totalPages từ server
  if (useApi) {
    return totalPages
  }

  // Nếu dùng mock data, tính ở client
  return Math.ceil(filteredTutors.length / itemsPerPage)
}

// Tutor detail page selectors
export const selectTutorDetail = (state: RootState) => state.findTutor.tutorDetail
export const selectLoadingDetail = (state: RootState) => state.findTutor.loadingDetail
export const selectFeedbacks = (state: RootState) => state.findTutor.feedbacks
export const selectFeedbackPage = (state: RootState) => state.findTutor.feedbackPage
export const selectFeedbackLimit = (state: RootState) => state.findTutor.feedbackLimit
export const selectFeedbackTotal = (state: RootState) => state.findTutor.feedbackTotal
export const selectFeedbackTotalPages = (state: RootState) => state.findTutor.feedbackTotalPages
export const selectLoadingFeedbacks = (state: RootState) => state.findTutor.loadingFeedbacks
