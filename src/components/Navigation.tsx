import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useActiveSection } from '../hooks/useActiveSection';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const active_section = useActiveSection(isHomePage);

  const get_section_id = (href: string) => (href.startsWith('#') ? href.slice(1) : 'home');

  const is_item_active = (href: string) => {
    if (!isHomePage) return false;
    return get_section_id(href) === active_section;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (window.scrollY > lastScrollY.current && window.scrollY > 80) {
        setHideNav(true);
      } else {
        setHideNav(false);
      }
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: isHomePage ? '#home' : '/', isExternal: !isHomePage },
    { name: 'About', href: '#about', isExternal: false },
    { name: 'Skills', href: '#skills', isExternal: false },
    { name: 'Projects', href: '#projects', isExternal: false },
    { name: 'Achievements', href: '#achievements', isExternal: false },
    { name: 'Contact', href: '#contact', isExternal: false },
  ];

  const nav_link_class = (href: string) => {
    const is_active = is_item_active(href);
    return `relative transition-colors duration-300 ${
      is_active
        ? 'text-slate-900 dark:text-white font-semibold'
        : 'text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white'
    }`;
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white dark:bg-black text-slate-900 dark:text-white ${scrolled ? 'shadow-lg' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: isOpen ? 0 : hideNav ? -100 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div
            className="text-2xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item, index) => {
              const is_active = is_item_active(item.href);
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  aria-current={is_active ? 'page' : undefined}
                  onClick={(e) => {
                    if (item.isExternal) {
                      e.preventDefault();
                      navigate(item.href);
                    } else if (item.href.startsWith('#')) {
                      window.setTimeout(() => {
                        (document.activeElement as HTMLElement | null)?.blur?.();
                      }, 300);
                    }
                  }}
                  className={nav_link_class(item.href)}
                  whileHover={{ scale: is_active ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-slate-900 dark:bg-white origin-left transition-transform duration-300 ${
                      is_active ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </motion.a>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-slate-900 dark:text-white"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white dark:bg-black text-slate-900 dark:text-white shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item, index) => {
                const is_active = is_item_active(item.href);
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    aria-current={is_active ? 'page' : undefined}
                    onClick={(e) => {
                      setIsOpen(false);
                      if (item.isExternal) {
                        e.preventDefault();
                        navigate(item.href);
                      } else if (item.href.startsWith('#')) {
                        window.setTimeout(() => {
                          (document.activeElement as HTMLElement | null)?.blur?.();
                        }, 300);
                      }
                    }}
                    className={`block transition-colors duration-300 ${
                      is_active
                        ? 'text-slate-900 dark:text-white font-semibold border-l-2 border-slate-900 dark:border-white pl-3'
                        : 'text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white pl-3 border-l-2 border-transparent'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: is_active ? 0 : 6 }}
                  >
                    {item.name}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;