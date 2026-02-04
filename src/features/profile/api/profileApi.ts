import { apiClient } from '../../../api/client'
import type {
    TutorProfileResponse,
    CreateTutorProfileStep1Payload,
    UpdateTutorProfileStep2Payload,
    UpdateTutorProfileStep4Payload,
    CertificateResponse,
    SubjectsResponse,
    GradesResponse
} from '../types/tutorProfile'
import type {
    StudentProfileResponse,
    UpdateStudentProfilePayload
} from '../types/studentProfile'

// API Endpoints
const ENDPOINTS = {
    CREATE_STUDENT: '/students',
    GET_STUDENT_PROFILE: '/students/profile',
    UPDATE_STUDENT_PROFILE: '/students/profile',
    CREATE_TUTOR_PROFILE: '/tutors/profile',  // POST to create
    UPDATE_TUTOR_PROFILE: '/tutors/profile',  // PUT to update
    CREATE_CERTIFICATE: '/tutors/certificates', // POST certificates with images
    GET_TUTOR_PROFILE: (userId: string) => `/tutors/profile/${userId}`,
    GET_SUBJECTS: '/subjects',  // GET all subjects
    GET_GRADES: '/grades',      // GET all grades
    COMPLETE_TUTOR_PROFILE: (userId: string) => `/tutors/profile/${userId}/complete`,
    UPDATE_PARENT: (userId: string) => `/parent/${userId}`,
} as const

// Request/Response Types
export interface CreateStudentProfilePayload {
    userId: string
    fullName: string
    dateOfBirth: string     // Format: "YYYY-MM-DD"
    gender: number          // 1 or 2
    grade: string           // Grade (e.g. "Lớp 11")
    school: string          // School name
    parentId?: string       // Optional - Parent ID
}

export interface ProfileResponse {
    success: boolean
    data: string | null
    message: string | null
    errors: string | null
}

export const profileApi = {
    // ============ STUDENT PROFILE APIs ============

    createStudentProfile: async (
        payload: CreateStudentProfilePayload
    ): Promise<ProfileResponse> => {
        return apiClient.post<ProfileResponse>(
            ENDPOINTS.CREATE_STUDENT,
            payload
        )
    },

    // Get student profile
    getStudentProfile: async (): Promise<StudentProfileResponse> => {
        return apiClient.get<StudentProfileResponse>(
            ENDPOINTS.GET_STUDENT_PROFILE
        )
    },

    // Update student profile (with optional avatar upload)
    updateStudentProfile: async (
        payload: UpdateStudentProfilePayload,
        avatar?: File
    ): Promise<StudentProfileResponse> => {
        if (avatar) {
            // Use FormData if avatar is provided
            const formData = new FormData()

            // Append avatar
            formData.append('avatar', avatar)

            // Append other fields
            Object.entries(payload).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    if (Array.isArray(value)) {
                        value.forEach(item => formData.append(key, item))
                    } else {
                        formData.append(key, value.toString())
                    }
                }
            })

            return apiClient.put<StudentProfileResponse>(
                ENDPOINTS.UPDATE_STUDENT_PROFILE,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
        } else {
            // Use JSON if no avatar
            return apiClient.put<StudentProfileResponse>(
                ENDPOINTS.UPDATE_STUDENT_PROFILE,
                payload
            )
        }
    },

    // ============ TUTOR PROFILE APIs ============

    // Create tutor profile - Step 1
    createTutorProfileStep1: async (
        payload: CreateTutorProfileStep1Payload
    ): Promise<TutorProfileResponse> => {
        return apiClient.post<TutorProfileResponse>(
            ENDPOINTS.CREATE_TUTOR_PROFILE,
            payload
        )
    },

    // Update tutor profile - Step 2
    updateTutorProfileStep2: async (
        payload: UpdateTutorProfileStep2Payload
    ): Promise<TutorProfileResponse> => {
        return apiClient.put<TutorProfileResponse>(
            ENDPOINTS.UPDATE_TUTOR_PROFILE,
            payload
        )
    },

    // Create certificate - Step 3 (with file upload)
    createCertificate: async (
        email: string,
        schoolName: string,
        major: string,
        educationStatus: number,
        images: File[]
    ): Promise<CertificateResponse> => {
        const formData = new FormData()
        formData.append('email', email)
        formData.append('schoolName', schoolName)
        formData.append('major', major)
        formData.append('educationStatus', educationStatus.toString())

        // Append multiple images
        images.forEach((image) => {
            formData.append('images', image)
        })

        return apiClient.post<CertificateResponse>(
            ENDPOINTS.CREATE_CERTIFICATE,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
    },

    // Update tutor profile - Step 4
    updateTutorProfileStep4: async (
        payload: UpdateTutorProfileStep4Payload
    ): Promise<TutorProfileResponse> => {
        return apiClient.put<TutorProfileResponse>(
            ENDPOINTS.UPDATE_TUTOR_PROFILE,
            payload
        )
    },

    // Get tutor profile (load existing data)
    getTutorProfile: async (userId: string): Promise<TutorProfileResponse> => {
        return apiClient.get<TutorProfileResponse>(
            ENDPOINTS.GET_TUTOR_PROFILE(userId)
        )
    },

    // Get all subjects
    getSubjects: async (): Promise<SubjectsResponse> => {
        return apiClient.get<SubjectsResponse>(ENDPOINTS.GET_SUBJECTS)
    },

    // Get all grades
    getGrades: async (): Promise<GradesResponse> => {
        return apiClient.get<GradesResponse>(ENDPOINTS.GET_GRADES)
    },

    // Complete tutor profile (after step 4)
    completeTutorProfile: async (userId: string): Promise<TutorProfileResponse> => {
        return apiClient.post<TutorProfileResponse>(
            ENDPOINTS.COMPLETE_TUTOR_PROFILE(userId),
            {}
        )
    },

    // TODO: Add parent profile methods
    // updateParentProfile: async (userId: string, payload) => { ... }
}

