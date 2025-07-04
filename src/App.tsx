import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';
import Scene3D from './components/Scene3D';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import AllProjects from './components/AllProjects';
import ScrollEndHearts from './components/ScrollEndHearts';
import { ParallaxBackground, FloatingElements } from './components/ParallaxSection';
import SocialMediaVisitor from './components/SocialMediaVisitor';
import './App.css';

const AppContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="App">
      <SocialMediaVisitor />
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      
      <Routes>
        <Route path="/" element={
          <>
            <ParallaxBackground>
              <FloatingElements />
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Achievements />
              <Contact />
              {isHomePage && <ScrollEndHearts />}
            </ParallaxBackground>
          </>
        } />
        <Route path="/projects" element={<AllProjects />} />
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
      <BrowserRouter>
        <div className="relative min-h-screen bg-white dark:bg-gray-900 text-slate-900 dark:text-white overflow-x-hidden transition-colors duration-500">
          {/* Loading Screen */}
          {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

          {/* 3D Background Scene */}
          {!isLoading && <Scene3D />}

          {/* Animated Background */}
          <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/20 via-white/40 to-white dark:bg-gray-900"></div>
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100/30 dark:bg-gray-800/20 rounded-full blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-100/30 dark:bg-gray-800/20 rounded-full blur-3xl"
              animate={{
                x: [0, -100, 0],
                y: [0, 100, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          {/* UI Components */}
          {!isLoading && <AppContent />}
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;