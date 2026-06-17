import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ParallaxSection from './ParallaxSection';
import Marquee from './Marquee';
import ExpertiseCard from './ExpertiseCard';

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
  const [skillBarsPos, setSkillBarsPos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const [radialChartsPos, setRadialChartsPos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });

  useEffect(() => {
    if (!magicMode) {
      setTitlePos({ x: 0, y: 0, rotate: 0, scale: 1 });
      setDescPos({ x: 0, y: 0, rotate: 0, scale: 1 });
      setTechTitlePos({ x: 0, y: 0, rotate: 0, scale: 1 });
      setExpertiseTitlePos({ x: 0, y: 0, rotate: 0, scale: 1 });
      setSkillBarsPos({ x: 0, y: 0, rotate: 0, scale: 1 });
      setRadialChartsPos({ x: 0, y: 0, rotate: 0, scale: 1 });
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

    // Start animations with staggered delays
    timers.push(window.setTimeout(chaosTitle, 1000));
    timers.push(window.setTimeout(fallDesc, 2000));
    timers.push(window.setTimeout(spinTechTitle, 3000));
    timers.push(window.setTimeout(chaosExpertiseTitle, 4000));
    timers.push(window.setTimeout(bounceSkillBars, 5000));
    timers.push(window.setTimeout(spinRadialCharts, 6000));

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [magicMode]);

  const skills = [
    { name: 'React/Next.js', level: 80, color: 'from-blue-500 to-cyan-500' },
    { name: 'TypeScript', level: 75, color: 'from-blue-600 to-blue-400' },
    { name: 'Go', level: 75, color: 'from-green-500 to-green-400' },
    { name: 'Python', level: 75, color: 'from-yellow-500 to-yellow-400' },
    { name: 'Flutter', level: 70, color: 'from-purple-500 to-pink-500' },
    { name: 'PostgreSQL', level: 75, color: 'from-red-500 to-orange-500' },
  ];

  const marquee_items = ['React', 'Express', 'Git & GitHub', 'Linux', 'Figma', 'n8n'];

  const radialSkills = [
    { name: 'Frontend', percentage: 80 },
    { name: 'Backend', percentage: 75 },
    { name: 'Flutter', percentage: 75 },
    { name: 'AI/ML', percentage: 82 },
  ];

  return (
    <section id="skills" className={`pt-24 pb-24 sm:pt-28 sm:pb-28 relative bg-white dark:bg-black text-slate-900 dark:text-white scroll-mt-20 ${magicMode ? 'scale-x-[-1]' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ParallaxSection speed={0.3}>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="text-center mb-16"
          >
          
          </motion.div>
        </ParallaxSection>

        <div className="max-w-4xl mx-auto mb-24 sm:mb-32 lg:mb-40 pb-8 border-b border-slate-200/80 dark:border-slate-800/80">
          <h3 className="title text-4xl font-bold text-center mb-6 text-slate-900 dark:text-white">
            Frameworks and Tools
          </h3>
          <Marquee items={marquee_items} />
        </div>

        <div className="max-w-4xl mx-auto pt-8 sm:pt-12">
          <div className="grid md:grid-cols-2 gap-10 items-stretch justify-items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
              className="w-full max-w-[400px] flex flex-col h-full"
            >
              <motion.h3
                className="text-lg font-bold text-center mb-4"
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
                className="flex-1 bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-center space-y-3 min-h-[360px]"
              >
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="space-y-1.5"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.3 + index * 0.08 }}
                  >
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-slate-900">{skill.name}</span>
                      <span className="text-slate-600">{skill.level}%</span>
                    </div>
                    <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-black rounded-full"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ type: 'spring', stiffness: 50, damping: 20, delay: 0.5 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.4 }}
              className="w-full max-w-[400px] flex flex-col h-full"
            >
              <motion.h3
                className="text-lg font-bold text-center mb-4"
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
                className="flex-1 flex min-h-[360px]"
              >
                <ExpertiseCard items={radialSkills} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
