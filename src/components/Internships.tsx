import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../contexts/ThemeContext';
import { Briefcase, Calendar, MapPin, Code, Users, TrendingUp, Sparkles, ArrowRight, Building2, Laptop2 } from 'lucide-react';
import ParallaxSection, { ParallaxCard } from './ParallaxSection';
import ExperienceCard from './ExperienceCard';

interface InternshipsProps {
  magicMode?: boolean;
}

const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

const Internships: React.FC<InternshipsProps> = ({ magicMode }) => {
  const { isDark } = useTheme();
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
      company: "Rc Labs",
      role: "Software Developer Intern",
      year: "2023",
      icon: <Code className="w-5 h-5 sm:w-6 sm:h-6" />,
      description: "Full-stack development experience with modern technologies and agile development practices.",
      skills: ["Full-Stack Development", "Agile", "Modern Technologies"],
      impact: "Delivered 5+ production applications"
    },
    {
      company: "Gully Group",
      role: "Project Management Intern",
      year: "2024",
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
      description: "Led cross-functional teams, managed project timelines, and delivered successful project outcomes.",
      skills: ["Project Management", "Team Leadership", "Strategic Planning"],
      impact: "Managed 3+ concurrent projects"
    },
    {
      company: "Notarc",
      role: "Operations Lead & Co-Founder",
      year: "2024 – 2025",
      icon: <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />,
      description: "Co-founded the company as operations lead and software developer, managing drone workshops and the business website.",
      skills: ["Operations", "Software Development", "Business Management"],
      impact: "Led workshops and built the company web presence"
    },
    {
      company: "Inunity",
      role: "Software Developer & Program Mentor",
      year: "2025 – Present",
      icon: <Laptop2 className="w-5 h-5 sm:w-6 sm:h-6" />,
      description: "Handled cross-platform projects, published apps, and built dashboards while mentoring program participants.",
      skills: ["Cross-Platform Development", "App Publishing", "Mentorship"],
      impact: "Shipped apps and dashboards across platforms"
    }
  ];

  const stats = [
    { label: "Total Internships", value: "4", icon: <Briefcase className="w-5 h-5" /> },
    { label: "Years Experience", value: "3+", icon: <Calendar className="w-5 h-5" /> },
    { label: "Companies", value: "4", icon: <MapPin className="w-5 h-5" /> },
    { label: "Skills Gained", value: "14+", icon: <TrendingUp className="w-5 h-5" /> }
  ];

  const FloatingBackgroundElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-20 left-10 w-24 h-24 sm:w-32 sm:h-32 bg-slate-200/30 rounded-full blur-2xl"
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
        className="absolute bottom-20 right-10 w-32 h-32 sm:w-40 sm:h-40 bg-slate-200/30 rounded-full blur-2xl"
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
    <section id="internships" className={`pt-24 pb-24 sm:pt-28 sm:pb-28 relative bg-white dark:bg-black text-slate-900 dark:text-white overflow-x-hidden scroll-mt-20 ${magicMode ? 'scale-x-[-1]' : ''}`}>
      <FloatingBackgroundElements />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ParallaxSection speed={0.2}>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 sm:mb-20"
          >
            <motion.h2
              className="title text-4xl font-bold mb-4 sm:mb-6 text-black dark:text-white"
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

        <motion.div
          className="mb-24 sm:mb-32 max-w-4xl mx-auto pb-8 border-b border-slate-200/80 dark:border-slate-800/80"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="w-full max-w-[200px] min-h-[148px] bg-white border border-slate-200 rounded-xl px-4 py-5 flex flex-col items-center justify-center text-center shadow-sm"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.25 + index * 0.08 }}
              >
                <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-900 flex items-center justify-center mb-3">
                  {stat.icon}
                </div>
                <p className="text-3xl font-bold text-slate-900 tabular-nums leading-none mb-2">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-snug">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mb-16 pt-8 sm:pt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="title text-4xl font-bold text-center mb-10 sm:mb-12 text-slate-900 dark:text-white max-w-4xl mx-auto">
            My Journey
          </h3>

          <motion.div
            animate={magicMode ? { ...timelinePos } : {}}
            transition={magicMode ? { duration: 1.5, type: 'spring' } : {}}
            style={{ position: magicMode ? 'relative' : undefined }}
            className="relative"
          >
            <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-px h-full bg-black dark:bg-white rounded-full" />

            <div className="space-y-6 lg:space-y-8">
              {internships.map((internship, index) => (
                <motion.div
                  key={`${internship.company}-${internship.role}`}
                  className="lg:grid lg:grid-cols-2 lg:gap-x-10 items-center"
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.12 }}
                >
                  <div className={`w-full max-w-[360px] mx-auto ${index % 2 === 0 ? 'lg:col-start-2' : 'lg:col-start-1'}`}>
                    <ParallaxCard speed={0.1 + index * 0.05}>
                      <ExperienceCard
                        company={internship.company}
                        role={internship.role}
                        year={internship.year}
                        icon={internship.icon}
                        description={internship.description}
                        skills={internship.skills}
                        impact={internship.impact}
                        is_dark={isDark}
                        compact
                      />
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