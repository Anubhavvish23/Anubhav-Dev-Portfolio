import { useState, useEffect } from 'react';

export interface PerformanceProfile {
  prefers_reduced_motion: boolean;
  is_mobile: boolean;
  is_coarse_pointer: boolean;
  enable_heavy_effects: boolean;
  enable_3d_scene: boolean;
  enable_custom_cursor: boolean;
  enable_mouse_follower: boolean;
  enable_parallax: boolean;
}

const get_profile = (): PerformanceProfile => {
  if (typeof window === 'undefined') {
    return {
      prefers_reduced_motion: false,
      is_mobile: false,
      is_coarse_pointer: false,
      enable_heavy_effects: true,
      enable_3d_scene: true,
      enable_custom_cursor: true,
      enable_mouse_follower: true,
      enable_parallax: true,
    };
  }

  const prefers_reduced_motion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const is_mobile = window.matchMedia('(max-width: 767px)').matches;
  const is_coarse_pointer = window.matchMedia('(pointer: coarse)').matches;
  const enable_heavy_effects = !prefers_reduced_motion && !is_mobile;

  return {
    prefers_reduced_motion,
    is_mobile,
    is_coarse_pointer,
    enable_heavy_effects,
    enable_3d_scene: enable_heavy_effects,
    enable_custom_cursor: enable_heavy_effects && !is_coarse_pointer,
    enable_mouse_follower: enable_heavy_effects && !is_coarse_pointer,
    enable_parallax: enable_heavy_effects,
  };
};

export const usePerformanceProfile = () => {
  const [profile, set_profile] = useState<PerformanceProfile>(get_profile);

  useEffect(() => {
    const update = () => set_profile(get_profile());
    const queries = [
      window.matchMedia('(prefers-reduced-motion: reduce)'),
      window.matchMedia('(max-width: 767px)'),
      window.matchMedia('(pointer: coarse)'),
    ];

    queries.forEach((mq) => mq.addEventListener('change', update));
    return () => queries.forEach((mq) => mq.removeEventListener('change', update));
  }, []);

  return profile;
};
