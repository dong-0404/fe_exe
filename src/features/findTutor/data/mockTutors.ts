import type { Tutor } from '../types'

export const mockTutors: Tutor[] = [
  {
    id: '1',
    name: 'Tường Duy Chiến',
    birthDate: '09/05/2003',
    gender: 'Nam',
    subjects: [
      { id: 1, subjectName: 'Toán' },
      { id: 2, subjectName: 'Lý' },
      { id: 3, subjectName: 'Hóa' }
    ],
    location: 'Hà Nội',
    price: 150000,
    priceUnit: 'đ/buổi',
    duration: '90 phút',
    badge: true
  },
  {
    id: '2',
    name: 'Nguyễn Thị Mai',
    birthDate: '15/08/2001',
    gender: 'Nữ',
    subjects: [
      { id: 4, subjectName: 'Văn' },
      { id: 5, subjectName: 'Sử' },
      { id: 6, subjectName: 'Địa' }
    ],
    location: 'Hà Nội',
    price: 180000,
    priceUnit: 'đ/buổi',
    duration: '90 phút',
    badge: true
  },
  {
    id: '3',
    name: 'Trần Văn Đức',
    birthDate: '22/03/2002',
    gender: 'Nam',
    subjects: [
      { id: 7, subjectName: 'Tiếng Anh' },
      { id: 1, subjectName: 'Toán' }
    ],
    location: 'Hồ Chí Minh',
    price: 200000,
    priceUnit: 'đ/buổi',
    duration: '90 phút',
    badge: false
  },
  {
    id: '4',
    name: 'Lê Thị Hương',
    birthDate: '10/11/2000',
    gender: 'Nữ',
    subjects: [
      { id: 8, subjectName: 'Sinh học' },
      { id: 3, subjectName: 'Hóa' }
    ],
    location: 'Hà Nội',
    price: 160000,
    priceUnit: 'đ/buổi',
    duration: '90 phút',
    badge: true
  },
  {
    id: '5',
    name: 'Phạm Minh Tuấn',
    birthDate: '05/07/2003',
    gender: 'Nam',
    subjects: [
      { id: 9, subjectName: 'Vật lý' },
      { id: 1, subjectName: 'Toán' },
      { id: 2, subjectName: 'Lý' }
    ],
    location: 'Đà Nẵng',
    price: 170000,
    priceUnit: 'đ/buổi',
    duration: '90 phút',
    badge: false
  },
  {
    id: '6',
    name: 'Hoàng Thị Lan',
    birthDate: '18/09/2001',
    gender: 'Nữ',
    subjects: [
      { id: 7, subjectName: 'Tiếng Anh' },
      { id: 4, subjectName: 'Văn' }
    ],
    location: 'Hà Nội',
    price: 190000,
    priceUnit: 'đ/buổi',
    duration: '90 phút',
    badge: true
  },
  {
    id: '7',
    name: 'Vũ Đức Anh',
    birthDate: '25/12/2002',
    gender: 'Nam',
    subjects: [
      { id: 1, subjectName: 'Toán' },
      { id: 2, subjectName: 'Lý' },
      { id: 3, subjectName: 'Hóa' },
      { id: 8, subjectName: 'Sinh' }
    ],
    location: 'Hồ Chí Minh',
    price: 220000,
    priceUnit: 'đ/buổi',
    duration: '90 phút',
    badge: true
  },
  {
    id: '8',
    name: 'Đỗ Thị Hoa',
    birthDate: '14/04/2000',
    gender: 'Nữ',
    subjects: [
      { id: 4, subjectName: 'Văn' },
      { id: 5, subjectName: 'Sử' }
    ],
    location: 'Hà Nội',
    price: 155000,
    priceUnit: 'đ/buổi',
    duration: '90 phút',
    badge: false
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



