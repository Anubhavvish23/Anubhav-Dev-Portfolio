import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { ease_out_expo } from '../utils/motion';

export const useLenisScroll = () => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    document.documentElement.classList.add('lenis-active');

    const lenis = new Lenis({
      lerp: 0.065,
      easing: ease_out_expo,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.78,
      touchMultiplier: 1.2,
      syncTouch: false,
      autoRaf: false,
    });

    let raf_id = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      raf_id = requestAnimationFrame(raf);
    };
    raf_id = requestAnimationFrame(raf);

    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      cancelAnimationFrame(raf_id);
      lenis.destroy();
      document.documentElement.classList.remove('lenis-active');
      delete (window as Window & { __lenis?: Lenis }).__lenis;
    };
  }, []);
};
