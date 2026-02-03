import { useState } from 'react'
import { Carousel } from 'react-bootstrap'

interface ImageCarouselProps {
    images: string[]
    autoPlay?: boolean
    autoPlayInterval?: number
}

export const ImageCarousel = ({
    images,
    autoPlay = false,
    autoPlayInterval = 3000
}: ImageCarouselProps) => {
    const [activeIndex, setActiveIndex] = useState(0)

    const handleSelect = (selectedIndex: number) => {
        setActiveIndex(selectedIndex)
    }

    if (images.length === 0) {
        return (
            <div className="d-flex align-items-center justify-content-center bg-light" style={{ height: '60vh' }}>
                <p className="text-muted">No images</p>
            </div>
        )
    }

    return (
        <div className="position-relative w-100" style={{ height: '70vh' }}>
            <Carousel
                activeIndex={activeIndex}
                onSelect={handleSelect}
                interval={autoPlay ? autoPlayInterval : null}
                controls={images.length > 1}
                indicators={false}
            >
                {images.map((image, index) => (
                    <Carousel.Item key={index}>
                        {image.startsWith('data:') || image.startsWith('http') ? (
                            <div className="position-relative w-100 h-100">
                                <img
                                    className="d-block w-100"
                                    src={image}
                                    alt={`Slide ${index + 1}`}
                                    style={{
                                        objectFit: 'cover',
                                        height: '70vh',
                                        width: '100%'
                                    }}
                                />
                                <div
                                    className="position-absolute bottom-0 start-0 end-0"
                                    style={{
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
                                        height: '80px',
                                        pointerEvents: 'none'
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="d-flex align-items-center justify-content-center bg-light" style={{ height: '70vh' }}>
                                <p className="text-muted">Image {index + 1}</p>
                            </div>
                        )}
                    </Carousel.Item>
                ))}
            </Carousel>

            {/* Custom Indicators - sát mép dưới của ảnh */}
            {images.length > 1 && (
                <div
                    className="position-absolute start-50 translate-middle-x d-flex gap-2"
                    style={{
                        zIndex: 10,
                        bottom: '8px'
                    }}
                >
                    {images.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className="rounded-circle border-0 p-0"
                            onClick={() => setActiveIndex(index)}
                            style={{
                                width: '12px',
                                height: '12px',
                                backgroundColor: activeIndex === index ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
