import { useEffect } from 'react'
import './ImageLightbox.css'

interface ImageLightboxProps {
  images: string[]
  currentIndex: number
  onClose: () => void
  onNext?: () => void
  onPrev?: () => void
}

export const ImageLightbox = ({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev
}: ImageLightboxProps) => {
  useEffect(() => {
    // Disable scroll when lightbox is open
    document.body.style.overflow = 'hidden'
    
    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowRight' && onNext) {
        onNext()
      } else if (e.key === 'ArrowLeft' && onPrev) {
        onPrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, onNext, onPrev])

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="image-lightbox" onClick={handleBackdropClick}>
      <button
        className="image-lightbox__close"
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>

      {images.length > 1 && (
        <>
          {currentIndex > 0 && (
            <button
              className="image-lightbox__nav image-lightbox__nav--prev"
              onClick={onPrev}
              aria-label="Previous image"
            >
              ‹
            </button>
          )}
          {currentIndex < images.length - 1 && (
            <button
              className="image-lightbox__nav image-lightbox__nav--next"
              onClick={onNext}
              aria-label="Next image"
            >
              ›
            </button>
          )}
        </>
      )}

      <div className="image-lightbox__content">
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="image-lightbox__image"
        />
        {images.length > 1 && (
          <div className="image-lightbox__counter">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  )
}
