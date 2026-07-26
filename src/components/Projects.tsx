import React, { memo, useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { get_lenis, FORCE_NAV_EVENT } from '../utils/scroll_to';
import { motion_stagger } from '../utils/motion';
import ProgressiveImage from './ProgressiveImage';
import Reveal from './Reveal';

interface Projects_props {
  magicMode?: boolean;
}

const featured_projects = [
  {
    title: 'AI Image Generator',
    description:
      'Generate images with React, Node, Express and OpenAI — ratios, styles, and prompt craft in one flow.',
    image: '/project-ai-image-generator.jpg',
    tags: ['React', 'Node.js', 'Express', 'OpenAI'],
    github: 'https://github.com/Anubhavvish23/AI-Image-Genrator',
    demo: 'https://ai-image-genrator-gamma.vercel.app',
  },
  {
    title: 'Sanskrit GPT',
    description:
      'Conversational AI trained for Sanskrit comprehension, translation, and quiet linguistic detail.',
    image: 'https://images.pexels.com/photos/577513/pexels-photo-577513.jpeg?auto=compress&cs=tinysrgb&w=1600',
    tags: ['OpenAI', 'Next.js', 'Language Model'],
    github: 'https://github.com/Anubhavvish23/Sanskrit-GPT',
    demo: 'https://sanskritgpt-lemon.vercel.app/',
  },
  {
    title: 'Datasheet AI',
    description:
      'An Excel assistant that reads datasheets and answers with structured insight through GPT.',
    image: '/project-datasheet-ai.jpg',
    tags: ['React', 'OpenAI', 'Excel', 'Tailwind'],
    github: 'https://github.com/Anubhavvish23/Excel-AI',
    demo: 'https://excel-ai-five.vercel.app/',
  },
  {
    title: 'AI Chat Application',
    description:
      'Modern chat with AI integration, real-time messaging, and smart conversation features using the OpenAI API.',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1600',
    tags: ['Next.js', 'OpenAI', 'WebSocket', 'Tailwind'],
    github: 'https://github.com/Anubhavvish23/LLama-3-ChatBot',
    demo: 'https://l-ama-3-chat-bot.vercel.app/',
  },
];

const wheel_resistance = 2.35;

const Project_slide = ({
  project,
  index,
  total_slides,
  progress,
}: {
  project: (typeof featured_projects)[number];
  index: number;
  total_slides: number;
  progress: MotionValue<number>;
}) => {
  const center = (index + 0.5) / total_slides;

  const opacity = useTransform(progress, [center - 0.22, center - 0.06, center + 0.06, center + 0.22], [0.4, 1, 1, 0.4]);
  const scale = useTransform(progress, [center - 0.22, center - 0.06, center + 0.06, center + 0.22], [0.92, 1, 1, 0.94]);
  const copy_opacity = useTransform(progress, [center - 0.14, center - 0.04, center + 0.08, center + 0.18], [0, 1, 1, 0]);
  const copy_y = useTransform(progress, [center - 0.14, center - 0.04], [28, 0]);

  const is_external_demo = project.demo.startsWith('http');

  return (
    <motion.article className="projects-hs__slide" style={{ opacity, scale }}>
      <div className="projects-hs__media">
        <ProgressiveImage
          src={project.image}
          alt={project.title}
          img_class_name="projects-hs__image"
          placeholder_color="#0a0a0a"
        />
        <div className="projects-hs__scrim" />
        <div className="projects-hs__glow" aria-hidden />
      </div>

      <motion.div className="projects-hs__copy" style={{ opacity: copy_opacity, y: copy_y }}>
        <p className="projects-hs__slide-index">{String(index + 1).padStart(2, '0')}</p>
        <h3 className="projects-hs__project-title">{project.title}</h3>
        <p className="projects-hs__project-desc">{project.description}</p>
        <p className="projects-hs__tags">{project.tags.join(' · ')}</p>
        <div className="projects-hs__links">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="projects-hs__link ui-link-underline"
          >
            Code
          </a>
          <a
            href={project.demo}
            target={is_external_demo ? '_blank' : undefined}
            rel={is_external_demo ? 'noopener noreferrer' : undefined}
            className="projects-hs__pill ui-pill-arrow"
          >
            Demo <span className="ui-pill-arrow__glyph" aria-hidden>→</span>
          </a>
        </div>
      </motion.div>
    </motion.article>
  );
};

type Lenis_control = {
  stop: () => void;
  start: () => void;
  scrollTo: (target: number | string | HTMLElement, opts?: object) => void;
};

const Projects: React.FC<Projects_props> = () => {
  const section_ref = useRef<HTMLElement>(null);
  const track_ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [scroll_distance, set_scroll_distance] = useState(0);
  const [active_index, set_active_index] = useState(0);
  const [is_locked, set_is_locked] = useState(false);
  const [is_narrow, set_is_narrow] = useState(false);

  const progress = useMotionValue(0);
  const progress_ref = useRef(0);
  const distance_ref = useRef(0);
  const mode_ref = useRef<'free' | 'horizontal'>('free');
  const touch_start_y = useRef(0);
  const release_armed_ref = useRef(false);
  const nav_bypass_until_ref = useRef(0);

  const slide_count = featured_projects.length + 1;
  const x = useTransform(progress, (value) => -value * Math.max(1, scroll_distance));
  const progress_width = useTransform(progress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const sync_narrow = () => set_is_narrow(window.innerWidth < 768);
    sync_narrow();
    window.addEventListener('resize', sync_narrow);
    return () => window.removeEventListener('resize', sync_narrow);
  }, []);

  useEffect(() => {
    const measure = () => {
      if (!track_ref.current) return;
      const distance = Math.max(1, track_ref.current.scrollWidth - window.innerWidth);
      distance_ref.current = distance;
      set_scroll_distance(distance);
    };

    measure();
    window.addEventListener('resize', measure);
    const timeout_id = window.setTimeout(measure, 160);
    return () => {
      window.removeEventListener('resize', measure);
      window.clearTimeout(timeout_id);
    };
  }, []);

  useMotionValueEvent(progress, 'change', (value) => {
    progress_ref.current = value;
    const next_index = Math.min(
      featured_projects.length - 1,
      Math.max(0, Math.floor(value * featured_projects.length))
    );
    set_active_index((prev) => (prev === next_index ? prev : next_index));

    if (value < 0.98) {
      release_armed_ref.current = false;
    }
  });

  useEffect(() => {
    const on_force_nav = () => {
      nav_bypass_until_ref.current = Date.now() + 1200;
      mode_ref.current = 'free';
      set_is_locked(false);
      release_armed_ref.current = false;
      document.documentElement.classList.remove('projects-hs-locked');
      get_lenis()?.start?.();
    };

    window.addEventListener(FORCE_NAV_EVENT, on_force_nav);
    return () => window.removeEventListener(FORCE_NAV_EVENT, on_force_nav);
  }, []);

  useEffect(() => {
    if (!is_narrow) return;

    const section = section_ref.current;
    if (!section) return;

    mode_ref.current = 'free';
    set_is_locked(false);
    document.documentElement.classList.remove('projects-hs-locked');
    get_lenis()?.start?.();

    const update_from_scroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
      const next = Math.min(1, Math.max(0, -rect.top / scrollable));
      progress_ref.current = next;
      progress.set(next);
    };

    update_from_scroll();
    window.addEventListener('scroll', update_from_scroll, { passive: true });
    window.addEventListener('resize', update_from_scroll);

    const lenis = get_lenis();
    lenis?.on?.('scroll', update_from_scroll);

    return () => {
      window.removeEventListener('scroll', update_from_scroll);
      window.removeEventListener('resize', update_from_scroll);
      lenis?.off?.('scroll', update_from_scroll);
    };
  }, [is_narrow, progress]);

  useEffect(() => {
    if (is_narrow) return;

    const section = section_ref.current;
    if (!section) return;

    const get_lenis_control = () => get_lenis() as Lenis_control | undefined;

    const snap_section_to_top = () => {
      const lenis = get_lenis_control();
      const top = section.getBoundingClientRect().top + window.scrollY;
      if (lenis) {
        lenis.scrollTo(top, { immediate: true });
      } else {
        window.scrollTo(0, top);
      }
    };

    const enter_horizontal = () => {
      if (mode_ref.current === 'horizontal') {
        snap_section_to_top();
        return;
      }
      mode_ref.current = 'horizontal';
      set_is_locked(true);
      snap_section_to_top();
      get_lenis_control()?.stop();
      document.documentElement.classList.add('projects-hs-locked');
    };

    const exit_horizontal = (direction: 'up' | 'down') => {
      if (mode_ref.current !== 'horizontal') return;
      mode_ref.current = 'free';
      set_is_locked(false);
      release_armed_ref.current = false;
      document.documentElement.classList.remove('projects-hs-locked');

      const lenis = get_lenis_control();
      lenis?.start();

      const nudge = direction === 'down' ? 64 : -64;
      const next_y = window.scrollY + nudge;
      if (lenis) {
        lenis.scrollTo(next_y, { duration: 0.55 });
      } else {
        window.scrollTo({ top: next_y, behavior: 'smooth' });
      }
    };

    const apply_delta = (delta_y: number) => {
      const distance = Math.max(1, distance_ref.current * wheel_resistance);
      const current = progress_ref.current;

      if (current <= 0.001 && delta_y < 0) {
        exit_horizontal('up');
        return;
      }

      if (current >= 0.995 && delta_y > 0) {
        if (!release_armed_ref.current) {
          release_armed_ref.current = true;
          progress_ref.current = 1;
          progress.set(1);
          return;
        }
        exit_horizontal('down');
        return;
      }

      const next = Math.min(1, Math.max(0, current + delta_y / distance));
      progress_ref.current = next;
      progress.set(next);
    };

    const section_in_capture_zone = (delta_y: number) => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      if (delta_y > 0) {
        return rect.top <= 80 && rect.top >= -vh * 0.55 && progress_ref.current < 0.995;
      }

      return (
        rect.bottom >= vh - 80 &&
        rect.top <= 80 &&
        progress_ref.current > 0.005
      );
    };

    const on_wheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;
      if (Date.now() < nav_bypass_until_ref.current) return;

      if (mode_ref.current === 'free') {
        if (section_in_capture_zone(event.deltaY)) {
          event.preventDefault();
          event.stopPropagation();
          enter_horizontal();
          apply_delta(event.deltaY);
        }
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      snap_section_to_top();
      apply_delta(event.deltaY);
    };

    const on_touch_start = (event: TouchEvent) => {
      touch_start_y.current = event.touches[0]?.clientY ?? 0;
    };

    const on_touch_move = (event: TouchEvent) => {
      if (Date.now() < nav_bypass_until_ref.current) return;

      const current_y = event.touches[0]?.clientY ?? 0;
      const delta_y = touch_start_y.current - current_y;
      touch_start_y.current = current_y;

      if (mode_ref.current === 'free') {
        if (Math.abs(delta_y) > 4 && section_in_capture_zone(delta_y)) {
          event.preventDefault();
          enter_horizontal();
          apply_delta(delta_y * 1.35);
        }
        return;
      }

      event.preventDefault();
      snap_section_to_top();
      apply_delta(delta_y * 1.35);
    };

    const on_scroll = () => {
      if (Date.now() < nav_bypass_until_ref.current) return;

      if (mode_ref.current !== 'horizontal') {
        const rect = section.getBoundingClientRect();
        if (progress_ref.current < 0.995 && rect.top < -24 && rect.top > -window.innerHeight * 0.7) {
          enter_horizontal();
        }
        return;
      }
      snap_section_to_top();
    };

    window.addEventListener('wheel', on_wheel, { passive: false, capture: true });
    window.addEventListener('touchstart', on_touch_start, { passive: true, capture: true });
    window.addEventListener('touchmove', on_touch_move, { passive: false, capture: true });
    window.addEventListener('scroll', on_scroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', on_wheel, true);
      window.removeEventListener('touchstart', on_touch_start, true);
      window.removeEventListener('touchmove', on_touch_move, true);
      window.removeEventListener('scroll', on_scroll);
      document.documentElement.classList.remove('projects-hs-locked');
      get_lenis_control()?.start();
      mode_ref.current = 'free';
      set_is_locked(false);
    };
  }, [is_narrow, progress]);

  return (
    <section
      ref={section_ref}
      id="projects"
      className={`projects-hs relative bg-[#050505] text-white scroll-mt-20 ${is_locked ? 'is-locked' : ''} ${is_narrow ? 'is-mobile-scrub' : ''}`}
    >
      <div className="projects-hs__sticky flex h-[100dvh] w-full flex-col overflow-hidden">
        <div className="editorial-guides pointer-events-none absolute inset-0" aria-hidden>
          {[16.666, 33.333, 50, 66.666, 83.333].map((left) => (
            <span key={left} className="editorial-guide editorial-guide--dark" style={{ left: `${left}%` }} />
          ))}
        </div>

        <div className="projects-hs__header relative z-20 px-5 pt-24 md:px-12 lg:px-16">
          <Reveal className="projects-hs__eyebrow" delay={0} y={24}>
            Selected Work
          </Reveal>
          <Reveal className="projects-hs__title" delay={motion_stagger}>
            Featured Projects
          </Reveal>
          <Reveal className="projects-hs__intro" delay={motion_stagger * 2} y={24}>
            Image-forward builds — systems, interfaces, and quiet details that earn a second look.
          </Reveal>
        </div>

        <div className="projects-hs__track-wrap relative z-10 flex-1">
          <motion.div ref={track_ref} className="projects-hs__track" style={{ x }}>
            {featured_projects.map((project, index) => (
              <Project_slide
                key={project.title}
                project={project}
                index={index}
                total_slides={slide_count}
                progress={progress}
              />
            ))}

            <div className="projects-hs__cta-slide">
              <button
                type="button"
                className="projects-hs__cta"
                onClick={() => navigate('/all-projects')}
              >
                <span className="projects-hs__cta-label">See All Projects</span>
                <span className="projects-hs__cta-arrow">→</span>
              </button>
            </div>
          </motion.div>
        </div>

        <div className="projects-hs__footer relative z-20 px-5 pb-6 md:px-12 lg:px-16">
          <div className="projects-hs__counter">
            <span>{String(active_index + 1).padStart(2, '0')}</span>
            <span className="projects-hs__counter-sep">/</span>
            <span>{String(featured_projects.length).padStart(2, '0')}</span>
          </div>
          <div className="projects-hs__progress">
            <motion.span className="projects-hs__progress-fill" style={{ width: progress_width }} />
          </div>
          <p className="projects-hs__lock-hint">
            {is_narrow ? 'Keep scrolling' : is_locked ? 'Finish all projects to continue' : 'Scroll to enter'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default memo(Projects);
