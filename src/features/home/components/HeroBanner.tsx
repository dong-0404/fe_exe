import { ImageCarousel } from '../../../shared/components/ImageCarousel'

export const HeroBanner = () => {
  const heroImages = [
    'https://media.istockphoto.com/id/1864671713/vi/anh/hai-m%E1%BA%B9-con-h%E1%BB%8Dc-c%C3%B9ng-nhau-ng%E1%BB%93i-b%C3%A0n-%E1%BB%9F-nh%C3%A0-trong-ph%C3%B2ng-kh%C3%A1ch-gia-s%C6%B0-nam-n%E1%BB%AF-d%E1%BA%A1y-%E1%BB%9F-nh%C3%A0-c%C3%B9ng-nhau-l%C3%A0m.jpg?s=612x612&w=0&k=20&c=wXPUGgFjfJlyxL3jPjL4695_ODzHuH81E_PzvKS12gc=',
    'https://minio.ftech.ai/hoclagioi/chon_gia_su_online_1_3c062847c6.jpg',
    'https://minio.ftech.ai/hoclagioi/Gia_su_online_hoc_nhom_2486987b2d.jpg',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&h=1080&fit=crop',
  ]

  return (
    <section className="w-100" style={{ margin: 0, padding: 0, width: '100%' }}>
      <ImageCarousel images={heroImages} autoPlay={false} />
    </section>
  )
}
