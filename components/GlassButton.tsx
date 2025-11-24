import React from 'react';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
  variant?: 'default' | 'danger' | 'primary';
}

export const GlassButton: React.FC<GlassButtonProps> = ({ 
  children, 
  fullWidth = true, 
  variant = 'default',
  className = '',
  ...props 
}) => {
  let bgStyles = "bg-white/20 hover:bg-white/30 border-white/40";
  
  if (variant === 'danger') {
    bgStyles = "bg-red-500/30 hover:bg-red-500/50 border-red-200/40 text-red-50";
  } else if (variant === 'primary') {
    bgStyles = "bg-blue-500/40 hover:bg-blue-500/60 border-blue-200/40 text-blue-50";
  }

  return (
    <button 
      className={`
        flex min-w-[84px] cursor-pointer items-center justify-center 
        overflow-hidden rounded-full h-14 px-5 
        text-white text-base font-bold leading-normal tracking-[0.015em] 
        border backdrop-blur-md transition-all duration-200 
        hover:scale-[1.02] active:scale-95
        ${fullWidth ? 'w-full' : ''}
        ${bgStyles}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};