import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion';
import { get_lenis } from '../utils/scroll_to';
import { ease_out, motion_stagger } from '../utils/motion';
import Reveal from './Reveal';

interface Internships_props {
  magicMode?: boolean;
}
const wheel_resistance = 2400;

const path_d =
  'M 120 40 C 220 120, 780 80, 860 200 C 940 320, 180 360, 140 500 C 100 640, 820 620, 880 760 C 940 900, 260 920, 200 1080 C 160 1160, 520 1180, 720 1220';

const journey_stops = [
  {
    id: 'rc-labs',
    company: 'Rc Labs',
    role: 'Software Developer Intern',
    year: '2023',
    impact: 'Delivered 5+ production applications',
    tags: ['Full-Stack', 'Agile', 'Shipping'],
    path_t: 0.12,
    side: 'right' as const,
  },
  {
    id: 'gully',
    company: 'Gully Group',
    role: 'Project Management Intern',
    year: '2024',
    impact: 'Managed 3+ concurrent projects',
    tags: ['Leadership', 'Planning', 'Delivery'],
    path_t: 0.34,
    side: 'left' as const,
  },
  {
    id: 'notarc',
    company: 'Notarc',
    role: 'Operations Lead & Co-Founder',
    year: '2024 – 2025',
    impact: 'Led workshops + company web presence',
    tags: ['Operations', 'Founding', 'Product'],
    path_t: 0.58,
    side: 'right' as const,
  },
  {
    id: 'inunity',
    company: 'Inunity',
    role: 'Software Developer & Program Mentor',
    year: '2025 – Present',
    impact: 'Shipped apps & dashboards across platforms',
    tags: ['Cross-Platform', 'Mentorship', 'Dashboards'],
    path_t: 0.82,
    side: 'left' as const,
  },
];

type Lenis_control = {
  stop: () => void;
  start: () => void;
  scrollTo: (target: number | string | HTMLElement, opts?: object) => void;
};

const Internships: React.FC<Internships_props> = () => {
  const section_ref = useRef<HTMLElement>(null);
  const path_ref = useRef<SVGPathElement>(null);

  const [path_length, set_path_length] = useState(1);
  const [active_id, set_active_id] = useState(journey_stops[0].id);
  const [marker_point, set_marker_point] = useState({ x: 120, y: 40 });
  const [node_points, set_node_points] = useState<Record<string, { x: number; y: number }>>({});
  const [progress_value, set_progress_value] = useState(0);
  const [is_locked, set_is_locked] = useState(false);
  const [is_narrow, set_is_narrow] = useState(false);

  const progress = useMotionValue(0);
  const progress_ref = useRef(0);
  const mode_ref = useRef<'free' | 'locked'>('free');
  const touch_start_y = useRef(0);
  const release_armed_ref = useRef(false);

  const dash_offset = useTransform(progress, (value) => path_length * (1 - value));

  useEffect(() => {
    const path = path_ref.current;
    if (!path) return;

    const measure = () => {
      const length = path.getTotalLength();
      set_path_length(length);

      const points: Record<string, { x: number; y: number }> = {};
      journey_stops.forEach((stop) => {
        const point = path.getPointAtLength(length * stop.path_t);
        points[stop.id] = { x: point.x, y: point.y };
      });
      set_node_points(points);

      const start = path.getPointAtLength(0);
      set_marker_point({ x: start.x, y: start.y });
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    const sync_narrow = () => set_is_narrow(window.innerWidth < 768);
    sync_narrow();
    window.addEventListener('resize', sync_narrow);
    return () => window.removeEventListener('resize', sync_narrow);
  }, []);

  useMotionValueEvent(progress, 'change', (value) => {
    const path = path_ref.current;
    if (!path || path_length <= 1) return;

    progress_ref.current = value;
    set_progress_value(value);

    const point = path.getPointAtLength(path_length * value);
    set_marker_point({ x: point.x, y: point.y });

    let nearest = journey_stops[0];
    let nearest_dist = Number.POSITIVE_INFINITY;
    journey_stops.forEach((stop) => {
      const dist = Math.abs(stop.path_t - value);
      if (dist < nearest_dist) {
        nearest_dist = dist;
        nearest = stop;
      }
    });

    if (nearest_dist < 0.14) {
      set_active_id((prev) => (prev === nearest.id ? prev : nearest.id));
    }

    if (value < 0.98) {
      release_armed_ref.current = false;
    }
  });

  useEffect(() => {
    if (!is_narrow) return;

    const section = section_ref.current;
    if (!section) return;

    mode_ref.current = 'free';
    set_is_locked(false);
    document.documentElement.classList.remove('journey-map-locked');
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

    const enter_locked = () => {
      if (mode_ref.current === 'locked') {
        snap_section_to_top();
        return;
      }
      mode_ref.current = 'locked';
      set_is_locked(true);
      snap_section_to_top();
      get_lenis_control()?.stop();
      document.documentElement.classList.add('journey-map-locked');
    };

    const exit_locked = (direction: 'up' | 'down') => {
      if (mode_ref.current !== 'locked') return;
      mode_ref.current = 'free';
      set_is_locked(false);
      release_armed_ref.current = false;
      document.documentElement.classList.remove('journey-map-locked');

      const lenis = get_lenis_control();
      lenis?.start();

      const nudge = direction === 'down' ? 80 : -80;
      const next_y = window.scrollY + nudge;
      if (lenis) {
        lenis.scrollTo(next_y, { duration: 0.55 });
      } else {
        window.scrollTo({ top: next_y, behavior: 'smooth' });
      }
    };

    const apply_delta = (delta_y: number) => {
      const current = progress_ref.current;

      if (current <= 0.001 && delta_y < 0) {
        exit_locked('up');
        return;
      }

      if (current >= 0.999 && delta_y > 0) {
        if (!release_armed_ref.current) {
          release_armed_ref.current = true;
          progress_ref.current = 1;
          progress.set(1);
          return;
        }
        exit_locked('down');
        return;
      }

      const next = Math.min(1, Math.max(0, current + delta_y / wheel_resistance));
      progress_ref.current = next;
      progress.set(next);
    };

    const section_in_capture_zone = (delta_y: number) => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      if (delta_y > 0) {
        return rect.top <= 100 && rect.top >= -vh * 0.65 && progress_ref.current < 0.999;
      }

      return rect.bottom >= vh - 100 && rect.top <= 100 && progress_ref.current > 0.005;
    };

    const on_wheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;

      if (mode_ref.current === 'free') {
        if (section_in_capture_zone(event.deltaY)) {
          event.preventDefault();
          event.stopImmediatePropagation();
          enter_locked();
          apply_delta(event.deltaY);
        }
        return;
      }

      event.preventDefault();
      event.stopImmediatePropagation();
      snap_section_to_top();
      apply_delta(event.deltaY);
    };

    const on_touch_start = (event: TouchEvent) => {
      touch_start_y.current = event.touches[0]?.clientY ?? 0;
    };

    const on_touch_move = (event: TouchEvent) => {
      const current_y = event.touches[0]?.clientY ?? 0;
      const delta_y = touch_start_y.current - current_y;
      touch_start_y.current = current_y;

      if (mode_ref.current === 'free') {
        if (Math.abs(delta_y) > 4 && section_in_capture_zone(delta_y)) {
          event.preventDefault();
          enter_locked();
          apply_delta(delta_y * 1.35);
        }
        return;
      }

      event.preventDefault();
      snap_section_to_top();
      apply_delta(delta_y * 1.35);
    };

    const on_scroll = () => {
      if (mode_ref.current !== 'locked') {
        const rect = section.getBoundingClientRect();
        if (progress_ref.current < 0.999 && rect.top < -16 && rect.top > -window.innerHeight * 0.85) {
          enter_locked();
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
      document.documentElement.classList.remove('journey-map-locked');
      get_lenis_control()?.start();
      mode_ref.current = 'free';
      set_is_locked(false);
    };
  }, [is_narrow, progress, path_length]);

  const active_stop = useMemo(
    () => journey_stops.find((stop) => stop.id === active_id) ?? journey_stops[0],
    [active_id]
  );

  const panel_ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    if (active_id !== 'inunity') return;

    const frame_id = requestAnimationFrame(() => {
      const section = section_ref.current;
      const panel = panel_ref.current;
      if (!section || !panel) return;

      const section_rect = section.getBoundingClientRect();
      const panel_rect = panel.getBoundingClientRect();
      const overflow_ancestors: string[] = [];
      let node: HTMLElement | null = panel;

      while (node && node !== document.body) {
        const style = window.getComputedStyle(node);
        if (style.overflow !== 'visible' || style.overflowY !== 'visible' || style.overflowX !== 'visible') {
          overflow_ancestors.push(
            `${node.className || node.tagName}: overflow=${style.overflow}/${style.overflowY}`
          );
        }
        node = node.parentElement;
      }

      const clipped_bottom = panel_rect.bottom > section_rect.bottom + 1;
      const under_next =
        panel_rect.bottom > window.innerHeight - 4 && !is_locked;

      console.info('[journey-map debug]', {
        active_id,
        progress: progress_ref.current,
        is_locked,
        section_height: section_rect.height,
        section_bottom: section_rect.bottom,
        panel_top: panel_rect.top,
        panel_bottom: panel_rect.bottom,
        panel_height: panel_rect.height,
        clipped_by_section: clipped_bottom,
        likely_covered_by_next_section: under_next,
        overflow_ancestors,
      });
    });

    return () => cancelAnimationFrame(frame_id);
  }, [active_id, is_locked, progress_value]);

  const jump_to_stop = (path_t: number) => {
    progress_ref.current = path_t;
    progress.set(path_t);
  };

  const side_sign = active_stop.side === 'right' ? 1 : -1;
  const leader_gap = 28;
  const leader_length = 118;

  let leader_end_x = marker_point.x + side_sign * leader_length;
  let leader_end_y = marker_point.y;
  let leader_mid_x = marker_point.x + side_sign * (leader_length * 0.55);
  let leader_mid_y = marker_point.y + (marker_point.y > 700 ? -36 : 36);

  if (is_narrow) {
    leader_end_x = 500;
    leader_end_y = 1185;
    leader_mid_x = (marker_point.x + 500) / 2;
    leader_mid_y = Math.min(marker_point.y + 140, 1050);
  } else if (active_stop.side === 'right') {
    leader_end_x = Math.min(leader_end_x, 680);
  } else {
    leader_end_x = Math.max(leader_end_x, 320);
  }

  const leader_path = `M ${marker_point.x} ${marker_point.y} Q ${leader_mid_x} ${leader_mid_y} ${leader_end_x} ${leader_end_y}`;

  const panel_style = is_narrow
    ? {
        left: '50%',
        top: 'auto',
        bottom: '0.35rem',
        transform: 'translateX(-50%)',
      }
    : {
        left: `${(leader_end_x / 1000) * 100}%`,
        top: `${Math.min(78, Math.max(12, (marker_point.y / 1260) * 100))}%`,
        ['--leader-gap' as string]: `${leader_gap}px`,
      };

  return (
    <section
      ref={section_ref}
      id="internships"
      className={`journey-map relative bg-[#050505] text-white scroll-mt-20 ${is_locked ? 'is-locked' : ''} ${is_narrow ? 'is-mobile-scrub' : ''}`}
    >
      <div className="journey-map__panel-shell">
        <div className="editorial-guides pointer-events-none absolute inset-0" aria-hidden>
          {[12.5, 25, 37.5, 50, 62.5, 75, 87.5].map((left) => (
            <span key={left} className="editorial-guide editorial-guide--dark" style={{ left: `${left}%` }} />
          ))}
        </div>

        <div className="journey-map__topo" aria-hidden />
        <div className="journey-map__atmosphere" aria-hidden />

        <div className="journey-map__header relative z-20 px-5 pt-4 md:px-12 lg:px-16 md:pt-12">
          <Reveal className="journey-map__eyebrow" delay={0} y={24}>
            Experience
          </Reveal>
          <Reveal className="journey-map__title" delay={motion_stagger}>
            My Voyage
          </Reveal>
          <Reveal className="journey-map__intro" delay={motion_stagger * 2} y={24}>
            {is_narrow
              ? 'Keep scrolling to travel the path.'
              : is_locked
                ? 'Scroll to travel the path — finish every stop before continuing.'
                : 'Scroll to enter the map.'}
          </Reveal>
        </div>

        <div className="journey-map__stage relative z-10 mx-auto min-h-0 w-full max-w-[1320px] flex-1 px-2 pb-4 md:px-4 lg:px-8">
          <div className="journey-map__canvas">
            <svg
              className="journey-map__svg"
              viewBox="0 0 1000 1260"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden
            >
              <defs>
                <filter id="journey-marker-glow" x="-120%" y="-120%" width="340%" height="340%">
                  <feGaussianBlur stdDeviation="4.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path ref={path_ref} d={path_d} fill="none" stroke="transparent" strokeWidth="2" />
              <path
                d={path_d}
                className="journey-map__path-base"
                fill="none"
                strokeWidth="2.25"
                strokeDasharray="4 10"
              />
              <motion.path
                d={path_d}
                className="journey-map__path-fill"
                fill="none"
                strokeWidth="5"
                strokeDasharray={path_length}
                style={{ strokeDashoffset: dash_offset }}
              />

              <path
                d={leader_path}
                className="journey-map__leader"
                fill="none"
                strokeWidth="1.35"
                strokeDasharray="5 7"
              />
              <circle
                cx={leader_end_x}
                cy={leader_end_y}
                r={2.4}
                className="journey-map__leader-tip"
              />

              {journey_stops.map((stop) => {
                const point = node_points[stop.id];
                if (!point) return null;
                const is_active = stop.id === active_id;
                const revealed = progress_value >= stop.path_t - 0.02;
                return (
                  <circle
                    key={stop.id}
                    cx={point.x}
                    cy={point.y}
                    r={is_active ? 12 : 7.5}
                    className={`journey-map__node ${is_active ? 'is-active' : ''} ${revealed ? 'is-revealed' : ''}`}
                  />
                );
              })}

              <circle
                cx={marker_point.x}
                cy={marker_point.y}
                r={18}
                className="journey-map__marker-halo"
              />
              <circle
                cx={marker_point.x}
                cy={marker_point.y}
                r={11}
                className="journey-map__marker-svg"
                filter="url(#journey-marker-glow)"
              />
            </svg>

            {journey_stops.map((stop) => {
              const point = node_points[stop.id];
              if (!point) return null;
              return (
                <button
                  key={`${stop.id}-hit`}
                  type="button"
                  className="journey-map__node-hit"
                  style={{
                    left: `${(point.x / 1000) * 100}%`,
                    top: `${(point.y / 1260) * 100}%`,
                  }}
                  aria-label={`Jump to ${stop.company}`}
                  onClick={() => jump_to_stop(stop.path_t)}
                />
              );
            })}

            <aside
              ref={panel_ref}
              className={`journey-map__panel journey-map__panel--${active_stop.side}${is_narrow ? ' is-narrow' : ''}`}
              style={panel_style}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active_stop.id}
                  className="journey-map__panel-body"
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.32, ease: ease_out }}
                >
                  <p className="journey-map__panel-year">{active_stop.year}</p>
                  <h3 className="journey-map__panel-company">{active_stop.company}</h3>
                  <p className="journey-map__panel-role">{active_stop.role}</p>
                  <p className="journey-map__panel-impact">{active_stop.impact}</p>
                  <p className="journey-map__panel-tags">{active_stop.tags.join(' · ')}</p>
                </motion.div>
              </AnimatePresence>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Internships);
