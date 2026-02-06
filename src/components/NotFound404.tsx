import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound404.css';

const NotFound404: React.FC = () => {
  return (
    <div className="nf404-wrapper">
      <div className="nf404-main-wrapper">
        <div className="nf404-main">
          <div className="nf404-antenna">
            <div className="nf404-antenna_shadow" />
            <div className="nf404-a1" />
            <div className="nf404-a1d" />
            <div className="nf404-a2" />
            <div className="nf404-a2d" />
            <div className="nf404-a_base" />
          </div>
          <div className="nf404-tv">
            <div className="nf404-cruve">
              <svg className="nf404-curve_svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 189.929 189.929">
                <path d="M70.343,70.343c-30.554,30.553-44.806,72.7-39.102,115.635l-29.738,3.951C-5.442,137.659,11.917,86.34,49.129,49.13 C86.34,11.918,137.664-5.445,189.928,1.502l-3.95,29.738C143.041,25.54,100.895,39.789,70.343,70.343z" />
              </svg>
            </div>
            <div className="nf404-display_div">
              <div className="nf404-screen_out">
                <div className="nf404-screen_out1">
                  <div className="nf404-screen">
                    <span className="nf404-notfound_text"> NOT FOUND</span>
                  </div>
                  <div className="nf404-screenM">
                    <span className="nf404-notfound_text"> NOT FOUND</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="nf404-lines">
              <div className="nf404-line1" />
              <div className="nf404-line2" />
              <div className="nf404-line3" />
            </div>
            <div className="nf404-buttons_div">
              <div className="nf404-b1"><div /></div>
              <div className="nf404-b2" />
              <div className="nf404-speakers">
                <div className="nf404-g1">
                  <div className="nf404-g11" />
                  <div className="nf404-g12" />
                  <div className="nf404-g13" />
                </div>
                <div className="nf404-g" />
                <div className="nf404-g" />
              </div>
            </div>
          </div>
          <div className="nf404-bottom">
            <div className="nf404-base1" />
            <div className="nf404-base2" />
            <div className="nf404-base3" />
          </div>
        </div>
        <div className="nf404-text_404">
          <div className="nf404-text_4041">4</div>
          <div className="nf404-text_4042">0</div>
          <div className="nf404-text_4043">4</div>
        </div>
      </div>
      <Link to="/" className="nf404-home-link">Go Back Home</Link>
    </div>
  );
};

export default NotFound404;
