import React, { memo, startTransition, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useActiveSection } from '../hooks/useActiveSection';
import { force_scroll_to_id } from '../utils/scroll_to';

const Navigation = () => {
  const [is_open, set_is_open] = useState(false);
  const [past_hero, set_past_hero] = useState(false);
  const [hide_nav, set_hide_nav] = useState(false);
  const last_scroll_y = useRef(0);
  const raf_id = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();
  const is_home_page = location.pathname === '/';
  const active_section = useActiveSection(is_home_page);
  const use_solid_nav = !is_home_page || past_hero || is_open;

  const get_section_id = (href: string) => (href.startsWith('#') ? href.slice(1) : 'home');

  const is_item_active = (href: string) => {
    if (!is_home_page) return false;
    return get_section_id(href) === active_section;
  };

  useEffect(() => {
    const update_nav_state = () => {
      const hero = document.getElementById('home');
      const hero_bottom = hero
        ? hero.getBoundingClientRect().bottom
        : window.innerHeight;
      const scrolled_past = is_home_page ? hero_bottom <= 64 : true;
      const y = window.scrollY;
      const should_hide = y > last_scroll_y.current && y > 120 && !is_open;

      startTransition(() => {
        set_past_hero(scrolled_past);
        set_hide_nav(should_hide);
      });

      last_scroll_y.current = y;
    };

    const on_scroll = () => {
      cancelAnimationFrame(raf_id.current);
      raf_id.current = requestAnimationFrame(update_nav_state);
    };

    update_nav_state();
    window.addEventListener('scroll', on_scroll, { passive: true });
    window.addEventListener('resize', on_scroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf_id.current);
      window.removeEventListener('scroll', on_scroll);
      window.removeEventListener('resize', on_scroll);
    };
  }, [is_home_page, is_open]);

  const go_to_hash = (href: string) => {
    force_scroll_to_id(href.replace('#', ''));
  };

  const nav_items = [
    { name: 'About Me', href: '#about' },
    { name: 'Projects', href: '#projects' },
  ];

  const link_class = (href: string) => {
    const is_active = is_item_active(href);
    return `relative text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors duration-300 ${
      is_active
        ? 'text-white'
        : 'text-white/80 hover:text-white'
    }`;
  };

  return (
    <motion.nav
      className={`nav-editorial ${
        use_solid_nav ? 'nav-editorial--solid' : 'nav-editorial--transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: is_open ? 0 : hide_nav ? -100 : 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nav-editorial__surface" aria-hidden />
      <div className="nav-editorial__bar">
        <motion.a
          href={is_home_page ? '#home' : '/'}
          onClick={(e) => {
            if (is_home_page) {
              e.preventDefault();
              go_to_hash('#home');
            } else {
              e.preventDefault();
              navigate('/');
            }
          }}
          className="nav-editorial__logo text-white transition-colors duration-[250ms] ease-out"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          AV
        </motion.a>

        <div className="nav-editorial__links">
          {nav_items.map((item, index) => {
            const is_active = is_item_active(item.href);
            return (
              <motion.a
                key={item.name}
                href={is_home_page ? item.href : `/${item.href}`}
                aria-current={is_active ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  if (!is_home_page) {
                    navigate(`/${item.href}`);
                    return;
                  }
                  go_to_hash(item.href);
                  window.setTimeout(() => {
                    (document.activeElement as HTMLElement | null)?.blur?.();
                  }, 300);
                }}
                className={link_class(item.href)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 right-0 h-px origin-left bg-white transition-transform duration-300 ${
                    is_active ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </motion.a>
            );
          })}

          <motion.a
            href={is_home_page ? '#contact' : '/#contact'}
            onClick={(e) => {
              e.preventDefault();
              if (!is_home_page) {
                navigate('/#contact');
                return;
              }
              go_to_hash('#contact');
            }}
            className="nav-editorial__cta ui-pill-arrow inline-flex items-center rounded-sm border border-white/70 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-[250ms] ease-out hover:bg-white hover:text-[#0B4C8C]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Me <span className="ui-pill-arrow__glyph" aria-hidden>→</span>
          </motion.a>
        </div>

        <motion.button
          type="button"
          className="inline-flex items-center justify-center text-white md:hidden transition-colors duration-[250ms]"
          onClick={() => set_is_open(!is_open)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label={is_open ? 'Close menu' : 'Open menu'}
        >
          {is_open ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {is_open && (
          <motion.div
            className="border-t border-slate-200 bg-white text-slate-900 shadow-lg md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <div className="space-y-1 px-5 py-4">
              {nav_items.map((item, index) => {
                const is_active = is_item_active(item.href);
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    aria-current={is_active ? 'page' : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      set_is_open(false);
                      if (!is_home_page) {
                        navigate(`/${item.href}`);
                        return;
                      }
                      go_to_hash(item.href);
                    }}
                    className={`block py-3 text-[12px] font-semibold uppercase tracking-[0.2em] transition-colors ${
                      is_active
                        ? 'text-slate-900 border-l-2 border-slate-900 pl-3'
                        : 'text-slate-600 hover:text-slate-900 pl-3 border-l-2 border-transparent'
                    }`}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.name}
                  </motion.a>
                );
              })}
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  set_is_open(false);
                  if (!is_home_page) {
                    navigate('/#contact');
                    return;
                  }
                  go_to_hash('#contact');
                }}
                className="mt-2 ui-pill-arrow inline-flex w-full items-center justify-center border border-slate-900 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-900"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Contact Me <span className="ui-pill-arrow__glyph" aria-hidden>→</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default memo(Navigation);
