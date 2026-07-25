import React, { memo, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { Search, Star, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { scroll_to_id } from '../utils/scroll_to';
import { ease_out } from '../utils/motion';
import ProgressiveImage from './ProgressiveImage';

interface All_projects_props {
  magicMode?: boolean;
}

const projects = [
  {
    title: 'Ai Image Generator',
    description:
      'A image generator with React, Node.js, Express, OpenAI. Features include types of image generations and image ratios.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=900',
    tags: ['React', 'Node.js', 'Express', 'OpenAI'],
    github: 'https://github.com/Anubhavvish23/AI-Image-Genrator',
    demo: 'https://ai-image-genrator-gamma.vercel.app',
    featured: false,
  },
  {
    title: 'Task Management System',
    description:
      'Collaborative task management tool with real-time updates, drag-and-drop functionality, and team collaboration features.',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=900',
    tags: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
    github: '#',
    demo: '#',
    featured: false,
  },
  {
    title: 'AI Chat Application',
    description:
      'Modern chat application with AI integration, real-time messaging, and smart conversation features using OpenAI API.',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=900',
    tags: ['Next.js', 'OpenAI', 'WebSocket', 'Tailwind'],
    github: 'https://github.com/Anubhavvish23/LLama-3-ChatBot',
    demo: 'https://l-ama-3-chat-bot.vercel.app/',
    featured: true,
  },
  {
    title: 'Book Review API',
    description:
      'Full-stack backend system built with FastAPI, PostgreSQL, and Redis to manage and cache book reviews with RESTful APIs.',
    image: 'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=900',
    tags: ['FastAPI', 'PostgreSQL', 'Redis', 'REST API'],
    github: 'https://github.com/Anubhavvish23/Book-Review-FastAPI',
    demo: '',
    featured: false,
  },
  {
    title: 'MediBot: Medical Chat Assistant',
    description:
      'Medical chatbot using LLaMA 2 for health-related queries, designed for quick and conversational medical support.',
    image: 'https://images.pexels.com/photos/1350560/pexels-photo-1350560.jpeg?auto=compress&cs=tinysrgb&w=900',
    tags: ['LLaMA 2', 'Medical AI', 'Chatbot', 'React'],
    github: 'https://github.com/Anubhavvish23/MediBot',
    demo: '',
    featured: false,
  },
  {
    title: 'Sanskrit GPT',
    description:
      'Conversational AI chatbot trained specifically for Sanskrit language comprehension, translation, and interaction.',
    image: 'https://images.pexels.com/photos/577513/pexels-photo-577513.jpeg?auto=compress&cs=tinysrgb&w=900',
    tags: ['OpenAI', 'Next.js', 'Language Model', 'Sanskrit'],
    github: 'https://github.com/Anubhavvish23/Sanskrit-GPT',
    demo: 'https://sanskritgpt-lemon.vercel.app/',
    featured: true,
  },
  {
    title: 'Datasheet AI',
    description:
      'AI-powered Excel assistant that reads your datasheets and provides intelligent insights and answers using OpenAI GPT.',
    image: 'https://images.pexels.com/photos/6813326/pexels-photo-6813326.jpeg?auto=compress&cs=tinysrgb&w=900',
    tags: ['React', 'OpenAI', 'Excel', 'Tailwind'],
    github: 'https://github.com/Anubhavvish23/Excel-AI',
    demo: 'https://excel-ai-five.vercel.app/',
    featured: true,
  },
];

const all_tags = Array.from(new Set(projects.flatMap((project) => project.tags)));

const All_projects: React.FC<All_projects_props> = () => {
  const navigate = useNavigate();
  const [selected_tags, set_selected_tags] = useState<string[]>([]);
  const [search_query, set_search_query] = useState('');
  const [show_featured, set_show_featured] = useState(false);
  const [search_focused, set_search_focused] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered_projects = useMemo(() => {
    let next = projects;

    if (search_query) {
      const query = search_query.toLowerCase();
      next = next.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (selected_tags.length > 0) {
      next = next.filter((project) => selected_tags.some((tag) => project.tags.includes(tag)));
    }

    if (show_featured) {
      next = next.filter((project) => project.featured);
    }

    return next;
  }, [search_query, selected_tags, show_featured]);

  const toggle_tag = (tag: string) => {
    set_selected_tags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    );
  };

  const clear_filters = () => {
    set_selected_tags([]);
    set_search_query('');
    set_show_featured(false);
  };

  const go_to_projects = () => {
    navigate('/');
    const try_scroll = (attempts = 0) => {
      const el = document.getElementById('projects');
      if (el) {
        scroll_to_id('projects');
        return;
      }
      if (attempts < 30) {
        window.setTimeout(() => try_scroll(attempts + 1), 40);
      }
    };
    window.setTimeout(() => try_scroll(), 60);
  };

  const has_filters = selected_tags.length > 0 || search_query.length > 0 || show_featured;

  return (
    <section className="all-projects relative min-h-[100dvh] overflow-hidden bg-[#050505] text-white">
      <div className="editorial-guides pointer-events-none absolute inset-0" aria-hidden>
        {[16.666, 33.333, 50, 66.666, 83.333].map((left) => (
          <span key={left} className="editorial-guide editorial-guide--dark" style={{ left: `${left}%` }} />
        ))}
      </div>

      <div className="all-projects__inner relative z-10 mx-auto max-w-[1440px] px-5 pb-20 pt-28 sm:px-8 sm:pb-24 sm:pt-32 lg:px-12">
        <div className="all-projects__header">
          <div>
            <p className="all-projects__eyebrow">Archive</p>
            <h1 className="all-projects__title">All Projects</h1>
          </div>
          <button
            type="button"
            className="all-projects__back"
            onClick={go_to_projects}
          >
            ← Back
          </button>
        </div>

        <div className={`all-projects__search ${search_focused ? 'is-focused' : ''}`}>
          <Search className="all-projects__search-icon" strokeWidth={1.6} size={18} />
          <input
            type="text"
            value={search_query}
            onChange={(event) => set_search_query(event.target.value)}
            onFocus={() => set_search_focused(true)}
            onBlur={() => set_search_focused(false)}
            placeholder="Search by title, stack, or keyword"
            className="all-projects__search-input"
          />
          {search_query && (
            <button
              type="button"
              className="all-projects__search-clear"
              onClick={() => set_search_query('')}
              aria-label="Clear search"
            >
              <X size={16} strokeWidth={1.8} />
            </button>
          )}
          <span className="all-projects__search-line" />
        </div>

        <div className="all-projects__controls">
          <button
            type="button"
            className={`all-projects__featured ${show_featured ? 'is-active' : ''}`}
            onClick={() => set_show_featured((prev) => !prev)}
          >
            <Star
              size={14}
              strokeWidth={1.8}
              fill={show_featured ? 'currentColor' : 'none'}
            />
            <span>Featured Only</span>
          </button>

          {has_filters && (
            <button type="button" className="all-projects__clear" onClick={clear_filters}>
              Clear Filters
            </button>
          )}
        </div>

        <div className="all-projects__tags-wrap">
          <div className="all-projects__tags">
            {all_tags.map((tag) => {
              const is_active = selected_tags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  className={`all-projects__tag ${is_active ? 'is-active' : ''}`}
                  onClick={() => toggle_tag(tag)}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        <p className="all-projects__count">
          Showing {String(filtered_projects.length).padStart(2, '0')} of{' '}
          {String(projects.length).padStart(2, '0')} projects
        </p>

        <LayoutGroup>
          <AnimatePresence mode="popLayout">
            {filtered_projects.length > 0 ? (
              <motion.div layout className="all-projects__grid">
                {filtered_projects.map((project, index) => {
                  const has_demo = Boolean(project.demo && project.demo !== '#');
                  const has_github = Boolean(project.github && project.github !== '#');

                  return (
                    <motion.article
                      layout
                      key={project.title}
                      className="all-projects__card"
                      initial={{ opacity: 0, scale: 0.94, y: 28 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.92, y: 16 }}
                      transition={{
                        layout: { duration: 0.45, ease: ease_out },
                        opacity: { duration: 0.55, delay: index * 0.08, ease: ease_out },
                        scale: { duration: 0.55, delay: index * 0.08, ease: ease_out },
                        y: { duration: 0.55, delay: index * 0.08, ease: ease_out },
                      }}
                    >
                      <div className="all-projects__card-media">
                        <ProgressiveImage
                          src={project.image}
                          alt={project.title}
                          img_class_name="all-projects__card-image"
                          placeholder_color="#0a0a0a"
                        />
                        <div className="all-projects__card-scrim" />
                        {project.featured && (
                          <span className="all-projects__featured-badge">★ Featured</span>
                        )}
                      </div>

                      <div className="all-projects__card-body">
                        <h2 className="all-projects__card-title">{project.title}</h2>
                        <p className="all-projects__card-desc">{project.description}</p>
                        <p className="all-projects__card-tags">{project.tags.join(' · ')}</p>
                        <div className="all-projects__card-links">
                          {has_github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="all-projects__card-link ui-link-underline"
                            >
                              Code
                            </a>
                          )}
                          {has_demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="all-projects__card-pill ui-pill-arrow"
                            >
                              Demo <span className="ui-pill-arrow__glyph" aria-hidden>→</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className="all-projects__empty"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: ease_out }}
              >
                <p className="all-projects__empty-title">No projects found</p>
                <p className="all-projects__empty-copy">
                  Try adjusting your search or filter criteria.
                </p>
                <button type="button" className="all-projects__back" onClick={clear_filters}>
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  );
};

export default memo(All_projects);
