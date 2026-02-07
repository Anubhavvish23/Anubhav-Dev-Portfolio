import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

interface ExperienceCardProps {
  company: string;
  role: string;
  year: string;
  icon: React.ReactNode;
  description: string;
  skills: string[];
  impact: string;
  is_dark?: boolean;
}

const StyledWrapper = styled.div<{ $is_dark: boolean }>`
  .card {
    width: 100%;
    max-width: 520px;
    padding: 28px;
    background: ${(props) => (props.$is_dark ? '#0a0a0a' : '#fff')};
    border: 6px solid ${(props) => (props.$is_dark ? '#262626' : '#000')};
    box-shadow: ${(props) => (props.$is_dark ? '12px 12px 0 rgba(255, 255, 255, 0.08)' : '12px 12px 0 #000')};
    transition: transform 0.3s, box-shadow 0.3s;
    color: ${(props) => (props.$is_dark ? '#ffffff' : 'inherit')};
  }

  .card:hover {
    transform: translate(-5px, -5px);
    box-shadow: ${(props) => (props.$is_dark ? '17px 17px 0 rgba(255, 255, 255, 0.12)' : '17px 17px 0 #000')};
  }

  .card__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 20px;
    gap: 16px;
  }

  .card__title-wrap {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .card__icon {
    padding: 12px;
    border: 3px solid ${(props) => (props.$is_dark ? '#262626' : '#000')};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: ${(props) => (props.$is_dark ? '#ffffff' : 'inherit')};
  }

  .card__title {
    font-size: 28px;
    font-weight: 900;
    color: ${(props) => (props.$is_dark ? '#ffffff' : '#000')};
    text-transform: uppercase;
    margin-bottom: 4px;
    display: block;
    position: relative;
    overflow: hidden;
  }

  .card__title::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 90%;
    height: 3px;
    background-color: ${(props) => (props.$is_dark ? '#fff' : '#000')};
    transform: translateX(-100%);
    transition: transform 0.3s;
  }

  .card:hover .card__title::after {
    transform: translateX(0);
  }

  .card__role {
    font-size: 16px;
    font-weight: 600;
    color: ${(props) => (props.$is_dark ? '#b0b0b0' : '#333')};
  }

  .card__year {
    padding: 8px 14px;
    border: 3px solid ${(props) => (props.$is_dark ? '#262626' : '#000')};
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    flex-shrink: 0;
    color: ${(props) => (props.$is_dark ? '#ffffff' : 'inherit')};
  }

  .card__content {
    font-size: 16px;
    line-height: 1.5;
    color: ${(props) => (props.$is_dark ? '#e0e0e0' : '#000')};
    margin-bottom: 20px;
  }

  .card__skills {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
  }

  .card__skill {
    padding: 8px 14px;
    border: 3px solid ${(props) => (props.$is_dark ? '#262626' : '#000')};
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    color: ${(props) => (props.$is_dark ? '#ffffff' : 'inherit')};
  }

  .card__impact {
    padding: 16px;
    border: 3px solid ${(props) => (props.$is_dark ? '#262626' : '#000')};
    background: ${(props) => (props.$is_dark ? '#141414' : '#000')};
    color: ${(props) => (props.$is_dark ? '#ffffff' : '#fff')};
  }

  .card__impact-label {
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .card__impact-text {
    font-size: 16px;
    font-weight: 600;
  }
`;

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  company,
  role,
  year,
  icon,
  description,
  skills,
  impact,
  is_dark,
}) => {
  const { isDark } = useTheme();
  const effective_dark = is_dark ?? isDark;

  return (
    <StyledWrapper $is_dark={effective_dark}>
      <div className="card">
        <div className="card__header">
          <div className="card__title-wrap">
            <div className="card__icon">{icon}</div>
            <div>
              <span className="card__title">{company}</span>
              <p className="card__role">{role}</p>
            </div>
          </div>
          <span className="card__year">{year}</span>
        </div>
        <p className="card__content">{description}</p>
        <div className="card__skills">
          {skills.map((skill) => (
            <span key={skill} className="card__skill">
              {skill}
            </span>
          ))}
        </div>
        <div className="card__impact">
          <div className="card__impact-label">Key Impact</div>
          <p className="card__impact-text">{impact}</p>
        </div>
      </div>
    </StyledWrapper>
  );
};

export default ExperienceCard;
