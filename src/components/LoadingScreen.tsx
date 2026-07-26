import React, { useEffect } from 'react';
import './LoadingScreen.css';

interface Loading_screen_props {
  onComplete: () => void;
}

const loading_slices = Array.from({ length: 9 }, (_, index) => index);

const LoadingScreen: React.FC<Loading_screen_props> = ({ onComplete }) => {
  useEffect(() => {
    const prefers_reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(onComplete, prefers_reduced ? 250 : 2200);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="loader-wrapper loader-wrapper--editorial" role="status" aria-live="polite" aria-label="Loading">
      <div className="loader-editorial__atmosphere" aria-hidden />
      <div className="loader">
        {loading_slices.map((slice) => (
          <div key={slice} className="loader__text">
            <span>Loading</span>
          </div>
        ))}
        <div className="loader__line" aria-hidden />
      </div>
      <p className="loader-editorial__hint">Anubhav</p>
    </div>
  );
};

export default LoadingScreen;
