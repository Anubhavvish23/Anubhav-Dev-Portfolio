import { useState, useEffect } from 'react';

const section_ids = ['home', 'about', 'skills', 'projects', 'achievements', 'contact'];
const scroll_spy_offset = 140;

export const useActiveSection = (enabled: boolean) => {
  const [active_section, set_active_section] = useState('home');

  useEffect(() => {
    if (!enabled) {
      set_active_section('');
      return;
    }

    let frame_id = 0;

    const update_active_section = () => {
      let current = 'home';

      for (const id of section_ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= scroll_spy_offset) {
          current = id;
        }
      }

      set_active_section((prev) => (prev === current ? prev : current));
    };

    const on_scroll = () => {
      cancelAnimationFrame(frame_id);
      frame_id = requestAnimationFrame(update_active_section);
    };

    update_active_section();
    window.addEventListener('scroll', on_scroll, { passive: true });
    window.addEventListener('resize', on_scroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame_id);
      window.removeEventListener('scroll', on_scroll);
      window.removeEventListener('resize', on_scroll);
    };
  }, [enabled]);

  return active_section;
};
