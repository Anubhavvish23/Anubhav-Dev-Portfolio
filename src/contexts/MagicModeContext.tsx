import React, { createContext, useContext, useState, useEffect } from 'react';

interface MagicModeContextType {
  magicMode: boolean;
  toggleMagicMode: () => void;
  setMagicMode: (enabled: boolean) => void;
}

const MagicModeContext = createContext<MagicModeContextType | undefined>(undefined);

export const useMagicMode = () => {
  const context = useContext(MagicModeContext);
  if (context === undefined) {
    throw new Error('useMagicMode must be used within a MagicModeProvider');
  }
  return context;
};

interface MagicModeProviderProps {
  children: React.ReactNode;
}

export const MagicModeProvider: React.FC<MagicModeProviderProps> = ({ children }) => {
  const [magicMode, setMagicModeState] = useState(false);

  const toggleMagicMode = () => {
    setMagicModeState(prev => !prev);
  };

  const setMagicMode = (enabled: boolean) => {
    setMagicModeState(enabled);
  };

  // Add/remove body class for global effects
  useEffect(() => {
    if (magicMode) {
      document.body.classList.add('magic-mode-active');
      // Add reduced motion preference check for accessibility
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
      }
    } else {
      document.body.classList.remove('magic-mode-active', 'reduced-motion');
    }

    return () => {
      document.body.classList.remove('magic-mode-active', 'reduced-motion');
    };
  }, [magicMode]);

  const value: MagicModeContextType = {
    magicMode,
    toggleMagicMode,
    setMagicMode
  };

  return (
    <MagicModeContext.Provider value={value}>
      {children}
    </MagicModeContext.Provider>
  );
}; 