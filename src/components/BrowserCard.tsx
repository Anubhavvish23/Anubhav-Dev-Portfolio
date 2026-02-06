import React from 'react';
import './BrowserCard.css';

interface BrowserCardProps {
  children: React.ReactNode;
  tab_label?: string;
}

const BrowserCard: React.FC<BrowserCardProps> = ({ children, tab_label = 'My Story' }) => {
  return (
    <div className="browser-card h-full">
      <div className="browser-card__browser">
        <div className="browser-card__tabs-head">
          <div className="browser-card__tabs">
            <div className="browser-card__tab-open">
              <div className="browser-card__rounded-l"><div className="browser-card__mask-round" /></div>
              <span>{tab_label}</span>
              <div className="browser-card__close-tab">✕</div>
              <div className="browser-card__rounded-r"><div className="browser-card__mask-round" /></div>
            </div>
          </div>
          <div className="browser-card__window-opt">
            <button type="button">−</button>
            <button type="button">□</button>
            <button type="button" className="browser-card__window-close">✕</button>
          </div>
        </div>
        <div className="browser-card__head-browser">
          <button type="button">←</button>
          <button type="button" disabled>→</button>
          <input type="text" placeholder="Search Google or type URL" defaultValue="my-story" readOnly />
          <button type="button">⋮</button>
          <button type="button" className="browser-card__star">✰</button>
        </div>
        <div className="browser-card__content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BrowserCard;
