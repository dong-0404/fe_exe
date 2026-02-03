import { HeroBanner } from '../../features/home/components/HeroBanner'
import { ServiceIntroduction } from '../../features/home/components/ServiceIntroduction'
import { EffectiveLearningSteps } from '../../features/home/components/EffectiveLearningSteps'
import { FeaturedTutors } from '../../features/home/components/FeaturedTutors'
import serviceIntroductionImage from '../../assets/images/service-introduction.png'

export const HomePage = () => {
    return (
        <>
            <HeroBanner />
            <ServiceIntroduction image={serviceIntroductionImage} />
            <EffectiveLearningSteps />
            <FeaturedTutors />
        </>
    )
}