import React from 'react';
import { cn } from '../utils/classNames';

function Button({ 
  children, 
  variant = 'default', 
  className, 
  ...props 
}) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2",
        variant === 'default' && "bg-[#215273] text-white hover:bg-[#215273]/90 focus:ring-[#215273]",
        variant === 'outline' && "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-[#215273]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
