import React, { memo, startTransition, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { scroll_to_id } from '../utils/scroll_to';
import { ease_out, motion_duration } from '../utils/motion';
import ProgressiveImage from './ProgressiveImage';

interface HeroProps {
  magicMode?: boolean;
}

const reset_pos = { x: 0, y: 0, rotate: 0, scale: 1 };

const get_random = (min: number, max: number) => Math.random() * (max - min) + min;

const Hero: React.FC<HeroProps> = ({ magicMode = false }) => {
  const hero_ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: hero_ref,
    offset: ['start start', 'end start'],
  });

  const text_y = useTransform(scrollYProgress, [0, 0.45], [0, -48]);
  const text_opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const vignette_opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.4]);

  const [name_pos, set_name_pos] = useState(reset_pos);
  const [tag_pos, set_tag_pos] = useState(reset_pos);

  useEffect(() => {
    if (!magicMode) {
      startTransition(() => {
        set_name_pos(reset_pos);
        set_tag_pos(reset_pos);
      });
      return;
    }

    const timers: number[] = [];

    const chaos_name = () => {
      startTransition(() => {
        set_name_pos({
          x: get_random(-40, 40),
          y: get_random(-20, 20),
          rotate: get_random(-8, 8),
          scale: get_random(0.96, 1.04),
        });
      });
      timers.push(window.setTimeout(chaos_name, get_random(4000, 7000)));
    };

    const chaos_tag = () => {
      startTransition(() => {
        set_tag_pos({
          x: get_random(-30, 30),
          y: get_random(-15, 15),
          rotate: get_random(-6, 6),
          scale: get_random(0.97, 1.03),
        });
      });
      timers.push(window.setTimeout(chaos_tag, get_random(5000, 8000)));
    };

    timers.push(window.setTimeout(chaos_name, 1200));
    timers.push(window.setTimeout(chaos_tag, 2200));

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [magicMode]);

  return (
    <section
      ref={hero_ref}
      id="home"
      className="hero-editorial relative h-[100dvh] min-h-[100dvh] w-full overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="hero-editorial__bg absolute inset-0" />

        <div className="hero-editorial__portrait-wrap">
          <ProgressiveImage
            src="/hero-portrait.png"
            alt="Anubhav S"
            bare
            hero
            priority
            img_class_name="hero-editorial__portrait"
            width={1020}
            height={1420}
          />
          <div className="hero-editorial__blur-band hero-editorial__blur-band--soft" aria-hidden />
          <div className="hero-editorial__blur-band hero-editorial__blur-band--mid" aria-hidden />
          <div className="hero-editorial__blur-band hero-editorial__blur-band--strong" aria-hidden />
        </div>

        <motion.div
          className="hero-editorial__vignette absolute inset-0 pointer-events-none"
          style={{ opacity: vignette_opacity }}
        />

        <div className="hero-editorial__guides absolute inset-0 pointer-events-none hidden md:block" aria-hidden>
          {[16.666, 33.333, 50, 66.666, 83.333].map((left) => (
            <span key={left} className="hero-editorial__guide" style={{ left: `${left}%` }} />
          ))}
        </div>
      </div>

      <motion.div
        className="relative z-10 flex h-full w-full flex-col"
        style={{ y: text_y, opacity: text_opacity }}
      >
        <div className="hero-editorial__content flex h-full w-full flex-col px-5 pb-2 pt-24 sm:px-8 lg:px-10 lg:pb-0">
          <div className="hero-editorial__copy flex min-h-0 flex-1 flex-col">
            <motion.div
              className="hero-editorial__intro"
              initial={{ opacity: 0, y: 24 }}
              animate={magicMode ? { opacity: 1, ...tag_pos } : { opacity: 1, y: 0 }}
              transition={magicMode ? { duration: 1.4, type: 'spring' } : { duration: 0.8, delay: 0.35 }}
            >
              <p className="hero-editorial__tagline mb-4 max-w-[16rem] text-[10px] font-medium uppercase leading-[1.55] tracking-[0.18em] text-white/85 sm:max-w-[18rem] sm:text-[11px]">
                Blending code, craft &amp; clarity
                <br />
                to build digital products
                <br />
                that feel inevitable —
                <br />
                not just functional.
              </p>
              <button
                type="button"
                onClick={() => scroll_to_id('about')}
                className="hero-editorial__pill ui-pill-arrow inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-white/15 sm:text-[11px]"
              >
                What I Do <span className="ui-pill-arrow__glyph" aria-hidden>→</span>
              </button>
            </motion.div>

            <motion.h1
              className="hero-editorial__name mt-auto text-white"
              initial={{ opacity: 0, y: 40 }}
              animate={magicMode ? { opacity: 1, ...name_pos } : { opacity: 1, y: 0 }}
              transition={magicMode ? { duration: 1.5, type: 'spring' } : { duration: motion_duration.enter_slow, delay: 0.15, ease: ease_out }}
            >
              Anubhav
            </motion.h1>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default memo(Hero);
