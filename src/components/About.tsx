import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Heart, Zap } from 'lucide-react';
import ChaosText from './ChaosText';
import BrowserCard from './BrowserCard';
import AboutCard from './AboutCard';

interface AboutProps {
  magicMode: boolean;
}

const About: React.FC<AboutProps> = ({ magicMode }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const cards = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Developer",
      description: "Crafting clean, efficient code with modern technologies and best practices."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Designer",
      description: "Creating beautiful, user-centered interfaces that delight and engage."
    },
    {
      icon: <Zap className="w-6 h-6" />,
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
            className="title text-4xl font-bold text-slate-900 dark:text-white"
            animationType="text"
          >
            About Me
          </ChaosText>
          <ChaosText 
            magicMode={magicMode} 
            element="p" 
            className="text-l text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
            animationType="text"
          >
            I'm a passionate full-stack developer with a love for creating innovative digital solutions. 
            My journey in tech is driven by curiosity, creativity, and a commitment to excellence.
          </ChaosText>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-stretch justify-items-center">
            <div className="w-full max-w-[400px] flex h-full">
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
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full max-w-[400px] flex flex-col gap-4 h-full min-h-[330px]"
            >
            {cards.map((card) => (
              <AboutCard
                key={card.title}
                title={card.title}
                description={card.description}
                icon={card.icon}
              />
            ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;