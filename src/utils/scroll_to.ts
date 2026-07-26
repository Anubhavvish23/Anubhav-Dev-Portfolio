type LenisLike = {
  scrollTo: (target: string | number | HTMLElement, opts?: object) => void;
  on?: (event: string, handler: (payload: { scroll: number; limit: number }) => void) => void;
  off?: (event: string, handler: (payload: { scroll: number; limit: number }) => void) => void;
  stop?: () => void;
  start?: () => void;
};

export const FORCE_NAV_EVENT = 'portfolio:force-nav';

export const get_lenis = () =>
  (window as Window & { __lenis?: LenisLike }).__lenis;

export const unlock_scroll_sections = () => {
  document.documentElement.classList.remove('projects-hs-locked', 'journey-map-locked');
  get_lenis()?.start?.();
  window.dispatchEvent(new CustomEvent(FORCE_NAV_EVENT));
};

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

export const force_scroll_to_id = (id: string, offset = 0) => {
  unlock_scroll_sections();

  const jump = () => {
    const el = document.getElementById(id);
    if (!el) return;

    const lenis = get_lenis();
    if (lenis) {
      lenis.start?.();
      lenis.scrollTo(el, {
        offset,
        immediate: true,
      });
      return;
    }

    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: 'auto' });
  };

  requestAnimationFrame(() => {
    requestAnimationFrame(jump);
  });
};
