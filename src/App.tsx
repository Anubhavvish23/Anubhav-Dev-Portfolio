import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { MagicModeProvider, useMagicMode } from './contexts/MagicModeContext';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Internships from './components/Internships';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import ChaosCursor from './components/ChaosCursor';
import MagicParticles from './components/MagicParticles';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';
import Scene3D from './components/Scene3D';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import AllProjects from './components/AllProjects';
import ScrollEndHearts from './components/ScrollEndHearts';
import { ParallaxBackground, FloatingElements } from './components/ParallaxSection';
import SocialMediaVisitor from './components/SocialMediaVisitor';
import MagicToggle from './components/MagicToggle';
import { MouseFollower } from 'react-mouse-follower';
import './App.css';

const AppContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { magicMode } = useMagicMode();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location]);

  return (
    <div className="App">
      <SocialMediaVisitor />
      <CustomCursor />
      <ChaosCursor magicMode={magicMode} />
      <MagicParticles magicMode={magicMode} />
      <ScrollProgress />
      <Navigation />
      
      <Routes>
        <Route path="/" element={
          <>
            <ParallaxBackground>
              <FloatingElements />
              <Hero magicMode={magicMode} />
              <About magicMode={magicMode} />
              <Skills magicMode={magicMode} />
              <Projects magicMode={magicMode} />
              <Internships magicMode={magicMode} />
              <Achievements magicMode={magicMode} />
              <Contact magicMode={magicMode} />
              {isHomePage && <ScrollEndHearts />}
            </ParallaxBackground>
          </>
        } />
        <Route path="/all-projects" element={<AllProjects magicMode={magicMode} />} />
      </Routes>

      {/* <ProjectStats /> */}
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <ThemeProvider>
      <MagicModeProvider>
        <div className={`relative min-h-screen bg-white dark:bg-gray-900 text-slate-900 dark:text-white overflow-x-hidden transition-colors duration-500`}>
          {/* Magic Mode Toggle */}
          <MagicToggle />

          {/* Loading Screen */}
          {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

          {/* 3D Background Scene */}
          {!isLoading && <Scene3D />}

          {/* Animated Background */}
          <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/20 via-white/40 to-white dark:bg-gray-900"></div>
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-100/20 dark:bg-gray-800/15 rounded-full blur-2xl"
              animate={{
                x: [0, 50, 0],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-100/20 dark:bg-gray-800/15 rounded-full blur-2xl"
              animate={{
                x: [0, -50, 0],
                y: [0, 50, 0],
              }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          {/* Magic Mode Sparkle Cursor */}
          {/* To disable sparkle cursor for performance, comment out the next line */}
          <MouseFollower />

          {/* UI Components */}
          {!isLoading && (
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          )}
        </div>
      </MagicModeProvider>
    </ThemeProvider>
  );
}

export default App;