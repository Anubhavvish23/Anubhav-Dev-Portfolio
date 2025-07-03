import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Users, Star, TrendingUp, Eye, Github, Globe } from 'lucide-react';

interface Stat {
  id: string;
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const ProjectStats: React.FC = () => {
  const [stats, setStats] = useState<Stat[]>([
    {
      id: 'projects',
      label: 'Projects Built',
      value: 7,
      icon: <Code className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      description: 'Full-stack applications'
    },
    {
      id: 'technologies',
      label: 'Technologies',
      value: 12,
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      description: 'Modern tech stack'
    },
    {
      id: 'experience',
      label: 'Years Experience',
      value: 3,
      icon: <Star className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-500',
      description: 'Professional development'
    },
    {
      id: 'certifications',
      label: 'Certifications',
      value: 7,
      icon: <Users className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      description: 'Industry recognized'
    }
  ]);

  const [showDetails, setShowDetails] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);

  const projectMetrics = [
    { name: 'AI Image Generator', views: 1250, stars: 45, forks: 12 },
    { name: 'Sanskrit GPT', views: 890, stars: 32, forks: 8 },
    { name: 'Datasheet AI', views: 2100, stars: 67, forks: 15 },
    { name: 'MediBot', views: 750, stars: 28, forks: 6 },
    { name: 'Book Review API', views: 680, stars: 23, forks: 5 },
    { name: 'Task Management', views: 950, stars: 41, forks: 9 },
    { name: 'AI Chat App', views: 1800, stars: 58, forks: 13 }
  ];

  const totalViews = projectMetrics.reduce((sum, project) => sum + project.views, 0);
  const totalStars = projectMetrics.reduce((sum, project) => sum + project.stars, 0);
  const totalForks = projectMetrics.reduce((sum, project) => sum + project.forks, 0);

  return (
    <>
      {/* Floating Stats Counter */}
      <motion.div
        className="fixed bottom-4 left-4 z-[9999] bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Portfolio Stats</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Click to view details</p>
          </div>
        </div>
      </motion.div>

      {/* Detailed Stats Modal */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            className="fixed inset-0 z-[10000] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio Analytics</h2>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Key Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {stats.map((stat) => (
                    <motion.div
                      key={stat.id}
                      className="glass rounded-xl p-4 text-center"
                      whileHover={{ scale: 1.05, y: -5 }}
                      onHoverStart={() => setHoveredStat(stat.id)}
                      onHoverEnd={() => setHoveredStat(null)}
                    >
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} text-white flex items-center justify-center mx-auto mb-3`}>
                        {stat.icon}
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {stat.value}+
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                        {stat.label}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {stat.description}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Project Performance */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Project Performance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="glass rounded-xl p-4 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Eye className="w-5 h-5 text-blue-500" />
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{totalViews.toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Total Views</p>
                    </div>
                    <div className="glass rounded-xl p-4 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{totalStars}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">GitHub Stars</p>
                    </div>
                    <div className="glass rounded-xl p-4 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Github className="w-5 h-5 text-purple-500" />
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{totalForks}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Repository Forks</p>
                    </div>
                  </div>
                </div>

                {/* Project Breakdown */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Individual Project Stats</h3>
                  <div className="space-y-3">
                    {projectMetrics.map((project, index) => (
                      <motion.div
                        key={project.name}
                        className="glass rounded-lg p-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{project.name}</h4>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4 text-blue-500" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">{project.views}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">{project.stars}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Github className="w-4 h-4 text-purple-500" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">{project.forks}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900 dark:text-white">
                              {Math.round((project.views / totalViews) * 100)}%
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">of total views</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectStats; 