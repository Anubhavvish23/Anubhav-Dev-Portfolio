import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProjectsProps {
  magicMode?: boolean;
}

const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

const Projects: React.FC<ProjectsProps> = ({ magicMode }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const navigate = useNavigate();

  // Enhanced Chaotic Magic Mode state
  const [titlePos, setTitlePos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const [descPos, setDescPos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const [projectsContainerPos, setProjectsContainerPos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const [viewAllBtnPos, setViewAllBtnPos] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });

  useEffect(() => {
    if (!magicMode) {
      setTitlePos({ x: 0, y: 0, rotate: 0, scale: 1 });
      setDescPos({ x: 0, y: 0, rotate: 0, scale: 1 });
      setProjectsContainerPos({ x: 0, y: 0, rotate: 0, scale: 1 });
      setViewAllBtnPos({ x: 0, y: 0, rotate: 0, scale: 1 });
      return;
    }

    let timers: number[] = [];

    // Optimized chaotic animations with reduced frequency
    const chaosTitle = () => {
      setTitlePos({
        x: getRandom(-40, 40),
        y: getRandom(-20, 20),
        rotate: getRandom(-15, 15),
        scale: getRandom(0.95, 1.05)
      });
      timers.push(window.setTimeout(chaosTitle, getRandom(5000, 8000)));
    };

    const fallDesc = () => {
      setDescPos({
        x: getRandom(-30, 30),
        y: getRandom(-10, 10),
        rotate: getRandom(-8, 8),
        scale: getRandom(0.95, 1.05)
      });
      timers.push(window.setTimeout(fallDesc, getRandom(6000, 9000)));
    };

    const spinProjectsContainer = () => {
      setProjectsContainerPos({
        x: getRandom(-25, 25),
        y: getRandom(-8, 8),
        rotate: getRandom(-10, 10),
        scale: getRandom(0.98, 1.02)
      });
      timers.push(window.setTimeout(spinProjectsContainer, getRandom(7000, 10000)));
    };

    const bounceViewAllBtn = () => {
      setViewAllBtnPos({
        x: getRandom(-20, 20),
        y: getRandom(-5, 5),
        rotate: getRandom(-8, 8),
        scale: getRandom(0.95, 1.05)
      });
      timers.push(window.setTimeout(bounceViewAllBtn, getRandom(8000, 11000)));
    };

    // Start animations with staggered delays
    timers.push(window.setTimeout(chaosTitle, 1000));
    timers.push(window.setTimeout(fallDesc, 2000));
    timers.push(window.setTimeout(spinProjectsContainer, 3000));
    timers.push(window.setTimeout(bounceViewAllBtn, 4000));

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [magicMode]);

  // Continuous rotation for extra chaos
  const continuousRotate = magicMode ? {
    rotate: [0, 360],
    transition: { duration: 12, repeat: Infinity, ease: "linear" }
  } : {};

  const projects = [
    {
      title: "Ai Image Generator",
      description: "a Image Generator with React, Node.js, Express, OpenAI. Features include types of image generations ,Image ratios",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: ["React", "Node.js", "Express", "OpenAI"],
      github: "https://github.com/Anubhavvish23/AI-Image-Genrator",
      demo: "https://ai-image-genrator-gamma.vercel.app",
      featured: false
    },
    {
      title: "Sanskrit GPT",
      description: "Conversational AI chatbot trained specifically for Sanskrit language comprehension, translation, and interaction.",
      image: "https://images.pexels.com/photos/577513/pexels-photo-577513.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: ["OpenAI", "Next.js", "Language Model", "Sanskrit"],
      github: "https://github.com/Anubhavvish23/Sanskrit-GPT",
      demo: "https://sanskritgpt-lemon.vercel.app/",
      featured: true
    },
  
    {
    title: "Datasheet AI",
    description: "AI-powered Excel assistant that reads your datasheets and provides intelligent insights and answers using OpenAI GPT.",
    image: "https://images.pexels.com/photos/6813326/pexels-photo-6813326.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["React", "OpenAI", "Excel", "Tailwind"],
    github: "https://github.com/Anubhavvish23/Excel-AI",
    demo: "https://excel-ai-five.vercel.app/",
    featured: true
  }
  ];

  return (
    <>
      <style>{`
        .animated-button {
          position: relative;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 16px 36px;
          border: 4px solid;
          border-color: transparent;
          font-size: 16px;
          background-color: inherit;
          border-radius: 100px;
          font-weight: 600;
          color: #000000;
          box-shadow: 0 0 0 2px #000000;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          z-index: 10;
        }

        .animated-button svg {
          position: absolute;
          width: 24px;
          fill: #000000;
          z-index: 9;
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .animated-button .arr-1 {
          right: 16px;
        }

        .animated-button .arr-2 {
          left: -25%;
        }

        .animated-button .circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          background-color: #000000;
          border-radius: 50%;
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .animated-button .text {
          position: relative;
          z-index: 1;
          transform: translateX(-12px);
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .animated-button:hover {
          box-shadow: 0 0 0 12px transparent;
          color: #ffffff;
          border-radius: 12px;
        }

        .animated-button:hover .arr-1 {
          right: -25%;
        }

        .animated-button:hover .arr-2 {
          left: 16px;
        }

        .animated-button:hover .text {
          transform: translateX(12px);
        }

        .animated-button:hover svg {
          fill: #ffffff;
        }

        .animated-button:active {
          scale: 0.95;
          box-shadow: 0 0 0 4px #000000;
        }

        .animated-button:hover .circle {
          width: 220px;
          height: 220px;
          opacity: 1;
        }
      `}</style>

      <section id="projects" className="py-20 relative bg-white dark:bg-black text-slate-900 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2
              className="title text-5xl font-bold text-slate-900 dark:text-white"
              animate={magicMode ? { ...titlePos } : {}}
              transition={magicMode ? { duration: 1.5, type: 'spring' } : {}}
              style={{ position: magicMode ? 'relative' : undefined }}
            >
              Featured Projects
            </motion.h2>
            <motion.p
              className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
              animate={magicMode ? { ...descPos } : {}}
              transition={magicMode ? { duration: 2, type: 'spring' } : {}}
              style={{ position: magicMode ? 'relative' : undefined }}
            >
              A showcase of my recent work, demonstrating technical skills and creative problem-solving
            </motion.p>
          </motion.div>

          <motion.div
            animate={magicMode ? { ...projectsContainerPos } : {}}
            transition={magicMode ? { duration: 2, type: 'spring' } : {}}
            style={{ position: magicMode ? 'relative' : undefined }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                whileHover={magicMode ? { 
                  scale: 1.1, 
                  rotate: getRandom(-10, 10),
                  y: -10 
                } : { 
                  scale: 1.02, 
                  y: -5 
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    animate={magicMode ? continuousRotate : {}}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500" />
                </div>
                
                <div className="p-6">
                  <motion.h3 
                    className="text-xl font-bold mb-2 text-slate-900 dark:text-white"
                    whileHover={magicMode ? { scale: 1.1, rotate: 5 } : {}}
                  >
                    {project.title}
                  </motion.h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm rounded-full"
                        whileHover={magicMode ? { scale: 1.2, rotate: 10 } : { scale: 1.05 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors"
                      whileHover={magicMode ? { scale: 1.2, rotate: 15 } : { scale: 1.05 }}
                      whileTap={magicMode ? { scale: 0.8, rotate: -15 } : { scale: 0.95 }}
                    >
                      <Github size={16} />
                      Code
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      whileHover={magicMode ? { scale: 1.2, rotate: 15 } : { scale: 1.05 }}
                      whileTap={magicMode ? { scale: 0.8, rotate: -15 } : { scale: 0.95 }}
                    >
                      <Eye size={16} />
                      Demo
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center"
            style={{ position: 'relative', zIndex: 20 }}
          >
            <motion.button
              onClick={() => {
                console.log('View All Projects button clicked - before navigate');
                navigate('/all-projects', { replace: false });
                console.log('View All Projects button clicked - after navigate');
              }}
              className="animated-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="arr-1" viewBox="0 0 24 24">
                <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"></path>
              </svg>
              <svg className="arr-2" viewBox="0 0 24 24">
                <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"></path>
              </svg>
              <span className="circle"></span>
              <span className="text">View All Projects</span>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Projects;