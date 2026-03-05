import { Outlet, NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'
import { routes } from '../config/routes'
import { clearAuthData, getCurrentUser } from '../features/auth/utils/authHelpers'

const menuItems = [
  {
    label: 'Quản lý người dùng',
    to: routes.adminUsers,
    children: [
      { label: 'Gia sư', to: `${routes.adminUsers}?role=tutor`, role: 'tutor' },
      { label: 'Phụ huynh', to: `${routes.adminUsers}?role=parent`, role: 'parent' },
      { label: 'Học sinh', to: `${routes.adminUsers}?role=student`, role: 'student' },
    ],
  },
  { label: 'Quản lý bài đăng', to: routes.adminPosts },
  { label: 'Quản lý đánh giá', to: routes.adminReviews },
  { label: 'Thống kê', to: routes.adminStatistics },
]

export const AdminLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const currentUser = getCurrentUser()

  const displayName = currentUser?.email?.split('@')[0] || 'admin'
  const avatarInitial = (displayName?.charAt(0) || 'A').toUpperCase()

  const handleLogout = () => {
    clearAuthData()
    navigate(routes.login, { replace: true })
  }

  const isUsersSection = location.pathname.startsWith(routes.adminUsers)
  const selectedRole = new URLSearchParams(location.search).get('role') || 'tutor'

  return (
    <div className="min-vh-100" style={{ background: '#f3f4f6' }}>
      <header
        className="d-flex align-items-center justify-content-between px-3 px-md-4"
        style={{ height: 56, background: '#0d6efd', color: '#fff' }}
      >
        <div className="d-flex align-items-center gap-2">
          <div
            className="bg-white rounded d-flex align-items-center justify-content-center"
            style={{ width: 28, height: 28, overflow: 'hidden' }}
          >
            <img
              src="/images/logos/logo-tutorlink.png"
              alt="TutorLink"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              onError={(e) => {
                const target = e.currentTarget
                target.style.display = 'none'
              }}
            />
          </div>
          <span className="fw-semibold" style={{ fontSize: 13 }}>TutorLink</span>
        </div>

        <Dropdown align="end">
          <Dropdown.Toggle
            variant="link"
            id="admin-profile-dropdown"
            className="text-white text-decoration-none d-flex align-items-center gap-2 p-0 border-0"
          >
            <span style={{ fontSize: 13 }}>{displayName}</span>
            <div
              className="rounded"
              style={{
                width: 28,
                height: 28,
                background: 'rgba(255,255,255,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 13,
                color: '#fff',
              }}
            >
              {avatarInitial}
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => navigate(routes.adminProfile)}>
              Thông tin cá nhân
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="text-danger" onClick={handleLogout}>
              Đăng xuất
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </header>

      <div className="d-flex" style={{ minHeight: 'calc(100vh - 56px)' }}>
        <aside
          style={{ width: 240, background: '#fff', borderRight: '1px solid #e5e7eb' }}
          className="py-3"
        >
          {menuItems.map((item) => (
            <div key={item.label} className="mb-1">
              <NavLink
                to={item.to}
                end={!item.children}
                className="d-block px-4 py-2 text-decoration-none"
                style={({ isActive }) => ({
                  color: isActive || (item.children && isUsersSection) ? '#2563eb' : '#374151',
                  fontWeight: isActive || (item.children && isUsersSection) ? 700 : 600,
                })}
              >
                {item.label}
              </NavLink>

              {item.children && isUsersSection && (
                <div className="ps-4">
                  {item.children.map((child) => {
                    const isActiveRole = selectedRole === child.role
                    return (
                      <Link
                        key={child.label}
                        to={child.to}
                        className="d-block px-4 py-1 text-decoration-none"
                        style={{
                          color: isActiveRole ? '#2563eb' : '#4b5563',
                          fontWeight: isActiveRole ? 600 : 500,
                          fontSize: 14,
                        }}
                      >
                        {child.label}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </aside>

        <main className="flex-grow-1 p-3 p-md-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
