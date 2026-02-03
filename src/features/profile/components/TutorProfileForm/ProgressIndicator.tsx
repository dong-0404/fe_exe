import './TutorProfileForm.css'

interface ProgressIndicatorProps {
    currentStep: 1 | 2 | 3 | 4
    completedSteps: number[]
}

const steps = [
    { number: 1, label: 'Thông tin cơ bản' },
    { number: 2, label: 'Thông tin định danh' },
    { number: 3, label: 'Bằng cấp, chứng chỉ' },
    { number: 4, label: 'Thông tin giảng dạy' },
]

export const ProgressIndicator = ({ currentStep, completedSteps }: ProgressIndicatorProps) => {
    const getStepStatus = (stepNumber: number) => {
        if (completedSteps.includes(stepNumber)) return 'completed'
        if (stepNumber === currentStep) return 'active'
        return 'pending'
    }

    return (
        <div className="progress-indicator">
            {steps.map((step, index) => (
                <div key={step.number} className="progress-step-wrapper">
                    <div className={`progress-step ${getStepStatus(step.number)}`}>
                        <div className="step-circle">
                            {completedSteps.includes(step.number) ? (
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                                    <path d="M7 10L9 12L13 8" stroke="white" strokeWidth="2" fill="none" />
                                </svg>
                            ) : (
                                <span>{step.number}</span>
                            )}
                        </div>
                        <div className="step-label">{step.label}</div>
                    </div>
                    {index < steps.length - 1 && (
                        <div
                            className={`step-connector ${completedSteps.includes(step.number) ? 'completed' : ''
                                }`}
                        />
                    )}
                </div>
            ))}
        </div>
    )
}
