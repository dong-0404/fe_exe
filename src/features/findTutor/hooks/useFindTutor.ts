import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  selectPaginatedTutors,
  selectTotalPages,
  selectCurrentPage,
  selectFilters,
  selectLoading,
  selectError,
  selectUseApi,
  selectItemsPerPage,
  selectTotalItems,
  selectSubjects,
  selectGrades,
  selectLoadingSubjects,
  selectLoadingGrades
} from '../findTutorSelector'
import { setFilters, setCurrentPage, setUseApi, clearError } from '../findTutorSlice'
import { fetchTutors, searchTutors, fetchSubjects, fetchGrades } from '../findTutorThunks'
import type { TutorFilters } from '../types'

// Global flag để track xem đã fetch initial data chưa
let hasInitializedGlobal = false

export const useFindTutor = () => {
  const dispatch = useAppDispatch()
  const tutors = useAppSelector(selectPaginatedTutors)
  const totalPages = useAppSelector(selectTotalPages)
  const currentPage = useAppSelector(selectCurrentPage)
  const filters = useAppSelector(selectFilters)
  const loading = useAppSelector(selectLoading)
  const error = useAppSelector(selectError)
  const useApi = useAppSelector(selectUseApi)
  const itemsPerPage = useAppSelector(selectItemsPerPage)
  const totalItems = useAppSelector(selectTotalItems)
  const subjects = useAppSelector(selectSubjects)
  const grades = useAppSelector(selectGrades)
  const loadingSubjects = useAppSelector(selectLoadingSubjects)
  const loadingGrades = useAppSelector(selectLoadingGrades)

  useEffect(() => {
    if (!hasInitializedGlobal) {
      hasInitializedGlobal = true
      dispatch(fetchTutors({ page: 1, limit: itemsPerPage }))
      dispatch(fetchSubjects())
      dispatch(fetchGrades())
    }
  }, [dispatch, itemsPerPage])

  const handleSearch = (newFilters: TutorFilters) => {
    if (useApi) {
      // Search qua API
      dispatch(searchTutors({
        filters: newFilters,
        page: 1,
        limit: itemsPerPage
      }))
    } else {
      // Filter local
      dispatch(setFilters(newFilters))
    }
  }

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page))

    if (useApi) {
      // Có filters thì search, không thì fetch all
      const hasFilters = Object.keys(filters).some(key => filters[key as keyof TutorFilters])

      if (hasFilters) {
        dispatch(searchTutors({
          filters,
          page,
          limit: itemsPerPage
        }))
      } else {
        dispatch(fetchTutors({ page, limit: itemsPerPage }))
      }
    }
  }

  const enableApi = () => {
    dispatch(setUseApi(true))
  }

  const disableApi = () => {
    dispatch(setUseApi(false))
  }

  const dismissError = () => {
    dispatch(clearError())
  }

  return {
    tutors,
    totalPages,
    currentPage,
    filters,
    loading,
    error,
    useApi,
    totalItems,
    subjects,
    grades,
    loadingSubjects,
    loadingGrades,
    handleSearch,
    handlePageChange,
    enableApi,
    disableApi,
    dismissError
  }
}



