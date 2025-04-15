
import React from 'react';
import { useTimer } from '@/contexts/TimerContext';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function ModeSelector() {
  const { mode, setMode } = useTimer();
  
  return (
    <div className="flex justify-center mb-8">
      <ToggleGroup type="single" value={mode} onValueChange={(value) => value && setMode(value as 'focus' | 'shortBreak' | 'longBreak')}>
        <ToggleGroupItem 
          value="focus" 
          className={`rounded-l-full px-6 py-2 text-sm font-medium transition-all glass-effect
            ${mode === 'focus' ? 'bg-primary-400/80 text-white' : 'text-primary-700 dark:text-primary-200'}`}
        >
          Focus Session
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="shortBreak" 
          className={`px-6 py-2 text-sm font-medium transition-all glass-effect
            ${mode === 'shortBreak' ? 'bg-primary-400/80 text-white' : 'text-primary-700 dark:text-primary-200'}`}
        >
          Short Recharge
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="longBreak" 
          className={`rounded-r-full px-6 py-2 text-sm font-medium transition-all glass-effect
            ${mode === 'longBreak' ? 'bg-primary-400/80 text-white' : 'text-primary-700 dark:text-primary-200'}`}
        >
          Deep Break
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
