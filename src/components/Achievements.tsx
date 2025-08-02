import React, { useEffect, useState } from 'react';
import { Trophy, Star, Zap, Code, Rocket, Users, BookOpen, Briefcase, Crown, Medal, Activity, Globe, Bot, Brain, Laptop2, UserCheck, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type FloatingIconProps = {
  children: React.ReactNode;
  delay?: number;
};

const FloatingIcon = ({ children, delay = 0 }: FloatingIconProps) => (
    <div 
      className="absolute animate-bounce opacity-20"
      style={{
        animationDelay: `${delay}s`,
        animationDuration: '3s'
      }}
    >
      {children}
    </div>
  );

interface AchievementsProps {
  magicMode?: boolean;
}

const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

const Achievements: React.FC<AchievementsProps> = ({ magicMode }) => {
  const [inView, setInView] = React.useState(false);
  const [activeYear, setActiveYear] = React.useState(0);
  const [ref, inViewRef] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Enhanced Chaotic Magic Mode state
  const [titlePos, setTitlePos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const [descPos, setDescPos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const [timelinePos, setTimelinePos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const [statsPos, setStatsPos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });

  React.useEffect(() => {
    const timer = setTimeout(() => setInView(true), 100);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveYear(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!magicMode) {
      setTitlePos({ x: 0, y: 0, rotate: 0, scale: 1 });
      setDescPos({ x: 0, y: 0, rotate: 0, scale: 1 });
      setTimelinePos({ x: 0, y: 0, rotate: 0, scale: 1 });
      setStatsPos({ x: 0, y: 0, rotate: 0, scale: 1 });
      return;
    }

    let timers: number[] = [];

    // Optimized chaotic animations with reduced frequency
    const chaosTitle = () => {
      setTitlePos({
        x: getRandom(-50, 50),
        y: getRandom(-25, 25),
        rotate: getRandom(-20, 20),
        scale: getRandom(0.9, 1.1)
      });
      timers.push(window.setTimeout(chaosTitle, getRandom(5000, 8000)));
    };

    const fallDesc = () => {
      setDescPos({
        x: getRandom(-35, 35),
        y: getRandom(-15, 15),
        rotate: getRandom(-10, 10),
        scale: getRandom(0.95, 1.05)
      });
      timers.push(window.setTimeout(fallDesc, getRandom(6000, 9000)));
    };

    const spinTimeline = () => {
      setTimelinePos({
        x: getRandom(-30, 30),
        y: getRandom(-10, 10),
        rotate: getRandom(-15, 15),
        scale: getRandom(0.95, 1.05)
      });
      timers.push(window.setTimeout(spinTimeline, getRandom(7000, 10000)));
    };

    const bounceStats = () => {
      setStatsPos({
        x: getRandom(-25, 25),
        y: getRandom(-8, 8),
        rotate: getRandom(-10, 10),
        scale: getRandom(0.98, 1.02)
      });
      timers.push(window.setTimeout(bounceStats, getRandom(8000, 11000)));
    };

    // Start animations with staggered delays
    timers.push(window.setTimeout(chaosTitle, 1000));
    timers.push(window.setTimeout(fallDesc, 2000));
    timers.push(window.setTimeout(spinTimeline, 3000));
    timers.push(window.setTimeout(bounceStats, 4000));

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [magicMode]);

  // Continuous rotation for extra chaos
  const continuousRotate = magicMode ? {
    rotate: [0, 360],
    transition: { duration: 12, repeat: Infinity, ease: "linear" }
  } : {};

  const achievementsTimeline = [
    {
      year: '2023',
      theme: 'Foundation',
      icon: <Star className="w-6 h-6" />,
      items: [
        { icon: <Trophy className="w-5 h-5" />, text: 'Won my first hackathon (Robotics/IoT).' },
        { icon: <Zap className="w-5 h-5" />, text: 'Built a line-following robot using Raspberry Pi.' },
        { icon: <Code className="w-5 h-5" />, text: 'Started building projects with Arduino, C, and embedded systems.' },
        { icon: <Rocket className="w-5 h-5" />, text: 'Entered the world of hackathons and tech competitions.' },
      ]
    },
    {
      year: '2024',
      theme: 'Breakthrough',
      icon: <Rocket className="w-6 h-6" />,
      items: [
        { icon: <Globe className="w-5 h-5" />, text: 'Represented my college at Delhi Startup Mahakumbh, addressed by PM Modi and top founders.' },
        { icon: <Trophy className="w-5 h-5" />, text: 'Won a robotics hackathon.' },
        { icon: <Briefcase className="w-5 h-5" />, text: 'Completed an internship at RC Labs as a Software Developer.' },
        { icon: <UserCheck className="w-5 h-5" />, text: 'Took Arduino sessions and Linux VirtualBox workshops for juniors.' },
        { icon: <Users className="w-5 h-5" />, text: 'Conducted hands-on training in IoT and robotics at campus.' },
        { icon: <Laptop2 className="w-5 h-5" />, text: 'Built ERP systems and launched AI & web-based projects.' },
        { icon: <BookOpen className="w-5 h-5" />, text: 'Learned MERN stack, Django, and contributed to full-stack apps.' },
      ]
    },
    {
      year: '2025',
      theme: 'Leadership',
      icon: <Crown className="w-6 h-6" />,
      items: [
        { icon: <Briefcase className="w-5 h-5" />, text: 'Interned as a Product Management Intern at Gully Group.' },
        { icon: <Users className="w-5 h-5" />, text: 'Conducted a Hackathon at my college as lead organizer.' },
        { icon: <Medal className="w-5 h-5" />, text: 'Received Best Upcoming Engineer 2025 (Multiple Awards).' },
        { icon: <Activity className="w-5 h-5" />, text: 'Led multiple Drone workshops and technical sessions.' },
        { icon: <Bot className="w-5 h-5" />, text: 'Created advanced AI applications: Datasheet AI, Sanskrit GPT, MediBot, and more.' },
        { icon: <Brain className="w-5 h-5" />, text: 'Completed advanced courses in AI, Full Stack Dev, FastAPI, and LLMs.' },
        { icon: <Globe className="w-5 h-5" />, text: 'Reinvited to Delhi tech events for achievements in AI and product dev.' },
      ]
    }
  ];

  const stats = [
    { number: "12+", label: "Projects Completed", icon: <Code className="w-6 h-6" /> },
    { number: "3+", label: "Years Experience", icon: <Trophy className="w-6 h-6" /> },
    { number: "30+", label: "GitHub Contributions", icon: <Activity className="w-6 h-6" /> },
    { number: "10+", label: "Technologies Mastered", icon: <Sparkles className="w-6 h-6" /> }
  ];

  return (
    <section id="achievements" className="py-24 bg-white dark:bg-black text-slate-900 dark:text-white relative overflow-hidden min-h-screen">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingIcon delay={0}>
          <div className="top-20 left-20 relative">
            <Code className="w-8 h-8 text-gray-300" />
          </div>
        </FloatingIcon>
        <FloatingIcon delay={1}>
          <div className="top-40 right-32 relative">
            <Rocket className="w-10 h-10 text-gray-300" />
          </div>
        </FloatingIcon>
        <FloatingIcon delay={2}>
          <div className="bottom-32 left-1/4 relative">
            <Trophy className="w-7 h-7 text-gray-300" />
          </div>
        </FloatingIcon>
        <FloatingIcon delay={1.5}>
          <div className="bottom-40 right-20 relative">
            <Brain className="w-9 h-9 text-gray-300" />
          </div>
        </FloatingIcon>
        
        {/* Geometric shapes */}
        <div className="absolute top-16 left-16 w-32 h-32 border-2 border-gray-200 rounded-full animate-spin opacity-30" style={{animationDuration: '20s'}}></div>
        <div className="absolute bottom-16 right-16 w-48 h-48 border-2 border-gray-200 rounded-full animate-spin opacity-20" style={{animationDuration: '25s', animationDirection: 'reverse'}}></div>
        <div className="absolute top-1/2 left-8 w-24 h-24 border-2 border-gray-200 rotate-45 animate-pulse opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inViewRef ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2
            className="title text-6xl md:text-8xl mb-6 text-slate-900 dark:text-white"
            animate={magicMode ? { ...titlePos } : {}}
            transition={magicMode ? { duration: 1.5, type: 'spring' } : {}}
            style={{ position: magicMode ? 'relative' : undefined }}
          >
            Achievements
          </motion.h2>
          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="w-12 h-1 bg-slate-900 dark:bg-white animate-pulse"></div>
            <motion.div
              animate={magicMode ? continuousRotate : {}}
            >
              <Sparkles className="w-6 h-6 text-slate-900 dark:text-white animate-spin" style={{animationDuration: '3s'}} />
            </motion.div>
            <div className="w-12 h-1 bg-slate-900 dark:bg-white animate-pulse"></div>
          </div>
          <motion.p
            className="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed font-medium"
            animate={magicMode ? { ...descPos } : {}}
            transition={magicMode ? { duration: 2, type: 'spring' } : {}}
            style={{ position: magicMode ? 'relative' : undefined }}
          >
            A structured timeline of growth, innovation, and leadership in technology
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <motion.div 
          className="relative mb-24"
          animate={magicMode ? { ...timelinePos } : {}}
          transition={magicMode ? { duration: 2, type: 'spring' } : {}}
          style={{ position: magicMode ? 'relative' : undefined }}
        >
          {/* Central timeline line with animated dots */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-slate-900 dark:bg-white h-full rounded-full hidden md:block">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-slate-900 dark:bg-white rounded-full animate-ping"></div>
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-400 dark:bg-slate-600 rounded-full animate-pulse"></div>
            <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-400 dark:bg-slate-600 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-slate-900 dark:bg-white rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
          </div>

          {/* Timeline Items */}
          <div className="space-y-16">
            {achievementsTimeline.map((year, yearIndex) => (
              <motion.div
                key={year.year}
                className={`flex flex-col md:flex-row items-center ${yearIndex % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                initial={{ opacity: 0, x: yearIndex % 2 === 0 ? -50 : 50 }}
                animate={inViewRef ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: yearIndex * 0.2 }}
              >
                {/* Year Card */}
                <motion.div
                  className={`w-full md:w-1/2 ${yearIndex % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'} mb-8 md:mb-0`}
                  whileHover={magicMode ? { scale: 1.1, rotate: 5 } : { scale: 1.02 }}
                >
                  <motion.div
                    className="glass rounded-2xl p-6 relative group cursor-pointer"
                    whileHover={magicMode ? { 
                      scale: 1.05, 
                      rotate: getRandom(-8, 8),
                      y: -5 
                    } : { 
                      scale: 1.02, 
                      y: -2 
                    }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <motion.div
                        className="text-blue-500 group-hover:text-purple-500 transition-colors duration-300"
                        whileHover={magicMode ? { scale: 1.3, rotate: 360 } : { scale: 1.2 }}
                        animate={magicMode ? continuousRotate : {}}
                      >
                        {year.icon}
                      </motion.div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{year.year}</h3>
                        <p className="text-slate-600 dark:text-slate-300 font-medium">{year.theme}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {year.items.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={inViewRef ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.5, delay: 0.5 + itemIndex * 0.1 }}
                          whileHover={magicMode ? { scale: 1.05, rotate: 2 } : {}}
                        >
                          <motion.div
                            className="text-blue-400 mt-1 flex-shrink-0"
                            whileHover={magicMode ? { scale: 1.2, rotate: 180 } : { scale: 1.1 }}
                          >
                            {item.icon}
                          </motion.div>
                          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{item.text}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Timeline Center Point */}
                <div className="w-16 h-16 bg-slate-900 dark:bg-white rounded-full flex items-center justify-center relative z-10 shadow-lg">
                  <motion.div
                    className="text-white dark:text-slate-900"
                    whileHover={magicMode ? { scale: 1.3, rotate: 360 } : { scale: 1.2 }}
                    animate={magicMode ? continuousRotate : {}}
                  >
                    {year.icon}
                  </motion.div>
                </div>

                {/* Empty space for alignment - hidden on mobile */}
                <div className="hidden md:block w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          animate={magicMode ? { ...statsPos } : {}}
          transition={magicMode ? { duration: 2, type: 'spring' } : {}}
          style={{ position: magicMode ? 'relative' : undefined }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={inViewRef ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
              whileHover={magicMode ? { scale: 1.1, rotate: 5 } : { scale: 1.05 }}
            >
              <motion.div
                className="glass rounded-2xl p-6 mb-4"
                whileHover={magicMode ? { 
                  scale: 1.1, 
                  rotate: getRandom(-10, 10),
                  y: -8 
                } : { 
                  scale: 1.05, 
                  y: -5 
                }}
              >
                <motion.div
                  className="text-blue-500 mb-4 mx-auto w-fit"
                  whileHover={magicMode ? { scale: 1.4, rotate: 360 } : { scale: 1.2 }}
                  animate={magicMode ? continuousRotate : {}}
                >
                  {stat.icon}
                </motion.div>
                <motion.h3 
                  className="text-3xl font-bold text-slate-900 dark:text-white mb-2"
                  whileHover={magicMode ? { scale: 1.2, rotate: 3 } : {}}
                >
                  {stat.number}
                </motion.h3>
                <p className="text-slate-600 dark:text-slate-300 font-medium">{stat.label}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;