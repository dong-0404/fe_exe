interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const buttonStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  }

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#0066FF',
    color: '#FFFFFF'
  }

  const inactiveButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#E8E8E8',
    color: '#333333'
  }

  const navButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'transparent',
    color: '#333333',
    fontSize: '1.2rem'
  }

  const disabledNavButtonStyle = {
    ...navButtonStyle,
    opacity: 0.4,
    cursor: 'not-allowed'
  }

  return (
    <div className="d-flex justify-content-center align-items-center gap-2 my-5">
      {/* First Page Button */}
      <button
        style={currentPage === 1 ? disabledNavButtonStyle : navButtonStyle}
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        onMouseEnter={(e) => {
          if (currentPage !== 1) {
            e.currentTarget.style.backgroundColor = '#F0F0F0'
          }
        }}
        onMouseLeave={(e) => {
          if (currentPage !== 1) {
            e.currentTarget.style.backgroundColor = 'transparent'
          }
        }}
      >
        K
      </button>

      {/* Previous Page Button */}
      <button
        style={currentPage === 1 ? disabledNavButtonStyle : navButtonStyle}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        onMouseEnter={(e) => {
          if (currentPage !== 1) {
            e.currentTarget.style.backgroundColor = '#F0F0F0'
          }
        }}
        onMouseLeave={(e) => {
          if (currentPage !== 1) {
            e.currentTarget.style.backgroundColor = 'transparent'
          }
        }}
      >
        &lt;
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          style={currentPage === page ? activeButtonStyle : inactiveButtonStyle}
          onClick={() => onPageChange(page)}
          onMouseEnter={(e) => {
            if (currentPage !== page) {
              e.currentTarget.style.backgroundColor = '#D0D0D0'
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage !== page) {
              e.currentTarget.style.backgroundColor = '#E8E8E8'
            }
          }}
        >
          {page}
        </button>
      ))}

      {/* Next Page Button */}
      <button
        style={currentPage === totalPages ? disabledNavButtonStyle : navButtonStyle}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        onMouseEnter={(e) => {
          if (currentPage !== totalPages) {
            e.currentTarget.style.backgroundColor = '#F0F0F0'
          }
        }}
        onMouseLeave={(e) => {
          if (currentPage !== totalPages) {
            e.currentTarget.style.backgroundColor = 'transparent'
          }
        }}
      >
        &gt;
      </button>

      {/* Last Page Button */}
      <button
        style={currentPage === totalPages ? disabledNavButtonStyle : navButtonStyle}
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        onMouseEnter={(e) => {
          if (currentPage !== totalPages) {
            e.currentTarget.style.backgroundColor = '#F0F0F0'
          }
        }}
        onMouseLeave={(e) => {
          if (currentPage !== totalPages) {
            e.currentTarget.style.backgroundColor = 'transparent'
          }
        }}
      >
        &gt;&gt;
      </button>
    </div>
  )
}



