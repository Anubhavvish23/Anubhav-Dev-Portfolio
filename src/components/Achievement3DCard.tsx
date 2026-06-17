import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface AchievementItem {
  icon: React.ReactNode;
  text: string;
}

interface Achievement3DCardProps {
  year: string;
  theme: string;
  icon: React.ReactNode;
  items: AchievementItem[];
  index: number;
  in_view: boolean;
}

const StyledWrapper = styled.div<{ $is_dark: boolean }>`
  width: 100%;

  .card {
    width: 100%;
    padding: 20px;
    background: ${(props) => (props.$is_dark ? '#0a0a0a' : '#fff')};
    border: 4px solid ${(props) => (props.$is_dark ? '#262626' : '#000')};
    box-shadow: ${(props) =>
      props.$is_dark ? '8px 8px 0 rgba(255, 255, 255, 0.08)' : '8px 8px 0 #000'};
    transition: transform 0.3s, box-shadow 0.3s;
    color: ${(props) => (props.$is_dark ? '#ffffff' : 'inherit')};
  }

  .card:hover {
    transform: translate(-4px, -4px);
    box-shadow: ${(props) =>
      props.$is_dark ? '12px 12px 0 rgba(255, 255, 255, 0.12)' : '12px 12px 0 #000'};
  }

  .card__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 16px;
    padding-bottom: 14px;
    border-bottom: 3px solid ${(props) => (props.$is_dark ? '#262626' : '#000')};
  }

  .card__title-wrap {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }

  .card__icon {
    padding: 10px;
    border: 2px solid ${(props) => (props.$is_dark ? '#262626' : '#000')};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: ${(props) => (props.$is_dark ? '#ffffff' : 'inherit')};
  }

  .card__title {
    font-size: 22px;
    font-weight: 900;
    color: ${(props) => (props.$is_dark ? '#ffffff' : '#000')};
    text-transform: uppercase;
    margin-bottom: 2px;
    display: block;
    position: relative;
    overflow: hidden;
    line-height: 1.1;
  }

  .card__title::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 90%;
    height: 2px;
    background-color: ${(props) => (props.$is_dark ? '#fff' : '#000')};
    transform: translateX(-100%);
    transition: transform 0.3s;
  }

  .card:hover .card__title::after {
    transform: translateX(0);
  }

  .card__theme {
    font-size: 12px;
    font-weight: 600;
    color: ${(props) => (props.$is_dark ? '#b0b0b0' : '#333')};
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .card__badge {
    padding: 6px 10px;
    border: 2px solid ${(props) => (props.$is_dark ? '#262626' : '#000')};
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    flex-shrink: 0;
    white-space: nowrap;
    color: ${(props) => (props.$is_dark ? '#ffffff' : 'inherit')};
  }

  .card__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 14px;
    padding: 12px;
    border: 2px solid ${(props) => (props.$is_dark ? '#262626' : '#000')};
    background: ${(props) => (props.$is_dark ? '#111111' : '#fafafa')};
  }

  .card__item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }

  .card__item-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    border: 2px solid ${(props) => (props.$is_dark ? '#262626' : '#000')};
    color: ${(props) => (props.$is_dark ? '#ffffff' : '#000')};
  }

  .card__item-icon svg {
    width: 16px;
    height: 16px;
  }

  .card__item-text {
    font-size: 13px;
    font-weight: 600;
    line-height: 1.5;
    color: ${(props) => (props.$is_dark ? '#e0e0e0' : '#000')};
    margin: 0;
  }

  .card__footer {
    padding: 12px;
    border: 2px solid ${(props) => (props.$is_dark ? '#262626' : '#000')};
    background: ${(props) => (props.$is_dark ? '#141414' : '#000')};
    color: ${(props) => (props.$is_dark ? '#ffffff' : '#fff')};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .card__footer-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .card__footer-value {
    font-size: 13px;
    font-weight: 700;
  }
`;

const Achievement3DCard: React.FC<Achievement3DCardProps> = ({
  year,
  theme,
  icon,
  items,
  index,
  in_view,
}) => {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={in_view ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
    >
      <StyledWrapper $is_dark={isDark}>
        <div className="card">
          <div className="card__header">
            <div className="card__title-wrap">
              <div className="card__icon">{icon}</div>
              <div>
                <span className="card__title">{year}</span>
                <p className="card__theme">{theme}</p>
              </div>
            </div>
            <span className="card__badge">{items.length} milestones</span>
          </div>

          <div className="card__list">
            {items.map((item, i) => (
              <div key={i} className="card__item">
                <span className="card__item-icon">{item.icon}</span>
                <p className="card__item-text">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="card__footer">
            <span className="card__footer-label">Chapter</span>
            <span className="card__footer-value">{theme}</span>
          </div>
        </div>
      </StyledWrapper>
    </motion.div>
  );
};

export default Achievement3DCard;
