import React from 'react';
import styled from 'styled-components';

interface AboutCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const StyledWrapper = styled.div`
  flex: 1 1 0;
  min-height: 0;
  display: flex;

  .card-container {
    width: 100%;
    height: 100%;
    border-radius: 0.75em;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  }

  .header {
    flex-shrink: 0;
    background: #ffffff;
    border-bottom: 1px solid #e2e8f0;
  }

  .top-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    height: 52px;
    padding: 0 16px;
    box-sizing: border-box;
  }

  .card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2em;
    height: 2em;
    padding: 0.4em;
    border-radius: 0.4em;
    background: #f1f5f9;
    outline: 1px solid #e2e8f0;
    color: #0ea5e9;
    flex-shrink: 0;
  }

  .card-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1e293b;
  }

  .content {
    flex: 1;
    min-height: 0;
    padding: 12px 16px;
    display: flex;
    align-items: flex-start;
  }

  .card-desc {
    font-size: 0.875rem;
    line-height: 1.55;
    color: #64748b;
    font-weight: 400;
    margin: 0;
  }
`;

const AboutCard: React.FC<AboutCardProps> = ({ title, description, icon }) => {
  return (
    <StyledWrapper>
      <div className="card-container">
        <div className="header">
          <div className="top-header">
            <div className="card-icon">{icon}</div>
            <span className="card-title">{title}</span>
          </div>
        </div>
        <div className="content">
          <p className="card-desc">{description}</p>
        </div>
      </div>
    </StyledWrapper>
  );
};

export default AboutCard;
