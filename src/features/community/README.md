# Community Feature - API Integration Guide

## ✅ Đã hoàn thành

Feature Community Feed đã được tích hợp hoàn toàn với API thật. Tất cả mock data đã được thay thế bằng API calls.

## 📡 API Endpoints đã tích hợp

### Posts APIs
- ✅ `GET /community/posts` - Lấy danh sách posts với pagination & filters
- ✅ `GET /community/posts/:id` - Lấy chi tiết 1 post
- ✅ `POST /community/posts` - Tạo post mới
- ✅ `POST /community/posts/:id/like` - Like/Unlike post
- ✅ `POST /community/posts/:id/share` - Share post
- ✅ `DELETE /community/posts/:id` - Xóa post

### Comments APIs
- ✅ `POST /community/posts/:postId/comments` - Thêm comment
- ✅ `POST /community/posts/:postId/comments/:commentId/like` - Like/Unlike comment
- ✅ `DELETE /community/posts/:postId/comments/:commentId` - Xóa comment

## 🔧 Cấu hình

### 1. Environment Variables

File `.env`:
```env
VITE_API_BASE_URL=https://your-api-domain.com/api/v1
VITE_API_TIMEOUT=30000
```

### 2. Authentication

API sử dụng JWT token từ `localStorage`:
- Token: `localStorage.getItem('token')`
- User ID: `localStorage.getItem('userId')`
- User Email: `localStorage.getItem('userEmail')`

Token tự động được thêm vào header `Authorization: Bearer {token}` bởi `apiClient`.

## 📝 Request/Response Format

### Fetch Posts Request
```typescript
GET /community/posts?page=1&limit=10&postType=findTutor&sortBy=createdAt&sortOrder=desc
```

### Response Structure
```json
{
  "success": true,
  "message": "Lấy danh sách bài viết thành công",
  "data": {
    "posts": [
      {
        "_id": "post123",
        "author": {
          "_id": "user123",
          "email": "user@example.com",
          "fullName": "Nguyễn Văn A",
          "avatarUrl": "https://...",
          "role": 1
        },
        "content": "Nội dung bài viết...",
        "images": ["url1", "url2"],
        "tags": ["Toán", "Lớp 9"],
        "postType": "findTutor",
        "likes": 10,
        "likedBy": ["userId1", "userId2"],
        "comments": [...],
        "shares": 5,
        "sharedBy": ["userId3"],
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

## 🔍 Query Parameters

### GET /community/posts

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `page` | number | Page number (default: 1) | `?page=2` |
| `limit` | number | Items per page (default: 10) | `?limit=20` |
| `tags` | string[] | Filter by tags | `?tags[]=Toán&tags[]=Lớp 9` |
| `postType` | string | Filter by type | `?postType=findTutor` |
| `authorId` | string | Filter by author | `?authorId=user123` |
| `sortBy` | string | Sort field | `?sortBy=likes` |
| `sortOrder` | string | Sort order | `?sortOrder=desc` |

## 🎯 Usage Examples

### Tạo Post Mới
```typescript
const result = await createPost({
  content: "Tìm gia sư dạy Toán lớp 9",
  images: ["https://image1.jpg"],
  tags: ["Toán", "Lớp 9"],
  postType: "findTutor"
})
```

### Like Post
```typescript
await likePost(postId)
// Toggle: Nếu đã like thì unlike, chưa like thì like
```

### Thêm Comment
```typescript
await addComment(postId, {
  content: "Tôi có thể giúp bạn",
  parentId: "commentId123" // Optional, for nested reply
})
```

## 🚨 Error Handling

Tất cả errors được handle bởi Redux thunks và hiển thị trong UI:

```typescript
// Error response format
{
  "success": false,
  "message": "Error message",
  "errors": [...]
}
```

Errors được lưu trong Redux state và hiển thị trong `CommunityPage`:
```typescript
{error && (
  <div className="community-page__error">
    {error}
  </div>
)}
```

## 📂 File Structure

```
src/features/community/
├── api/
│   ├── communityApi.ts          # ✅ API calls (đã ghép API thật)
│   └── index.ts
├── components/                   # UI Components
├── hooks/
│   └── useCommunity.ts          # Custom hook
├── types/
│   └── index.ts                 # TypeScript types
├── communitySlice.ts            # Redux slice
├── communitySelectors.ts        # Redux selectors
├── communityThunks.ts           # Redux async actions
└── README.md                    # This file
```

## 🔐 Authorization

Các endpoints yêu cầu authentication:
- ✅ POST /community/posts (tạo post)
- ✅ POST /community/posts/:id/like
- ✅ POST /community/posts/:id/share
- ✅ DELETE /community/posts/:id (chỉ author)
- ✅ POST comments
- ✅ POST comment like
- ✅ DELETE comments (chỉ author)

## 🧪 Testing

Để test với API thật:

1. Đảm bảo backend đang chạy
2. Cập nhật `VITE_API_BASE_URL` trong `.env`
3. Login để có token trong localStorage
4. Truy cập `/community` page

## 📊 State Management

Redux state structure:
```typescript
{
  community: {
    posts: Post[],
    currentPost: Post | null,
    filters: PostFilters,
    currentPage: number,
    totalPages: number,
    loading: boolean,
    error: string | null
  }
}
```

## 🎨 UI Features

- ✅ Create post với modal
- ✅ Upload multiple images (max 5)
- ✅ Add tags
- ✅ 2 post types: "Tìm gia sư" và "Chia sẻ"
- ✅ Like/Unlike posts & comments
- ✅ Nested comments (replies)
- ✅ Share posts
- ✅ Delete posts & comments (với authorization)
- ✅ Infinite scroll pagination
- ✅ Responsive design

## 🔄 Migration từ Mock Data

**Đã hoàn thành!** Không cần làm gì thêm.

Mock data trong `data/mockCommunity.ts` vẫn được giữ lại để:
- Reference data structure
- Development/testing khi backend chưa sẵn sàng
- Demo purposes

## 📞 Support

Nếu gặp lỗi API:
1. Check console logs (requests được log trong dev mode)
2. Verify API base URL trong `.env`
3. Verify token trong localStorage
4. Check network tab trong DevTools
5. Verify backend API đang chạy và trả về đúng format

## ✨ Next Steps

Feature đã sẵn sàng production! Có thể mở rộng:
- [ ] Real-time updates với WebSocket
- [ ] Notifications cho likes/comments
- [ ] Image optimization/compression
- [ ] Rich text editor
- [ ] Mentions (@user)
- [ ] Hashtags (#tag)
- [ ] Post analytics
