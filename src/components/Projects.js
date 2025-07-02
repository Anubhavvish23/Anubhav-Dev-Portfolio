import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Projects = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    const navigate = useNavigate();
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
    return (_jsxs(_Fragment, { children: [_jsx("style", { children: `
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
      ` }), _jsx("section", { id: "projects", className: "py-20 relative bg-white dark:bg-black text-slate-900 dark:text-white", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs(motion.div, { ref: ref, initial: { opacity: 0, y: 50 }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.8 }, className: "text-center mb-16", children: [_jsx("h2", { className: "title text-4xl font-bold mb-8 text-slate-900 dark:text-white", children: "Projects" }), _jsx("h2", { className: "title text-5xl font-bold mb-6 text-slate-900 dark:text-white", children: "Featured Projects" }), _jsx("p", { className: "text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto", children: "A showcase of my recent work, demonstrating technical skills and creative problem-solving" })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: projects.map((project, index) => (_jsxs(motion.div, { className: `glass rounded-2xl overflow-hidden group cursor-pointer ${project.featured ? 'md:col-span-2 lg:col-span-1' : ''}`, initial: { opacity: 0, y: 50 }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.8, delay: index * 0.1 }, whileHover: {
                                    scale: 1.02,
                                    y: -10,
                                }, layout: true, children: [_jsxs("div", { className: "relative overflow-hidden", children: [_jsx(motion.img, { src: project.image, alt: project.title, className: "w-full h-48 object-cover", whileHover: { scale: 1.1 }, transition: { duration: 0.5 } }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" }), _jsxs(motion.div, { className: "absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300", initial: { scale: 0 }, whileHover: { scale: 1 }, children: [_jsx(motion.a, { href: project.demo, className: "p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-blue-500/50 transition-colors", whileHover: { scale: 1.1, rotate: 360 }, whileTap: { scale: 0.9 }, children: _jsx(Eye, { size: 20 }) }), _jsx(motion.a, { href: project.github, className: "p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-purple-500/50 transition-colors", whileHover: { scale: 1.1, rotate: 360 }, whileTap: { scale: 0.9 }, children: _jsx(Github, { size: 20 }) })] }), project.featured && (_jsx(motion.div, { className: "absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold", animate: { rotate: [0, 5, -5, 0] }, transition: { duration: 2, repeat: Infinity }, children: "Featured" }))] }), _jsxs("div", { className: "p-6", children: [_jsx(motion.h3, { className: "text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:gradient-text transition-all duration-300", whileHover: { x: 5 }, children: project.title }), _jsx("p", { className: "text-slate-600 dark:text-slate-300 mb-4 leading-relaxed", children: project.description }), _jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: project.tags.map((tag, tagIndex) => (_jsx(motion.span, { className: "px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm text-slate-600 dark:text-slate-300", initial: { opacity: 0, scale: 0 }, animate: inView ? { opacity: 1, scale: 1 } : {}, transition: { delay: 0.5 + tagIndex * 0.1 }, whileHover: {
                                                        scale: 1.1,
                                                        backgroundColor: 'rgba(59, 130, 246, 0.1)'
                                                    }, children: tag }, tag))) }), _jsxs("div", { className: "flex gap-3", children: [_jsxs(motion.a, { href: project.demo, className: "flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-blue-700 hover:text-blue-800 transition-all duration-300 text-sm font-medium", whileHover: { scale: 1.05, x: 5 }, whileTap: { scale: 0.95 }, children: [_jsx(ExternalLink, { size: 16 }), "Live Demo"] }), _jsxs(motion.a, { href: project.github, className: "flex items-center gap-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 rounded-lg text-purple-700 hover:text-purple-800 transition-all duration-300 text-sm font-medium", whileHover: { scale: 1.05, x: 5 }, whileTap: { scale: 0.95 }, children: [_jsx(Github, { size: 16 }), "Code"] })] })] })] }, project.title))) }), _jsx(motion.div, { className: "flex justify-center mt-12", initial: { opacity: 0, y: 30 }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.8, delay: 0.8 }, children: _jsxs("button", { className: "animated-button", onClick: () => navigate('/projects-all'), children: [_jsx("svg", { viewBox: "0 0 24 24", className: "arr-2", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" }) }), _jsx("span", { className: "text", children: "View All Projects" }), _jsx("span", { className: "circle" }), _jsx("svg", { viewBox: "0 0 24 24", className: "arr-1", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" }) })] }) })] }) })] }));
};
export default Projects;
