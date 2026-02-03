import { SearchBar, TutorList } from '../../features/findTutor/components'

export const FindTutorPage = () => {
    return (
        <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
            <SearchBar />
            <TutorList />
        </div>
    )
}

