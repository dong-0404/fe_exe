import './Card.css'

interface CardProps {
    title?: string
    children: React.ReactNode
    className?: string
    onClick?: () => void
}

export const Card = ({ title, children, className = '', onClick }: CardProps) => {
    return (
        <div className={`card ${className}`} onClick={onClick}>
            {title && <h3 className="card-title">{title}</h3>}
            <div className="card-content">{children}</div>
        </div>
    )
}

