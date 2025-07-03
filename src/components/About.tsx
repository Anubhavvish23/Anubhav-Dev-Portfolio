import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Code, Heart, Zap } from 'lucide-react';

const About = () => {
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
    <section id="about" className="py-20 relative bg-white dark:bg-black text-slate-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="title text-5xl font-bold text-slate-900 dark:text-white">About Me</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            I'm a passionate full-stack developer with a love for creating innovative digital solutions. 
            My journey in tech is driven by curiosity, creativity, and a commitment to excellence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">My Story</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Started my journey in computer science with a fascination for how technology can solve real-world problems. 
                Over the years, I've developed expertise in both frontend and backend technologies, always staying curious 
                about emerging trends and best practices.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                When I'm not coding, you'll find me exploring new frameworks, contributing to open source projects, 
                or sharing knowledge with the developer community.
              </p>
            </div>

            {/* Location */}
            <motion.div
              className="flex items-center gap-3 text-slate-600 dark:text-slate-300"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MapPin className="w-6 h-6 text-blue-400" />
              </motion.div>
              <span className="text-lg">Based in India</span>
            </motion.div>
          </motion.div>

          {/* Cards Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {cards.map((card, index) => (
              <motion.div
                key={card.title}
                className="glass rounded-xl p-6 hover:glass-strong transition-all duration-300 cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                  rotateX: 5,
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="text-blue-400 group-hover:text-purple-400 transition-colors duration-300"
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 360,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {card.icon}
                  </motion.div>
                  <div>
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{card.title}</h4>
                    <p className="text-slate-600 dark:text-slate-300">{card.description}</p>
                  </div>
                </div>
              </motion.div>
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
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Core Values</h3>
          <div className="flex justify-center gap-8 flex-wrap">
            {['Innovation', 'Quality', 'Collaboration', 'Growth'].map((value, index) => (
              <motion.div
                key={value}
                className="relative"
                whileHover={{ scale: 1.1 }}
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
                <p className="text-slate-600 dark:text-slate-300 text-sm mt-2">{value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;