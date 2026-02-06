import { useState, useEffect } from 'react';

export const useCountUp = (end: number, start = 0, duration = 1500, in_view: boolean) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!in_view) return;

    let start_time: number | null = null;

    const animate = (timestamp: number) => {
      if (!start_time) start_time = timestamp;
      const elapsed = timestamp - start_time;
      const progress = Math.min(elapsed / duration, 1);
      const ease_out = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease_out * (end - start) + start));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, start, duration, in_view]);

  return count;
};
