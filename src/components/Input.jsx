import React from 'react';
import { cn } from '../utils/classNames';

function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#215273] focus:border-[#215273]",
        className
      )}
      {...props}
    />
  );
}

export default Input;
