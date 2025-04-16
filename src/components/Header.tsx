
import React from 'react';
import { useTimer } from '@/contexts/TimerContext';
import { Volume2, VolumeX } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MusicPlayer } from '@/components/MusicPlayer';
import { ThemeSelector } from '@/components/ThemeSelector';

export function Header() {
  const { streak, muteSound, toggleMute } = useTimer();
  
  return (
    <header className="w-full flex items-center justify-between p-4">
      <div className="flex items-center">
        <h1 className="text-3xl font-caveat font-bold mr-2">Study with NY</h1>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Streak badge */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="streak-badge rounded-full px-3 py-1 text-white text-sm font-medium flex items-center">
                <span className="mr-1">🔥</span> 
                <span>{streak} day{streak !== 1 ? 's' : ''}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Your daily study streak!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {/* Sound toggle */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMute}
                className="text-primary-600 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-200"
              >
                {muteSound ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{muteSound ? 'Unmute' : 'Mute'} timer sounds</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {/* Music Player */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <MusicPlayer />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Background music & ambient sounds</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {/* Theme selector */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <ThemeSelector />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Change wallpaper theme</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  );
}
