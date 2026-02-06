import React from 'react';
import './SwitchCard.css';

interface SwitchCardProps {
  children: React.ReactNode;
}

const SwitchCard: React.FC<SwitchCardProps> = ({ children }) => {
  return (
    <div className="switch-card-wrapper">
      <div className="switch-card">
        <div className="switch-joy-con switch-joy-con-left">
          <div className="switch-minus button" />
          <div className="switch-joystick">
            <div className="switch-joystick-inner-border">
              <div className="switch-joystick-inner" />
            </div>
            <div className="switch-joystick-edge" />
            <div className="switch-joystick-edge" />
            <div className="switch-joystick-edge" />
            <div className="switch-joystick-edge" />
          </div>
          <div className="switch-numpad-container">
            <div className="switch-numpad-part switch-numpad-top">
              <div className="switch-numpad-button">▲</div>
            </div>
            <div className="switch-numpad-part switch-numpad-middle">
              <div className="switch-numpad-button">◀</div>
              <div className="switch-numpad-button">▶</div>
            </div>
            <div className="switch-numpad-part switch-numpad-bottom">
              <div className="switch-numpad-button">▼</div>
            </div>
          </div>
          <div className="switch-record-button">
            <div className="switch-record-button-inner" />
          </div>
        </div>
        <div className="switch-screen-outline">
          <div className="switch-screen-border">
            <div className="switch-screen">
              {children}
            </div>
          </div>
        </div>
        <div className="switch-joy-con switch-joy-con-right">
          <div className="switch-plus-symbol">
            <div className="switch-plus-symbol-overlap-fixer" />
          </div>
          <div className="switch-joystick">
            <div className="switch-joystick-inner-border">
              <div className="switch-joystick-inner" />
            </div>
            <div className="switch-joystick-edge" />
            <div className="switch-joystick-edge" />
            <div className="switch-joystick-edge" />
            <div className="switch-joystick-edge" />
          </div>
          <div className="switch-numpad-container">
            <div className="switch-numpad-part switch-numpad-top">
              <div className="switch-numpad-button">X</div>
            </div>
            <div className="switch-numpad-part switch-numpad-middle">
              <div className="switch-numpad-button">Y</div>
              <div className="switch-numpad-button">A</div>
            </div>
            <div className="switch-numpad-part switch-numpad-bottom">
              <div className="switch-numpad-button">B</div>
            </div>
          </div>
          <div className="switch-home-button-border">
            <div className="switch-home-button">⌂</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwitchCard;
