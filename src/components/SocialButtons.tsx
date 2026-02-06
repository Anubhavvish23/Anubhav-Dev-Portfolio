import React from 'react';
import { FaInstagram, FaEnvelope, FaGithub, FaPhone } from 'react-icons/fa';
import './SocialButtons.css';

const SocialButtons: React.FC = () => {
  return (
    <div className="social-btns-main">
      <div className="social-btns-up">
        <a
          href="https://www.instagram.com/gro.with.anubhav?igsh=Z3llYnYyMmtkYjRt"
          target="_blank"
          rel="noopener noreferrer"
          className="social-btns-card card1"
          aria-label="Instagram"
        >
          <FaInstagram className="social-btns-icon icon-instagram" />
        </a>
        <a
          href="mailto:anubhavsanjay01@gmail.com"
          className="social-btns-card card2"
          aria-label="Email"
        >
          <FaEnvelope className="social-btns-icon icon-mail" />
        </a>
      </div>
      <div className="social-btns-down">
        <a
          href="https://github.com/Anubhavvish23"
          target="_blank"
          rel="noopener noreferrer"
          className="social-btns-card card3"
          aria-label="GitHub"
        >
          <FaGithub className="social-btns-icon icon-github" />
        </a>
        <a
          href="tel:+919880502538"
          className="social-btns-card card4"
          aria-label="Phone"
        >
          <FaPhone className="social-btns-icon icon-phone" />
        </a>
      </div>
    </div>
  );
};

export default SocialButtons;
