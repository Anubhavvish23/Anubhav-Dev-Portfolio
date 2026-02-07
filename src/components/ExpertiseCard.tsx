import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

interface ExpertiseItem {
  name: string;
  percentage: number;
}

interface ExpertiseCardProps {
  items: ExpertiseItem[];
  is_dark?: boolean;
}

const StyledWrapper = styled.div<{ $item_count: number, $is_dark: boolean }>`
  .expertise-card {
    max-width: 440px;
    width: 90%;
    padding: 26px;
    border-radius: 35px;
    background: ${(props) => (props.$is_dark ? '#0a0a0a' : '#fff')};
    color: ${(props) => (props.$is_dark ? '#ffffff' : '#000')};
    box-shadow: ${(props) => (props.$is_dark ? '0 10px 30px rgba(0, 0, 0, 0.5)' : '0 10px 30px rgba(0, 0, 0, 0.12)')};
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .logo {
    font-weight: bold;
    font-size: 1.35em;
  }

  .expertise-switch {
    position: relative;
    display: flex;
    background: ${(props) => (props.$is_dark ? '#141414' : '#e8e8e8')};
    border-radius: 20px;
    padding: 4px;
    gap: 8px;
    margin-bottom: 16px;
    user-select: none;
  }

  .expertise-switch input {
    display: none;
  }

  .expertise-switch label {
    flex: 1;
    text-align: center;
    padding: 10px 0;
    border-radius: 16px;
    cursor: pointer;
    color: ${(props) => (props.$is_dark ? '#a0a0a0' : '#666')};
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: color 0.3s;
    font-size: 0.95em;
  }

  .expertise-switch input:checked + label {
    color: ${(props) => (props.$is_dark ? '#ffffff' : '#000')};
  }

  .expertise-switch .slider {
    position: absolute;
    top: 4px;
    bottom: 4px;
    width: calc((100% - ${(props) => (props.$item_count - 1) * 8}px) / ${(props) => props.$item_count});
    background: ${(props) => (props.$is_dark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.9)')};
    -webkit-backdrop-filter: blur(1px);
    backdrop-filter: blur(0.5px);
    border: 1px solid ${(props) => (props.$is_dark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)')};
    border-radius: 16px;
    z-index: 1;
    transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    box-shadow: ${(props) => props.$is_dark ? '0 2px 8px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)'};
  }

  .expertise-switch input:hover + label {
    color: ${(props) => (props.$is_dark ? '#fff' : '#000')};
  }

  .percentage-info {
    margin-bottom: 16px;
  }

  .percentage-info .percentage {
    font-size: 2.5em;
    font-weight: bold;
    margin-bottom: 4px;
    color: ${(props) => (props.$is_dark ? '#ffffff' : 'inherit')};
  }

  .percentage-info .label {
    font-size: 1em;
    color: ${(props) => (props.$is_dark ? '#b0b0b0' : '#555')};
  }

  .radial-chart {
    height: 160px;
    background: ${(props) => (props.$is_dark ? '#0f0f0f' : '#f5f5f5')};
    border-radius: 12px;
    position: relative;
    overflow: hidden;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .radial-chart svg {
    width: 140px;
    height: 140px;
    transform: rotate(-90deg);
  }

  .radial-chart .track {
    fill: none;
    stroke: ${(props) => (props.$is_dark ? '#262626' : '#ddd')};
    stroke-width: 8;
  }

  .radial-chart .fill {
    fill: none;
    stroke: ${(props) => (props.$is_dark ? '#ffffff' : '#000')};
    stroke-width: 8;
    stroke-linecap: round;
    stroke-dasharray: 251.2;
    transition: stroke-dashoffset 0.8s ease-out;
  }
`;

const ExpertiseCard: React.FC<ExpertiseCardProps> = ({ items, is_dark }) => {
  const { isDark } = useTheme();
  const effective_dark = is_dark ?? isDark;
  const [selected_index, set_selected_index] = useState(0);
  const circumference = 2 * Math.PI * 40;
  const selected_item = items[selected_index];

  return (
    <StyledWrapper $item_count={items.length} $is_dark={effective_dark}>
      <div className="expertise-card">
        <div className="header">
          <span className="logo">Expertise</span>
        </div>
        <fieldset className="expertise-switch">
          {items.map((item, index) => (
            <React.Fragment key={item.name}>
              <input
                type="radio"
                id={`expertise-${index}`}
                name="expertise"
                checked={selected_index === index}
                onChange={() => set_selected_index(index)}
              />
              <label htmlFor={`expertise-${index}`}>
                {item.name.slice(0, 3).toUpperCase()}
              </label>
            </React.Fragment>
          ))}
          <div
            className="slider"
            style={{
              transform: `translateX(calc(${selected_index} * (100% + 8px)))`,
            }}
          />
        </fieldset>
        <div className="percentage-info">
          <div className="percentage">{selected_item.percentage}%</div>
          <div className="label">{selected_item.name}</div>
        </div>
        <div className="radial-chart">
          <svg viewBox="0 0 100 100">
            <circle className="track" cx="50" cy="50" r="40" />
            <circle
              className="fill"
              cx="50"
              cy="50"
              r="40"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: circumference * (1 - selected_item.percentage / 100),
              }}
            />
          </svg>
        </div>
      </div>
    </StyledWrapper>
  );
};

export default ExpertiseCard;
