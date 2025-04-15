
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Howl } from 'howler';

type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

interface TimerSettings {
  focus: number;
  shortBreak: number;
  longBreak: number;
}

interface TimerContextType {
  mode: TimerMode;
  setMode: (mode: TimerMode) => void;
  isRunning: boolean;
  timeLeft: number;
  progress: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  settings: TimerSettings;
  updateSettings: (newSettings: TimerSettings) => void;
  streak: number;
  muteSound: boolean;
  toggleMute: () => void;
  completedSessions: number;
}

const defaultSettings: TimerSettings = {
  focus: 25 * 60, // 25 minutes in seconds
  shortBreak: 5 * 60, // 5 minutes in seconds
  longBreak: 15 * 60, // 15 minutes in seconds
};

export const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<TimerMode>('focus');
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(defaultSettings.focus);
  const [settings, setSettings] = useState<TimerSettings>(defaultSettings);
  const [streak, setStreak] = useState(0);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [muteSound, setMuteSound] = useState(false);
  
  // Load settings and streak from localStorage if available
  useEffect(() => {
    const savedSettings = localStorage.getItem('timerSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    
    const savedStreak = localStorage.getItem('streak');
    if (savedStreak) {
      setStreak(parseInt(savedStreak, 10));
    }
    
    const savedCompletedSessions = localStorage.getItem('completedSessions');
    if (savedCompletedSessions) {
      setCompletedSessions(parseInt(savedCompletedSessions, 10));
    }
  }, []);
  
  // Calculate progress percentage
  const progress = useCallback(() => {
    const total = settings[mode];
    return ((total - timeLeft) / total) * 100;
  }, [timeLeft, settings, mode]);
  
  // Change mode
  const changeMode = useCallback((newMode: TimerMode) => {
    setMode(newMode);
    setTimeLeft(settings[newMode]);
    setIsRunning(false);
  }, [settings]);
  
  // Start timer
  const startTimer = useCallback(() => {
    setIsRunning(true);
  }, []);
  
  // Pause timer
  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);
  
  // Reset timer
  const resetTimer = useCallback(() => {
    setTimeLeft(settings[mode]);
    setIsRunning(false);
  }, [mode, settings]);
  
  // Update settings
  const updateSettings = useCallback((newSettings: TimerSettings) => {
    setSettings(newSettings);
    setTimeLeft(newSettings[mode]);
    localStorage.setItem('timerSettings', JSON.stringify(newSettings));
  }, [mode]);
  
  // Toggle mute
  const toggleMute = useCallback(() => {
    setMuteSound(prev => !prev);
  }, []);
  
  // Sound effects - using ref to prevent re-creation on render
  const timerCompleteSoundRef = React.useRef<Howl | null>(null);
  
  useEffect(() => {
    // Initialize sound
    if (!timerCompleteSoundRef.current) {
      timerCompleteSoundRef.current = new Howl({
        src: ['/timer-complete.mp3'],
        volume: 0.7,
      });
    }
    
    return () => {
      // Cleanup
      if (timerCompleteSoundRef.current) {
        timerCompleteSoundRef.current.unload();
      }
    };
  }, []);
  
  // Timer logic
  useEffect(() => {
    let interval: number | undefined;
    
    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      // Timer completed
      setIsRunning(false);
      
      // Play sound if not muted
      if (!muteSound && timerCompleteSoundRef.current) {
        timerCompleteSoundRef.current.play();
      }
      
      // Handle session completion
      if (mode === 'focus') {
        const newCompletedSessions = completedSessions + 1;
        setCompletedSessions(newCompletedSessions);
        localStorage.setItem('completedSessions', newCompletedSessions.toString());
        
        // Update streak if it's the first focus session of the day
        const lastStreakDate = localStorage.getItem('lastStreakDate');
        const today = new Date().toDateString();
        
        if (lastStreakDate !== today) {
          const newStreak = streak + 1;
          setStreak(newStreak);
          localStorage.setItem('streak', newStreak.toString());
          localStorage.setItem('lastStreakDate', today);
        }
        
        // Switch to break mode after focus
        changeMode('shortBreak');
      } else {
        // Switch back to focus mode after break
        changeMode('focus');
      }
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, mode, muteSound, changeMode, completedSessions, streak]);
  
  const value = {
    mode,
    setMode: changeMode,
    isRunning,
    timeLeft,
    progress: progress(),
    startTimer,
    pauseTimer,
    resetTimer,
    settings,
    updateSettings,
    streak,
    muteSound,
    toggleMute,
    completedSessions,
  };
  
  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};
