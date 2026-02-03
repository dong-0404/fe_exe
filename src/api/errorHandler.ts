import axios, { type AxiosError } from 'axios'

export interface ApiError {
    message: string
    statusCode?: number
    code?: string
    errors?: Record<string, string[]>
}

export class AppError extends Error {
    statusCode?: number
    code?: string
    errors?: Record<string, string[]>

    constructor(error: ApiError) {
        super(error.message)
        this.name = 'AppError'
        this.statusCode = error.statusCode
        this.code = error.code
        this.errors = error.errors
    }
}

// Parse error từ API response
export const parseApiError = (error: unknown): ApiError => {
    // Axios error
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{
            message?: string
            error?: string
            errors?: Record<string, string[]>
        }>

        return {
            message: axiosError.response?.data?.message ||
                axiosError.response?.data?.error ||
                axiosError.message ||
                'Đã có lỗi xảy ra',
            statusCode: axiosError.response?.status,
            code: axiosError.code,
            errors: axiosError.response?.data?.errors
        }
    }

    // Error object
    if (error instanceof Error) {
        return {
            message: error.message
        }
    }

    // String error
    if (typeof error === 'string') {
        return {
            message: error
        }
    }

    // Unknown error
    return {
        message: 'Đã có lỗi không xác định xảy ra'
    }
}

// Get user-friendly error message
export const getErrorMessage = (error: unknown): string => {
    const apiError = parseApiError(error)

    // Custom messages theo status code
    switch (apiError.statusCode) {
        case 400:
            return apiError.message || 'Dữ liệu không hợp lệ'
        case 401:
            return 'Vui lòng đăng nhập để tiếp tục'
        case 403:
            return 'Bạn không có quyền thực hiện thao tác này'
        case 404:
            return apiError.message || 'Không tìm thấy dữ liệu'
        case 422:
            return apiError.message || 'Dữ liệu không hợp lệ'
        case 429:
            return 'Bạn đã thực hiện quá nhiều yêu cầu. Vui lòng thử lại sau'
        case 500:
            return 'Lỗi máy chủ. Vui lòng thử lại sau'
        case 503:
            return 'Hệ thống đang bảo trì. Vui lòng thử lại sau'
        default:
            return apiError.message
    }
}

// Handle error và throw AppError
export const handleApiError = (error: unknown): never => {
    const apiError = parseApiError(error)
    throw new AppError(apiError)
}

