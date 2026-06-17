import React, { useEffect, useState } from 'react';
import { Trophy, Star, Zap, Code, Rocket, Users, BookOpen, Briefcase, Crown, Medal, Activity, Globe, Bot, Brain, Laptop2, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Achievement3DCard from './Achievement3DCard';

interface AchievementsProps {
  magicMode?: boolean;
}

const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

const Achievements: React.FC<AchievementsProps> = ({ magicMode }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [title_pos, set_title_pos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const [desc_pos, set_desc_pos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const [timeline_pos, set_timeline_pos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });

  useEffect(() => {
    if (!magicMode) {
      set_title_pos({ x: 0, y: 0, rotate: 0, scale: 1 });
      set_desc_pos({ x: 0, y: 0, rotate: 0, scale: 1 });
      set_timeline_pos({ x: 0, y: 0, rotate: 0, scale: 1 });
      return;
    }

    let timers: number[] = [];

    const chaos_title = () => {
      set_title_pos({
        x: getRandom(-50, 50),
        y: getRandom(-25, 25),
        rotate: getRandom(-20, 20),
        scale: getRandom(0.9, 1.1)
      });
      timers.push(window.setTimeout(chaos_title, getRandom(5000, 8000)));
    };

    const fall_desc = () => {
      set_desc_pos({
        x: getRandom(-35, 35),
        y: getRandom(-15, 15),
        rotate: getRandom(-10, 10),
        scale: getRandom(0.95, 1.05)
      });
      timers.push(window.setTimeout(fall_desc, getRandom(6000, 9000)));
    };

    const spin_timeline = () => {
      set_timeline_pos({
        x: getRandom(-30, 30),
        y: getRandom(-10, 10),
        rotate: getRandom(-15, 15),
        scale: getRandom(0.95, 1.05)
      });
      timers.push(window.setTimeout(spin_timeline, getRandom(7000, 10000)));
    };

    timers.push(window.setTimeout(chaos_title, 1000));
    timers.push(window.setTimeout(fall_desc, 2000));
    timers.push(window.setTimeout(spin_timeline, 3000));

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [magicMode]);

  const achievements_timeline = [
    {
      year: '2023',
      theme: 'Foundation',
      icon: <Star className="w-5 h-5 sm:w-6 sm:h-6" />,
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
      icon: <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />,
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
      icon: <Crown className="w-5 h-5 sm:w-6 sm:h-6" />,
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

  return (
    <section id="achievements" className="pt-24 pb-24 sm:pt-28 sm:pb-28 bg-white dark:bg-black text-slate-900 dark:text-white relative overflow-x-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.h2
            className="title text-4xl font-bold mb-4 sm:mb-6 text-black dark:text-white"
            animate={magicMode ? { ...title_pos } : {}}
            transition={magicMode ? { duration: 1.5, type: 'spring' } : {}}
            style={{ position: magicMode ? 'relative' : undefined }}
          >
            Achievements
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed px-4"
            animate={magicMode ? { ...desc_pos } : {}}
            transition={magicMode ? { duration: 2, type: 'spring' } : {}}
            style={{ position: magicMode ? 'relative' : undefined }}
          >
            A structured timeline of growth, innovation, and leadership in technology
          </motion.p>
        </motion.div>

        <motion.div
          className="mb-16 sm:mb-20 max-w-5xl mx-auto"
          animate={magicMode ? { ...timeline_pos } : {}}
          transition={magicMode ? { duration: 2, type: 'spring' } : {}}
          style={{ position: magicMode ? 'relative' : undefined }}
        >
         

          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-px h-full bg-black dark:bg-white rounded-full" />

            <div className="space-y-8 lg:space-y-10">
              {achievements_timeline.map((year_data, year_index) => (
                <motion.div
                  key={year_data.year}
                  className="lg:grid lg:grid-cols-2 lg:gap-x-10 items-center"
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + year_index * 0.12 }}
                >
                  <div className={`w-full max-w-[400px] mx-auto ${year_index % 2 === 0 ? 'lg:col-start-2' : 'lg:col-start-1'}`}>
                    <Achievement3DCard
                      year={year_data.year}
                      theme={year_data.theme}
                      icon={year_data.icon}
                      items={year_data.items}
                      index={year_index}
                      in_view={inView}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
