import React from 'react';
import { Heart, Leaf } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`${sizeClasses[size]} relative`}>
        <div className="absolute inset-0 bg-gradient-to-br from-sage-400 via-mint-400 to-sky-400 rounded-2xl animate-pulse-soft"></div>
        <div className="relative bg-gradient-to-br from-sage-500 via-mint-500 to-sky-500 rounded-2xl p-2 shadow-lg">
          <div className="relative">
            <Heart className="w-full h-full text-white animate-bounce-gentle" fill="currentColor" />
            <Leaf className="absolute -top-1 -right-1 w-3 h-3 text-cream-100 animate-float" />
          </div>
        </div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold gradient-text ${textSizeClasses[size]}`}>
            Unsaid AI
          </span>
          <span className="text-xs text-sage-600 -mt-1">Safe Space</span>
        </div>
      )}
    </div>
  );
};