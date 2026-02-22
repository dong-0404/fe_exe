import type { RootState } from '../../app/store'
import type { Post } from './types'

export const selectPosts = (state: RootState) => state.community.posts
export const selectCurrentPost = (state: RootState) => state.community.currentPost
export const selectFilters = (state: RootState) => state.community.filters
export const selectCurrentPage = (state: RootState) => state.community.currentPage
export const selectItemsPerPage = (state: RootState) => state.community.itemsPerPage
export const selectLoading = (state: RootState) => state.community.loading
export const selectLoadingPost = (state: RootState) => state.community.loadingPost
export const selectError = (state: RootState) => state.community.error
export const selectUseApi = (state: RootState) => state.community.useApi
export const selectTotalItems = (state: RootState) => state.community.totalItems
export const selectTotalPages = (state: RootState) => state.community.totalPages

// Get paginated posts (for client-side pagination when using mock data)
export const selectPaginatedPosts = (state: RootState): Post[] => {
  const { posts, currentPage, itemsPerPage, useApi } = state.community

  // If using API, data is already paginated from server
  if (useApi) {
    return posts
  }

  // If using mock data, paginate on client
  const startIndex = (currentPage - 1) * itemsPerPage
  return posts.slice(startIndex, startIndex + itemsPerPage)
}

// Get filtered posts (for client-side filtering when using mock data)
export const selectFilteredPosts = (state: RootState): Post[] => {
  const { posts, filters, useApi } = state.community

  // If using API, filtering is done on server
  if (useApi) {
    return posts
  }

  // If using mock data, filter on client
  let filtered = [...posts]

  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(post =>
      filters.tags!.some(tag => post.tags.includes(tag))
    )
  }

  if (filters.postType) {
    filtered = filtered.filter(post => post.postType === filters.postType)
  }

  if (filters.authorId) {
    filtered = filtered.filter(post => post.authorId._id === filters.authorId)
  }

  // Sort
  if (filters.sortBy) {
    filtered.sort((a, b) => {
      let comparison = 0
      switch (filters.sortBy) {
        case 'likes':
          comparison = a.likes - b.likes
          break
        case 'comments':
          comparison = (a.comments?.length || 0) - (b.comments?.length || 0)
          break
        case 'createdAt':
        default:
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          break
      }
      return filters.sortOrder === 'asc' ? comparison : -comparison
    })
  }

  return filtered
}
