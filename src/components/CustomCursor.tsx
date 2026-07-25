import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePerformanceProfile } from '../hooks/usePerformanceProfile';

const is_interactive = (target: EventTarget | null) => {
  if (!(target instanceof Element)) return false;
  return Boolean(target.closest('a, button, [role="button"], input, textarea, label, summary'));
};

const CustomCursor = () => {
  const { enable_custom_cursor } = usePerformanceProfile();
  const [mouse_position, set_mouse_position] = useState({ x: 0, y: 0 });
  const [is_hovering, set_is_hovering] = useState(false);

  useEffect(() => {
    if (!enable_custom_cursor) return;

    const update_mouse_position = (event: MouseEvent) => {
      set_mouse_position({ x: event.clientX, y: event.clientY });
      set_is_hovering(is_interactive(event.target));
    };

    window.addEventListener('mousemove', update_mouse_position, { passive: true });
    return () => window.removeEventListener('mousemove', update_mouse_position);
  }, [enable_custom_cursor]);

  if (!enable_custom_cursor) {
    return null;
  }

  return (
    <>
      <motion.div
        className={`custom-cursor__dot ${is_hovering ? 'is-hovering' : ''}`}
        animate={{
          x: mouse_position.x - 5,
          y: mouse_position.y - 5,
          scale: is_hovering ? 2.4 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 850,
          damping: 38,
          mass: 0.4,
        }}
      />
      <motion.div
        className={`custom-cursor__ring ${is_hovering ? 'is-hovering' : ''}`}
        animate={{
          x: mouse_position.x - 18,
          y: mouse_position.y - 18,
          scale: is_hovering ? 1.55 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 280,
          damping: 26,
          mass: 0.7,
        }}
      />
    </>
  );
};

export default CustomCursor;
