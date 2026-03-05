// Auth Types



export const UserRole = {

    STUDENT: 1,

    PARENT: 3,

    TUTOR: 2,

    ADMIN: 4,

} as const



export type UserRole = typeof UserRole[keyof typeof UserRole]



export const RoleLabels: Record<UserRole, string> = {

    [UserRole.STUDENT]: 'Học sinh',

    [UserRole.TUTOR]: 'Gia sư',

    [UserRole.PARENT]: 'Phụ huynh',
    [UserRole.ADMIN]: 'Admin',

}



export interface RegisterFormData {

    name: string

    phone: string

    email: string

    password: string

    confirmPassword: string

    role: UserRole

}



export interface AuthState {

    isAuthenticated: boolean

    user: User | null

    token: string | null

    loading: boolean

    error: string | null

}



export interface User {

    _id: string

    email: string

    phone: string

    role: UserRole

    status: number

    createdAt: string

    updatedAt: string

}

