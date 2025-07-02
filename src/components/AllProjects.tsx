import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
    title: "Task Management System",
    description: "Collaborative task management tool with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["React", "Socket.io", "Express", "PostgreSQL"],
    github: "#",
    demo: "#",
    featured: false
  },
  {
    title: "AI Chat Application",
    description: "Modern chat application with AI integration, real-time messaging, and smart conversation features using OpenAI API.",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["Next.js", "OpenAI", "WebSocket", "Tailwind"],
    github: "https://github.com/Anubhavvish23/LLama-3-ChatBot",
    demo: "https://l-ama-3-chat-bot.vercel.app/",
    featured: true
  },
  {
    title: "Book Review API",
    description: "Full-stack backend system built with FastAPI, PostgreSQL, and Redis to manage and cache book reviews with RESTful APIs.",
    image: "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["FastAPI", "PostgreSQL", "Redis", "REST API"],
    github: "https://github.com/Anubhavvish23/Book-Review-FastAPI",
    demo: "",
    featured: false
  },
  {
    title: "MediBot: Medical Chat Assistant",
    description: "Medical chatbot using LLaMA 2 for health-related queries, designed for quick and conversational medical support.",
    image: "https://images.pexels.com/photos/1350560/pexels-photo-1350560.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["LLaMA 2", "Medical AI", "Chatbot", "React"],
    github: "https://github.com/Anubhavvish23/MediBot",
    demo: "",
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

const AllProjects = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 min-h-screen bg-white dark:bg-slate-900">
      <style>{`
        button.custom-button {
          --button_radius: 0.75em;
          --button_color: #e8e8e8;
          --button_outline_color: #000000;
          font-size: 17px;
          font-weight: bold;
          border: none;
          cursor: pointer;
          border-radius: var(--button_radius);
          background: var(--button_outline_color);
        }
        .custom-button .button_top {
          display: block;
          box-sizing: border-box;
          border: 2px solid var(--button_outline_color);
          border-radius: var(--button_radius);
          padding: 0.75em 1.5em;
          background: var(--button_color);
          color: var(--button_outline_color);
          transform: translateY(-0.2em);
          transition: transform 0.1s ease;
        }
        .custom-button:hover .button_top {
          transform: translateY(-0.33em);
        }
        .custom-button:active .button_top {
          transform: translateY(0);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold">All Projects</h2>
          <button onClick={() => navigate('/')} className="custom-button">
            <span className="button_top">Back to Home</span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="glass rounded-2xl overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -10 }}
              layout
            >
              <div className="relative overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                >
                  <motion.a
                    href={project.demo}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-blue-500/50 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Eye size={20} />
                  </motion.a>
                  <motion.a
                    href={project.github}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-purple-500/50 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github size={20} />
                  </motion.a>
                </motion.div>
              </div>
              <div className="p-6">
                <motion.h3
                  className="text-xl font-bold text-slate-900 mb-3 group-hover:gradient-text transition-all duration-300"
                  whileHover={{ x: 5 }}
                >
                  {project.title}
                </motion.h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tag}
                      className="px-3 py-1 bg-slate-100 rounded-full text-sm text-slate-600"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + tagIndex * 0.1 }}
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <motion.a
                    href={project.demo}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-blue-700 hover:text-blue-800 transition-all duration-300 text-sm font-medium"
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </motion.a>
                  <motion.a
                    href={project.github}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 rounded-lg text-purple-700 hover:text-purple-800 transition-all duration-300 text-sm font-medium"
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={16} />
                    Code
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProjects;
