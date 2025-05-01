import { FC, ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'black' | 'red';
  className?: string;
  tooltip?: string;
  icon?: ReactNode;
}

const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  tooltip = '',
  icon,
  ...props
}) => {
  const variantClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
    danger: 'btn-error text-white',
    black: 'bg-black text-white hover:bg-gray-800 border border-transparent',
    red: 'bg-red-500 text-white hover:bg-gray-800 border border-transparent',
  };

  const buttonElement = (
    <button className={`btn ${variantClass[variant]} ${className}`} {...props}>
      {icon && <span className="mr-2">{icon}</span>} {/* If there's an icon, display it */}
      {children}
    </button>
  );

  return tooltip ? (
    <div className="tooltip" data-tip={tooltip}>
      {buttonElement}
    </div>
  ) : (
    buttonElement
  );
};

export default Button;
