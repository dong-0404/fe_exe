// Route configuration
export const routes = {
    home: '/',
    about: '/about',
    contact: '/contact',
    privacyPolicy: '/privacy-policy',
    findTutor: '/find-tutor',
    tutorDetail: '/tutor/:id',
    postLesson: '/post-lesson',
    schedule: '/schedule',
    login: '/login',
    register: '/register',
    otpVerification: '/verify-otp',
    profile: '/profile', // Auto redirect dựa trên role
    studentProfile: '/profile/student',
    tutorProfile: '/profile/tutor',
    parentProfile: '/profile/parent',
} as const

export type RouteKey = keyof typeof routes

