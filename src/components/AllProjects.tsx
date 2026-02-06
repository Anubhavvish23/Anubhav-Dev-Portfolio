import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Eye, Search, X } from 'lucide-react';
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

// Get all unique tags
const allTags = Array.from(new Set(projects.reduce((acc: string[], project) => [...acc, ...project.tags], [])));

interface AllProjectsProps {
  magicMode?: boolean;
}

const AllProjects: React.FC<AllProjectsProps> = ({ magicMode }) => {
  const navigate = useNavigate();
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFeatured, setShowFeatured] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter projects based on selected tags, search query, and featured filter
  useEffect(() => {
    let filtered = projects;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(project =>
        selectedTags.some(tag => project.tags.includes(tag))
      );
    }

    // Filter by featured
    if (showFeatured) {
      filtered = filtered.filter(project => project.featured);
    }

    setFilteredProjects(filtered);
  }, [selectedTags, searchQuery, showFeatured]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSearchQuery('');
    setShowFeatured(false);
  };

  return (
    <section className="relative z-10 py-20 min-h-screen text-white pb-16 dark">
      <div className="all-projects-pattern" />
      <style>{`
        .all-projects-pattern {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          --color: #1e1e1e;
          background-color: #0c0c0c;
          background-image: linear-gradient(
              0deg,
              transparent 24%,
              var(--color) 25%,
              var(--color) 26%,
              transparent 27%,
              transparent 74%,
              var(--color) 75%,
              var(--color) 76%,
              transparent 77%,
              transparent
            ),
            linear-gradient(
              90deg,
              transparent 24%,
              var(--color) 25%,
              var(--color) 26%,
              transparent 27%,
              transparent 74%,
              var(--color) 75%,
              var(--color) 76%,
              transparent 77%,
              transparent
            );
          background-size: 55px 55px;
          z-index: -1;
        }
        button.custom-button {
          --button_radius: 0.75em;
          --button_color: #1e293b;
          --button_outline_color: #ffffff;
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold text-white">All Projects</h2>
          <button 
            onClick={() => {
              console.log('Back to Home button clicked');
           
              try {
                navigate('/#internships');
              } catch (error) {
                console.error('Navigation error:', error);
                window.location.href = '/#internships';
              }
            }} 
            className="custom-button"
          >
            <span className="button_top">Back to Home</span>
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects by title, description, or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-black dark:border-white/20 dark:text-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Featured Toggle */}
            <motion.button
              onClick={() => setShowFeatured(!showFeatured)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                showFeatured
                  ? 'bg-yellow-500 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-black dark:border dark:border-white/10 dark:text-gray-300 dark:hover:border-white/20'
              }`}
              whileHover={magicMode ? { scale: 1.2, rotate: 5 } : { scale: 1.05 }}
              whileTap={magicMode ? { scale: 0.95, rotate: -5 } : { scale: 0.95 }}
            >
              ⭐ Featured Only
            </motion.button>

            {/* Clear Filters */}
            {(selectedTags.length > 0 || searchQuery || showFeatured) && (
              <motion.button
                onClick={clearFilters}
                className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all duration-300"
                whileHover={magicMode ? { scale: 1.2, rotate: 5 } : { scale: 1.05 }}
                whileTap={magicMode ? { scale: 0.95, rotate: -5 } : { scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                Clear Filters
              </motion.button>
            )}
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <motion.button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-black dark:border dark:border-white/10 dark:text-gray-300 dark:hover:border-white/20'
                }`}
                whileHover={magicMode ? { scale: 1.2, rotate: 5 } : { scale: 1.05 }}
                whileTap={magicMode ? { scale: 0.95, rotate: -5 } : { scale: 0.95 }}
              >
                {tag}
              </motion.button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key={`${selectedTags.join(',')}-${searchQuery}-${showFeatured}`}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={`${project.title}-${index}`}
                  className="glass rounded-2xl overflow-hidden group cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={magicMode ? { scale: 1.2, y: -10 } : { scale: 1.02, y: -10 }}
                  layout
                >
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                      whileHover={magicMode ? { scale: 1.2 } : { scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {project.featured && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        ⭐ Featured
                      </div>
                    )}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scale: 0 }}
                      whileHover={magicMode ? { scale: 1.2 } : { scale: 1 }}
                    >
                      <motion.a
                        href={project.demo}
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-blue-500/50 transition-colors"
                        whileHover={magicMode ? { scale: 1.2, rotate: 360 } : { scale: 1.1, rotate: 360 }}
                        whileTap={magicMode ? { scale: 0.95, rotate: -5 } : { scale: 0.95 }}
                      >
                        <Eye size={20} />
                      </motion.a>
                      <motion.a
                        href={project.github}
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-purple-500/50 transition-colors"
                        whileHover={magicMode ? { scale: 1.2, rotate: 360 } : { scale: 1.1, rotate: 360 }}
                        whileTap={magicMode ? { scale: 0.95, rotate: -5 } : { scale: 0.95 }}
                      >
                        <Github size={20} />
                      </motion.a>
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <motion.h3
                      className="text-xl font-bold text-slate-900 mb-3 group-hover:gradient-text transition-all duration-300"
                      whileHover={magicMode ? { x: 5 } : { x: 5 }}
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
                          whileHover={magicMode ? { scale: 1.2, backgroundColor: 'rgba(59, 130, 246, 0.1)' } : { scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <motion.a
                        href={project.demo}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-blue-700 hover:text-blue-800 transition-all duration-300 text-sm font-medium"
                        whileHover={magicMode ? { scale: 1.2, x: 5 } : { scale: 1.05, x: 5 }}
                        whileTap={magicMode ? { scale: 0.95, x: -5 } : { scale: 0.95 }}
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </motion.a>
                      <motion.a
                        href={project.github}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 rounded-lg text-purple-700 hover:text-purple-800 transition-all duration-300 text-sm font-medium"
                        whileHover={magicMode ? { scale: 1.2, x: 5 } : { scale: 1.05, x: 5 }}
                        whileTap={magicMode ? { scale: 0.95, x: -5 } : { scale: 0.95 }}
                      >
                        <Github size={16} />
                        Code
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                No projects found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
              <motion.button
                onClick={clearFilters}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
                whileHover={magicMode ? { scale: 1.2 } : { scale: 1.05 }}
                whileTap={magicMode ? { scale: 0.95 } : { scale: 0.95 }}
              >
                Clear All Filters
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AllProjects;
