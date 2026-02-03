// Common API response types

export interface ApiResponse<T> {
    data: T
    message?: string
    statusCode?: number
}

export interface PaginationParams {
    page?: number
    limit?: number
    sort?: string
    order?: 'asc' | 'desc'
}

// Railway API Response Structure
export interface PaginatedResponse<T> {
    data: T[]
    metadata: {
        page: number
        size: number
        totalElements: number
        totalPages: number
        lastPage: boolean
        isLastPage: boolean
    }
}

export type ApiListResponse<T> = ApiResponse<PaginatedResponse<T>>

