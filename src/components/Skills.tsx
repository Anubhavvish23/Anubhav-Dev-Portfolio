import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ParallaxSection, { ParallaxCard, ParallaxText } from './ParallaxSection';

const CIcon = () => (
  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-lg">C</span>
);

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

  const radialSkills = [
    { name: 'Frontend', percentage: 80 },
    { name: 'Backend', percentage: 80 },
    { name: 'DevOps', percentage: 75 },
    { name: 'Design', percentage: 82 },
  ];

  const stackProgress = [
    { name: 'MERN Stack', icon: '🌐', progress: 92 },
    { name: 'Django', icon: '🦄', progress: 80 },
    { name: 'Full Stack', icon: '🧑‍💻', progress: 95 },
    { name: 'Gen AI', icon: '🤖', progress: 75 },
    { name: 'ML', icon: '📊', progress: 78 },
  ];

  return (
    <section id="skills" className="py-20 relative bg-white dark:bg-black text-slate-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ParallaxSection speed={0.3}>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="title text-6xl font-bold mb-6 text-black dark:text-white">Skills & Expertise</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              A comprehensive toolkit of modern technologies and frameworks
            </p>
          </motion.div>
        </ParallaxSection>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Skill Bars */}
          <ParallaxSection speed={0.2} direction="left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold mb-8">Technical Proficiency</h3>
              {skills.map((skill, index) => (
                <ParallaxCard key={skill.name} speed={0.1 + index * 0.05} className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-slate-600 dark:text-slate-300">{skill.level}%</span>
                    </div>
                    <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-black rounded-full shadow-md border border-white"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                      />
                    </div>
                  </div>
                </ParallaxCard>
              ))}
            </motion.div>
          </ParallaxSection>

          {/* Right Column - Radial Charts */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold mb-8">Expertise Areas</h3>
            <div className="grid grid-cols-2 gap-8">
              {radialSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                >
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="#000" strokeWidth={8} fill="none" />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#000"
                        strokeWidth={8}
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                        animate={inView ? { strokeDashoffset: 2 * Math.PI * 40 * (1 - skill.percentage / 100) } : {}}
                        transition={{ duration: 2, delay: 0.8 + index * 0.2 }}
                        style={{ filter: 'drop-shadow(0 0 6px #000)' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-bold">{skill.percentage}%</span>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 font-medium">{skill.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tech Stack Icons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-center mb-2">Technology Stack</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.filter(t => t.progress === undefined).map((tech, i) => (
              <motion.div
                key={tech.name}
                className="glass rounded-xl p-4 text-center cursor-pointer group w-40 min-h-[90px] flex flex-col items-center justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1 + i * 0.05 }}
                whileHover={{ scale: 1.1, y: -10, rotateY: 15 }}
              >
                <div className="text-3xl mb-2 group-hover:animate-bounce">{tech.icon}</div>
                <p className="text-slate-600 dark:text-slate-300 text-sm font-medium mb-2">{tech.name}</p>
              </motion.div>
            ))}
          </div>

          {/* Stack Progress */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
            {stackProgress.map((stack, index) => (
              <motion.div
                key={stack.name}
                className="glass rounded-xl p-6 flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{stack.icon}</span>
                  <span className="font-semibold">{stack.name}</span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden mt-2">
                  <motion.div
                    className="h-full bg-black rounded-full shadow-md border border-white"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${stack.progress}%` } : {}}
                    transition={{ duration: 1.2, delay: 1.7 + index * 0.1 }}
                  />
                </div>
                <div className="w-full flex justify-end text-xs text-slate-700 mt-1 font-mono">{stack.progress}%</div>
              </motion.div>
            ))}
          </div>

          {/* ✅ Certifications Section Fixed for Dark Mode */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold text-center mb-4">Certifications</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                'MERN Stack x2',
                'Django',
                'Python',
                'Full Stack',
                'React',
                'Next.js',
                'Gen AI',
              ].map((cert, idx) => (
                <div
                  key={cert}
                  className="glass rounded-xl px-6 py-3 text-slate-800 dark:text-white font-semibold text-base shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                  style={{ minWidth: 120 }}
                >
                  {cert}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
