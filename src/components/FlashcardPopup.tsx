
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTimer } from '@/contexts/TimerContext';
import { X, ArrowRight, Brain } from 'lucide-react';

// Sample GMAT flashcards
const flashcards = [
  {
    question: "If x² + y² = 25 and 2x + 2y = 10, what is the value of xy?",
    answer: "xy = 5. Using the identities, (x+y)² = x² + 2xy + y² and (x+y)² = 25 + 2xy.",
    category: "math"
  },
  {
    question: "A cylindrical tank with radius 4 feet and height 10 feet is filled with water. What is the volume in cubic feet?",
    answer: "V = πr²h = π × 4² × 10 = 160π cubic feet",
    category: "math"
  },
  {
    question: "The phrase 'hoist with one's own petard' means:",
    answer: "To be harmed by one's own plan to harm someone else",
    category: "verbal"
  },
  {
    question: "The term 'bellwether' refers to:",
    answer: "An indicator or predictor of future trends",
    category: "verbal"
  },
  {
    question: "If 3x - 7 = 8, then x =",
    answer: "x = 5, since 3x = 15 and x = 5",
    category: "math"
  },
  {
    question: "The author's tone in the passage can best be described as:",
    answer: "Critical but fair, acknowledging both sides of the argument",
    category: "verbal"
  },
  {
    question: "What is the correct usage? 'Between you and (I/me)...'",
    answer: "Between you and me (object of preposition)",
    category: "verbal"
  },
  {
    question: "If a company's revenue increased by 10% and costs increased by 5%, the profit margin...",
    answer: "Increased. Profit margin expands when revenue grows faster than costs",
    category: "math"
  },
];

export function FlashcardPopup() {
  const { mode } = useTimer();
  const [show, setShow] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentCard, setCurrentCard] = useState(flashcards[0]);
  
  // Only show during break modes
  const isBreakMode = mode === 'shortBreak' || mode === 'longBreak';
  
  // Reset card when toggling visibility
  useEffect(() => {
    if (show) {
      const randomIndex = Math.floor(Math.random() * flashcards.length);
      setCurrentCard(flashcards[randomIndex]);
      setShowAnswer(false);
    }
  }, [show]);
  
  // Get next card
  const nextCard = () => {
    const randomIndex = Math.floor(Math.random() * flashcards.length);
    setCurrentCard(flashcards[randomIndex]);
    setShowAnswer(false);
  };
  
  if (!isBreakMode) return null;
  
  return (
    <>
      {!show ? (
        <Button 
          className="fixed bottom-8 right-8 bg-primary-400 hover:bg-primary-500 rounded-full w-12 h-12 p-0 shadow-lg"
          onClick={() => setShow(true)}
        >
          <Brain size={24} />
        </Button>
      ) : (
        <Card className="fixed bottom-8 right-8 w-80 glass-effect shadow-xl animate-fade-in">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2"
            onClick={() => setShow(false)}
          >
            <X size={18} />
          </Button>
          
          <CardContent className="pt-6 pb-4">
            <div className="text-xs uppercase font-bold mb-2 text-primary-600 dark:text-primary-300">
              {currentCard.category === 'math' ? 'GMAT Math' : 'GMAT Verbal'}
            </div>
            
            <div className="min-h-32 flex flex-col justify-between">
              <div>
                <p className="font-medium mb-4">{currentCard.question}</p>
                
                {showAnswer && (
                  <div className="p-3 bg-primary-100/50 dark:bg-primary-900/30 rounded-md mt-4 animate-fade-in">
                    <p className="text-sm">{currentCard.answer}</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between mt-4">
                {!showAnswer ? (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setShowAnswer(true)}
                  >
                    Show Answer
                  </Button>
                ) : (
                  <Button 
                    className="w-full gap-2 bg-primary-400 hover:bg-primary-500"
                    onClick={nextCard}
                  >
                    Next Card <ArrowRight size={16} />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
