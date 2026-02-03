# API Layer Documentation

## Cấu trúc

```
src/api/
├── client.ts          # Axios instance và base API client
├── errorHandler.ts    # Centralized error handling
├── types.ts          # Common API types
└── README.md         # Documentation này
```

## 1. API Client (`client.ts`)

### Axios Instance
- Base URL: `VITE_API_BASE_URL` (env)
- Timeout: `VITE_API_TIMEOUT` (env, default: 30s)
- Auto inject Authorization token từ localStorage
- Request/Response interceptors

### Methods
```typescript
apiClient.get<T>(endpoint, config?)
apiClient.post<T>(endpoint, data?, config?)
apiClient.put<T>(endpoint, data?, config?)
apiClient.patch<T>(endpoint, data?, config?)
apiClient.delete<T>(endpoint, config?)
```

### Auto Token Refresh
- Tự động retry request khi token expired (401)
- Gọi refresh token API
- Redirect về login nếu refresh failed

## 2. Error Handler (`errorHandler.ts`)

### Classes & Functions

#### `AppError`
Custom error class với thông tin chi tiết:
```typescript
class AppError extends Error {
  statusCode?: number
  code?: string
  errors?: Record<string, string[]>
}
```

#### `parseApiError(error)`
Parse error từ Axios response:
```typescript
const apiError = parseApiError(error)
// { message, statusCode, code, errors }
```

#### `getErrorMessage(error)`
Lấy user-friendly error message:
```typescript
const message = getErrorMessage(error)
// "Vui lòng đăng nhập để tiếp tục"
```

## 3. Common Types (`types.ts`)

### `ApiResponse<T>`
```typescript
interface ApiResponse<T> {
  data: T
  message?: string
  statusCode?: number
}
```

### `PaginatedResponse<T>`
```typescript
interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
```

### `PaginationParams`
```typescript
interface PaginationParams {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
}
```

## 4. Cách sử dụng trong Feature

### Bước 1: Tạo API Service trong feature
`features/[feature]/api/[feature]Api.ts`

```typescript
import { apiClient } from '../../../api/client'
import type { PaginatedResponse } from '../../../api/types'

export const tutorApi = {
  getTutors: async (params?) => {
    return apiClient.get<PaginatedResponse<Tutor>>('/tutors', { params })
  },
  
  getTutorById: async (id: string) => {
    return apiClient.get<Tutor>(`/tutors/${id}`)
  }
}
```

### Bước 2: Tạo Async Thunks
`features/[feature]/[feature]Thunks.ts`

```typescript
import { createAsyncThunk } from '@reduxjs/toolkit'
import { tutorApi } from './api'
import { parseApiError } from '../../api/errorHandler'

export const fetchTutors = createAsyncThunk(
  'tutor/fetchTutors',
  async (params, { rejectWithValue }) => {
    try {
      return await tutorApi.getTutors(params)
    } catch (error) {
      return rejectWithValue(parseApiError(error))
    }
  }
)
```

### Bước 3: Handle trong Slice
```typescript
extraReducers: (builder) => {
  builder
    .addCase(fetchTutors.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(fetchTutors.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload.data
    })
    .addCase(fetchTutors.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload.message
    })
}
```

### Bước 4: Dispatch trong Hook/Component
```typescript
import { fetchTutors } from '../tutorThunks'

const dispatch = useAppDispatch()

useEffect(() => {
  dispatch(fetchTutors({ page: 1, limit: 10 }))
}, [dispatch])
```

## 5. Environment Variables

Tạo file `.env` (copy từ `.env.example`):

```bash
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=30000
```

## 6. Best Practices

### ✅ DO
- Luôn dùng `apiClient` thay vì axios trực tiếp
- Parse error bằng `parseApiError` trong thunks
- Định nghĩa types rõ ràng cho request/response
- Tạo API service riêng cho mỗi feature
- Xử lý loading/error states đầy đủ

### ❌ DON'T
- Không hardcode API URL
- Không bắt error một cách vô tội vạ (`catch (e) {}`)
- Không gọi API trực tiếp trong component
- Không lưu sensitive data trong Redux state

## 7. Example: Complete Flow

Xem implementation trong `features/findTutor/` để tham khảo flow đầy đủ:

```
findTutor/
├── api/
│   └── tutorApi.ts       # API endpoints
├── hooks/
│   └── useFindTutor.ts   # Custom hook (dispatch thunks)
├── findTutorSlice.ts     # Redux slice (handle thunks)
├── findTutorThunks.ts    # Async thunks
└── findTutorSelector.ts  # Selectors
```

## 8. Troubleshooting

### Network Error
- Check API_BASE_URL trong .env
- Check CORS settings trên server
- Kiểm tra network tab trong DevTools

### 401 Unauthorized
- Token hết hạn hoặc không hợp lệ
- Kiểm tra localStorage có `access_token` không
- Xem console log để debug refresh token flow

### CORS Error
Server cần enable CORS headers:
```javascript
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH
Access-Control-Allow-Headers: Content-Type, Authorization
```





