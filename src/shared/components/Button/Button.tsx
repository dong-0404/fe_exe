import './Button.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger'
    size?: 'small' | 'medium' | 'large'
}

export const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    className = '',
    ...props
}: ButtonProps) => {
    return (
        <button
            className={`btn btn-${variant} btn-${size} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

