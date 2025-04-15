
import React from 'react';
import { useTimer } from '@/contexts/TimerContext';

export function TimerDisplay() {
  const { timeLeft, progress } = useTimer();
  
  // Format time as mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Calculate stroke-dashoffset for the progress circle
  const calculateStrokeDashoffset = (percent: number): number => {
    const circumference = 2 * Math.PI * 120; // Circle radius is 120
    return circumference - (percent / 100) * circumference;
  };
  
  return (
    <div className="relative w-80 h-80 mx-auto flex items-center justify-center">
      {/* Circular progress indicator */}
      <svg 
        className="absolute top-0 left-0 w-full h-full -rotate-90"
        viewBox="0 0 250 250"
      >
        {/* Background circle */}
        <circle
          cx="125"
          cy="125"
          r="120"
          fill="none"
          strokeWidth="8"
          className="stroke-primary-100/30 dark:stroke-primary-900/30"
        />
        {/* Progress circle */}
        <circle
          cx="125"
          cy="125"
          r="120"
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 120}
          strokeDashoffset={calculateStrokeDashoffset(progress)}
          className="stroke-primary-400 dark:stroke-primary-400 transition-all duration-1000 ease-linear"
        />
      </svg>
      
      {/* Timer display */}
      <div className="z-10 text-center">
        <h2 className="text-8xl font-bold font-inter tracking-wider">{formatTime(timeLeft)}</h2>
      </div>
    </div>
  );
}
