import { useState } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useFindTutor } from '../hooks/useFindTutor'

export const SearchBar = () => {
    const { handleSearch, subjects, grades, loadingSubjects, loadingGrades } = useFindTutor()
    const [keyword, setKeyword] = useState('')
    const [selectedSubject, setSelectedSubject] = useState('')
    const [selectedGrade, setSelectedGrade] = useState('')
    const [area, setArea] = useState('')

    const handleSubmit = () => {
        handleSearch({
            name: keyword.trim() || undefined,
            subjects: selectedSubject || undefined,
            grades: selectedGrade || undefined,
            teachingArea: area.trim() || undefined
        })
    }

    return (
        <>
            {/* Spacing from header */}
            <div style={{ height: '80px' }}></div>

            {/* Blue Banner Container with Rounded Corners - Overlaps TutorList */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 2
                }}
            >
                <div className="container">
                    <div
                        style={{
                            backgroundColor: '#0066FF',
                            color: 'white',
                            paddingTop: '20px',
                            paddingBottom: '20px',
                            borderRadius: '120px'
                        }}
                    >
                        <h1
                            className="text-center text-white mb-3 fw-bold"
                            style={{
                                fontSize: '2.5rem',
                                letterSpacing: '1px',
                                textTransform: 'uppercase'
                            }}
                        >
                            TÌM KIẾM GIA SƯ
                        </h1>
                        <p
                            className="text-center text-white mb-0"
                            style={{
                                fontSize: '1.1rem',
                                fontWeight: 'normal'
                            }}
                        >
                            Tìm lớp dạy kèm theo nhu cầu học tập của bạn
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Area with White Background and Border */}
            <div
                style={{
                    backgroundColor: '#FFFFFF',
                    paddingTop: '50px',
                    position: 'relative',
                    zIndex: 1
                }}
            >
                <div className="container">
                    {/* SearchBar Container with Border */}
                    <div
                        style={{
                            border: '2px solid #E0E0E0',
                            borderRadius: '20px',
                            padding: '40px 30px 30px 30px',
                            backgroundColor: '#FFFFFF',
                            marginTop: '-80px',
                            position: 'relative',
                            zIndex: 1
                        }}
                    >
                        {/* Search Input and Button - White Card */}
                        <div className="row justify-content-center mb-5">
                            <div className="col-lg-8">
                                <div
                                    style={{
                                        backgroundColor: '#fff',
                                        borderRadius: '12px',
                                        padding: '20px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                        position: 'relative',
                                        zIndex: 10
                                    }}
                                >
                                    <InputGroup size="lg">
                                        <Form.Control
                                            type="text"
                                            placeholder="Nhập từ khóa tìm kiếm...."
                                            value={keyword}
                                            onChange={(e) => setKeyword(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                                            style={{
                                                border: '1px solid #000',
                                                borderRadius: '8px 0 0 8px',
                                                padding: '14px 20px',
                                                fontSize: '1rem',
                                                borderRight: 'none'
                                            }}
                                        />
                                        <Button
                                            variant="primary"
                                            onClick={handleSubmit}
                                            style={{
                                                backgroundColor: '#0066FF',
                                                border: '1px solid #0066FF',
                                                borderRadius: '0 8px 8px 0',
                                                padding: '14px 28px',
                                                fontSize: '1rem',
                                                fontWeight: 'bold',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="white"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <circle cx="11" cy="11" r="8"></circle>
                                                <path d="m21 21-4.35-4.35"></path>
                                            </svg>
                                            TÌM KIẾM
                                        </Button>
                                    </InputGroup>
                                </div>
                            </div>
                        </div>

                        {/* Filter Cards */}
                        <div className="row g-4 justify-content-center" style={{ position: 'relative', zIndex: 15 }}>
                            {/* Môn học Card */}
                            <div className="col-md-4 col-lg-3">
                                <div
                                    style={{
                                        backgroundColor: '#E8E8E8',
                                        borderRadius: '20px',
                                        padding: '24px',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                        height: '100%'
                                    }}
                                >
                                    <h3
                                        className="text-center fw-bold mb-3"
                                        style={{
                                            fontSize: '1rem',
                                            textTransform: 'uppercase',
                                            color: '#000',
                                            marginBottom: '20px'
                                        }}
                                    >
                                        MÔN HỌC
                                    </h3>
                                    <Form.Select
                                        value={selectedSubject}
                                        onChange={(e) => setSelectedSubject(e.target.value)}
                                        disabled={loadingSubjects}
                                        style={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #000',
                                            borderRadius: '8px',
                                            padding: '12px 16px',
                                            fontSize: '0.95rem',
                                            color: '#666',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <option value="">Tất cả môn học</option>
                                        {subjects.map((subject) => (
                                            <option key={subject._id} value={subject._id}>
                                                {subject.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </div>
                            </div>

                            {/* Lớp học Card */}
                            <div className="col-md-4 col-lg-3">
                                <div
                                    style={{
                                        backgroundColor: '#E8E8E8',
                                        borderRadius: '20px',
                                        padding: '24px',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                        height: '100%'
                                    }}
                                >
                                    <h3
                                        className="text-center fw-bold mb-3"
                                        style={{
                                            fontSize: '1rem',
                                            textTransform: 'uppercase',
                                            color: '#000',
                                            marginBottom: '20px'
                                        }}
                                    >
                                        LỚP HỌC
                                    </h3>
                                    <Form.Select
                                        value={selectedGrade}
                                        onChange={(e) => setSelectedGrade(e.target.value)}
                                        disabled={loadingGrades}
                                        style={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #000',
                                            borderRadius: '8px',
                                            padding: '12px 16px',
                                            fontSize: '0.95rem',
                                            color: '#666',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <option value="">Tất cả lớp học</option>
                                        {grades.map((grade) => (
                                            <option key={grade._id} value={grade._id}>
                                                {grade.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </div>
                            </div>

                            {/* Khu vực Card */}
                            <div className="col-md-4 col-lg-3">
                                <div
                                    style={{
                                        backgroundColor: '#E8E8E8',
                                        borderRadius: '20px',
                                        padding: '24px',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                        height: '100%'
                                    }}
                                >
                                    <h3
                                        className="text-center fw-bold mb-3"
                                        style={{
                                            fontSize: '1rem',
                                            textTransform: 'uppercase',
                                            color: '#000',
                                            marginBottom: '20px'
                                        }}
                                    >
                                        KHU VỰC
                                    </h3>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập khu vực..."
                                        value={area}
                                        onChange={(e) => setArea(e.target.value)}
                                        style={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #000',
                                            borderRadius: '8px',
                                            padding: '12px 16px',
                                            fontSize: '0.95rem',
                                            color: '#666'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

