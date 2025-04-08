import React from 'react';
import { cn } from '../utils/classNames';

function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
