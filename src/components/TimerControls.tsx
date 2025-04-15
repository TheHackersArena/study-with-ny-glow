
import React from 'react';
import { useTimer } from '@/contexts/TimerContext';
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from 'lucide-react';

export function TimerControls() {
  const { isRunning, startTimer, pauseTimer, resetTimer } = useTimer();
  
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      {!isRunning ? (
        <Button 
          onClick={startTimer}
          size="lg"
          className="bg-primary-400 hover:bg-primary-500 text-white rounded-full w-14 h-14 p-0 animate-pulse-glow"
        >
          <Play size={24} />
        </Button>
      ) : (
        <Button 
          onClick={pauseTimer}
          size="lg"
          className="bg-primary-500 hover:bg-primary-600 text-white rounded-full w-14 h-14 p-0"
        >
          <Pause size={24} />
        </Button>
      )}
      
      <Button 
        onClick={resetTimer}
        size="lg"
        className="bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-full w-14 h-14 p-0"
        variant="outline"
      >
        <RotateCcw size={24} />
      </Button>
    </div>
  );
}
