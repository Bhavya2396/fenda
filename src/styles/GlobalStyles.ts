import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    /* Core Colors */
    --primary-red: #FF3B3B;
    --primary-red-soft: #FF5C5C;
    --primary-red-muted: #FF8080;
    
    /* Dark Neomorphic Colors */
    --bg-color-dark: #1a1b1e;
    --bg-color-darker: #141517;
    --bg-color-lighter: #22252a;
    --shadow-dark: rgba(0, 0, 0, 0.25);
    --shadow-light: rgba(255, 255, 255, 0.05);
    --text-color: rgba(255, 255, 255, 0.95);
    --text-color-soft: rgba(255, 255, 255, 0.7);
    --text-color-muted: rgba(255, 255, 255, 0.5);
    
    /* Accent Colors */
    --accent-blue: #4a90e2;
    --accent-green: #43c6ac;
    --accent-purple: #8e44ad;
    --accent-orange: #e67e22;
    
    /* Status Colors */
    --status-success: #2ecc71;
    --status-warning: #f1c40f;
    --status-error: #e74c3c;
    
    /* Dark Neomorphic Shadows */
    --shadow-flat: -5px -5px 10px var(--shadow-light),
                   5px 5px 10px var(--shadow-dark);
    --shadow-pressed: inset -4px -4px 8px var(--shadow-light),
                     inset 4px 4px 8px var(--shadow-dark);
    --shadow-hover: -8px -8px 16px var(--shadow-light),
                    8px 8px 16px var(--shadow-dark);
    
    /* Border Radius */
    --radius-sm: 12px;
    --radius-md: 16px;
    --radius-lg: 24px;
    --radius-xl: 32px;
    
    /* Transitions */
    --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-normal: 250ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
    
    /* Z-index Layers */
    --z-background: -1;
    --z-base: 0;
    --z-content: 1;
    --z-overlay: 50;
    --z-header: 100;
    --z-modal: 1000;
    --z-tooltip: 1500;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    height: 100%;
    
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  body {
    font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
    background: var(--bg-color-dark);
    color: var(--text-color);
    min-height: 100vh;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    
    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(
        circle at 50% 0%,
        var(--bg-color-lighter) 0%,
        var(--bg-color-dark) 100%
      );
      z-index: var(--z-background);
    }
  }

  #root {
    position: relative;
    z-index: var(--z-base);
  }

  /* Dark Neomorphic Classes */
  .neo-flat {
    background: var(--bg-color-dark);
    box-shadow: var(--shadow-flat);
    border-radius: var(--radius-md);
    transition: all var(--transition-normal);
    
    &:hover {
      box-shadow: var(--shadow-hover);
      transform: translateY(-2px);
    }
  }

  .neo-pressed {
    background: var(--bg-color-dark);
    box-shadow: var(--shadow-pressed);
    border-radius: var(--radius-md);
    transition: all var(--transition-normal);
  }

  .neo-button {
    background: var(--bg-color-dark);
    box-shadow: var(--shadow-flat);
    border-radius: var(--radius-md);
    transition: all var(--transition-normal);
    cursor: pointer;
    border: none;
    padding: 12px 24px;
    color: var(--text-color);
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    &:hover {
      box-shadow: var(--shadow-hover);
      transform: translateY(-2px);
    }

    &:active {
      box-shadow: var(--shadow-pressed);
      transform: translateY(0);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    svg {
      font-size: 1.2em;
      color: var(--primary-red-soft);
    }
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--bg-color-dark);
    border-radius: var(--radius-sm);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--bg-color-lighter);
    border-radius: var(--radius-sm);
    border: 2px solid var(--bg-color-dark);
    
    &:hover {
      background: var(--text-color-muted);
    }
  }

  /* Touch Device Optimizations */
  @media (hover: none) {
    .neo-flat:hover,
    .neo-button:hover {
      transform: none;
      box-shadow: var(--shadow-flat);
    }
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    color: var(--text-color);
    letter-spacing: -0.02em;
  }

  h1 { 
    font-size: 2.5rem; 
    font-weight: 700;
  }
  h2 { 
    font-size: 2rem; 
    font-weight: 600;
  }
  h3 { 
    font-size: 1.75rem; 
    font-weight: 600;
  }
  h4 { 
    font-size: 1.5rem; 
    font-weight: 500;
  }
  h5 { 
    font-size: 1.25rem; 
    font-weight: 500;
  }
  h6 { 
    font-size: 1rem; 
    font-weight: 500;
  }

  @media (max-width: 768px) {
    h1 { font-size: 2rem; }
    h2 { font-size: 1.75rem; }
    h3 { font-size: 1.5rem; }
    h4 { font-size: 1.25rem; }
    h5 { font-size: 1.125rem; }
    h6 { font-size: 1rem; }
  }

  /* Focus Styles */
  :focus-visible {
    outline: 2px solid var(--primary-red-soft);
    outline-offset: 2px;
  }

  /* Animation Keyframes */
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
    100% { transform: translateY(0px); }
  }

  @keyframes pulse {
    0% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.05); opacity: 1; }
    100% { transform: scale(1); opacity: 0.8; }
  }

  @keyframes glow {
    0% { box-shadow: 0 0 5px var(--primary-red-muted); }
    50% { box-shadow: 0 0 20px var(--primary-red-muted); }
    100% { box-shadow: 0 0 5px var(--primary-red-muted); }
  }
`; 