import React from 'react';
import { Global, css } from '@emotion/react';

const GlobalStyles = () => (
  <Global
    styles={css`
      :root {
        /* Theme variables will be injected via ThemeProvider */
        --transition-speed: 0.3s;
        --border-radius-sm: 8px;
        --border-radius-md: 16px;
        --border-radius-lg: 24px;
        --box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.2), -8px -8px 16px rgba(255, 255, 255, 0.05);
        --box-shadow-hover: 12px 12px 24px rgba(0, 0, 0, 0.3), -12px -12px 24px rgba(255, 255, 255, 0.1);
        --container-width: 1200px;
        
        /* These will be the default (dark mode) colors */
        --primary-color: #4ca1af;
        --secondary-color: #2c3e50;
        --accent-color: #e74c3c;
        --background-color: #121212;
        --alternate-background-color: #1a1a1a;
        --card-background-color: rgba(32, 32, 32, 0.8);
        --text-color: #ffffff;
        --secondary-text-color: #b0b0b0;
      }
      
      /* Light mode class applied to :root */
      .light-mode {
        --background-color: #f5f5f5;
        --alternate-background-color: #e9e9e9;
        --card-background-color: rgba(255, 255, 255, 0.9);
        --text-color: #333333;
        --secondary-text-color: #6c6c6c;
        --box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.8);
        --box-shadow-hover: 12px 12px 24px rgba(0, 0, 0, 0.15), -12px -12px 24px rgba(255, 255, 255, 0.9);
      }
      
      /* Dark mode class applied to :root */
      .dark-mode {
        --background-color: #121212;
        --alternate-background-color: #1a1a1a;
        --card-background-color: rgba(32, 32, 32, 0.8);
        --text-color: #ffffff;
        --secondary-text-color: #b0b0b0;
        --box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.2), -8px -8px 16px rgba(255, 255, 255, 0.05);
        --box-shadow-hover: 12px 12px 24px rgba(0, 0, 0, 0.3), -12px -12px 24px rgba(255, 255, 255, 0.1);
      }

      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      html {
        scroll-behavior: smooth;
        scrollbar-width: thin;
        scrollbar-color: var(--primary-color) var(--background-color);
      }

      body {
        margin: 0;
        padding: 0;
        font-family: var(--font-primary);
        background-color: var(--background-color);
        color: var(--text-color);
        line-height: 1.6;
        overflow-x: hidden;
        transition: background-color 0.3s ease, color 0.3s ease;
      }

      ::-webkit-scrollbar {
        width: 8px;
      }

      ::-webkit-scrollbar-track {
        background: var(--background-color);
      }

      ::-webkit-scrollbar-thumb {
        background-color: var(--primary-color);
        border-radius: 20px;
      }

      h1, h2, h3, h4, h5, h6 {
        font-family: var(--font-secondary);
        margin-bottom: 1rem;
        line-height: 1.3;
        font-weight: 600;
      }

      h1 {
        font-size: 3.5rem;
        
        @media (max-width: 768px) {
          font-size: 2.2rem;
        }
      }

      h2 {
        font-size: 2.5rem;
        
        @media (max-width: 768px) {
          font-size: 1.8rem;
        }
      }

      h3 {
        font-size: 2rem;
        
        @media (max-width: 768px) {
          font-size: 1.5rem;
        }
      }

      p {
        margin-bottom: 1rem;
      }

      a {
        color: var(--primary-color);
        text-decoration: none;
        transition: color 0.3s ease;
        
        &:hover {
          color: var(--accent-color);
        }
      }

      img {
        max-width: 100%;
        height: auto;
      }

      button, .button {
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 0.8rem 1.5rem;
        border-radius: 50px;
        cursor: pointer;
        font-family: var(--font-primary);
        font-weight: 500;
        transition: all var(--transition-speed) ease;
        
        @media (max-width: 768px) {
          padding: 0.7rem 1.2rem;
          font-size: 0.9rem;
        }
        
        &:hover {
          background: var(--accent-color);
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        
        &:active {
          transform: translateY(-1px);
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        }
        
        &.secondary {
          background: transparent;
          border: 2px solid var(--primary-color);
          
          &:hover {
            background: var(--primary-color);
            color: var(--text-color);
          }
        }
      }

      section {
        padding: 5rem 0;
        
        @media (max-width: 768px) {
          padding: 2.5rem 0;
        }
      }

      .container {
        width: 100%;
        max-width: var(--container-width);
        margin: 0 auto;
        padding: 0 2rem;
        
        @media (max-width: 768px) {
          padding: 0 1rem;
        }
      }

      .section-title {
        text-align: center;
        margin-bottom: 3rem;
        
        @media (max-width: 768px) {
          margin-bottom: 2rem;
        }
        
        h2 {
          color: var(--primary-color);
          margin-bottom: 1rem;
          
          @media (max-width: 768px) {
            margin-bottom: 0.5rem;
          }
        }
        
        p {
          color: var(--secondary-text-color);
          max-width: 700px;
          margin: 0 auto;
          font-size: 1.2rem;
          
          @media (max-width: 768px) {
            font-size: 1rem;
          }
        }
      }

      .card {
        background: var(--card-background-color);
        border-radius: var(--border-radius-md);
        padding: 2rem;
        margin-bottom: 2rem;
        backdrop-filter: blur(10px);
        box-shadow: var(--box-shadow);
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: transform var(--transition-speed) ease, box-shadow var(--transition-speed) ease;
        
        &:hover {
          transform: translateY(-5px);
          box-shadow: var(--box-shadow-hover);
        }
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        gap: 2rem;
        
        @media (max-width: 768px) {
          gap: 1.5rem;
        }
        
        @media (max-width: 480px) {
          gap: 1rem;
        }
      }

      .visible-animation {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
        
        &.visible {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .tag {
        display: inline-block;
        background: rgba(76, 161, 175, 0.1);
        color: var(--primary-color);
        padding: 0.4rem 0.8rem;
        border-radius: 50px;
        font-size: 0.85rem;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
        border: 1px solid rgba(76, 161, 175, 0.2);
        transition: all var(--transition-speed) ease;
        
        &:hover {
          background: rgba(76, 161, 175, 0.2);
        }
      }
    `}
  />
);

export default GlobalStyles; 