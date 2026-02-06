import React from 'react';
import './Marquee.css';

interface MarqueeProps {
  items: string[];
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({ items, className = '' }) => {
  const duplicated = [...items, ...items, ...items];

  return (
    <div className={`overflow-hidden py-4 ${className}`}>
      <div className="marquee-track flex gap-6 w-max">
        {duplicated.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="text-base font-medium text-slate-600 dark:text-slate-400 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800/50 flex-shrink-0"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
