import React from 'react';
import styled from 'styled-components';

interface HoverCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const StyledWrapper = styled.div`
  .card-stack {
    position: relative;
    width: 100%;
    max-width: 320px;
    min-height: 254px;
    cursor: pointer;
    margin: 0 auto;
  }

  .card-item {
    position: absolute;
    width: 100%;
    height: 254px;
    border-radius: 20px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    left: 0;
    top: 0;
  }

  .card-item:nth-child(1) {
    z-index: 3;
    background-color: #fff;
  }

  .card-item:nth-child(2) {
    z-index: 2;
    background: linear-gradient(to bottom, #1a1a1a 65%, #0d0d0d 65%);
    transform: translate(8px, 8px);
    opacity: 0;
  }

  .card-item:nth-child(3) {
    z-index: 1;
    background: linear-gradient(to bottom, #2d2d2d 65%, #1a1a1a 65%);
    transform: translate(16px, 16px);
    opacity: 0;
  }

  .card-stack:hover .card-item:nth-child(2) {
    opacity: 1;
    transform: translate(6px, 6px);
  }

  .card-stack:hover .card-item:nth-child(3) {
    opacity: 1;
    transform: translate(12px, 12px);
  }

  .card-stack:hover .card-item:nth-child(1) {
    box-shadow: 0px 2px 2px #0a3bffa1;
    border: solid 1px #0a3cff;
  }

  .top-card {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    height: 65%;
    transition: height 0.3s ease;
  }

  .card-item:nth-child(1) .top-card {
    background-color: #fff;
  }

  .card-item:nth-child(2) .top-card {
    background-color: #1a1a1a;
  }

  .card-item:nth-child(3) .top-card {
    background-color: #2d2d2d;
  }

  .bottom-card {
    position: relative;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    height: 35%;
    transition: height 0.3s ease;
  }

  .card-item:nth-child(1) .bottom-card {
    background-color: #0a3cff;
  }

  .card-item:nth-child(2) .bottom-card {
    background-color: #0d0d0d;
  }

  .card-item:nth-child(3) .bottom-card {
    background-color: #1a1a1a;
  }

  .card-item:nth-child(1) .bottom-card::before {
    content: "";
    position: absolute;
    background-color: transparent;
    bottom: 89px;
    height: 50px;
    width: 94%;
    left: 3%;
    transition: bottom 0.3s ease;
    border-bottom-left-radius: 20px;
    box-shadow: 0 30px 0 0 #0a3cff;
  }

  .card-item:nth-child(2) .bottom-card::before {
    content: "";
    position: absolute;
    background-color: transparent;
    bottom: 89px;
    height: 50px;
    width: 94%;
    left: 3%;
    transition: bottom 0.3s ease;
    border-bottom-left-radius: 20px;
    box-shadow: 0 30px 0 0 #0d0d0d;
  }

  .card-item:nth-child(3) .bottom-card::before {
    content: "";
    position: absolute;
    background-color: transparent;
    bottom: 89px;
    height: 50px;
    width: 94%;
    left: 3%;
    transition: bottom 0.3s ease;
    border-bottom-left-radius: 20px;
    box-shadow: 0 30px 0 0 #1a1a1a;
  }

  .card-content {
    padding-top: 13%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .card-item:nth-child(1) .card-content {
    color: #fff;
  }

  .card-item:nth-child(2) .card-content,
  .card-item:nth-child(3) .card-content {
    color: #fff;
  }

  .card-title {
    font-weight: 700;
    font-size: 18px;
  }

  .card-txt {
    font-size: 14px;
    line-height: 1.5;
    text-align: center;
    padding: 0 8px;
  }

  .top-card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #0a3cff;
  }

  .card-item:nth-child(2) .top-card-icon {
    color: #60a5fa;
  }

  .card-item:nth-child(3) .top-card-icon {
    color: #93c5fd;
  }

  .card-stack:hover .top-card {
    height: 35%;
  }

  .card-stack:hover .bottom-card {
    height: 65%;
  }

  .card-stack:hover .bottom-card::before {
    bottom: 164px;
  }
`;

const HoverCard: React.FC<HoverCardProps> = ({ title, description, icon }) => {
  return (
    <StyledWrapper>
      <div className="card-stack">
        <div className="card-item">
          <div className="top-card">
            <div className="top-card-icon">{icon}</div>
          </div>
          <div className="bottom-card">
            <div className="card-content">
              <span className="card-title">{title}</span>
              <p className="card-txt">{description}</p>
            </div>
          </div>
        </div>
        <div className="card-item">
          <div className="top-card">
            <div className="top-card-icon">{icon}</div>
          </div>
          <div className="bottom-card">
            <div className="card-content">
              <span className="card-title">{title}</span>
              <p className="card-txt">{description}</p>
            </div>
          </div>
        </div>
        <div className="card-item">
          <div className="top-card">
            <div className="top-card-icon">{icon}</div>
          </div>
          <div className="bottom-card">
            <div className="card-content">
              <span className="card-title">{title}</span>
              <p className="card-txt">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

export default HoverCard;
