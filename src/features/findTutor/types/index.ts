// Subject structure from API
export interface Subject {
  _id: string
  code: string
  name: string
  description?: string
  status?: number
}

// Grade structure from API
export interface Grade {
  _id: string
  code: string
  name: string
  orderNumber: number
  status?: number
}

// User info trong tutor profile
export interface UserInfo {
  _id: string
  email: string
  phone: string
  fullName?: string
}

// Certificate structure from API
export interface Certificate {
  _id: string
  tutorId: string
  schoolName: string
  major: string
  educationStatus: number // 1 = Đang học, 2 = Đã tốt nghiệp
  images: string[]
  createdAt: string
  updatedAt?: string
}

// Feedback structure from API
export interface Feedback {
  _id: string
  tutorId: string
  authorUserId: {
    _id: string
    email: string
    fullName: string
  }
  authorRole: number // 1 = Student, 2 = Parent
  rating: number // 1-5
  comment: string
  status: number // 1 = Active
  createdAt: string
  updatedAt: string
}

// Tutor structure from API (for search/list)
export interface Tutor {
  _id: string
  userId: UserInfo
  fullName: string
  gender: number  // 1 = Nam, 2 = Nữ
  dateOfBirth: string
  placeOfBirth: string
  teachingArea: string
  hourlyRate: number
  profileStatus: number
  currentStep: number
  completedSteps: number[]
  isProfileComplete: boolean
  identityNumber?: string
  identityImages?: string[]
  schoolName?: string
  major?: string
  educationStatus?: number
  certificateImages?: string[]
  availableDays: number[]  // [2,3,4,5,6,7] = Mon-Sun
  availableTimeSlots: string[]  // ["morning", "afternoon", "evening"]
  averageRating: number
  totalFeedback: number
  subjects: Subject[]
  grades: Grade[]
  createdAt: string
  updatedAt: string
  __v?: number
  avatar?: string
}

// Tutor Detail structure from API (for detail page)
export interface TutorDetail {
  _id: string
  fullName: string
  avatarUrl?: string
  gender: number
  dateOfBirth: string
  age: number
  placeOfBirth: string
  address?: string
  teachingArea: string
  bio?: string
  hourlyRate: number
  profileStatus: number
  isProfileComplete: boolean
  identityNumber?: string
  availableDays: number[]
  availableTimeSlots: string[]
  averageRating: number
  totalFeedback: number
  subjects: Subject[]
  grades: Grade[]
  userId: UserInfo
  certificates: Certificate[]
  createdAt: string
  updatedAt: string
}

// Filter params for search
export interface TutorFilters {
  name?: string
  subjects?: string  // Subject ID
  grades?: string    // Grade ID
  teachingArea?: string
  sortBy?: 'hourlyRate' | 'averageRating' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

// API Response types
export interface TutorDetailResponse {
  success: boolean
  message: string
  data: TutorDetail
}

export interface FeedbacksResponse {
  success: boolean
  message: string
  data: {
    feedbacks: Feedback[]
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

// Helper utilities
export const getSubjectNames = (subjects: Subject[]): string[] => {
  if (!subjects || subjects.length === 0) return []
  return subjects.map(s => s.name)
}

export const getGradeNames = (grades: Grade[]): string[] => {
  if (!grades || grades.length === 0) return []
  return grades.map(g => g.name)
}

export const getGenderDisplay = (gender: number): string => {
  return gender === 1 ? 'Nam' : 'Nữ'
}

export const getTimeSlotDisplay = (slot: string): string => {
  const map: Record<string, string> = {
    morning: 'Sáng',
    afternoon: 'Chiều',
    evening: 'Tối'
  }
  return map[slot] || slot
}

export const getDayDisplay = (day: number): string => {
  const map: Record<number, string> = {
    2: 'Thứ 2',
    3: 'Thứ 3',
    4: 'Thứ 4',
    5: 'Thứ 5',
    6: 'Thứ 6',
    7: 'Thứ 7',
    8: 'Chủ nhật'
  }
  return map[day] || `Thứ ${day}`
}



