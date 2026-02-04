import { Routes, Route } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { HomePage } from '../pages/Home/HomePage'
import { AboutPage } from '../pages/About/AboutPage'
import { ContactPage } from '../pages/Contact'
import { PrivacyPolicyPage } from '../pages/PrivacyPolicy'
import { FindTutorPage } from '../pages/FindTutor/FindTutorPage'
import { TutorDetailPage } from '../pages/TutorDetail'
import { LoginPage, RegisterPage, OTPVerificationPage } from '../pages/Auth'
import {
    StudentProfilePage,
    TutorProfilePage,
    ParentProfilePage,
    ProfileRedirect
} from '../pages/Profile'
import { NotFoundPage } from '../pages/NotFoundPage'
import { routes } from '../config/routes'

export const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path={routes.home} element={<HomePage />} />
                <Route path={routes.about} element={<AboutPage />} />
                <Route path={routes.contact} element={<ContactPage />} />
                <Route path={routes.privacyPolicy} element={<PrivacyPolicyPage />} />
                <Route path={routes.findTutor} element={<FindTutorPage />} />
                <Route path={routes.tutorDetail} element={<TutorDetailPage />} />

                {/* Profile Routes (with MainLayout - Header & Footer) */}
                <Route path={routes.profile} element={<ProfileRedirect />} />
                <Route path={routes.studentProfile} element={<StudentProfilePage />} />
                <Route path={routes.tutorProfile} element={<TutorProfilePage />} />
                <Route path={routes.parentProfile} element={<ParentProfilePage />} />
            </Route>

            {/* Auth Routes (without MainLayout) */}
            <Route path={routes.login} element={<LoginPage />} />
            <Route path={routes.register} element={<RegisterPage />} />
            <Route path={routes.otpVerification} element={<OTPVerificationPage />} />

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

