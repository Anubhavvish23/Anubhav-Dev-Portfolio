import React, { useEffect, useState } from 'react';
import { get_lenis } from '../utils/scroll_to';

const ScrollProgressBar: React.FC = () => {
  const [progress, set_progress] = useState(0);

  useEffect(() => {
    let raf_id = 0;
    let unbind_lenis: (() => void) | undefined;

    const read_native = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      set_progress(max > 0 ? window.scrollY / max : 0);
    };

    const on_lenis_scroll = (event: { scroll: number; limit: number }) => {
      set_progress(event.limit > 0 ? event.scroll / event.limit : 0);
    };

    const on_scroll = () => {
      cancelAnimationFrame(raf_id);
      raf_id = requestAnimationFrame(read_native);
    };

    const try_bind_lenis = () => {
      const lenis = get_lenis();
      if (!lenis?.on) return false;
      lenis.on('scroll', on_lenis_scroll);
      unbind_lenis = () => lenis.off?.('scroll', on_lenis_scroll);
      return true;
    };

    if (!try_bind_lenis()) {
      window.addEventListener('scroll', on_scroll, { passive: true });
      read_native();
    }

    const retry_id = window.setTimeout(() => {
      if (try_bind_lenis()) {
        window.removeEventListener('scroll', on_scroll);
      }
    }, 120);

    return () => {
      window.clearTimeout(retry_id);
      window.removeEventListener('scroll', on_scroll);
      cancelAnimationFrame(raf_id);
      unbind_lenis?.();
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden>
      <div className="scroll-progress__fill" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
};

export default ScrollProgressBar;
