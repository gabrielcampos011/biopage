import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">{label}</label>}
      <input 
        className={`
          w-full h-12 px-4 rounded-xl
          bg-black/20 border border-white/10
          text-white placeholder-white/30
          focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/50
          transition-all duration-200
          ${className}
        `}
        {...props}
      />
    </div>
  );
};