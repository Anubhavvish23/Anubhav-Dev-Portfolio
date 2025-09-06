import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ChevronDown, Download, Mail, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface HeroProps {
  magicMode?: boolean;
}

const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

const Hero: React.FC<HeroProps> = ({ magicMode }) => {
  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const { isDark, toggleTheme } = useTheme();

  // Chaotic Magic Mode state
  const [h1Pos, setH1Pos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const [descPos, setDescPos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const [btn1, setBtn1] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const [btn2, setBtn2] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const [imgPos, setImgPos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const [togglePos, setTogglePos] = useState({ x: 0, y: 0, rotate: 0 });
  const [scrollPos, setScrollPos] = useState({ x: 0, y: 0, rotate: 0 });

  useEffect(() => {
    if (!magicMode) {
      setH1Pos({ x: 0, y: 0, rotate: 0, scale: 1 });
      setDescPos({ x: 0, y: 0, rotate: 0, scale: 1 });
      setBtn1({ x: 0, y: 0, rotate: 0, scale: 1 });
      setBtn2({ x: 0, y: 0, rotate: 0, scale: 1 });
      setImgPos({ x: 0, y: 0, rotate: 0, scale: 1 });
      setTogglePos({ x: 0, y: 0, rotate: 0 });
      setScrollPos({ x: 0, y: 0, rotate: 0 });
      return;
    }

    let timers: number[] = [];

    // Optimized chaotic animations with reduced frequency
    const chaosH1 = () => {
      setH1Pos({
        x: getRandom(-60, 60),
        y: getRandom(-30, 30),
        rotate: getRandom(-25, 25),
        scale: getRandom(0.9, 1.1)
      });
      timers.push(window.setTimeout(chaosH1, getRandom(3000, 6000)));
    };

    const fallDesc = () => {
      setDescPos({
        x: getRandom(-50, 50),
        y: getRandom(-20, 20),
        rotate: getRandom(-15, 15),
        scale: getRandom(0.95, 1.05)
      });
      timers.push(window.setTimeout(fallDesc, getRandom(4000, 7000)));
    };

    const spinBtn1 = () => {
      setBtn1({
        x: getRandom(-40, 40),
        y: getRandom(-15, 15),
        rotate: getRandom(-90, 90),
        scale: getRandom(0.8, 1.2)
      });
      timers.push(window.setTimeout(spinBtn1, getRandom(5000, 8000)));
    };

    const spinBtn2 = () => {
      setBtn2({
        x: getRandom(-40, 40),
        y: getRandom(-15, 15),
        rotate: getRandom(-90, 90),
        scale: getRandom(0.8, 1.2)
      });
      timers.push(window.setTimeout(spinBtn2, getRandom(5000, 8000)));
    };

    const floatImg = () => {
      setImgPos({
        x: getRandom(-30, 30),
        y: getRandom(-20, 20),
        rotate: getRandom(-15, 15),
        scale: getRandom(0.95, 1.05)
      });
      timers.push(window.setTimeout(floatImg, getRandom(6000, 9000)));
    };

    const bounceToggle = () => {
      setTogglePos({
        x: getRandom(-15, 15),
        y: getRandom(-8, 8),
        rotate: getRandom(-10, 10)
      });
      timers.push(window.setTimeout(bounceToggle, getRandom(2000, 4000)));
    };

    const chaosScroll = () => {
      setScrollPos({
        x: getRandom(-20, 20),
        y: getRandom(-10, 10),
        rotate: getRandom(-45, 45)
      });
      timers.push(window.setTimeout(chaosScroll, getRandom(3000, 5000)));
    };

    // Start animations with staggered delays
    timers.push(window.setTimeout(chaosH1, 1000));
    timers.push(window.setTimeout(fallDesc, 2000));
    timers.push(window.setTimeout(spinBtn1, 3000));
    timers.push(window.setTimeout(spinBtn2, 4000));
    timers.push(window.setTimeout(floatImg, 5000));
    timers.push(window.setTimeout(bounceToggle, 1000));
    timers.push(window.setTimeout(chaosScroll, 2000));

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [magicMode]);

  // Continuous rotation animation for extra chaos
  const continuousRotate = magicMode ? {
    rotate: [0, 360],
    transition: { duration: 8, repeat: Infinity, ease: "linear" }
  } : {};

  return (
    <>
      {/* Google Fonts Import */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Cedarville+Cursive:wght@400&display=swap" 
        rel="stylesheet" 
      />
      
      <section id="home" className="min-h-screen flex items-center justify-center relative bg-white dark:bg-gray-900 mt-16">
        {/* Modern Animated Toggle Switch */}
        <motion.div 
          className="absolute top-4 left-4 z-50"
          animate={magicMode ? togglePos : {}}
          transition={magicMode ? { duration: 1.5, type: 'spring' } : {}}
          style={{ position: magicMode ? 'relative' : undefined }}
        >
          <motion.button
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggleTheme}
            className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-500 focus:outline-none shadow-lg
              ${isDark ? 'bg-gradient-to-r from-gray-700 via-gray-900 to-black' : 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400'}`}
            animate={magicMode ? continuousRotate : {}}
          >
            <span
              className={`w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-md transform transition-transform duration-500
                ${isDark ? 'translate-x-6 rotate-180' : 'translate-x-0 rotate-0'}`}
            >
              {isDark
                ? <Moon size={18} className="text-gray-800 transition-transform duration-500" />
                : <Sun size={18} className="text-yellow-400 transition-transform duration-500" />
              }
            </span>
          </motion.button>
        </motion.div>

        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 relative z-10 pt-16 sm:pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center h-full space-y-6 sm:space-y-8 text-center lg:text-left"
            >
              {/* Name with Cedarville Cursive Font */}
              <motion.h1
                className="title text-5xl font-bold"
                initial={{ opacity: 0, y: 30 }}
                animate={magicMode ? { opacity: 1, ...h1Pos } : { opacity: 1, y: 0 }}
                transition={magicMode ? { duration: 1.5, type: 'spring' } : { duration: 0.8, delay: 0.2 }}
                style={{ position: magicMode ? 'relative' : undefined }}
              >
                Anubhav S
              </motion.h1>

              {/* Single Line Description */}
              <motion.div
                className="text-lg xs:text-xl md:text-2xl text-gray-600 h-12 sm:h-16"
                initial={{ opacity: 0 }}
                animate={magicMode ? { opacity: 1, ...descPos } : { opacity: 1 }}
                transition={magicMode ? { duration: 2, type: 'spring' } : { delay: 0.5 }}
                style={{ position: magicMode ? 'relative' : undefined }}
              >
                <TypeAnimation
                  sequence={[
                    'Full Stack Developer',
                    2000,
                    'UI/UX Enthusiast',
                    2000,
                    'Problem Solver',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </motion.div>

              {/* Clean Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <motion.a
                  href="https://drive.google.com/file/d/1sXYMeLJya81Ly41IXXaJiJV4-xCSnYSm/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-12 flex items-center gap-3 justify-center"
                  whileHover={magicMode ? { scale: 1.3, rotate: 15 } : { scale: 1.02, y: -2 }}
                  whileTap={magicMode ? { scale: 0.8, rotate: -15 } : { scale: 0.98 }}
                  animate={magicMode ? btn1 : {}}
                  transition={magicMode ? { duration: 2, type: 'spring' } : {}}
                  style={{ position: magicMode ? 'relative' : undefined }}
                >
                  <span><Download size={20} /></span>
                  <span>Resume</span>
                </motion.a>
                
                <motion.button
                  className="btn-12 flex items-center gap-3 justify-center"
                  whileHover={magicMode ? { scale: 1.3, rotate: 15 } : { scale: 1.02, y: -2 }}
                  whileTap={magicMode ? { scale: 0.8, rotate: -15 } : { scale: 0.98 }}
                  animate={magicMode ? btn2 : {}}
                  transition={magicMode ? { duration: 2, type: 'spring' } : {}}
                  style={{ position: magicMode ? 'relative' : undefined }}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span><Mail size={20} color='white'/></span>
                  <span>Contact Me</span>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Side - Profile Image with Bottom-to-Top Animation */}
            <motion.div
              className="relative mx-auto lg:ml-24 w-56 h-56 xs:w-64 xs:h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 mt-8 lg:mt-0"
              initial={{ opacity: 0, x: 50 }}
              animate={magicMode ? { ...imgPos } : { opacity: 1, x: 0, y: 0 }}
              transition={magicMode ? { duration: 2, type: 'spring' } : { duration: 0.8, delay: 0.3 }}
              style={{ position: magicMode ? 'relative' : undefined }}
            >
              {/* Outer Border Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 p-1 shadow-2xl">
                {/* Inner Container */}
                <div className="relative w-full h-full rounded-full bg-white overflow-hidden">
                  {/* Image with Bottom-to-Top Animation */}
                  <motion.div
                    className="absolute inset-0 rounded-full overflow-hidden"
                    style={{
                      clipPath: "circle(50% at 50% 50%)"
                    }}
                  >
                    <motion.img
                      src="/dp.jpg"
                      alt="Anubhav S"
                      className="w-full h-full object-cover"
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ 
                        duration: 1.5, 
                        delay: 1,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                    />
                  </motion.div>
                  {/* Subtle overlay for depth */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                </div>
              </div>

              {/* Status Indicator */}
              <motion.div
                className="absolute top-3 right-3 sm:top-6 sm:right-6 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full border-3 border-white shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2.5, type: "spring", stiffness: 200 }}
              >
                <motion.div
                  className="absolute inset-0 bg-green-500 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [1, 0, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 w-4 h-4 sm:w-6 sm:h-6 bg-gray-900 rounded-lg shadow-lg"
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 2.8, duration: 0.5 }}
                whileHover={{ rotate: 45, scale: 1.1 }}
              />
              
              <motion.div
                className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-3 h-3 sm:w-4 sm:h-4 bg-gray-700 rounded-full shadow-lg"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.2 }}
              />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={magicMode ? { opacity: 1, ...scrollPos } : { opacity: 1, y: 0 }}
          transition={magicMode ? { duration: 1.5, type: 'spring' } : { delay: 2 }}
          onClick={scrollToNext}
          whileHover={{ scale: 1.1 }}
          style={{ position: magicMode ? 'relative' : undefined }}
        >
          <motion.div
            animate={magicMode ? { y: [0, 20, 0], rotate: [0, 180, 360] } : { y: [0, 8, 0] }}
            transition={magicMode ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : { duration: 2, repeat: Infinity }}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full bg-gray-100 border border-gray-200 shadow-sm"
          >
            <ChevronDown size={24} />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;