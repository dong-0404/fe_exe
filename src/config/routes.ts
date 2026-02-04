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

    // Setup routes (first-time form after OTP)
    setupStudent: '/setup/student',
    setupTutor: '/setup/tutor',
    setupParent: '/setup/parent',

    // Profile routes (after login - view/edit profile detail)
    profile: '/profile', // Auto redirect dựa trên role
    studentProfile: '/profile/student',
    tutorProfile: '/profile/tutor',
    parentProfile: '/profile/parent',
} as const

export type RouteKey = keyof typeof routes

