import { motion } from 'framer-motion';
import React from 'react';

type ButtonVariant = 'primary' | 'outline' | 'orange' | 'gray' | 'red';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asAnchor?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<any>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  asAnchor = false,
  href,
  target,
  rel,
  children,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}: ButtonProps) {
  // Styles based on variants
  const baseStyles = 'inline-flex items-center justify-center rounded-[6px] font-medium transition-all duration-200 focus:outline-none select-none text-center cursor-pointer';
  
  const variantStyles = {
    primary: 'bg-[#1762d1] hover:bg-[#2b68c0] text-white hover-glow border border-transparent',
    outline: 'border border-[#1762d1] bg-transparent text-[#1762d1] hover:bg-[#d5e4fb] hover:text-[#1762d1]',
    orange: 'bg-[#b74a19] hover:bg-[#c95b28] text-white hover-glow-orange border border-transparent shadow-lg',
    gray: 'bg-gray-700 hover:bg-gray-600 text-white border border-transparent',
    red: 'bg-red-950/20 border border-red-500/20 text-red-400 hover:bg-red-500/10',
  };

  const sizeStyles = {
    sm: 'px-4 py-1.5 text-[14px]',
    md: 'px-6 py-2.5 text-[18px]',
    lg: 'px-8 py-3.5 text-[21px]',
  };

  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`;

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.03 },
    whileTap: disabled ? {} : { scale: 0.97 },
    onClick: disabled ? undefined : onClick,
    className: combinedClasses,
    'data-cursor-hover': true,
    ...props
  };

  if (asAnchor && href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        {...motionProps as any}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}

export default Button;
