
import React, { useState, useEffect } from 'react';

const quotes = [
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "The secret to getting ahead is getting started.", author: "Mark Twain" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "Quality is not an act, it's a habit.", author: "Aristotle" },
  { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Anonymous" },
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "The difference between ordinary and extraordinary is that little extra.", author: "Jimmy Johnson" },
  { text: "If you're going through hell, keep going.", author: "Winston Churchill" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "The best preparation for tomorrow is doing your best today.", author: "H. Jackson Brown Jr." },
  { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
  { text: "Small daily improvements are the key to staggering long-term results.", author: "Anonymous" },
  { text: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
  { text: "GMAT: Great Minds Achieve Triumph.", author: "Anonymous" },
  { text: "ISB dreams are built one study session at a time.", author: "Anonymous" },
  { text: "Focus on progress, not perfection.", author: "Anonymous" },
  { text: "Your GMAT score is a reflection of your preparation, not your potential.", author: "Anonymous" },
  { text: "Management skills are made in these quiet moments of study.", author: "Anonymous" }
];

export function MotivationalQuote() {
  const [quote, setQuote] = useState(quotes[0]);
  
  // Get a new random quote each day
  useEffect(() => {
    const today = new Date().toDateString();
    const savedDay = localStorage.getItem('quoteDay');
    const savedQuoteIndex = localStorage.getItem('quoteIndex');
    
    if (savedDay !== today) {
      // New day, new quote
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
      localStorage.setItem('quoteDay', today);
      localStorage.setItem('quoteIndex', randomIndex.toString());
    } else if (savedQuoteIndex) {
      // Same day, use saved quote
      setQuote(quotes[parseInt(savedQuoteIndex, 10)]);
    }
  }, []);
  
  return (
    <div className="max-w-lg mx-auto mt-8 p-6 glass-effect rounded-lg">
      <p className="text-lg font-inter italic text-center text-primary-800 dark:text-primary-100">
        "{quote.text}"
      </p>
      <p className="text-right mt-2 font-caveat text-lg text-primary-600 dark:text-primary-300">
        — {quote.author}
      </p>
    </div>
  );
}
