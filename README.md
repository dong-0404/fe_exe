# React + TypeScript + Redux Toolkit + Railway API

Modern React application với feature-based architecture và Railway production API integration.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment

Tạo file `.env` ở root project với nội dung:

```env
VITE_API_BASE_URL=https://exe201tutorlink-production.up.railway.app/api
VITE_API_TIMEOUT=30000
VITE_ENV=production
VITE_USE_MOCK_DATA=false
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

## 📁 Project Structure

```
exe_reactjs/
├── src/
│   ├── app/                    # Redux store setup
│   ├── api/                    # API client & error handling
│   ├── config/                 # Environment config
│   ├── features/               # Feature modules
│   │   └── findTutor/          # Find Tutor feature
│   │       ├── api/            # API endpoints
│   │       ├── components/     # UI components
│   │       ├── hooks/          # Custom hooks
│   │       ├── data/           # Mock data
│   │       ├── types/          # TypeScript types
│   │       ├── findTutorSlice.ts
│   │       ├── findTutorSelector.ts
│   │       └── findTutorThunks.ts
│   ├── pages/                  # Route pages
│   ├── layouts/                # Layout components
│   ├── routes/                 # Route config
│   └── shared/                 # Shared utilities
│
├── .env                        # Environment config (create manually)
├── QUICK_START.md             # Quick setup guide
├── API_INTEGRATION_GUIDE.md   # Complete API guide
└── ENV_CONFIG.md              # Environment details
```

## 🎯 Key Features

- ✅ Feature-based architecture
- ✅ Redux Toolkit with async thunks
- ✅ Railway Production API integration
- ✅ Axios client with interceptors
- ✅ Auto token refresh
- ✅ Centralized error handling
- ✅ TypeScript strict mode
- ✅ React Router v7
- ✅ Tailwind CSS + Bootstrap

## 🔗 API Integration

### Production API
- **Base URL:** `https://exe201tutorlink-production.up.railway.app`
- **API Endpoint:** `/api/tutors`

### Example Usage

```typescript
import { useFindTutor } from '@/features/findTutor/hooks/useFindTutor'

function Component() {
  const { tutors, loading, error, handleSearch } = useFindTutor()
  
  return (
    <>
      {loading && <Spinner />}
      {error && <Alert>{error}</Alert>}
      <TutorList tutors={tutors} />
    </>
  )
}
```

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Hướng dẫn setup nhanh
- **[API_INTEGRATION_GUIDE.md](./API_INTEGRATION_GUIDE.md)** - Chi tiết API integration
- **[ENV_CONFIG.md](./ENV_CONFIG.md)** - Environment configuration
- **[react_feature_based_project_structure_guide.md](./react_feature_based_project_structure_guide.md)** - Architecture guide

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Router v7** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Bootstrap** - UI components
- **Vite** - Build tool

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🌍 Environment Configuration

### Production
```env
VITE_API_BASE_URL=https://exe201tutorlink-production.up.railway.app/api
VITE_USE_MOCK_DATA=false
```

### Development
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_USE_MOCK_DATA=true
```

## 🎨 Features

### Find Tutor
- ✅ Search tutors with filters (keyword, subject, area)
- ✅ Pagination support
- ✅ Tutor detail view
- ✅ API integration with Railway
- ✅ Mock data fallback

## 🔐 Authentication

API client tự động xử lý:
- Authorization token injection
- Auto token refresh on 401
- Redirect to login when needed

```typescript
// Set token after login
localStorage.setItem('access_token', 'your_token')
```

## 🐛 Error Handling

Centralized error handling với user-friendly messages:

```typescript
const { error, dismissError } = useFindTutor()

// error sẽ là string message dễ đọc
// VD: "Vui lòng đăng nhập để tiếp tục"
```

## 📝 Project Guidelines

Theo **Feature-Based Architecture**:

- ✅ Layout không biết Feature
- ✅ Page không biết Redux
- ✅ Component chỉ dùng Hook
- ✅ Hook sử dụng Selector
- ✅ Selector lấy data từ Redux Store

## 🚢 Deployment

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## 🆘 Troubleshooting

### Environment không load
```bash
# Restart dev server sau khi thay đổi .env
npm run dev
```

### API Connection Failed
```bash
# Test API endpoint
curl https://exe201tutorlink-production.up.railway.app/api/tutors
```

### CORS Error
Liên hệ backend team để enable CORS headers.

## 📄 License

Private project

## 👥 Team

EXE201 - TutorLink Production

---

**Note:** File `.env` cần được tạo thủ công vì đã được gitignore. Xem hướng dẫn trong `QUICK_START.md`.
