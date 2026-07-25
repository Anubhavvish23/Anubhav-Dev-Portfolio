export const ease_out = [0.22, 1, 0.36, 1] as const;

export const ease_out_expo = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export const motion_duration = {
  micro: 0.2,
  enter: 0.7,
  enter_slow: 0.85,
  image: 0.45,
  intro: 0.9,
} as const;

export const motion_stagger = 0.1;

export const motion_y = 36;

export const fade_up = {
  hidden: { opacity: 0, y: motion_y },
  show: { opacity: 1, y: 0 },
};

export const fade_up_soft = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export const reveal_transition = (delay = 0) => ({
  duration: motion_duration.enter,
  delay,
  ease: ease_out,
});
