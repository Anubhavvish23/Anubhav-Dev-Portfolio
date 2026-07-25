import React, { memo, useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ease_out, motion_duration, motion_stagger } from '../utils/motion';

interface Skills_props {
  magicMode?: boolean;
}

const marquee_columns = [
  {
    direction: 'up' as const,
    duration: '38s',
    items: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'Vite', 'Tailwind'],
  },
  {
    direction: 'down' as const,
    duration: '46s',
    items: ['Go', 'Python', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Linux'],
  },
  {
    direction: 'up' as const,
    duration: '42s',
    items: ['Flutter', 'Figma', 'Git', 'n8n', 'OpenAI', 'Three.js', 'Framer'],
  },
];

const Vertical_marquee_column = ({
  items,
  direction,
  duration,
}: {
  items: string[];
  direction: 'up' | 'down';
  duration: string;
}) => {
  const column_ref = useRef<HTMLDivElement>(null);
  const [focused_key, set_focused_key] = useState('');
  const loop_items = [...items, ...items];

  useEffect(() => {
    let raf_id = 0;

    const tick = () => {
      const column = column_ref.current;
      if (!column) {
        raf_id = requestAnimationFrame(tick);
        return;
      }

      const bounds = column.getBoundingClientRect();
      const center_y = bounds.top + bounds.height / 2;
      const nodes = column.querySelectorAll<HTMLElement>('[data-marquee-item]');
      let best_key = '';
      let best_dist = Number.POSITIVE_INFINITY;

      nodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - center_y);
        if (dist < best_dist) {
          best_dist = dist;
          best_key = node.dataset.marqueeItem ?? '';
        }
      });

      set_focused_key((prev) => (prev === best_key ? prev : best_key));
      raf_id = requestAnimationFrame(tick);
    };

    raf_id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf_id);
  }, []);

  return (
    <div ref={column_ref} className="skills-editorial__marquee-col">
      <div
        className={`skills-editorial__marquee-track skills-editorial__marquee-track--${direction}`}
        style={{ animationDuration: duration }}
      >
        {loop_items.map((item, index) => {
          const key = `${item}-${index}`;
          return (
            <span
              key={key}
              data-marquee-item={key}
              className={`skills-editorial__marquee-item ${focused_key === key ? 'is-focused' : ''}`}
            >
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
};

const Skills: React.FC<Skills_props> = () => {
  const section_ref = useRef<HTMLElement>(null);
  const section_in_view = useInView(section_ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={section_ref}
      id="skills"
      className="skills-editorial relative overflow-hidden bg-[#050505] text-white scroll-mt-20"
    >
      <div className="editorial-guides pointer-events-none absolute inset-0" aria-hidden>
        {[16.666, 33.333, 50, 66.666, 83.333].map((left) => (
          <span key={left} className="editorial-guide editorial-guide--dark" style={{ left: `${left}%` }} />
        ))}
      </div>

      <div className="skills-editorial__glow" aria-hidden />

      <div className="skills-editorial__inner relative z-10 mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <motion.p
          className="skills-editorial__eyebrow"
          initial={{ opacity: 0, y: 24 }}
          animate={section_in_view ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: motion_duration.enter, ease: ease_out }}
        >
          Capabilities
        </motion.p>

        <motion.h2
          className="skills-editorial__title"
          initial={{ opacity: 0, y: 36 }}
          animate={section_in_view ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: motion_duration.enter, delay: motion_stagger, ease: ease_out }}
        >
          Frameworks & Tools
        </motion.h2>

        <div className="skills-editorial__marquee-block">
          <motion.div
            className="skills-editorial__anchor"
            initial={{ opacity: 0, y: 28 }}
            animate={section_in_view ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: motion_duration.enter, delay: motion_stagger * 2, ease: ease_out }}
          >
            <p className="skills-editorial__anchor-line">Tools I reach for daily</p>
            <p className="skills-editorial__anchor-copy">
              A living stack of frameworks, languages, and systems that shape every build — always moving, always close at hand.
            </p>
          </motion.div>

          <div className="skills-editorial__marquees" aria-hidden>
            {marquee_columns.map((column, index) => (
              <Vertical_marquee_column
                key={`marquee-${index}`}
                items={column.items}
                direction={column.direction}
                duration={column.duration}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Skills);
