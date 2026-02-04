import { TutorProfileForm } from '../../features/profile/components/TutorProfileForm/TutorProfileForm'

/**
 * TutorSetupPage - Trang điền thông tin tutor lần đầu sau khi verify OTP
 * Multi-step form (4 steps) - Full screen
 * Note: TutorProfileForm đã có style riêng (full-screen), không dùng AuthBanner
 */
export const TutorSetupPage = () => {
    return <TutorProfileForm />
}
