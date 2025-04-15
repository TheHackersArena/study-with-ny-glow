
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen cityscape-bg flex flex-col items-center justify-center">
      <div className="glass-effect rounded-xl p-12 text-center">
        <h1 className="text-5xl font-caveat font-bold mb-4">Oops! Time's Up</h1>
        <p className="text-xl mb-8">The page you're looking for seems to have taken a break.</p>
        
        <Link to="/">
          <Button className="bg-primary-400 hover:bg-primary-500">
            Back to Study Timer
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
