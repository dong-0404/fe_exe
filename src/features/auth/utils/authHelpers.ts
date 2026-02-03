import type { User } from '../types'

/**
 * Lưu thông tin authentication sau khi login thành công
 */
export const saveAuthData = (
    token: string,
    user: User,
    profileCompleted: boolean,
    profileId?: string
) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('userId', user._id)
    localStorage.setItem('userEmail', user.email)
    localStorage.setItem('userRole', user.role.toString())
    localStorage.setItem('profileCompleted', profileCompleted.toString())

    if (profileId) {
        localStorage.setItem('profileId', profileId)
    }
}

/**
 * Lấy thông tin user hiện tại từ localStorage
 */
export const getCurrentUser = (): User | null => {
    const userStr = localStorage.getItem('user')
    if (!userStr) return null

    try {
        return JSON.parse(userStr) as User
    } catch {
        return null
    }
}

/**
 * Lấy token hiện tại
 */
export const getAuthToken = (): string | null => {
    return localStorage.getItem('token')
}

/**
 * Kiểm tra user đã đăng nhập chưa
 */
export const isAuthenticated = (): boolean => {
    return !!getAuthToken() && !!getCurrentUser()
}

/**
 * Kiểm tra profile đã hoàn thành chưa
 */
export const isProfileCompleted = (): boolean => {
    return localStorage.getItem('profileCompleted') === 'true'
}

/**
 * Lấy profile ID
 */
export const getProfileId = (): string | null => {
    return localStorage.getItem('profileId')
}

/**
 * Lấy role của user hiện tại
 */
export const getUserRole = (): number | null => {
    const role = localStorage.getItem('userRole')
    return role ? parseInt(role, 10) : null
}

/**
 * Xóa toàn bộ thông tin authentication (logout)
 */
export const clearAuthData = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('userId')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userRole')
    localStorage.removeItem('profileCompleted')
    localStorage.removeItem('profileId')
}

/**
 * Lấy URL redirect dựa trên role và trạng thái profile
 */
export const getRedirectPath = (role: number, profileCompleted: boolean): string => {
    if (profileCompleted) {
        return '/' // Home page
    }

    // Chưa hoàn thành profile -> redirect đến trang profile tương ứng
    switch (role) {
        case 1: // Student
            return '/profile/student'
        case 2: // Parent
            return '/profile/parent'
        case 3: // Tutor
            return '/profile/tutor'
        default:
            return '/'
    }
}
