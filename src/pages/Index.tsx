
import React from 'react';
import { TimerProvider } from '@/contexts/TimerContext';
import { Header } from '@/components/Header';
import { TimerDisplay } from '@/components/TimerDisplay';
import { TimerControls } from '@/components/TimerControls';
import { ModeSelector } from '@/components/ModeSelector';
import { TimerSettings } from '@/components/TimerSettings';
import { MotivationalQuote } from '@/components/MotivationalQuote';
import { ParticleBackground } from '@/components/ParticleBackground';
import { FlashcardPopup } from '@/components/FlashcardPopup';
import { ThemeProvider } from 'next-themes';

const Index = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
      <TimerProvider>
        <div className="min-h-screen w-full cityscape-bg overflow-hidden">
          <ParticleBackground />
          
          <div className="container mx-auto max-w-7xl px-4 py-6 relative z-10">
            <Header />
            
            <main className="mt-12 flex flex-col items-center justify-center">
              <ModeSelector />
              
              <div className="glass-effect rounded-xl p-12 relative w-fit mx-auto">
                <TimerSettings />
                <TimerDisplay />
                <TimerControls />
              </div>
              
              <MotivationalQuote />
            </main>
          </div>
          
          <FlashcardPopup />
        </div>
      </TimerProvider>
    </ThemeProvider>
  );
};

export default Index;
