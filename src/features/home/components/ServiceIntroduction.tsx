interface ServiceIntroductionProps {
  imageUrl?: string
  image?: string // Hỗ trợ import trực tiếp từ assets
  alt?: string
}

export const ServiceIntroduction = ({
  imageUrl,
  image,
  alt = 'Gia Sư 1-1 Tại Nhà & Online'
}: ServiceIntroductionProps) => {
  const imageSource = image || imageUrl

  return (
    <section className="bg-white" style={{ padding: '40px 0' }}>
      <div className="container">
        <div className="d-flex justify-content-center">
          {imageSource ? (
            <img
              src={imageSource}
              alt={alt}
              className="img-fluid"
              style={{
                display: 'block',
                maxWidth: '80%',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
          ) : (
            <div className="d-flex align-items-center justify-content-center bg-light" style={{ height: '500px', width: '80%' }}>
              <p className="text-muted">No image provided</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
