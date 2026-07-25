import React, { useEffect } from 'react';
import './LoadingScreen.css';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const prefers_reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(onComplete, prefers_reduced ? 200 : 950);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="loader-wrapper loader-wrapper--editorial">
      <p className="loader-editorial__mark">Anubhav</p>
    </div>
  );
};

export default LoadingScreen;
