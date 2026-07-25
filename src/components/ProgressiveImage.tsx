import React, { useEffect, useRef, useState } from 'react';

type Progressive_image_props = {
  src: string;
  alt: string;
  className?: string;
  img_class_name?: string;
  placeholder_color?: string;
  aspect_ratio?: string;
  priority?: boolean;
  hero?: boolean;
  bare?: boolean;
  width?: number;
  height?: number;
  object_position?: string;
  draggable?: boolean;
};

const ProgressiveImage: React.FC<Progressive_image_props> = ({
  src,
  alt,
  className = '',
  img_class_name = '',
  placeholder_color = '#0a0a0a',
  aspect_ratio,
  priority = false,
  hero = false,
  bare = false,
  width,
  height,
  object_position,
  draggable = false,
}) => {
  const img_ref = useRef<HTMLImageElement>(null);
  const [loaded, set_loaded] = useState(false);

  useEffect(() => {
    const img = img_ref.current;
    if (!img) return;

    if (img.complete && img.naturalWidth > 0) {
      set_loaded(true);
      return;
    }

    const on_load = () => set_loaded(true);
    img.addEventListener('load', on_load);
    return () => img.removeEventListener('load', on_load);
  }, [src]);

  return (
    <span
      className={`progressive-image ${bare ? 'is-bare' : ''} ${hero ? 'is-hero' : ''} ${loaded ? 'is-loaded' : ''} ${className}`}
      style={{
        backgroundColor: bare ? 'transparent' : placeholder_color,
        aspectRatio: aspect_ratio,
      }}
    >
      {!loaded && !bare && <span className="progressive-image__shimmer" aria-hidden />}
      <img
        ref={img_ref}
        src={src}
        alt={alt}
        className={`progressive-image__img ${img_class_name}`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
        width={width}
        height={height}
        draggable={draggable}
        style={object_position ? { objectPosition: object_position } : undefined}
        onLoad={() => set_loaded(true)}
      />
    </span>
  );
};

export default ProgressiveImage;
