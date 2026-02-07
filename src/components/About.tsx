import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Heart, Zap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ChaosText from './ChaosText';
import ChaosCard from './ChaosCard';
import BrowserCard from './BrowserCard';
import AboutCard from './AboutCard';

interface AboutProps {
  magicMode: boolean;
}

const About: React.FC<AboutProps> = ({ magicMode }) => {
  const { isDark } = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const cards = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Developer",
      description: "Crafting clean, efficient code with modern technologies and best practices."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Designer",
      description: "Creating beautiful, user-centered interfaces that delight and engage."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Innovator",
      description: "Always exploring new technologies and pushing the boundaries of what's possible."
    }
  ];

  return (
    <section id="about" className="pt-24 pb-24 sm:pt-28 sm:pb-28 relative bg-white dark:bg-black text-slate-900 dark:text-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <ChaosText 
            magicMode={magicMode} 
            element="h2" 
            className="title text-5xl font-bold text-slate-900 dark:text-white"
            animationType="text"
          >
            About Me
          </ChaosText>
          <ChaosText 
            magicMode={magicMode} 
            element="p" 
            className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
            animationType="text"
          >
            I'm a passionate full-stack developer with a love for creating innovative digital solutions. 
            My journey in tech is driven by curiosity, creativity, and a commitment to excellence.
          </ChaosText>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="min-h-full"
          >
            <BrowserCard tab_label="My Story">
              <ChaosText 
                magicMode={magicMode} 
                element="p" 
                className="leading-relaxed mb-4"
                animationType="text"
              >
                Started my journey in computer science with a fascination for how technology can solve real-world problems. 
                Over the years, I've developed expertise in both frontend and backend technologies, always staying curious 
                about emerging trends and best practices.
              </ChaosText>
              <ChaosText 
                magicMode={magicMode} 
                element="p" 
                className="leading-relaxed"
                animationType="text"
              >
                When I'm not coding, you'll find me exploring new frameworks, contributing to open source projects, 
                or sharing knowledge with the developer community.
              </ChaosText>
            </BrowserCard>
          </motion.div>

          {/* Cards Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 relative"
          >
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
              <filter id="about-unopaq" y="-100%" height="300%" x="-100%" width="300%">
                <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 5 0" />
              </filter>
              <filter id="about-unopaq2" y="-100%" height="300%" x="-100%" width="300%">
                <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 10 0" />
              </filter>
              <filter id="about-unopaq3" y="-100%" height="300%" x="-100%" width="300%">
                <feColorMatrix values="1 0 0 1 0 0 1 0 1 0 0 0 1 1 0 0 0 0 2 0" />
              </filter>
            </svg>
            {cards.map((card) => (
              <AboutCard
                key={card.title}
                title={card.title}
                description={card.description}
                icon={card.icon}
                is_dark={isDark}
              />
            ))}
          </motion.div>
        </div>

        {/* Interactive Skill Dots */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <ChaosText 
            magicMode={magicMode} 
            element="h3" 
            className="text-2xl font-bold text-slate-900 dark:text-white mb-8"
            animationType="text"
          >
            Core Values
          </ChaosText>
          <div className="flex justify-center gap-8 flex-wrap">
            {['Innovation', 'Quality', 'Collaboration', 'Growth'].map((value, index) => (
              <ChaosCard
                key={value}
                magicMode={magicMode}
                className="relative"
                animationType="card"
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-black flex items-center justify-center cursor-pointer"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                  whileHover={{
                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                  }}
                >
                  <span className="text-white font-bold text-sm">{value[0]}</span>
                </motion.div>
                <ChaosText 
                  magicMode={magicMode} 
                  element="p" 
                  className="text-slate-600 dark:text-slate-300 text-sm mt-2"
                  animationType="text"
                >
                  {value}
                </ChaosText>
              </ChaosCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;