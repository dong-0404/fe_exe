import { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { authApi } from '../../../auth/api/authApi'

export const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.')
      return
    }
    if (newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự.')
      return
    }

    setLoading(true)
    try {
      await authApi.changePassword({
        currentPassword,
        newPassword,
      })
      setSuccess('Đổi mật khẩu thành công.')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err: unknown) {
      const res = err as { response?: { data?: { message?: string } }; message?: string }
      setError(res.response?.data?.message || res.message || 'Không thể đổi mật khẩu. Vui lòng kiểm tra mật khẩu hiện tại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form.Group className="mb-3">
        <Form.Label>Mật khẩu hiện tại</Form.Label>
        <Form.Control
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Nhập mật khẩu hiện tại"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Mật khẩu mới</Form.Label>
        <Form.Control
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Ít nhất 6 ký tự"
          required
          minLength={6}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Xác nhận mật khẩu mới</Form.Label>
        <Form.Control
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Nhập lại mật khẩu mới"
          required
        />
      </Form.Group>
      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
      </Button>
    </Form>
  )
}
