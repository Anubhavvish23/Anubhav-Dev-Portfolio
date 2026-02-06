import React, { useEffect } from 'react';
import './LoadingScreen.css';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="loader-wrapper">
      <div className="loader-container">
        <div className="loader-macbook">
          <div className="loader-macbook__topBord">
            <div className="loader-macbook__display">
              <div className="loader-macbook__load" />
            </div>
          </div>
          <div className="loader-macbook__underBord">
            <div className="loader-macbook__keybord">
              <div className="loader-keybord">
                <div className="loader-keybord__touchbar" />
                <ul className="loader-keybord__keyBox">
                  <li className="loader-keybord__key loader-key--01" />
                  <li className="loader-keybord__key loader-key--02" />
                  <li className="loader-keybord__key loader-key--03" />
                  <li className="loader-keybord__key loader-key--04" />
                  <li className="loader-keybord__key loader-key--05" />
                  <li className="loader-keybord__key loader-key--06" />
                  <li className="loader-keybord__key loader-key--07" />
                  <li className="loader-keybord__key loader-key--08" />
                  <li className="loader-keybord__key loader-key--09" />
                  <li className="loader-keybord__key loader-key--10" />
                  <li className="loader-keybord__key loader-key--11" />
                  <li className="loader-keybord__key loader-key--12" />
                  <li className="loader-keybord__key loader-key--13" />
                </ul>
                <ul className="loader-keybord__keyBox--under">
                  <li className="loader-keybord__key loader-key--14" />
                  <li className="loader-keybord__key loader-key--15" />
                  <li className="loader-keybord__key loader-key--16" />
                  <li className="loader-keybord__key loader-key--17" />
                  <li className="loader-keybord__key loader-key--18" />
                  <li className="loader-keybord__key loader-key--19" />
                  <li className="loader-keybord__key loader-key--20" />
                  <li className="loader-keybord__key loader-key--21" />
                  <li className="loader-keybord__key loader-key--22" />
                  <li className="loader-keybord__key loader-key--23" />
                  <li className="loader-keybord__key loader-key--24" />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
