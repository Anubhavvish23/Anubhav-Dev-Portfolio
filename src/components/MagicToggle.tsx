import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useMagicMode } from '../contexts/MagicModeContext';

const MagicToggle: React.FC = () => {
  const { magicMode, toggleMagicMode } = useMagicMode();
  const [isDisabled, setIsDisabled] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [fixedPos, setFixedPos] = useState<{ x: number; y: number } | null>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Hide bar when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setShowBar(false);
      }
    };

    if (showBar) {
      document.addEventListener('mousedown', handleClick);
    }

    return () => document.removeEventListener('mousedown', handleClick);
  }, [showBar]);

  const handleClick = (e: React.MouseEvent) => {
    if (!fixedPos && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setFixedPos({ x: rect.left, y: rect.top });
    }
    setShowBar((prev) => !prev);
  };

  const handleToggle = () => {
    if (isDisabled) return;
    const newState = !magicMode;
    toggleMagicMode();
    if (newState) {
      confetti({ particleCount: 30, spread: 70 });
      setIsDisabled(true);
      setTimeout(() => setIsDisabled(false), 1000);
    }
  };

  // Style for fixed position
  const fixedStyle = fixedPos
    ? {
        position: 'fixed' as const,
        left: fixedPos.x,
        top: fixedPos.y,
        zIndex: 9999,
      }
    : {};

  return (
    <div style={fixedStyle} className="md:hidden"> {/* Only show on mobile */}
      <button
        ref={btnRef}
        aria-label="Toggle Magic Mode"
        className="fixed left-4 bottom-4 z-50 bg-white/80 dark:bg-gray-900/80 rounded-full shadow-lg p-3 hover:scale-110 transition-transform"
        onClick={handleClick}
      >
        <span role="img" aria-label="magic">✨</span>
      </button>
      {showBar && (
        <div 
          ref={barRef}
          className="fixed left-4 bottom-16 z-50 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-3 flex items-center gap-3 max-w-[200px]"
        >
          <span className="text-sm font-semibold text-gray-900 dark:text-white">Magic Mode</span>
          <button
            onClick={handleToggle}
            disabled={isDisabled}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              magicMode ? 'bg-purple-600' : 'bg-gray-300'
            } ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${
                magicMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default MagicToggle;