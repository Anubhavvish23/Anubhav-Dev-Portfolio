import React, { memo, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Rocket, Frame, CornerDownRight } from 'lucide-react';
import { scroll_to_id } from '../utils/scroll_to';
import { ease_out, fade_up, fade_up_soft } from '../utils/motion';
import ProgressiveImage from './ProgressiveImage';

interface AboutProps {
  magicMode?: boolean;
}

const scale_in = {
  hidden: { opacity: 0, scale: 1.1, y: 24 },
  show: { opacity: 1, scale: 1, y: 0 },
};

const slide_in = {
  hidden: { opacity: 0, x: 20, y: 16 },
  show: { opacity: 1, x: 0, y: 0 },
};

const statement_parts: Array<
  | { type: 'text'; value: string }
  | { type: 'image'; src: string; alt: string; object?: string }
> = [
  { type: 'text', value: "I don't simply write code " },
  { type: 'image', src: '/i2.jpeg', alt: '' },
  { type: 'text', value: ' I carefully shape ' },
  { type: 'image', src: '/i3.jpeg', alt: '', object: 'center 30%' },
  { type: 'text', value: ' genuine experiences, quiet details, and the hidden systems ' },
  { type: 'image', src: '/i5.jpeg', alt: '', object: 'center 20%' },
  { type: 'text', value: ' that make every product truly meaningful.' },
];

const mission_copy =
  'To build authentic products through timeless, emotional, and honest craft.';

const vision_copy =
  'To create meaningful digital work that inspires connection and lasting impact.';

const Animated_words = ({
  text,
  in_view,
  base_delay = 0,
}: {
  text: string;
  in_view: boolean;
  base_delay?: number;
}) => {
  const words = text.split(/(\s+)/);
  let index = 0;

  return (
    <>
      {words.map((word, word_index) => {
        if (!word.trim()) {
          return <span key={`s-${word_index}`}>{word}</span>;
        }
        const delay = base_delay + index * 0.06;
        index += 1;
        return (
          <motion.span
            key={`w-${word_index}`}
            className="inline-block"
            initial={{ opacity: 0, y: 28 }}
            animate={in_view ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{ duration: 0.75, delay, ease: ease_out }}
          >
            {word}
          </motion.span>
        );
      })}
    </>
  );
};

const About: React.FC<AboutProps> = () => {
  const section_ref = useRef<HTMLElement>(null);
  const statement_ref = useRef<HTMLDivElement>(null);
  const grid_ref = useRef<HTMLDivElement>(null);

  const statement_in_view = useInView(statement_ref, { once: true, amount: 0.25 });
  const grid_in_view = useInView(grid_ref, { once: true, amount: 0.15 });

  const { scrollYProgress } = useScroll({
    target: section_ref,
    offset: ['start end', 'end start'],
  });

  const portrait_y = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);
  const action_y = useTransform(scrollYProgress, [0, 1], ['4%', '-8%']);
  const guides_opacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);

  let text_index = 0;
  let image_index = 0;

  return (
    <section
      ref={section_ref}
      id="about"
      className="about-editorial relative overflow-hidden bg-white text-black scroll-mt-20"
    >
      <motion.div
        className="editorial-guides pointer-events-none absolute inset-0 hidden md:block"
        style={{ opacity: guides_opacity }}
        aria-hidden
      >
        {[16.666, 33.333, 50, 66.666, 83.333].map((left) => (
          <span key={left} className="editorial-guide" style={{ left: `${left}%` }} />
        ))}
      </motion.div>

      <div className="about-editorial__inner relative z-10 mx-auto flex w-full max-w-[1440px] flex-col justify-start px-0 py-10 sm:py-12 md:min-h-[100dvh] md:justify-center lg:py-10">
        <div
          ref={grid_ref}
          className="about-editorial__mosaic grid w-full grid-cols-1 gap-5 px-5 md:grid-cols-6 md:gap-x-0 md:gap-y-5 md:px-0"
        >
          <div className="about-editorial__intro-col md:col-span-1 md:col-start-2 md:row-span-2 md:row-start-1">
            <motion.p
              className="about-editorial__eyebrow md:pl-4 lg:pl-6"
              variants={fade_up}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.85, ease: ease_out }}
            >
              Introduction
            </motion.p>

            <motion.div
              className="about-editorial__photo-frame about-editorial__photo-frame--portrait"
              variants={scale_in}
              initial="hidden"
              animate={grid_in_view ? 'show' : 'hidden'}
              transition={{ duration: 0.95, ease: ease_out }}
            >
              <motion.div style={{ y: portrait_y }} className="h-full w-full">
                <ProgressiveImage
                  src="/12.jpg"
                  alt="Anubhav portrait"
                  img_class_name="about-editorial__photo"
                  placeholder_color="#d6d3d1"
                  aspect_ratio="1 / 1.15"
                />
              </motion.div>
            </motion.div>
          </div>

          <div
            ref={statement_ref}
            className="about-editorial__statement md:col-span-4 md:col-start-3 md:row-start-1 md:pr-8 md:pl-4 lg:pr-12 lg:pl-6"
          >
            {statement_parts.map((part, index) => {
              if (part.type === 'text') {
                const words = part.value.split(/(\s+)/);
                return (
                  <React.Fragment key={`t-${index}`}>
                    {words.map((word, word_index) => {
                      if (!word.trim()) {
                        return <span key={`s-${index}-${word_index}`}>{word}</span>;
                      }
                      const delay = text_index * 0.085;
                      text_index += 1;
                      return (
                        <motion.span
                          key={`w-${index}-${word_index}`}
                          className="about-editorial__word inline-block"
                          initial={{ opacity: 0, y: 40 }}
                          animate={statement_in_view ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                          transition={{ duration: 0.85, delay, ease: ease_out }}
                        >
                          {word}
                        </motion.span>
                      );
                    })}
                  </React.Fragment>
                );
              }

              const delay = 0.32 + image_index * 0.14;
              image_index += 1;
              return (
                <motion.span
                  key={`i-${index}`}
                  className="about-editorial__inline-img-wrap"
                  initial={{ opacity: 0, scale: 0.75, y: 16 }}
                  animate={
                    statement_in_view
                      ? { opacity: 1, scale: 1, y: 0 }
                      : { opacity: 0, scale: 0.75, y: 16 }
                  }
                  transition={{ duration: 0.8, delay, ease: ease_out }}
                  whileHover={{ scale: 1.1 }}
                >
                  <ProgressiveImage
                    src={part.src}
                    alt={part.alt}
                    img_class_name="about-editorial__inline-img"
                    placeholder_color="#d6d3d1"
                    object_position={part.object}
                  />
                </motion.span>
              );
            })}
          </div>

          <motion.div
            className="about-editorial__card about-editorial__card--vision md:col-span-1 md:col-start-3 md:row-start-2"
            variants={slide_in}
            initial="hidden"
            animate={grid_in_view ? 'show' : 'hidden'}
            transition={{ duration: 0.85, delay: 0.12, ease: ease_out }}
          >
            <motion.div
              className="about-editorial__label-row"
              variants={fade_up_soft}
              initial="hidden"
              animate={grid_in_view ? 'show' : 'hidden'}
              transition={{ duration: 0.75, delay: 0.22, ease: ease_out }}
            >
              <Frame className="about-editorial__icon" strokeWidth={1.6} />
              <span className="about-editorial__label">My Vision</span>
            </motion.div>
            <p className="about-editorial__body">
              <Animated_words text={vision_copy} in_view={grid_in_view} base_delay={0.35} />
            </p>
          </motion.div>

          <motion.div
            className="about-editorial__card about-editorial__card--mission order-5 md:order-none md:col-span-1 md:col-start-4 md:row-start-2"
            variants={slide_in}
            initial="hidden"
            animate={grid_in_view ? 'show' : 'hidden'}
            transition={{ duration: 0.85, delay: 0.2, ease: ease_out }}
          >
            <motion.div
              className="about-editorial__label-row"
              variants={fade_up_soft}
              initial="hidden"
              animate={grid_in_view ? 'show' : 'hidden'}
              transition={{ duration: 0.75, delay: 0.3, ease: ease_out }}
            >
              <Rocket className="about-editorial__icon" strokeWidth={1.6} />
              <span className="about-editorial__label">My Mission</span>
            </motion.div>
            <p className="about-editorial__body">
              <Animated_words text={mission_copy} in_view={grid_in_view} base_delay={0.42} />
            </p>
          </motion.div>

          <motion.div
            className="about-editorial__photo-frame about-editorial__photo-frame--action relative order-4 md:order-none md:col-span-1 md:col-start-5 md:row-start-2"
            variants={scale_in}
            initial="hidden"
            animate={grid_in_view ? 'show' : 'hidden'}
            transition={{ duration: 1, delay: 0.18, ease: ease_out }}
          >
            <motion.video
              className="about-editorial__photo about-editorial__photo--action"
              style={{ y: action_y }}
              src="/i4.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
            <motion.button
              type="button"
              className="about-editorial__cta"
              onClick={() => scroll_to_id('skills')}
              initial={{ opacity: 0, y: 20 }}
              animate={grid_in_view ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.75, delay: 0.55, ease: ease_out }}
            >
              <CornerDownRight size={14} strokeWidth={2.25} />
              <span>What I Do</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(About);
