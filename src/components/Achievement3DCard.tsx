import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Achievement3DCard.css';

interface AchievementItem {
  icon: React.ReactNode;
  text: string;
}

interface Achievement3DCardProps {
  year: string;
  theme: string;
  items: AchievementItem[];
  index: number;
  in_view: boolean;
}

const Achievement3DCard: React.FC<Achievement3DCardProps> = ({ year, theme, items, index, in_view }) => {
  const [card_ref, card_in_view] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px 0px -50px 0px'
  });

  const show_animation = in_view && card_in_view;

  return (
    <motion.div
      ref={card_ref}
      className="achievement-3d-parent"
      initial={{ opacity: 0, y: 40 }}
      animate={in_view ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div className={`achievement-3d-card ${show_animation ? 'achievement-3d-card--in-view' : ''}`}>
        <div className="achievement-3d-content-box">
          <span className="achievement-3d-card-title">{year}</span>
          <span className="achievement-3d-card-theme">{theme}</span>
          <div className="achievement-3d-card-content">
            {items.map((item, i) => (
              <div key={i} className="achievement-3d-item">
                <span className="achievement-3d-item-icon">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="achievement-3d-date-box">
          <span className="achievement-3d-month">{year.slice(0, 2)}</span>
          <span className="achievement-3d-date">{year.slice(-2)}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Achievement3DCard;
