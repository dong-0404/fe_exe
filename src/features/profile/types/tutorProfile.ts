// Tutor Profile Types

export interface TutorProfileData {
    _id?: string
    userId: string
    currentStep: 1 | 2 | 3 | 4
    completedSteps: number[]
    isProfileComplete: boolean  // API uses this name
    profileStatus?: number

    // Step 1: Thông tin cơ bản
    fullName?: string
    dateOfBirth?: string
    placeOfBirth?: string
    gender?: number
    hourlyRate?: number
    teachingArea?: string

    // Step 2: Thông tin định danh
    identityNumber?: string

    // Step 3: Bằng cấp, chứng chỉ
    schoolName?: string
    major?: string
    educationStatus?: number
    certificateImages?: string[] // URLs after upload

    // Step 4: Thông tin giảng dạy
    subjects?: string[]           // Subject IDs
    grades?: string[]             // Grade IDs
    availableDays?: number[]      // Day numbers
    availableTimeSlots?: string[] // Time slots
}

// Step 1 Form Data
export interface BasicInfoFormData {
    fullName: string
    email: string
    dateOfBirth: string  // API expects this name
    placeOfBirth: string  // API expects this name
    hourlyRate: string    // API expects this name (as number)
    gender: number        // API expects 1 or 2
    teachingArea: string
}

// Step 2 Form Data
export interface IdentityInfoFormData {
    email: string
    identityNumber: string  // API uses this name
}

// Step 3 Form Data
export interface CertificatesInfoFormData {
    email: string
    schoolName: string         // API uses this name
    major: string
    educationStatus: number    // 1 = student, 2 = graduated
    images: File[]             // API uses this name
}

// Subject from API
export interface Subject {
    _id: string
    code: string
    name: string
    description: string
    status: number
}

// Grade from API
export interface Grade {
    _id: string
    code: string
    name: string
    orderNumber: number
    status: number
}

// Step 4 Form Data
export interface TeachingInfoFormData {
    email: string
    subjects: string[]           // Array of subject IDs
    grades: string[]             // Array of grade IDs
    availableDays: number[]      // Array of numbers (2=Mon, 3=Tue, etc.)
    availableTimeSlots: string[] // ["morning", "afternoon", "evening"]
}

// API Response
export interface TutorProfileResponse {
    success: boolean
    message: string
    data?: TutorProfileData
    errors?: string
}

// Step 1 API Payload (Create profile)
export interface CreateTutorProfileStep1Payload {
    email: string
    fullName: string
    dateOfBirth: string
    placeOfBirth: string
    gender: number
    hourlyRate: number
    teachingArea: string
}

// Step 2 API Payload (Update identity)
export interface UpdateTutorProfileStep2Payload {
    email: string
    identityNumber: string
}

// Step 3 Certificate Response
export interface CertificateResponse {
    success: boolean
    message: string
    data?: {
        certificate: {
            _id: string
            tutorId: string
            schoolName: string
            major: string
            educationStatus: number
            images: string[]
            createdAt: string
            updatedAt: string
        }
        profileStatus: {
            currentStep: number
            completedSteps: number[]
            isProfileComplete: boolean
        }
    }
    errors?: string
}

// Step 4 API Payload
export interface UpdateTutorProfileStep4Payload {
    email: string
    subjects: string[]
    grades: string[]
    availableDays: number[]
    availableTimeSlots: string[]
}

// Subjects API Response
export interface SubjectsResponse {
    success: boolean
    message: string
    data: Subject[]
}

// Grades API Response
export interface GradesResponse {
    success: boolean
    message: string
    data: Grade[]
}
