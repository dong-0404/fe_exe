// Student Profile Types

export interface StudentProfileData {
    _id: string
    userId: {
        _id: string
        email: string
        phone: string
        status: number
    }
    fullName: string
    avatarUrl?: string
    gender: number  // 1: Nam, 2: Nữ
    dateOfBirth: string  // ISO date string
    grade: string  // e.g. "Lớp 10"
    school: string
    address: string
    bio?: string
    learningStyle?: string
    subjects?: string[]
    parentId?: {
        _id: string
        fullName: string
        avatarUrl?: string
    }
    createdAt: string
    updatedAt: string
}

export interface StudentProfileResponse {
    success: boolean
    message: string
    data: StudentProfileData
}

export interface UpdateStudentProfilePayload {
    fullName?: string
    gender?: number
    dateOfBirth?: string
    grade?: string
    school?: string
    address?: string
    bio?: string
    learningStyle?: string
    subjects?: string[]
}
