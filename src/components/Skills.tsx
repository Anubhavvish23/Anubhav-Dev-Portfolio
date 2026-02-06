import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ParallaxSection, { ParallaxCard } from './ParallaxSection';
import Marquee from './Marquee';
import SwitchCard from './SwitchCard';
import ProficiencyCard from './ProficiencyCard';

const CIcon = () => (
  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-lg">C</span>
);

interface SkillsProps {
  magicMode?: boolean;
}

const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

const Skills: React.FC<SkillsProps> = ({ magicMode }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Enhanced Chaotic Magic Mode state
  const [titlePos, setTitlePos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const [descPos, setDescPos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const [techTitlePos, setTechTitlePos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const [expertiseTitlePos, setExpertiseTitlePos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const [stackTitlePos, setStackTitlePos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const [skillBarsPos, setSkillBarsPos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const [radialChartsPos, setRadialChartsPos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const [techStackPos, setTechStackPos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });

  useEffect(() => {
    if (!magicMode) {
      setTitlePos({ x: 0, y: 0, rotate: 0, scale: 1 });
      setDescPos({ x: 0, y: 0, rotate: 0, scale: 1 });
      setTechTitlePos({ x: 0, y: 0, rotate: 0, scale: 1 });
      setExpertiseTitlePos({ x: 0, y: 0, rotate: 0, scale: 1 });
      setStackTitlePos({ x: 0, y: 0, rotate: 0, scale: 1 });
      setSkillBarsPos({ x: 0, y: 0, rotate: 0, scale: 1 });
      setRadialChartsPos({ x: 0, y: 0, rotate: 0, scale: 1 });
      setTechStackPos({ x: 0, y: 0, rotate: 0, scale: 1 });
      return;
    }

    let timers: number[] = [];

    // Optimized chaotic animations with reduced frequency
    const chaosTitle = () => {
      setTitlePos({
        x: getRandom(-50, 50),
        y: getRandom(-25, 25),
        rotate: getRandom(-20, 20),
        scale: getRandom(0.95, 1.05)
      });
      timers.push(window.setTimeout(chaosTitle, getRandom(4000, 7000)));
    };

    const fallDesc = () => {
      setDescPos({
        x: getRandom(-40, 40),
        y: getRandom(-15, 15),
        rotate: getRandom(-10, 10),
        scale: getRandom(0.95, 1.05)
      });
      timers.push(window.setTimeout(fallDesc, getRandom(5000, 8000)));
    };

    const spinTechTitle = () => {
      setTechTitlePos({
        x: getRandom(-30, 30),
        y: getRandom(-10, 10),
        rotate: getRandom(-20, 20),
        scale: getRandom(0.9, 1.1)
      });
      timers.push(window.setTimeout(spinTechTitle, getRandom(6000, 9000)));
    };

    const chaosExpertiseTitle = () => {
      setExpertiseTitlePos({
        x: getRandom(-30, 30),
        y: getRandom(-10, 10),
        rotate: getRandom(-20, 20),
        scale: getRandom(0.9, 1.1)
      });
      timers.push(window.setTimeout(chaosExpertiseTitle, getRandom(7000, 10000)));
    };

    const floatStackTitle = () => {
      setStackTitlePos({
        x: getRandom(-25, 25),
        y: getRandom(-8, 8),
        rotate: getRandom(-15, 15),
        scale: getRandom(0.95, 1.05)
      });
      timers.push(window.setTimeout(floatStackTitle, getRandom(8000, 11000)));
    };

    const bounceSkillBars = () => {
      setSkillBarsPos({
        x: getRandom(-20, 20),
        y: getRandom(-5, 5),
        rotate: getRandom(-10, 10),
        scale: getRandom(0.98, 1.02)
      });
      timers.push(window.setTimeout(bounceSkillBars, getRandom(9000, 12000)));
    };

    const spinRadialCharts = () => {
      setRadialChartsPos({
        x: getRandom(-25, 25),
        y: getRandom(-8, 8),
        rotate: getRandom(-15, 15),
        scale: getRandom(0.95, 1.05)
      });
      timers.push(window.setTimeout(spinRadialCharts, getRandom(10000, 13000)));
    };

    const chaosTechStack = () => {
      setTechStackPos({
        x: getRandom(-30, 30),
        y: getRandom(-10, 10),
        rotate: getRandom(-15, 15),
        scale: getRandom(0.9, 1.1)
      });
      timers.push(window.setTimeout(chaosTechStack, getRandom(11000, 14000)));
    };

    // Start animations with staggered delays
    timers.push(window.setTimeout(chaosTitle, 1000));
    timers.push(window.setTimeout(fallDesc, 2000));
    timers.push(window.setTimeout(spinTechTitle, 3000));
    timers.push(window.setTimeout(chaosExpertiseTitle, 4000));
    timers.push(window.setTimeout(floatStackTitle, 5000));
    timers.push(window.setTimeout(bounceSkillBars, 6000));
    timers.push(window.setTimeout(spinRadialCharts, 7000));
    timers.push(window.setTimeout(chaosTechStack, 8000));

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [magicMode]);

  // Continuous rotation for extra chaos
  const continuousRotate = magicMode ? {
    rotate: [0, 360],
    transition: { duration: 10, repeat: Infinity, ease: "linear" }
  } : {};

  const skills = [
    { name: 'React/Next.js', level: 95, color: 'from-blue-500 to-cyan-500' },
    { name: 'TypeScript', level: 90, color: 'from-blue-600 to-blue-400' },
    { name: 'Node.js', level: 88, color: 'from-green-500 to-green-400' },
    { name: 'Python', level: 85, color: 'from-yellow-500 to-yellow-400' },
    { name: 'UI/UX Design', level: 82, color: 'from-purple-500 to-pink-500' },
    { name: 'Database Design', level: 80, color: 'from-red-500 to-orange-500' },
  ];

  const techStack = [
    { name: 'React', icon: '⚛️' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Python', icon: '🐍' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'Docker', icon: '🐳' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Git', icon: '📚' },
    { name: 'Figma', icon: '🎨' },
    { name: 'C', icon: <CIcon /> },
    { name: 'MERN Stack', icon: '🌐', progress: 92 },
    { name: 'Django', icon: '🦄', progress: 80 },
    { name: 'Full Stack', icon: '🧑‍💻', progress: 95 },
    { name: 'Gen AI', icon: '🤖', progress: 75 },
    { name: 'ML', icon: '📊', progress: 78 },
  ];

  const marquee_items = ['React', 'TypeScript', 'Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS', 'Git', 'Figma', 'MERN', 'Django', 'Gen AI', 'Framer Motion', 'Tailwind'];

  const radialSkills = [
    { name: 'Frontend', percentage: 80 },
    { name: 'Backend', percentage: 80 },
    { name: 'DevOps', percentage: 75 },
    { name: 'Design', percentage: 82 },
  ];

  const stack_progress = [
    { name: 'MERN Stack', icon: '🌐', progress: 92 },
    { name: 'Django', icon: '🦄', progress: 80 },
    { name: 'Full Stack', icon: '🧑‍💻', progress: 95 },
    { name: 'Gen AI', icon: '🤖', progress: 75 },
    { name: 'ML', icon: '📊', progress: 78 },
    { name: 'Data Visualization', icon: '📈', progress: 80 },
  ];

  // Magic sparkles for stack proficiency
  const MagicStackSparkles = () => (
    <>
      {magicMode && (
        <div className="pointer-events-none absolute inset-0 z-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-purple-400/40 rounded-full shadow-lg"
              style={{
                width: 7 + Math.random() * 10,
                height: 7 + Math.random() * 10,
                left: `${40 + Math.random() * 20}%`, // focus sparkles around center
                top: `${70 + Math.random() * 20}%`, // focus sparkles near stack proficiency
                filter: 'blur(1.5px) drop-shadow(0 0 6px #c4b5fd)'
              }}
              animate={{
                y: [0, -15 + Math.random() * 30, 0],
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2.5 + Math.random() * 1.5,
                repeat: Infinity,
                delay: Math.random() * 1.5,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      )}
    </>
  );

  return (
    <section id="skills" className={`pt-24 pb-24 sm:pt-28 sm:pb-28 relative bg-white dark:bg-black text-slate-900 dark:text-white scroll-mt-20 ${magicMode ? 'scale-x-[-1]' : ''}`}>
      {/* Magic sparkles for stack proficiency */}
      <MagicStackSparkles />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ParallaxSection speed={0.3}>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="text-center mb-16"
          >
            <motion.h2
              className="title text-6xl font-bold mb-6 text-black dark:text-white"
              animate={magicMode ? { ...titlePos } : {}}
              transition={magicMode ? { duration: 1.5, type: 'spring' } : {}}
              style={{ position: magicMode ? 'relative' : undefined }}
            >
              Skills & Expertise
            </motion.h2>
            <motion.p
              className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
              animate={magicMode ? { ...descPos } : {}}
              transition={magicMode ? { duration: 2, type: 'spring' } : {}}
              style={{ position: magicMode ? 'relative' : undefined }}
            >
              A comprehensive toolkit of modern technologies and frameworks
            </motion.p>
          </motion.div>
        </ParallaxSection>

        <Marquee items={marquee_items} className="mb-12 -mx-4" />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Skill Bars */}
          <ParallaxSection speed={0.2} direction="left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
              className="space-y-6"
            >
              <motion.h3
                className="text-2xl font-bold mb-8"
                animate={magicMode ? { ...techTitlePos } : {}}
                transition={magicMode ? { duration: 1.5, type: 'spring' } : {}}
                style={{ position: magicMode ? 'relative' : undefined }}
              >
                Technical Proficiency
              </motion.h3>
              <motion.div
                animate={magicMode ? { ...skillBarsPos } : {}}
                transition={magicMode ? { duration: 2, type: 'spring' } : {}}
                style={{ position: magicMode ? 'relative' : undefined }}
              >
                {skills.map((skill, index) => (
                  <ParallaxCard key={skill.name} speed={0.1 + index * 0.05} className="p-4">
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.3 + index * 0.08 }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-slate-600 dark:text-slate-300">{skill.level}%</span>
                      </div>
                      <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-black rounded-full shadow-md border border-white"
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : {}}
                          transition={{ type: 'spring', stiffness: 50, damping: 20, delay: 0.5 + index * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  </ParallaxCard>
                ))}
              </motion.div>
            </motion.div>
          </ParallaxSection>

          {/* Right Column - Radial Charts */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.4 }}
            className="space-y-8"
          >
            <motion.h3
              className="text-2xl font-bold mb-8"
              animate={magicMode ? { ...expertiseTitlePos } : {}}
              transition={magicMode ? { duration: 1.5, type: 'spring' } : {}}
              style={{ position: magicMode ? 'relative' : undefined }}
            >
              Expertise Areas
            </motion.h3>
            <motion.div
              animate={magicMode ? { ...radialChartsPos } : {}}
              transition={magicMode ? { duration: 2, type: 'spring' } : {}}
              style={{ position: magicMode ? 'relative' : undefined }}
            >
              <div className="grid grid-cols-2 gap-6">
                {radialSkills.map((skill, index) => (
                  <ParallaxCard key={skill.name} speed={0.15 + index * 0.1} className="p-6 text-center">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          className="text-slate-200 dark:text-slate-700"
                        />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          strokeLinecap="round"
                          className="text-black"
                          initial={{ strokeDasharray: 0, strokeDashoffset: 0 }}
                          animate={inView ? { 
                            strokeDasharray: `${2 * Math.PI * 40}`,
                            strokeDashoffset: `${2 * Math.PI * 40 * (1 - skill.percentage / 100)}`
                          } : {}}
                          transition={{ duration: 2, delay: 1 + index * 0.2 }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold">{skill.percentage}%</span>
                      </div>
                    </div>
                    <h4 className="font-semibold">{skill.name}</h4>
                  </ParallaxCard>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Tech Stack Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.h3
            className="text-2xl font-bold mb-8 text-center"
            animate={magicMode ? { ...stackTitlePos } : {}}
            transition={magicMode ? { duration: 1.5, type: 'spring' } : {}}
            style={{ position: magicMode ? 'relative' : undefined }}
          >
            Tech Stack
          </motion.h3>
          <motion.div
            animate={magicMode ? { ...techStackPos } : {}}
            transition={magicMode ? { duration: 2, type: 'spring' } : {}}
            style={{ position: magicMode ? 'relative' : undefined }}
            className="w-full overflow-x-auto overflow-y-visible min-w-0"
          >
            <SwitchCard>
              <div className="switch-tech-grid">
                {techStack.slice(0, 10).map((tech) => (
                  <div key={tech.name} className="switch-tech-item">
                    <span className="switch-tech-icon">{tech.icon}</span>
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </SwitchCard>
          </motion.div>
        </motion.div>

        {/* Stack Proficiency Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.h3
            className="text-3xl font-bold mb-8 text-center text-black dark:text-white font-[cursive]"
            animate={magicMode ? { ...stackTitlePos } : {}}
            transition={magicMode ? { duration: 1.5, type: 'spring' } : {}}
            style={{ position: magicMode ? 'relative' : undefined }}
          >
            Stack Proficiency
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto w-full px-2">
            {stack_progress.map((stack, index) => (
              <ParallaxCard key={stack.name} speed={0.1 + index * 0.1} className="w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.9 + index * 0.08 }}
                >
                  <ProficiencyCard name={stack.name} icon={stack.icon} progress={stack.progress} />
                </motion.div>
              </ParallaxCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
