import React, { useState } from 'react';
import styled from 'styled-components';

interface ExpertiseItem {
  name: string;
  percentage: number;
}

interface ExpertiseCardProps {
  items: ExpertiseItem[];
}

const StyledWrapper = styled.div<{ $item_count: number }>`
  width: 100%;
  height: 100%;

  .expertise-card {
    width: 100%;
    height: 100%;
    padding: 20px;
    border-radius: 0.75rem;
    background: #ffffff;
    color: #1e293b;
    border: 1px solid #e2e8f0;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    flex-shrink: 0;
  }

  .logo {
    font-weight: 600;
    font-size: 1.125rem;
    color: #1e293b;
  }

  .expertise-switch {
    position: relative;
    display: flex;
    background: #f1f5f9;
    border-radius: 20px;
    padding: 4px;
    gap: 8px;
    margin-bottom: 16px;
    user-select: none;
    flex-shrink: 0;
  }

  .expertise-switch input {
    display: none;
  }

  .expertise-switch label {
    flex: 1;
    text-align: center;
    padding: 8px 0;
    border-radius: 16px;
    cursor: pointer;
    color: #64748b;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: color 0.3s;
    font-size: 0.8125rem;
    position: relative;
    z-index: 2;
  }

  .expertise-switch input:checked + label {
    color: #1e293b;
  }

  .expertise-switch .slider {
    position: absolute;
    top: 4px;
    bottom: 4px;
    width: calc((100% - ${(props) => (props.$item_count - 1) * 8}px) / ${(props) => props.$item_count});
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    z-index: 1;
    transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    box-shadow: none;
  }

  .expertise-switch input:hover + label {
    color: #1e293b;
  }

  .percentage-info {
    margin-bottom: 12px;
    flex-shrink: 0;
  }

  .percentage-info .percentage {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 4px;
    color: #1e293b;
  }

  .percentage-info .label {
    font-size: 0.875rem;
    color: #64748b;
  }

  .radial-chart {
    flex: 1;
    min-height: 120px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    position: relative;
    overflow: hidden;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .radial-chart svg {
    width: 120px;
    height: 120px;
    transform: rotate(-90deg);
  }

  .radial-chart .track {
    fill: none;
    stroke: #e2e8f0;
    stroke-width: 8;
  }

  .radial-chart .fill {
    fill: none;
    stroke: #000000;
    stroke-width: 8;
    stroke-linecap: round;
    stroke-dasharray: 251.2;
    transition: stroke-dashoffset 0.8s ease-out;
  }
`;

const ExpertiseCard: React.FC<ExpertiseCardProps> = ({ items }) => {
  const [selected_index, set_selected_index] = useState(0);
  const circumference = 2 * Math.PI * 40;
  const selected_item = items[selected_index];

  return (
    <StyledWrapper $item_count={items.length}>
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
                {item.name.replace(/[^a-zA-Z0-9]/g, '').slice(0, 3).toUpperCase()}
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
