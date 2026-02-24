import type { Tutor } from '../types'

export const mockTutors: Tutor[] = [
  {
    _id: '1',
    userId: {
      _id: 'user1',
      email: 'chien@example.com',
      phone: '0123456789',
      fullName: 'Tường Duy Chiến'
    },
    fullName: 'Tường Duy Chiến',
    gender: 1, // Nam
    dateOfBirth: '2003-05-09',
    placeOfBirth: 'Hà Nội',
    teachingArea: 'Hà Nội',
    hourlyRate: 150000,
    profileStatus: 1,
    currentStep: 4,
    completedSteps: [1, 2, 3, 4],
    isProfileComplete: true,
    availableDays: [2, 3, 4, 5, 6],
    availableTimeSlots: ['afternoon', 'evening'],
    averageRating: 4.5,
    totalFeedback: 10,
    subjects: [
      { _id: 'sub1', code: 'MATH', name: 'Toán' },
      { _id: 'sub2', code: 'PHYS', name: 'Lý' },
      { _id: 'sub3', code: 'CHEM', name: 'Hóa' }
    ],
    grades: [],
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    _id: '2',
    userId: {
      _id: 'user2',
      email: 'mai@example.com',
      phone: '0123456790',
      fullName: 'Nguyễn Thị Mai'
    },
    fullName: 'Nguyễn Thị Mai',
    gender: 2, // Nữ
    dateOfBirth: '2001-08-15',
    placeOfBirth: 'Hà Nội',
    teachingArea: 'Hà Nội',
    hourlyRate: 180000,
    profileStatus: 1,
    currentStep: 4,
    completedSteps: [1, 2, 3, 4],
    isProfileComplete: true,
    availableDays: [2, 3, 4, 5, 6, 7],
    availableTimeSlots: ['morning', 'afternoon'],
    averageRating: 4.8,
    totalFeedback: 15,
    subjects: [
      { _id: 'sub4', code: 'LIT', name: 'Văn' },
      { _id: 'sub5', code: 'HIST', name: 'Sử' },
      { _id: 'sub6', code: 'GEO', name: 'Địa' }
    ],
    grades: [],
    createdAt: '2024-01-02T00:00:00.000Z',
    updatedAt: '2024-01-02T00:00:00.000Z'
  },
  {
    _id: '3',
    userId: {
      _id: 'user3',
      email: 'duc@example.com',
      phone: '0123456791',
      fullName: 'Trần Văn Đức'
    },
    fullName: 'Trần Văn Đức',
    gender: 1, // Nam
    dateOfBirth: '2002-03-22',
    placeOfBirth: 'Hồ Chí Minh',
    teachingArea: 'Hồ Chí Minh',
    hourlyRate: 200000,
    profileStatus: 1,
    currentStep: 4,
    completedSteps: [1, 2, 3, 4],
    isProfileComplete: true,
    availableDays: [3, 4, 5, 6, 7],
    availableTimeSlots: ['afternoon', 'evening'],
    averageRating: 4.2,
    totalFeedback: 8,
    subjects: [
      { _id: 'sub7', code: 'ENG', name: 'Tiếng Anh' },
      { _id: 'sub1', code: 'MATH', name: 'Toán' }
    ],
    grades: [],
    createdAt: '2024-01-03T00:00:00.000Z',
    updatedAt: '2024-01-03T00:00:00.000Z'
  },
  {
    _id: '4',
    userId: {
      _id: 'user4',
      email: 'huong@example.com',
      phone: '0123456792',
      fullName: 'Lê Thị Hương'
    },
    fullName: 'Lê Thị Hương',
    gender: 2, // Nữ
    dateOfBirth: '2000-11-10',
    placeOfBirth: 'Hà Nội',
    teachingArea: 'Hà Nội',
    hourlyRate: 160000,
    profileStatus: 1,
    currentStep: 4,
    completedSteps: [1, 2, 3, 4],
    isProfileComplete: true,
    availableDays: [2, 3, 4, 5, 6],
    availableTimeSlots: ['morning', 'afternoon', 'evening'],
    averageRating: 4.7,
    totalFeedback: 12,
    subjects: [
      { _id: 'sub8', code: 'BIO', name: 'Sinh học' },
      { _id: 'sub3', code: 'CHEM', name: 'Hóa' }
    ],
    grades: [],
    createdAt: '2024-01-04T00:00:00.000Z',
    updatedAt: '2024-01-04T00:00:00.000Z'
  },
  {
    _id: '5',
    userId: {
      _id: 'user5',
      email: 'tuan@example.com',
      phone: '0123456793',
      fullName: 'Phạm Minh Tuấn'
    },
    fullName: 'Phạm Minh Tuấn',
    gender: 1, // Nam
    dateOfBirth: '2003-07-05',
    placeOfBirth: 'Đà Nẵng',
    teachingArea: 'Đà Nẵng',
    hourlyRate: 170000,
    profileStatus: 1,
    currentStep: 4,
    completedSteps: [1, 2, 3, 4],
    isProfileComplete: true,
    availableDays: [2, 3, 4, 5, 6, 7],
    availableTimeSlots: ['afternoon'],
    averageRating: 4.0,
    totalFeedback: 5,
    subjects: [
      { _id: 'sub9', code: 'PHYS2', name: 'Vật lý' },
      { _id: 'sub1', code: 'MATH', name: 'Toán' },
      { _id: 'sub2', code: 'PHYS', name: 'Lý' }
    ],
    grades: [],
    createdAt: '2024-01-05T00:00:00.000Z',
    updatedAt: '2024-01-05T00:00:00.000Z'
  },
  {
    _id: '6',
    userId: {
      _id: 'user6',
      email: 'lan@example.com',
      phone: '0123456794',
      fullName: 'Hoàng Thị Lan'
    },
    fullName: 'Hoàng Thị Lan',
    gender: 2, // Nữ
    dateOfBirth: '2001-09-18',
    placeOfBirth: 'Hà Nội',
    teachingArea: 'Hà Nội',
    hourlyRate: 190000,
    profileStatus: 1,
    currentStep: 4,
    completedSteps: [1, 2, 3, 4],
    isProfileComplete: true,
    availableDays: [2, 3, 4, 5, 6],
    availableTimeSlots: ['morning', 'afternoon'],
    averageRating: 4.9,
    totalFeedback: 20,
    subjects: [
      { _id: 'sub7', code: 'ENG', name: 'Tiếng Anh' },
      { _id: 'sub4', code: 'LIT', name: 'Văn' }
    ],
    grades: [],
    createdAt: '2024-01-06T00:00:00.000Z',
    updatedAt: '2024-01-06T00:00:00.000Z'
  },
  {
    _id: '7',
    userId: {
      _id: 'user7',
      email: 'anh@example.com',
      phone: '0123456795',
      fullName: 'Vũ Đức Anh'
    },
    fullName: 'Vũ Đức Anh',
    gender: 1, // Nam
    dateOfBirth: '2002-12-25',
    placeOfBirth: 'Hồ Chí Minh',
    teachingArea: 'Hồ Chí Minh',
    hourlyRate: 220000,
    profileStatus: 1,
    currentStep: 4,
    completedSteps: [1, 2, 3, 4],
    isProfileComplete: true,
    availableDays: [2, 3, 4, 5, 6, 7, 8],
    availableTimeSlots: ['morning', 'afternoon', 'evening'],
    averageRating: 4.6,
    totalFeedback: 18,
    subjects: [
      { _id: 'sub1', code: 'MATH', name: 'Toán' },
      { _id: 'sub2', code: 'PHYS', name: 'Lý' },
      { _id: 'sub3', code: 'CHEM', name: 'Hóa' },
      { _id: 'sub8', code: 'BIO', name: 'Sinh' }
    ],
    grades: [],
    createdAt: '2024-01-07T00:00:00.000Z',
    updatedAt: '2024-01-07T00:00:00.000Z'
  },
  {
    _id: '8',
    userId: {
      _id: 'user8',
      email: 'hoa@example.com',
      phone: '0123456796',
      fullName: 'Đỗ Thị Hoa'
    },
    fullName: 'Đỗ Thị Hoa',
    gender: 2, // Nữ
    dateOfBirth: '2000-04-14',
    placeOfBirth: 'Hà Nội',
    teachingArea: 'Hà Nội',
    hourlyRate: 155000,
    profileStatus: 1,
    currentStep: 4,
    completedSteps: [1, 2, 3, 4],
    isProfileComplete: true,
    availableDays: [2, 3, 4, 5, 6],
    availableTimeSlots: ['afternoon'],
    averageRating: 4.3,
    totalFeedback: 7,
    subjects: [
      { _id: 'sub4', code: 'LIT', name: 'Văn' },
      { _id: 'sub5', code: 'HIST', name: 'Sử' }
    ],
    grades: [],
    createdAt: '2024-01-08T00:00:00.000Z',
    updatedAt: '2024-01-08T00:00:00.000Z'
  }
]

export const mockSubjects = [
  'Tất cả môn học',
  'Toán',
  'Lý',
  'Hóa',
  'Sinh học',
  'Văn',
  'Sử',
  'Địa',
  'Tiếng Anh'
]

export const mockPrograms = [
  'Tất cả chương trình',
  'Tiểu học',
  'THCS',
  'THPT',
  'Luyện thi Đại học',
  'Ôn thi tốt nghiệp'
]

export const mockAreas = [
  'Tất cả khu vực',
  'Hà Nội',
  'Hồ Chí Minh',
  'Đà Nẵng',
  'Hải Phòng',
  'Cần Thơ'
]



