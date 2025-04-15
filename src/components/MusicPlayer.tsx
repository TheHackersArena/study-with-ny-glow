
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Music, Volume2, VolumeX } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Howl } from 'howler';

const ambientTracks = [
  { id: 'lofi', name: 'Lofi Study Beats', src: '/lofi-ambient.mp3' },
  { id: 'rain', name: 'Gentle Rain', src: '/lofi-ambient.mp3' }, // Using same file as placeholder
  { id: 'cafe', name: 'Café Ambience', src: '/lofi-ambient.mp3' }, // Using same file as placeholder
];

export function MusicPlayer() {
  const [open, setOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(ambientTracks[0]);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  
  const sound = useRef<Howl | null>(null);
  
  // Initialize sound on component mount
  useEffect(() => {
    sound.current = new Howl({
      src: [currentTrack.src],
      loop: true,
      volume: volume / 100,
      autoplay: false,
    });
    
    return () => {
      if (sound.current) {
        sound.current.stop();
      }
    };
  }, [currentTrack]);
  
  // Handle volume changes
  useEffect(() => {
    if (sound.current) {
      sound.current.volume(isMuted ? 0 : volume / 100);
    }
  }, [volume, isMuted]);
  
  const togglePlay = () => {
    if (!sound.current) return;
    
    if (isPlaying) {
      sound.current.pause();
    } else {
      sound.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const changeTrack = (track: typeof ambientTracks[0]) => {
    if (sound.current) {
      sound.current.stop();
    }
    
    setCurrentTrack(track);
    setIsPlaying(false);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className={`text-primary-600 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-200 ${isPlaying ? "animate-pulse-glow" : ""}`}
        >
          <Music size={20} />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md glass-effect">
        <DialogHeader>
          <DialogTitle className="text-2xl font-caveat">Background Music</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">{currentTrack.name}</h3>
            <Button onClick={togglePlay} className="bg-primary-400 hover:bg-primary-500 w-24">
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={toggleMute}>
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </Button>
              <Slider 
                value={[volume]} 
                min={0} 
                max={100} 
                step={1} 
                onValueChange={(value) => setVolume(value[0])}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Choose Ambient Sound</h4>
            <div className="grid grid-cols-1 gap-2">
              {ambientTracks.map((track) => (
                <Button 
                  key={track.id}
                  variant={track.id === currentTrack.id ? "default" : "outline"}
                  className={track.id === currentTrack.id ? "bg-primary-400 hover:bg-primary-500" : ""}
                  onClick={() => changeTrack(track)}
                >
                  {track.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
