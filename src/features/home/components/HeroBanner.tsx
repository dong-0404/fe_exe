import { ImageCarousel } from '../../../shared/components/ImageCarousel'

export const HeroBanner = () => {
  // Ảnh đặt trong: public/images/banners/
  // Ví dụ: banner-1.jpg, banner-2.jpg, banner-3.jpg
  const heroImages = [
    '/images/banners/tutorlink_banner_1.png',
    '/images/banners/tutorlink_banner_2.png',
    '/images/banners/tutorlink_banner_4.png',
  ]

  return (
    <section className="w-100" style={{ margin: 0, padding: 0, width: '100%' }}>
      <ImageCarousel images={heroImages} autoPlay={false} />
    </section>
  )
}
