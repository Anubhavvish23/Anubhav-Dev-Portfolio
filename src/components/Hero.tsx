import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ChevronDown, Download, Mail, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Hero = () => {
  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const { isDark, toggleTheme } = useTheme();

  return (
    <>
      {/* Google Fonts Import */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Cedarville+Cursive:wght@400&display=swap" 
        rel="stylesheet" 
      />
      
      <section id="home" className="min-h-screen flex items-center justify-center relative bg-white dark:bg-gray-900 mt-16">
        {/* Modern Animated Toggle Switch */}
        <div className="absolute top-4 left-4 z-50">
          <button
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggleTheme}
            className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-500 focus:outline-none shadow-lg
              ${isDark ? 'bg-gradient-to-r from-gray-700 via-gray-900 to-black' : 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400'}`}
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
          </button>
        </div>

        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 relative z-10">
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
                className="title text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Anubhav S
              </motion.h1>

              {/* Single Line Description */}
              <motion.div
                className="text-lg xs:text-xl md:text-2xl text-gray-600 h-12 sm:h-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
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
                  href="https://drive.google.com/file/d/1DPzQmTHPpEOY2Cz8xUuox6kvWseRwQ7e/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-12 flex items-center gap-3 justify-center"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span><Download size={20} /></span>
                  <span>Resume</span>
                </motion.a>
                
                <motion.button
                  className="btn-12 flex items-center gap-3 justify-center"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span><Mail size={20} color='white'/></span>
                  <span>Contact Me</span>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Side - Profile Image with Bottom-to-Top Animation */}
            <motion.div
              className="relative mx-auto lg:mx-0 w-56 h-56 xs:w-64 xs:h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 mt-8 lg:mt-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
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
                      src="https://media.licdn.com/dms/image/v2/D4D03AQFc5xP48HEmYQ/profile-displayphoto-shrink_800_800/B4DZbsboy8GwAc-/0/1747723390970?e=1756944000&v=beta&t=miNY1Z22GL09ygjvpyvS1QniDhzE0BvcP0cBtAEu824"
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
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          onClick={scrollToNext}
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full bg-gray-100 border border-gray-200 shadow-sm"
          >
            <ChevronDown size={24} />
          </motion.div>
        </motion.div>
        {/* Visitor Counter Badge - Added at the bottom of Hero section */}
        <div className="flex justify-center items-center text-sm mt-8 mb-2 w-full">
          <img
            src="https://hits.sh/anubhav-dev-portfolio.vercel.app.svg?style=flat-square&label=visitors&color=blue"
            alt="Visitor Counter"
            className="h-6"
          />
        </div>
      </section>
    </>
  );
};

export default Hero;