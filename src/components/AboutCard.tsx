import React from 'react';
import styled from 'styled-components';

interface AboutCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  is_dark?: boolean;
}

const StyledWrapper = styled.div<{ $is_dark: boolean }>`
  .card-container {
    position: relative;
    width: 100%;
    max-width: 480px;
    min-height: 200px;
    border-radius: 1em;
    margin: 0 auto;
  }

  .card-border {
    position: absolute;
    inset: 0;
    background: ${(props) => (props.$is_dark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)')};
    border-radius: inherit;
  }

  .card {
    position: absolute;
    inset: 0.125em;
    border-radius: 0.875em;
    background: ${(props) => (props.$is_dark ? '#0a0a0a' : '#f8fafc')};
    display: flex;
    flex-direction: column;
    color: ${(props) => (props.$is_dark ? '#ffffff' : '#1e293b')};
    overflow: hidden;
  }

  .header {
    background: ${(props) => (props.$is_dark ? '#0f0f0f' : '#f1f5f9')};
    display: flex;
    flex-direction: column;
    gap: 4px;
    border-bottom: 1px solid ${(props) => (props.$is_dark ? '#1a1a1a' : '#e2e8f0')};
  }

  .top-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
  }

  .card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5em;
    height: 2.5em;
    padding: 0.5em;
    border-radius: 0.5em;
    background: ${(props) => (props.$is_dark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0')};
    outline: 1px solid ${(props) => (props.$is_dark ? '#262626' : '#cbd5e1')};
    color: ${(props) => (props.$is_dark ? '#93c5fd' : '#0ea5e9')};
  }

  .card-title {
    font-size: 1.5em;
    font-weight: 600;
    color: ${(props) => (props.$is_dark ? '#ffffff' : '#1e293b')};
  }

  .content {
    flex: 1;
    padding: 14px 20px;
    overflow: auto;
  }

  .card-desc {
    font-size: 16px;
    line-height: 1.6;
    color: ${(props) => (props.$is_dark ? '#ffffff' : '#64748b')};
    font-weight: 300;
  }

  .backdrop {
    position: absolute;
    inset: -100%;
    background: radial-gradient(
      circle at 50% 50%,
      #0000 0,
      #0000 20%,
      #111111aa 50%
    );
    background-size: 3px 3px;
    z-index: -1;
  }

  .spin {
    position: absolute;
    inset: 0;
    z-index: -2;
    overflow: hidden;
  }

  .spin-blur {
    filter: blur(3em) url(#about-unopaq);
  }

  .spin-intense {
    inset: -0.125em;
    filter: blur(0.5em) url(#about-unopaq2);
    border-radius: 0.75em;
  }

  .spin-inside {
    inset: -2px;
    border-radius: inherit;
    filter: blur(2px) url(#about-unopaq3);
    z-index: 0;
  }

  .spin::before {
    content: "";
    position: absolute;
    inset: -30%;
    animation: about-speen 8s cubic-bezier(0.56, 0.15, 0.28, 0.86) infinite;
  }

  .spin-blur::before {
    background: linear-gradient(-45deg, #f50, #0000 46% 54%, #05f);
  }

  .spin-intense::before {
    background: linear-gradient(-45deg, #f95, #0000 35% 65%, #59f);
  }

  .spin-inside::before {
    background: linear-gradient(-45deg, #fc9, #0000 35% 65%, #9cf);
  }

  @keyframes about-speen {
    0% { rotate: 10deg; }
    50% { rotate: 190deg; }
    to { rotate: 370deg; }
  }
`;

const AboutCard: React.FC<AboutCardProps> = ({ title, description, icon, is_dark = false }) => {
  return (
    <StyledWrapper $is_dark={is_dark}>
      <div className="card-container">
        <div className="spin spin-blur" />
        <div className="spin spin-intense" />
        <div className="backdrop" />
        <div className="card-border">
          <div className="spin spin-inside" />
        </div>
        <div className="card">
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
      </div>
    </StyledWrapper>
  );
};

export default AboutCard;
