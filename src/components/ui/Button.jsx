// src/components/ui/Button.jsx
import React from 'react';

const Button = ({ children, onClick, variant = 'primary', type = 'button', disabled = false, className = '' }) => {
  const baseStyles = 'px-4 py-2 font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
  };

  const disabledStyles = 'disabled:bg-gray-300 disabled:cursor-not-allowed';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabledStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;