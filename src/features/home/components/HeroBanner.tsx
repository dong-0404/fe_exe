import { ImageCarousel } from '../../../shared/components/ImageCarousel'

export const HeroBanner = () => {
  const heroImages = [
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&h=1080&fit=crop',
  ]

  return (
    <section className="w-100" style={{ margin: 0, padding: 0, width: '100%' }}>
      <ImageCarousel images={heroImages} autoPlay={false} />
    </section>
  )
}
