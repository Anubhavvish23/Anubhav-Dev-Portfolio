import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Calendar, MapPin, ExternalLink, Rocket, Code, Bot, Users, TrendingUp, Award, Star, Zap, ArrowRight, Sparkles, Target } from 'lucide-react';
import ParallaxSection, { ParallaxCard } from './ParallaxSection';

interface InternshipsProps {
  magicMode?: boolean;
}

const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

const Internships: React.FC<InternshipsProps> = ({ magicMode }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Optimized Chaotic Magic Mode state - reduced number of animated elements
  const [titlePos, setTitlePos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const [descPos, setDescPos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const [timelinePos, setTimelinePos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });

  // Optimized magic mode animations with useCallback and reduced frequency
  const chaosTitle = useCallback(() => {
    setTitlePos({
      x: getRandom(-40, 40),
      y: getRandom(-20, 20),
      rotate: getRandom(-15, 15),
      scale: getRandom(0.95, 1.05)
    });
  }, []);

  const fallDesc = useCallback(() => {
    setDescPos({
      x: getRandom(-30, 30),
      y: getRandom(-15, 15),
      rotate: getRandom(-10, 10),
      scale: getRandom(0.95, 1.05)
    });
  }, []);

  const floatTimeline = useCallback(() => {
    setTimelinePos({
      x: getRandom(-15, 15),
      y: getRandom(-5, 5),
      rotate: getRandom(-5, 5),
      scale: getRandom(0.98, 1.02)
    });
  }, []);

  useEffect(() => {
    if (!magicMode) {
      setTitlePos({ x: 0, y: 0, rotate: 0, scale: 1 });
      setDescPos({ x: 0, y: 0, rotate: 0, scale: 1 });
      setTimelinePos({ x: 0, y: 0, rotate: 0, scale: 1 });
      return;
    }

    let timers: number[] = [];

    // Reduced animation frequency for better performance
    const startChaosTitle = () => {
      chaosTitle();
      timers.push(window.setTimeout(startChaosTitle, getRandom(3000, 6000)));
    };

    const startFallDesc = () => {
      fallDesc();
      timers.push(window.setTimeout(startFallDesc, getRandom(4000, 7000)));
    };

    const startFloatTimeline = () => {
      floatTimeline();
      timers.push(window.setTimeout(startFloatTimeline, getRandom(5000, 8000)));
    };

    // Start animations with delays to prevent overwhelming
    timers.push(window.setTimeout(startChaosTitle, 1000));
    timers.push(window.setTimeout(startFallDesc, 2000));
    timers.push(window.setTimeout(startFloatTimeline, 3000));

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [magicMode, chaosTitle, fallDesc, floatTimeline]);

  const internships = [
    {
      company: "ComedKares",
      role: "Rapid Prototyping",
      year: "2022",
      icon: <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
      glowColor: "shadow-blue-500/20",
      description: "Specialized in rapid prototyping techniques and innovative product development methodologies.",
      skills: ["Prototyping", "Innovation", "Product Development"],
      impact: "Reduced development time by 40%"
    },
    {
      company: "ComedKares",
      role: "Robotics",
      year: "2023",
      icon: <Bot className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
      borderColor: "border-green-200 dark:border-green-800",
      glowColor: "shadow-green-500/20",
      description: "Focused on robotics engineering, automation systems, and intelligent machine learning applications.",
      skills: ["Robotics", "Automation", "Machine Learning"],
      impact: "Improved efficiency by 60%"
    },
    {
      company: "Rc Labs",
      role: "Software Developer Intern",
      year: "2023",
      icon: <Code className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
      borderColor: "border-purple-200 dark:border-purple-800",
      glowColor: "shadow-purple-500/20",
      description: "Full-stack development experience with modern technologies and agile development practices.",
      skills: ["Full-Stack Development", "Agile", "Modern Technologies"],
      impact: "Delivered 5+ production applications"
    },
    {
      company: "Gully Group",
      role: "Project Management Intern",
      year: "2024",
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
      borderColor: "border-orange-200 dark:border-orange-800",
      glowColor: "shadow-orange-500/20",
      description: "Led cross-functional teams, managed project timelines, and delivered successful project outcomes.",
      skills: ["Project Management", "Team Leadership", "Strategic Planning"],
      impact: "Managed 3+ concurrent projects"
    }
  ];

  const stats = [
    { label: "Total Internships", value: "4", icon: <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />, color: "from-blue-500 to-cyan-500" },
    { label: "Years Experience", value: "3", icon: <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />, color: "from-green-500 to-emerald-500" },
    { label: "Companies", value: "3", icon: <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />, color: "from-purple-500 to-pink-500" },
    { label: "Skills Gained", value: "12+", icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />, color: "from-orange-500 to-red-500" }
  ];

  // Optimized magic sparkles - reduced count and complexity
  const MagicInternshipSparkles = () => (
    <>
      {magicMode && (
        <div className="pointer-events-none absolute inset-0 z-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full shadow-lg"
              style={{
                width: 4 + Math.random() * 6,
                height: 4 + Math.random() * 6,
                left: `${20 + Math.random() * 60}%`,
                top: `${30 + Math.random() * 40}%`,
                background: `linear-gradient(45deg, ${['#3b82f6', '#8b5cf6', '#06b6d4'][Math.floor(Math.random() * 3)]}30, ${['#ec4899', '#f59e0b', '#10b981'][Math.floor(Math.random() * 3)]}30)`,
                filter: 'blur(1px)'
              }}
              animate={{
                y: [0, -20 + Math.random() * 40, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      )}
    </>
  );

  // Optimized floating background elements - reduced complexity
  const FloatingBackgroundElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-20 left-10 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-2xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-r from-green-400/5 to-cyan-400/5 rounded-full blur-2xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );

  return (
    <section id="internships" className={`py-16 sm:py-20 relative bg-white dark:bg-black text-slate-900 dark:text-white overflow-hidden ${magicMode ? 'scale-x-[-1]' : ''}`}>
      {/* Floating background elements */}
      <FloatingBackgroundElements />
      
      {/* Magic sparkles for internships */}
      <MagicInternshipSparkles />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ParallaxSection speed={0.2}>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 sm:mb-20"
          >
            <motion.div
              className="inline-flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white">
                <Briefcase className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <span className="text-sm sm:text-lg font-semibold text-slate-600 dark:text-slate-300">Professional Journey</span>
            </motion.div>
            
            <motion.h2
              className="title text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-black dark:text-white"
              animate={magicMode ? { ...titlePos } : {}}
              transition={magicMode ? { duration: 1, type: 'spring' } : {}}
              style={{ position: magicMode ? 'relative' : undefined }}
            >
              Internship Experience
            </motion.h2>
            <motion.p
              className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed px-4"
              animate={magicMode ? { ...descPos } : {}}
              transition={magicMode ? { duration: 1.5, type: 'spring' } : {}}
              style={{ position: magicMode ? 'relative' : undefined }}
            >
              Diverse professional experiences that shaped my journey in technology and innovation
            </motion.p>
          </motion.div>
        </ParallaxSection>

        {/* Optimized Stats Section */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <ParallaxCard key={stat.label} speed={0.05 + index * 0.05}>
                <motion.div
                  className="p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                  whileHover={{ 
                    scale: 1.02, 
                    y: -5
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                    <motion.div
                      className={`p-3 sm:p-4 bg-gradient-to-r ${stat.color} rounded-xl sm:rounded-2xl text-white shadow-md`}
                      whileHover={{ rotate: 180, scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    >
                      {stat.icon}
                    </motion.div>
                    <div className="text-center">
                      <motion.div 
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black dark:text-white mb-1 sm:mb-2"
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1, type: "spring" }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              </ParallaxCard>
            ))}
          </div>
        </motion.div>

        {/* Responsive Timeline Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div
            animate={magicMode ? { ...timelinePos } : {}}
            transition={magicMode ? { duration: 1.5, type: 'spring' } : {}}
            style={{ position: magicMode ? 'relative' : undefined }}
            className="relative"
          >
            {/* Timeline line - hidden on mobile */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500 rounded-full opacity-30" />
            
            <div className="space-y-8 lg:space-y-12">
              {internships.map((internship, index) => (
                <motion.div
                  key={`${internship.company}-${internship.role}`}
                  className={`lg:flex lg:items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                  initial={{ opacity: 0, x: 0, y: 30 }}
                  animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.15 }}
                >
                  {/* Timeline dot - hidden on mobile */}
                  <div className="hidden lg:block relative z-10">
                    <motion.div
                      className={`w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r ${internship.color} rounded-full shadow-md border-2 border-white dark:border-gray-900`}
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                  
                  {/* Content card */}
                  <div className="w-full lg:w-5/12 lg:ml-8 lg:mr-8">
                    <ParallaxCard speed={0.1 + index * 0.05}>
                      <motion.div
                        className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 ${internship.bgColor} ${internship.borderColor} hover:shadow-lg transition-all duration-300 ${internship.glowColor}`}
                        whileHover={{ 
                          scale: 1.01, 
                          y: -2
                        }}
                      >
                        <div className="flex items-start justify-between mb-3 sm:mb-4">
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <motion.div
                              className={`p-2 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-r ${internship.color} text-white`}
                              whileHover={{ rotate: 180, scale: 1.05 }}
                              transition={{ duration: 0.4 }}
                            >
                              {internship.icon}
                            </motion.div>
                            <div>
                              <h3 className="text-base sm:text-lg font-bold text-black dark:text-white">{internship.company}</h3>
                              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">{internship.role}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 sm:space-x-2 bg-white dark:bg-gray-800 px-2 sm:px-3 py-1 rounded-full">
                            <Calendar className="w-3 h-3 text-slate-500" />
                            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{internship.year}</span>
                          </div>
                        </div>
                        
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-3 sm:mb-4 leading-relaxed">
                          {internship.description}
                        </p>
                        
                        <div className="mb-3 sm:mb-4">
                          <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
                            {internship.skills.map((skill, skillIndex) => (
                              <motion.span
                                key={skill}
                                className="px-2 py-1 bg-white dark:bg-gray-800 rounded-full text-xs font-medium text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-gray-700"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.3, delay: 0.6 + index * 0.15 + skillIndex * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                              >
                                {skill}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-2 sm:p-3 border border-slate-200 dark:border-gray-700">
                          <div className="flex items-center space-x-2 mb-1 sm:mb-2">
                            <Target className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Key Impact</span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">{internship.impact}</p>
                        </div>
                      </motion.div>
                    </ParallaxCard>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Optimized Call to Action */}
        <motion.div
          className="mt-16 sm:mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
                      <motion.div
              className="inline-flex items-center space-x-2 sm:space-x-3 bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 cursor-pointer"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)"
              }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Ready to collaborate?</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Internships; 