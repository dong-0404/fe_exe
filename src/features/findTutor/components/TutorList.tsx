import { useNavigate } from 'react-router-dom'
import { TutorCard } from './TutorCard'
import { Pagination } from './Pagination'
import { useFindTutor } from '../hooks/useFindTutor'
import { useStartChat } from '../../chat/hooks'

export const TutorList = () => {
  const navigate = useNavigate()
  const { tutors, totalPages, currentPage, handlePageChange } = useFindTutor()
  const { startChat } = useStartChat()

  const handleRegister = (tutorId: string) => {
    const tutor = tutors.find(t => t._id === tutorId)
    const targetUserId = tutor?.userId?._id
    if (!targetUserId) {
      console.warn('Tutor does not have userId, cannot start chat')
      return
    }

    // Mở chat với gia sư và gửi sẵn 1 tin nhắn đăng ký học
    void startChat(targetUserId, 'Tôi muốn đăng kí học')
  }

  const handleViewDetails = (tutorId: string) => {
    navigate(`/tutor/${tutorId}`)
  }

  if (tutors.length === 0) {
    return (
      <div style={{ backgroundColor: '#FFFFFF', paddingTop: '40px', paddingBottom: '60px' }}>
        <div className="container py-5">
          <div className="text-center py-5">
            <p className="text-muted fs-5">Không tìm thấy gia sư nào phù hợp</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#FFFFFF', paddingTop: '40px', paddingBottom: '60px' }}>
      <div className="container py-5">
        {tutors.map((tutor) => (
          <TutorCard
            key={tutor._id}
            tutor={tutor}
            onRegister={handleRegister}
            onViewDetails={handleViewDetails}
          />
        ))}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  )
}



