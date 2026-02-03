# Auth Feature

Tính năng xác thực người dùng cho TutorLink, bao gồm đăng ký, xác thực OTP và đăng nhập.

## 📁 Cấu trúc

```
auth/
├── api/
│   └── authApi.ts          # API service cho authentication
├── components/
│   ├── LoginForm/          # Form đăng nhập
│   ├── RegisterForm/       # Form đăng ký
│   ├── OTPVerification/    # Form xác thực OTP
│   └── AuthForm.css        # Shared styles cho auth forms
├── types/
│   └── index.ts            # Type definitions
└── README.md
```

## 🔐 API Endpoints

### 1. Register Request (Step 1)
```typescript
POST /api/user/register-request
```

**Request Body:**
```typescript
{
  email: string,
  phone: string,
  passwordHash: string,
  role: number  // 2: Học sinh, 3: Gia sư, 4: Phụ huynh
}
```

**Response:**
```typescript
{
  success: boolean,
  data: string | null,        // "Mã OTP đã được gửi đến email."
  message: string | null,
  errors: string | null
}
```

**Example Response:**
```json
{
  "success": true,
  "data": "Mã OTP đã được gửi đến email.",
  "message": null,
  "errors": null
}
```

### 2. Verify OTP (Step 2)
```typescript
POST /api/user/verify-otp
```

**Request Body:**
```typescript
{
  phone: string,
  otp: string
}
```

**Response:**
```typescript
{
  success: boolean,
  data: string | null,
  message: string | null,
  errors: string | null
}
```

### 3. Resend OTP
```typescript
POST /api/user/resend-otp
```

**Request Body:**
```typescript
{
  phone: string
}
```

### 4. Login
```typescript
POST /api/user/login
```

**Request Body:**
```typescript
{
  emailOrPhone: string,
  password: string
}
```

**Response:**
```typescript
{
  success: boolean,
  data: {
    token: string,
    user: {
      id: string,
      email: string,
      phone: string,
      role: number,
      name?: string
    }
  } | null,
  message: string | null,
  errors: string | null
}
```

## 🎭 User Roles

```typescript
enum UserRole {
  STUDENT = 2,   // Học sinh
  TUTOR = 3,     // Gia sư
  PARENT = 4,    // Phụ huynh
}
```

## 🔄 Luồng đăng ký

1. **Nhập thông tin** (`/register`)
   - Người dùng điền form: Họ tên, SĐT, Email, Mật khẩu, Vai trò
   - Validate dữ liệu phía client
   - Call API `POST /api/user/register-request`

2. **Xác thực OTP** (`/verify-otp`)
   - API gửi OTP qua **Email** đến địa chỉ email đã đăng ký
   - Người dùng nhập mã OTP 4 số
   - Call API `POST /api/user/verify-otp`
   - Timer 3 phút (180 giây)
   - Có thể gửi lại OTP nếu hết thời gian

3. **Hoàn tất** (`/login`)
   - Sau khi verify thành công, chuyển đến trang đăng nhập
   - Người dùng đăng nhập với email/SĐT và mật khẩu

## 💻 Cách sử dụng

### Register Form

```typescript
import { RegisterForm } from '@features/auth/components'

// In your page
<RegisterForm />
```

**Features:**
- ✅ Validation form đầy đủ (email, phone, password)
- ✅ Show/hide password
- ✅ Loading state khi submit
- ✅ Error handling với Alert component
- ✅ Auto navigate sang OTP page khi thành công

### OTP Verification

```typescript
import { OTPVerification } from '@features/auth/components'

<OTPVerification 
  email="user@example.com"
  onVerify={(otp) => console.log(otp)}
  onResend={() => console.log('Resend OTP')}
/>
```

**Features:**
- ✅ 4 ô input OTP auto-focus
- ✅ Support paste OTP (paste cả chuỗi 4 số)
- ✅ Countdown timer 3 phút
- ✅ Resend OTP khi hết thời gian
- ✅ Disable submit button khi chưa đủ 4 số
- ✅ OTP gửi qua Email

### Login Form

```typescript
import { LoginForm } from '@features/auth/components'

<LoginForm />
```

## 🎨 Components

### RegisterForm Props
Không có props (self-contained component)

### OTPVerification Props
```typescript
interface OTPVerificationProps {
  email?: string                  // Email hiển thị (default: 'user@example.com')
  onVerify?: (otp: string) => void     // Callback khi verify
  onResend?: () => void           // Callback khi resend OTP
}
```

### LoginForm Props
Không có props (self-contained component)

## 🛡️ Validation Rules

### Phone Number
- Format: `0xxxxxxxxx` hoặc `+84xxxxxxxxx`
- Regex: `/^(0|\+84)[0-9]{9}$/`

### Email
- Standard email format
- Regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

### Password
- Minimum 6 ký tự
- Confirm password phải khớp

## 🔗 Routes

```typescript
{
  login: '/login',
  register: '/register',
  otpVerification: '/verify-otp',
}
```

## 📝 Example Usage Flow

```typescript
// 1. User fills register form
// RegisterForm.tsx internally handles:
await authApi.registerRequest({
  email: 'user@example.com',
  phone: '0868211760',
  passwordHash: 'password123',
  role: UserRole.STUDENT
})

// 2. Navigate to OTP page
navigate(routes.otpVerification, {
  state: { 
    phone: '0868211760',
    email: 'user@example.com',
    name: 'John Doe'
  }
})

// 3. User enters OTP
// OTPVerificationPage.tsx handles:
await authApi.verifyOTP({
  phone: '0868211760',
  otp: '1234'
})

// 4. Navigate to login
navigate(routes.login)
```

## 🚀 Next Steps

- [ ] Tích hợp Redux cho auth state management
- [ ] Implement forgot password flow
- [ ] Add social login (Google, Facebook)
- [ ] Store token in localStorage/cookie
- [ ] Protected routes với authentication check
- [ ] Refresh token mechanism

## 🐛 Troubleshooting

### API không gọi được?
- Kiểm tra `.env` có `VITE_API_BASE_URL` đúng không
- Kiểm tra network tab trong DevTools
- Xem console có error nào không

### OTP không nhận được?
- Kiểm tra email có đúng format không
- Đảm bảo API backend đã config Email service (SMTP/SendGrid/etc)
- Check spam/junk folder trong email

### Navigation không hoạt động?
- Đảm bảo đã wrap app với `<BrowserRouter>`
- Kiểm tra routes config trong `AppRoutes.tsx`

