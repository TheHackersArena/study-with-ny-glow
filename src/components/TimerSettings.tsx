
import React, { useState } from 'react';
import { useTimer } from '@/contexts/TimerContext';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Settings } from 'lucide-react';

export function TimerSettings() {
  const { settings, updateSettings } = useTimer();
  
  const [focusMinutes, setFocusMinutes] = useState(settings.focus / 60);
  const [shortBreakMinutes, setShortBreakMinutes] = useState(settings.shortBreak / 60);
  const [longBreakMinutes, setLongBreakMinutes] = useState(settings.longBreak / 60);
  const [open, setOpen] = useState(false);
  
  const handleSave = () => {
    updateSettings({
      focus: focusMinutes * 60,
      shortBreak: shortBreakMinutes * 60,
      longBreak: longBreakMinutes * 60,
    });
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-primary-600 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-200">
          <Settings size={20} />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md glass-effect">
        <DialogHeader>
          <DialogTitle className="text-2xl font-caveat">Timer Settings</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Focus Session: {focusMinutes} minutes</label>
            <Slider 
              value={[focusMinutes]} 
              min={5} 
              max={60} 
              step={5} 
              onValueChange={(value) => setFocusMinutes(value[0])}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Short Recharge: {shortBreakMinutes} minutes</label>
            <Slider 
              value={[shortBreakMinutes]} 
              min={1} 
              max={15} 
              step={1} 
              onValueChange={(value) => setShortBreakMinutes(value[0])}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Deep Break: {longBreakMinutes} minutes</label>
            <Slider 
              value={[longBreakMinutes]} 
              min={5} 
              max={30} 
              step={5} 
              onValueChange={(value) => setLongBreakMinutes(value[0])}
              className="w-full"
            />
          </div>
          
          <Button onClick={handleSave} className="w-full bg-primary-400 hover:bg-primary-500">
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
