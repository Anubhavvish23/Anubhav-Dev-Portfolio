type LenisLike = {
  scrollTo: (target: string | number | HTMLElement, opts?: object) => void;
  on?: (event: string, handler: (payload: { scroll: number; limit: number }) => void) => void;
  off?: (event: string, handler: (payload: { scroll: number; limit: number }) => void) => void;
  stop?: () => void;
  start?: () => void;
};

export const get_lenis = () =>
  (window as Window & { __lenis?: LenisLike }).__lenis;

export const scroll_to_id = (id: string, offset = 0) => {
  const el = document.getElementById(id);
  if (!el) return;

  const lenis = get_lenis();
  if (lenis) {
    lenis.scrollTo(el, {
      offset,
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    return;
  }

  el.scrollIntoView({ behavior: 'smooth' });
};
