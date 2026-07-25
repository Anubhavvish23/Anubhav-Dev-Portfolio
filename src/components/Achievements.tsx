import React, { memo, useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ease_out, motion_duration, motion_stagger } from '../utils/motion';
import Reveal from './Reveal';

interface Achievements_props {
  magicMode?: boolean;
}

const chapters = [
  {
    year: '2023',
    theme: 'Foundation',
    headline: 'Won my first hackathon — Robotics/IoT',
    more: [
      'Built a line-following robot using Raspberry Pi',
      'Started building with Arduino, C, and embedded systems',
      'Entered hackathons and tech competitions',
    ],
  },
  {
    year: '2024',
    theme: 'Breakthrough',
    headline: 'Represented college at Delhi Startup Mahakumbh',
    more: [
      'Won a robotics hackathon',
      'Software Developer intern at RC Labs',
      'Arduino & Linux workshops for juniors',
      'Campus IoT and robotics training sessions',
      'Built ERP systems and launched AI & web projects',
      'Learned MERN, Django, and full-stack apps',
    ],
  },
  {
    year: '2025',
    theme: 'Leadership',
    headline: 'Best Upcoming Engineer 2025 — multiple awards',
    more: [
      'Product Management Intern at Gully Group',
      'Led a college hackathon as organizer',
      'Led drone workshops and technical sessions',
      'Shipped Datasheet AI, Sanskrit GPT, MediBot',
      'Advanced study in AI, FastAPI, and LLMs',
      'Reinvited to Delhi tech events',
    ],
  },
];

const Count_up = ({
  target,
  active,
}: {
  target: number;
  active: boolean;
}) => {
  const [value, set_value] = useState(0);

  useEffect(() => {
    if (!active) {
      set_value(0);
      return;
    }

    let raf_id = 0;
    const start = performance.now();
    const duration = 800;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      set_value(Math.round(target * eased));
      if (t < 1) raf_id = requestAnimationFrame(tick);
    };

    raf_id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf_id);
  }, [active, target]);

  return <>{value}</>;
};

const Chapter_block = ({
  chapter,
  index,
  is_active,
  on_active,
}: {
  chapter: (typeof chapters)[number];
  index: number;
  is_active: boolean;
  on_active: (index: number) => void;
}) => {
  const block_ref = useRef<HTMLElement>(null);
  const in_view = useInView(block_ref, { amount: 0.45, once: false });
  const [expanded, set_expanded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: block_ref,
    offset: ['start end', 'end start'],
  });

  const ghost_y = useTransform(scrollYProgress, [0, 1], [48, -48]);

  useMotionValueEvent(scrollYProgress, 'change', () => {
    if (in_view) on_active(index);
  });

  useEffect(() => {
    if (in_view) on_active(index);
  }, [in_view, index, on_active]);

  const milestone_count = 1 + chapter.more.length;
  const more_count = chapter.more.length;

  return (
    <article
      ref={block_ref}
      className={`achievements-wall__chapter ${is_active ? 'is-active' : ''}`}
      data-year={chapter.year}
    >
      <motion.span className="achievements-wall__ghost" style={{ y: ghost_y }} aria-hidden>
        {chapter.year}
      </motion.span>

      <div className="achievements-wall__chapter-body">
        <p className="achievements-wall__theme">{chapter.theme}</p>

        <div className="achievements-wall__stat-row">
          <div className="achievements-wall__stat">
            <p className="achievements-wall__stat-num">
              <Count_up target={milestone_count} active={in_view} />
            </p>
            <p className="achievements-wall__stat-label">Milestones</p>
          </div>

          <motion.h3
            className="achievements-wall__headline"
            initial={{ opacity: 0, y: 28 }}
            animate={in_view ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{ duration: motion_duration.enter, ease: ease_out, delay: motion_stagger }}
          >
            {chapter.headline}
          </motion.h3>
        </div>

        {more_count > 0 && (
          <div className="achievements-wall__more">
            <button
              type="button"
              className={`achievements-wall__more-btn ${expanded ? 'is-open' : ''}`}
              aria-expanded={expanded}
              onClick={() => set_expanded((prev) => !prev)}
            >
              <span>{expanded ? 'Show less' : `+${more_count} more`}</span>
              <span className="achievements-wall__chevron" aria-hidden />
            </button>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.ul
                  className="achievements-wall__more-list"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: ease_out }}
                >
                  {chapter.more.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </article>
  );
};

const Achievements: React.FC<Achievements_props> = () => {
  const section_ref = useRef<HTMLElement>(null);
  const [active_index, set_active_index] = useState(0);
  const section_in_view = useInView(section_ref, { amount: 0.15, once: false });

  const set_active = (index: number) => {
    set_active_index((prev) => (prev === index ? prev : index));
  };

  const scroll_to_chapter = (index: number) => {
    const el = section_ref.current?.querySelectorAll('.achievements-wall__chapter')[index];
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section
      ref={section_ref}
      id="achievements"
      className="achievements-wall relative scroll-mt-20 text-white"
    >
      <div className="editorial-guides pointer-events-none absolute inset-0" aria-hidden>
        {[16.666, 33.333, 50, 66.666, 83.333].map((left) => (
          <span
            key={left}
            className="editorial-guide achievements-wall__guide"
            style={{ left: `${left}%` }}
          />
        ))}
      </div>

      <div className="achievements-wall__vignette" aria-hidden />

      <nav
        className={`achievements-wall__progress ${section_in_view ? 'is-visible' : ''}`}
        aria-label="Achievement chapters"
      >
        {chapters.map((chapter, index) => (
          <button
            key={chapter.year}
            type="button"
            className={`achievements-wall__dot ${active_index === index ? 'is-active' : ''}`}
            aria-label={`Go to ${chapter.year}`}
            aria-current={active_index === index ? 'true' : undefined}
            onClick={() => scroll_to_chapter(index)}
          >
            <span className="achievements-wall__dot-year">{chapter.year}</span>
          </button>
        ))}
      </nav>


      <div className="achievements-wall__inner relative z-10">
        <header className="achievements-wall__header">
          <Reveal className="achievements-wall__eyebrow" delay={0} y={24}>
            Timeline
          </Reveal>
          <Reveal className="achievements-wall__title" delay={motion_stagger}>
            Achievements
          </Reveal>
          <Reveal className="achievements-wall__intro" delay={motion_stagger * 2} y={24}>
            Three chapters. One hard number. One headline. The rest on demand.
          </Reveal>
        </header>

        <div className="achievements-wall__chapters">
          {chapters.map((chapter, index) => (
            <Chapter_block
              key={chapter.year}
              chapter={chapter}
              index={index}
              is_active={active_index === index}
              on_active={set_active}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Achievements);
