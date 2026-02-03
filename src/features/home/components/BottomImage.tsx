interface BottomImageProps {
    imageUrl?: string
    image?: string
    alt?: string
}

export const BottomImage = ({
    imageUrl,
    image,
    alt = 'Bottom decorative image'
}: BottomImageProps) => {
    const imageSource = image || imageUrl

    return (
        <section className="w-100" style={{ marginTop: 'auto' }}>
            {imageSource ? (
                <img
                    src={imageSource}
                    alt={alt}
                    className="w-100"
                    style={{
                        display: 'block',
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover'
                    }}
                />
            ) : (
                <div className="d-flex align-items-center justify-content-center bg-dark text-white" style={{ height: '200px' }}>
                    <p className="text-muted">No image provided</p>
                </div>
            )}
        </section>
    )
}

