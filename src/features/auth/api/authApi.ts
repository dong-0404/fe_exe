import { apiClient } from '../../../api/client'

// API Endpoints
const ENDPOINTS = {
    REGISTER: '/users/register',
    VERIFY_OTP: '/users/verify-otp',
    LOGIN: '/auth/login',
    RESEND_OTP: '/users/resend-otp',
} as const

// Request/Response Types
export interface RegisterRequestPayload {
    email: string
    phone: string
    password: string
    role: number
}

export interface RegisterRequestResponse {
    success: boolean
    data: {
        email: string
        message: string
    } | null
    message: string | null
    errors: string | null
}

export interface VerifyOTPPayload {
    email: string
    otp: string
}

export interface VerifyOTPResponse {
    success: boolean
    data: {
        userId: string
        email: string
        role: number
        status: number
        message: string
    } | null
    message: string | null
    errors: string | null
}

export interface LoginPayload {
    email: string
    password: string
}

export interface LoginResponse {
    success: boolean
    message: string
    data: {
        user: {
            _id: string
            email: string
            phone: string
            role: number
            status: number
            createdAt: string
            updatedAt: string
            __v: number
        }
        token: string
        profileCompleted: boolean
        profile?: string  // ID của profile nếu đã hoàn thành
    }
}


export const authApi = {

    register: async (payload: RegisterRequestPayload): Promise<RegisterRequestResponse> => {
        return apiClient.post<RegisterRequestResponse>(
            ENDPOINTS.REGISTER,
            payload
        )
    },


    verifyOTP: async (payload: VerifyOTPPayload): Promise<VerifyOTPResponse> => {
        return apiClient.post<VerifyOTPResponse>(
            ENDPOINTS.VERIFY_OTP,
            payload
        )
    },

    resendOTP: async (phone: string): Promise<RegisterRequestResponse> => {
        return apiClient.post<RegisterRequestResponse>(
            ENDPOINTS.RESEND_OTP,
            { phone }
        )
    },

    login: async (payload: LoginPayload): Promise<LoginResponse> => {
        return apiClient.post<LoginResponse>(
            ENDPOINTS.LOGIN,
            payload
        )
    },
}

