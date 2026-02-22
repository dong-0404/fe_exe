import type { Post, User, Comment } from '../types'

// Mock users
export const mockUsers: User[] = [
    {
        _id: 'user1',
        email: 'student1@example.com',
        fullName: 'Nguyễn Văn An',
        avatarUrl: 'https://i.pravatar.cc/150?img=1',
        role: 1 // Student
    },
    {
        _id: 'user2',
        email: 'tutor1@example.com',
        fullName: 'Trần Thị Bình',
        avatarUrl: 'https://i.pravatar.cc/150?img=2',
        role: 2 // Tutor
    },
    {
        _id: 'user3',
        email: 'student2@example.com',
        fullName: 'Lê Văn Cường',
        avatarUrl: 'https://i.pravatar.cc/150?img=3',
        role: 1 // Student
    },
    {
        _id: 'user4',
        email: 'parent1@example.com',
        fullName: 'Phạm Thị Dung',
        avatarUrl: 'https://i.pravatar.cc/150?img=4',
        role: 3 // Parent
    },
    {
        _id: 'user5',
        email: 'tutor2@example.com',
        fullName: 'Hoàng Văn Em',
        avatarUrl: 'https://i.pravatar.cc/150?img=5',
        role: 2 // Tutor
    }
]

// Mock comments
const mockComments: Comment[] = [
    {
        _id: 'comment1',
        postId: 'post1',
        authorId: mockUsers[1],
        content: 'Tôi có thể giúp bạn với môn Toán lớp 9. Bạn có thể liên hệ với tôi qua email.',
        likes: 5,
        likedBy: ['user2', 'user3', 'user4', 'user5', 'user1'],
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        replies: [
            {
                _id: 'comment1_reply1',
                postId: 'post1',
                authorId: mockUsers[0],
                content: 'Cảm ơn bạn! Tôi sẽ liên hệ sớm.',
                likes: 2,
                likedBy: ['user2', 'user3'],
                parentId: 'comment1',
                createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() // 1 hour ago
            }
        ]
    },
    {
        _id: 'comment2',
        postId: 'post1',
        authorId: mockUsers[2],
        content: 'Tôi cũng đang tìm gia sư Toán. Bạn có thể chia sẻ thêm thông tin không?',
        likes: 3,
        likedBy: ['user1', 'user4', 'user5'],
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() // 3 hours ago
    },
    {
        _id: 'comment3',
        postId: 'post2',
        authorId: mockUsers[3],
        content: 'Bài viết rất hữu ích! Cảm ơn bạn đã chia sẻ.',
        likes: 8,
        likedBy: ['user1', 'user2', 'user3', 'user4', 'user5', 'user1', 'user2', 'user3'],
        createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString() // 30 minutes ago
    },
    {
        _id: 'comment4',
        postId: 'post3',
        authorId: mockUsers[4],
        content: 'Tôi có kinh nghiệm dạy Văn lớp 10. Bạn có thể tham khảo profile của tôi.',
        likes: 4,
        likedBy: ['user1', 'user2', 'user3', 'user4'],
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() // 5 hours ago
    }
]

// Mock posts
export const mockPosts: Post[] = [
    {
        _id: 'post1',
        authorId: mockUsers[0],
        content: 'Xin chào mọi người! Tôi đang tìm gia sư dạy Toán lớp 9. Bạn nào có kinh nghiệm và nhiệt tình có thể giúp tôi không? Tôi học vào buổi tối sau 7h. Cảm ơn mọi người!',
        images: [
            'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800',
            'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800'
        ],
        tags: ['Toán', 'Lớp 9', 'Tìm gia sư'],
        postType: 1,  // findTutor
        likes: 12,
        likedBy: ['user2', 'user3', 'user4', 'user5', 'user1', 'user2', 'user3', 'user4', 'user5', 'user1', 'user2', 'user3'],
        comments: mockComments.filter(c => c.postId === 'post1'),
        shares: 3,
        sharedBy: ['user2', 'user3', 'user4'],
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() // 4 hours ago
    },
    {
        _id: 'post2',
        authorId: mockUsers[1],
        content: 'Chia sẻ với mọi người một số tips học Văn hiệu quả:\n\n1. Đọc nhiều sách để mở rộng vốn từ\n2. Luyện viết mỗi ngày\n3. Học thuộc các bài thơ, đoạn văn hay\n4. Tham gia thảo luận với bạn bè\n\nHy vọng sẽ giúp ích cho các bạn!',
        images: [
            'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800'
        ],
        tags: ['Văn', 'Học tập', 'Tips'],
        postType: 2,  // share
        likes: 25,
        likedBy: Array.from({ length: 25 }, (_, i) => `user${(i % 5) + 1}`),
        comments: mockComments.filter(c => c.postId === 'post2'),
        shares: 8,
        sharedBy: Array.from({ length: 8 }, (_, i) => `user${(i % 5) + 1}`),
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString() // 6 hours ago
    },
    {
        _id: 'post3',
        authorId: mockUsers[2],
        content: 'Mình đang cần tìm gia sư dạy Văn lớp 10. Ưu tiên các bạn có kinh nghiệm và phương pháp dạy sáng tạo. Học phí có thể thương lượng. Cảm ơn!',
        tags: ['Văn', 'Lớp 10', 'Tìm gia sư'],
        postType: 1,  // findTutor
        likes: 7,
        likedBy: ['user1', 'user2', 'user3', 'user4', 'user5', 'user1', 'user2'],
        comments: mockComments.filter(c => c.postId === 'post3'),
        shares: 2,
        sharedBy: ['user4', 'user5'],
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString() // 8 hours ago
    },
    {
        _id: 'post4',
        authorId: mockUsers[3],
        content: 'Chia sẻ kinh nghiệm học Lý của con mình. Con đã cải thiện điểm số rất nhiều nhờ phương pháp học đúng cách và có gia sư hỗ trợ. Các phụ huynh có thể tham khảo!',
        images: [
            'https://images.unsplash.com/photo-1532619675605-1ede6c9ed2d7?w=800',
            'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800'
        ],
        tags: ['Lý', 'Kinh nghiệm', 'Phụ huynh'],
        postType: 2,  // share
        likes: 18,
        likedBy: Array.from({ length: 18 }, (_, i) => `user${(i % 5) + 1}`),
        comments: [],
        shares: 5,
        sharedBy: Array.from({ length: 5 }, (_, i) => `user${(i % 5) + 1}`),
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString() // 12 hours ago
    },
    {
        _id: 'post5',
        authorId: mockUsers[4],
        content: 'Tôi là gia sư có 5 năm kinh nghiệm dạy Toán, Lý, Hóa. Hiện tại đang nhận thêm học sinh. Các phụ huynh và học sinh có nhu cầu có thể liên hệ với tôi. Profile của tôi có đầy đủ thông tin và đánh giá từ học sinh cũ.',
        tags: ['Toán', 'Lý', 'Hóa', 'Gia sư'],
        postType: 2,  // share
        likes: 15,
        likedBy: Array.from({ length: 15 }, (_, i) => `user${(i % 5) + 1}`),
        comments: [],
        shares: 4,
        sharedBy: Array.from({ length: 4 }, (_, i) => `user${(i % 5) + 1}`),
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
    }
]
