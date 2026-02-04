import type { ReactNode } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { ProfileSidebar } from '../features/profile/components/ProfileSidebar'
import { UserRole } from '../features/auth/types'
import '../pages/Profile/ProfilePage.css'

interface ProfileLayoutProps {
    role: UserRole
    activeTab: string
    onTabChange: (tab: string) => void
    children: ReactNode
}

export const ProfileLayout = ({ role, activeTab, onTabChange, children }: ProfileLayoutProps) => {
    return (
        <div className="profile-page">
            <Container fluid className="px-0">
                <Row className="g-0">
                    {/* Sidebar */}
                    <Col lg={3} className="profile-sidebar-col">
                        <ProfileSidebar
                            role={role}
                            activeTab={activeTab}
                            onTabChange={onTabChange}
                        />
                    </Col>

                    {/* Main Content */}
                    <Col lg={9} className="profile-content-col">
                        <div className="profile-content">
                            {children}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
