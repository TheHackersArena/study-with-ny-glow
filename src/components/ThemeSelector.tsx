
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Settings, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const themes = [
  { name: 'NYC Sunset', value: 'nyc-sunset' },
  { name: 'Midnight City', value: 'midnight-city' },
  { name: 'Purple Dusk', value: 'purple-dusk' },
  { name: 'Ocean Blue', value: 'ocean-blue' },
  { name: 'Sunset Gold', value: 'sunset-gold' }
];

export function ThemeSelector() {
  const { setTheme } = useTheme();
  const [currentWallpaper, setCurrentWallpaper] = useState('nyc-sunset');
  
  const changeTheme = (wallpaper: string) => {
    setCurrentWallpaper(wallpaper);
    // Always set to dark theme
    setTheme('dark');
    
    // Update the data-theme attribute on the cityscape background
    const cityscapeElement = document.querySelector('.cityscape-bg');
    if (cityscapeElement) {
      cityscapeElement.setAttribute('data-theme', wallpaper);
    }
    
    // Save preference to localStorage
    localStorage.setItem('wallpaper', wallpaper);
  };
  
  // Load saved wallpaper on mount
  useEffect(() => {
    const savedWallpaper = localStorage.getItem('wallpaper') || 'nyc-sunset';
    setCurrentWallpaper(savedWallpaper);
    
    // Apply the theme
    const cityscapeElement = document.querySelector('.cityscape-bg');
    if (cityscapeElement) {
      cityscapeElement.setAttribute('data-theme', savedWallpaper);
    }
    
    // Ensure we're in dark mode
    setTheme('dark');
  }, []);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-9 h-9 rounded-full">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Change theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Wallpaper Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            className="flex items-center justify-between cursor-pointer"
            onClick={() => changeTheme(theme.value)}
          >
            <span>{theme.name}</span>
            {currentWallpaper === theme.value && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
