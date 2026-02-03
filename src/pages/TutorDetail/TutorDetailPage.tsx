import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Container } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchTutorDetail, fetchTutorFeedbacks } from '../../features/findTutor/findTutorThunks'
import {
    selectTutorDetail,
    selectLoadingDetail,
    selectFeedbacks,
    selectFeedbackPage,
    selectFeedbackTotalPages,
    selectLoadingFeedbacks,
    selectFeedbackTotal
} from '../../features/findTutor/findTutorSelector'
import { getGenderDisplay, getTimeSlotDisplay, getDayDisplay } from '../../features/findTutor/types'
import type { Feedback } from '../../features/findTutor/types'
import './TutorDetailPage.css'

export const TutorDetailPage = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    // Selectors
    const tutorDetail = useAppSelector(selectTutorDetail)
    const loadingDetail = useAppSelector(selectLoadingDetail)
    const feedbacks = useAppSelector(selectFeedbacks)
    const feedbackPage = useAppSelector(selectFeedbackPage)
    const feedbackTotalPages = useAppSelector(selectFeedbackTotalPages)
    const loadingFeedbacks = useAppSelector(selectLoadingFeedbacks)
    const feedbackTotal = useAppSelector(selectFeedbackTotal)

    const [selectedRating, setSelectedRating] = useState<number | null>(null)

    // Fetch tutor detail và feedbacks khi component mount
    useEffect(() => {
        if (id) {
            dispatch(fetchTutorDetail(id))
            dispatch(fetchTutorFeedbacks({ tutorId: id, page: 1, limit: 10 }))
        }
    }, [dispatch, id])

    // Handle feedback page change
    const handleFeedbackPageChange = (page: number) => {
        if (id) {
            dispatch(fetchTutorFeedbacks({ tutorId: id, page, limit: 10 }))
        }
    }

    if (loadingDetail) {
        return (
            <div className="loading-container">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Đang tải...</span>
                </div>
            </div>
        )
    }

    if (!tutorDetail) {
        return (
            <Container className="py-5">
                <div className="alert alert-warning">Không tìm thấy thông tin gia sư</div>
                <Button onClick={() => navigate('/find-tutor')}>Quay lại tìm kiếm</Button>
            </Container>
        )
    }

    const formatPrice = (price?: number) => {
        if (!price) return '0'
        return price.toLocaleString('vi-VN')
    }

    const formatBirthYear = (dateString?: string) => {
        if (!dateString) return 'N/A'
        const date = new Date(dateString)
        return date.getFullYear().toString()
    }

    const formatReviewDate = (dateString: string) => {
        if (!dateString) return 'N/A'
        const date = new Date(dateString)
        return date.toLocaleDateString('vi-VN')
    }

    // Calculate rating stats from feedbacks
    const ratingStats = [
        { stars: 5, count: feedbacks.filter(f => f.rating === 5).length },
        { stars: 4, count: feedbacks.filter(f => f.rating === 4).length },
        { stars: 3, count: feedbacks.filter(f => f.rating === 3).length },
        { stars: 2, count: feedbacks.filter(f => f.rating === 2).length },
        { stars: 1, count: feedbacks.filter(f => f.rating === 1).length }
    ]

    const filteredFeedbacks = selectedRating
        ? feedbacks.filter(f => f.rating === selectedRating)
        : feedbacks

    return (
        <div className="tutor-detail-page">
            <Container>
                {/* Header */}
                <div className="page-header">
                    <h1 className="page-title">Thông tin chi tiết gia sư</h1>
                </div>

                {/* Main Content */}
                <div className="detail-card">
                    <div className="row g-4">
                        {/* Left: Avatar */}
                        <div className="col-md-4 col-lg-3">
                            <div className="tutor-avatar-wrapper">
                                <div className="tutor-avatar-placeholder">
                                    <svg width="80%" height="80%" viewBox="0 0 200 200" fill="none">
                                        <circle cx="100" cy="100" r="100" fill="#D0D0D0" />
                                        <circle cx="100" cy="70" r="30" fill="#999" />
                                        <path d="M40 160 Q40 120 100 120 Q160 120 160 160" fill="#999" />
                                    </svg>
                                </div>
                                <div className="badge-logo">
                                    <span>Logo</span>
                                </div>
                            </div>
                            <Button
                                variant="outline-primary"
                                className="chat-button"
                                onClick={() => alert('Tính năng chat đang phát triển')}
                            >
                                💬 Chat ngay
                            </Button>
                        </div>

                        {/* Right: Info */}
                        <div className="col-md-8 col-lg-9">
                            <div className="tutor-info-grid">
                                <div className="info-row">
                                    <span className="info-label">Họ và tên</span>
                                    <span className="info-value fw-bold">{tutorDetail.fullName}</span>
                                </div>

                                <div className="info-row">
                                    <span className="info-label">Năm sinh</span>
                                    <span className="info-value">{formatBirthYear(tutorDetail.dateOfBirth)}</span>
                                </div>

                                <div className="info-row">
                                    <span className="info-label">Giới tính</span>
                                    <span className="info-value">{getGenderDisplay(tutorDetail.gender)}</span>
                                </div>

                                <div className="info-row">
                                    <span className="info-label">Các môn</span>
                                    <div className="info-value">
                                        <div className="tags-wrapper">
                                            {tutorDetail.subjects.map((subject, index) => (
                                                <span key={`${subject._id}-${index}`} className="tag">
                                                    {subject.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="info-row">
                                    <span className="info-label">Trường học</span>
                                    <span className="info-value">
                                        {tutorDetail.certificates && tutorDetail.certificates.length > 0
                                            ? tutorDetail.certificates[0].schoolName
                                            : 'Chưa cập nhật'}
                                    </span>
                                </div>

                                <div className="info-row">
                                    <span className="info-label">Ngành học</span>
                                    <span className="info-value">
                                        {tutorDetail.certificates && tutorDetail.certificates.length > 0
                                            ? tutorDetail.certificates[0].major
                                            : 'Chưa cập nhật'}
                                    </span>
                                </div>

                                <div className="info-row">
                                    <span className="info-label">Trình độ</span>
                                    <span className="info-value">
                                        {tutorDetail.certificates && tutorDetail.certificates.length > 0
                                            ? (tutorDetail.certificates[0].educationStatus === 1 ? 'Đang học' : 'Đã tốt nghiệp')
                                            : 'Chưa cập nhật'}
                                    </span>
                                </div>

                                <div className="info-row">
                                    <span className="info-label">Khu vực</span>
                                    <span className="info-value">{tutorDetail.teachingArea}</span>
                                </div>

                                <div className="info-row">
                                    <span className="info-label">Giá</span>
                                    <span className="info-value">{formatPrice(tutorDetail.hourlyRate)} VNĐ/buổi (90 phút)</span>
                                </div>

                                <div className="info-row">
                                    <span className="info-label">Lớp dạy</span>
                                    <div className="info-value">
                                        <div className="tags-wrapper">
                                            {tutorDetail.grades.map((grade, index) => (
                                                <span key={`${grade._id}-${index}`} className="tag">
                                                    {grade.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="info-row">
                                    <span className="info-label">Thời gian dạy học</span>
                                    <div className="info-value">
                                        <div className="tags-wrapper">
                                            {tutorDetail.availableDays.map((day) => (
                                                <span key={day} className="tag">
                                                    {getDayDisplay(day)}
                                                </span>
                                            ))}
                                            {tutorDetail.availableTimeSlots.map((slot) => (
                                                <span key={slot} className="tag">
                                                    {getTimeSlotDisplay(slot)}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Certificates Section */}
                <div className="certificates-section">
                    <h2 className="section-title">Bằng cấp</h2>
                    <div className="certificates-grid">
                        {tutorDetail.certificates && tutorDetail.certificates.length > 0 ? (
                            tutorDetail.certificates.flatMap((cert) =>
                                cert.images.map((img, index) => (
                                    <div key={`${cert._id}-${index}`} className="certificate-item">
                                        <img src={img} alt={`${cert.schoolName} - ${cert.major}`} />
                                    </div>
                                ))
                            )
                        ) : (
                            <p className="text-muted">Chưa có bằng cấp</p>
                        )}
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="reviews-section">
                    <div className="reviews-header">
                        <div className="rating-summary">
                            <span className="rating-star">⭐</span>
                            <span className="rating-score">{tutorDetail.averageRating.toFixed(1)}</span>
                        </div>
                        <div className="rating-stats">
                            <button
                                className={`rating-filter ${!selectedRating ? 'active' : ''}`}
                                onClick={() => setSelectedRating(null)}
                            >
                                Tất cả ({feedbackTotal})
                            </button>
                            {ratingStats.map((stat) => (
                                <button
                                    key={stat.stars}
                                    className={`rating-filter ${selectedRating === stat.stars ? 'active' : ''}`}
                                    onClick={() => setSelectedRating(stat.stars)}
                                >
                                    {stat.stars} sao ({stat.count})
                                </button>
                            ))}
                        </div>
                    </div>

                    {loadingFeedbacks ? (
                        <div className="text-center py-4">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Đang tải đánh giá...</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="reviews-list">
                                {filteredFeedbacks.length > 0 ? (
                                    filteredFeedbacks.map((feedback: Feedback) => (
                                        <div key={feedback._id} className="review-item">
                                            <div className="review-avatar">
                                                <div className="avatar-placeholder">
                                                    {feedback.authorUserId.fullName.charAt(0).toUpperCase()}
                                                </div>
                                            </div>
                                            <div className="review-content">
                                                <div className="review-header">
                                                    <span className="review-user">{feedback.authorUserId.fullName}</span>
                                                    <span className="review-rating">
                                                        {'⭐'.repeat(feedback.rating)}
                                                    </span>
                                                </div>
                                                <div className="review-date">{formatReviewDate(feedback.createdAt)}</div>
                                                <div className="review-text">{feedback.comment}</div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-4 text-muted">
                                        Chưa có đánh giá nào
                                    </div>
                                )}
                            </div>

                            {feedbackTotalPages > 1 && (
                                <div className="pagination-controls">
                                    <button
                                        className="page-btn"
                                        onClick={() => handleFeedbackPageChange(feedbackPage - 1)}
                                        disabled={feedbackPage === 1}
                                    >
                                        «
                                    </button>
                                    {Array.from({ length: feedbackTotalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            className={`page-btn ${page === feedbackPage ? 'active' : ''}`}
                                            onClick={() => handleFeedbackPageChange(page)}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <button
                                        className="page-btn"
                                        onClick={() => handleFeedbackPageChange(feedbackPage + 1)}
                                        disabled={feedbackPage === feedbackTotalPages}
                                    >
                                        »
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </Container>
        </div>
    )
}
