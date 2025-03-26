import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import config from '../../utils/configUtils';

const SettingsButton = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 999;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  padding: 0;
  overflow: visible;
  
  @media (max-width: 768px) {
    bottom: 1.5rem;
    left: 1.5rem;
    width: 45px;
    height: 45px;
  }
`;

const ScrollToTopButton = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 999;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  opacity: ${props => (props.visible ? 1 : 0)};
  pointer-events: ${props => (props.visible ? 'auto' : 'none')};
  font-size: 24px; /* Fallback for text content */
  
  @media (max-width: 768px) {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 45px;
    height: 45px;
  }
`;

const SettingsPanel = styled(motion.div)`
  position: fixed;
  bottom: 7rem;
  left: 2rem;
  width: 300px;
  background: var(--card-background-color);
  border-radius: var(--border-radius-md);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  z-index: 998;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    border-radius: var(--border-radius-md) var(--border-radius-md) 0 0;
    max-height: 80vh;
    transform: none;
  }
`;

const PanelHeader = styled.div`
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  background: var(--card-background-color);
  z-index: 2;
  
  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }
  
  h3 {
    font-size: 1.3rem;
    color: var(--text-color);
    margin: 0;
  }
  
  button {
    background: transparent;
    border: none;
    color: var(--secondary-text-color);
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      color: var(--primary-color);
    }
  }
`;

const DragHandle = styled.div`
  display: none;
  width: 40px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  margin: 0 auto;
  position: absolute;
  top: 12px;
  left: 0;
  right: 0;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const PanelContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 10px;
  }
`;

const SettingGroup = styled.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const GroupTitle = styled.h4`
  font-size: 1rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.4rem;
    width: 30px;
    height: 2px;
    background: var(--primary-color);
  }
`;

const ColorOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
  
  label {
    color: var(--secondary-text-color);
    font-size: 0.95rem;
    font-weight: 500;
  }
`;

const ColorPicker = styled.div`
  margin-bottom: 1.5rem;
  
  h4 {
    color: var(--text-color);
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }
  
  .color-input-wrapper {
    display: flex;
    align-items: center;
    background: rgba(0, 0, 0, 0.2);
    border-radius: var(--border-radius-sm);
    padding: 0.5rem;
    
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
  }
  
  input[type="color"] {
    border: none;
    background: none;
    width: 50px;
    height: 35px;
    cursor: pointer;
    border-radius: var(--border-radius-sm);
    overflow: hidden;
    
    &::-webkit-color-swatch-wrapper {
      padding: 0;
    }
    
    &::-webkit-color-swatch {
      border: none;
      border-radius: var(--border-radius-sm);
    }
  }
  
  input[type="text"] {
    flex: 1;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--text-color);
    padding: 0.5rem;
    border-radius: var(--border-radius-sm);
    margin-left: 0.5rem;
    font-family: var(--font-mono);
    font-size: 0.9rem;
    
    @media (max-width: 768px) {
      margin-left: 0;
      width: calc(100% - 1rem);
    }
  }
`;

const PresetColors = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1rem;
`;

const ColorPreset = styled(motion.button)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: ${props => props.active ? '2px solid white' : '2px solid transparent'};
  background: ${props => props.color};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  padding: 0;
  margin: 0;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: center;
  box-shadow: ${props => props.active 
    ? '0 0 0 2px var(--primary-color), 0 2px 5px rgba(0, 0, 0, 0.3)' 
    : '0 2px 5px rgba(0, 0, 0, 0.2)'};
  transition: transform 0.2s ease, border 0.2s ease, box-shadow 0.2s ease;
  
  svg {
    color: white;
    font-size: 0.8rem;
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.3));
  }
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 0 2px rgba(76, 161, 175, 0.3), 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const ResetButton = styled(motion.button)`
  width: 100%;
  background: rgba(76, 161, 175, 0.1);
  color: var(--primary-color);
  border: 1px solid rgba(76, 161, 175, 0.2);
  padding: 0.8rem;
  border-radius: var(--border-radius-sm);
  margin-top: 1.5rem;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background: var(--primary-color);
    color: white;
  }
  
  svg {
    font-size: 1rem;
  }
`;

// Predefined color schemes
const colorPresets = [
  {
    name: 'Teal',
    primaryColor: '#4ca1af',
    secondaryColor: '#2c3e50',
    accentColor: '#e74c3c'
  },
  {
    name: 'Purple',
    primaryColor: '#9b59b6',
    secondaryColor: '#34495e',
    accentColor: '#f1c40f'
  },
  {
    name: 'Blue',
    primaryColor: '#3498db',
    secondaryColor: '#2c3e50',
    accentColor: '#e67e22'
  },
  {
    name: 'Green',
    primaryColor: '#2ecc71',
    secondaryColor: '#2c3e50',
    accentColor: '#e74c3c'
  },
  {
    name: 'Pink',
    primaryColor: '#e91e63',
    secondaryColor: '#212121',
    accentColor: '#ff9800'
  },
  {
    name: 'Amber',
    primaryColor: '#ff9800',
    secondaryColor: '#37474f',
    accentColor: '#9c27b0'
  }
];

// Animation variants
const panelVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: 'spring',
      stiffness: 300,
      damping: 30
    } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.9,
    transition: { 
      duration: 0.3,
      ease: 'easeInOut'
    } 
  }
};

const buttonVariants = {
  initial: { 
    rotate: 0 
  },
  active: { 
    rotate: 180,
    transition: { 
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
};

// Add the SVG icon components
const PaletteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24" fill="white" style={{minWidth: '24px', minHeight: '24px'}}>
    <path d="M204.3 5C104.9 24.4 24.8 104.3 5.2 203.4c-37 187 131.7 326.4 258.8 306.7 41.2-6.4 61.4-54.6 42.5-91.7-23.1-45.4 9.9-98.4 60.9-98.4h79.7c35.8 0 64.8-29.6 64.9-65.3C511.5 97.1 368.1-26.9 204.3 5zM96 320c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm32-128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128-64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"/>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="14" height="14" fill="white" style={{minWidth: '14px', minHeight: '14px'}}>
    <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/>
  </svg>
);

const UndoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" fill="currentColor">
    <path d="M255.545 8c-66.269.119-126.438 26.233-170.86 68.685L48.971 40.971C33.851 25.851 8 36.559 8 57.941V192c0 13.255 10.745 24 24 24h134.059c21.382 0 32.09-25.851 16.971-40.971l-41.75-41.75c30.864-28.899 70.801-44.907 113.23-45.273 92.398-.798 170.283 73.977 169.484 169.442C423.236 348.009 349.816 424 256 424c-41.127 0-79.997-14.678-110.63-41.556-4.743-4.161-11.906-3.908-16.368.553L89.34 422.659c-4.872 4.872-4.631 12.815.482 17.433C133.798 479.813 192.074 504 256 504c136.966 0 247.999-111.033 248-247.998C504.001 119.193 392.354 7.755 255.545 8z"/>
  </svg>
);

const ThemeSettings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [colors, setColors] = useState({
    primaryColor: getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim() || '#4ca1af',
    secondaryColor: getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim() || '#2c3e50',
    accentColor: getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim() || '#e74c3c'
  });
  
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Always set dark mode on component mount
  useEffect(() => {
    document.documentElement.classList.add('dark-mode');
    document.documentElement.classList.remove('light-mode');
    
    // Store the preference
    localStorage.setItem('theme-mode', 'dark');
  }, []);
  
  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Apply the color changes in real-time
  useEffect(() => {
    const root = document.documentElement;
    
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, [colors]);
  
  // Handle color change
  const handleColorChange = (e, color) => {
    const { value } = e.target;
    setColors({ ...colors, [color]: value });
  };
  
  // Apply a preset color scheme
  const applyPreset = (preset) => {
    setColors({
      ...colors,
      primaryColor: preset.primaryColor,
      secondaryColor: preset.secondaryColor,
      accentColor: preset.accentColor
    });
  };
  
  // Reset to default colors from config
  const resetColors = () => {
    setColors({
      primaryColor: getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim() || '#4ca1af',
      secondaryColor: getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim() || '#2c3e50',
      accentColor: getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim() || '#e74c3c'
    });
  };
  
  // Check if a preset is active
  const isPresetActive = (preset) => {
    return (
      colors.primaryColor === preset.primaryColor &&
      colors.secondaryColor === preset.secondaryColor &&
      colors.accentColor === preset.accentColor
    );
  };
  
  // Close panel when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the settings panel is open
      if (isOpen) {
        // Get the settings panel and button elements
        const panel = document.querySelector('[data-settings-panel]');
        const button = document.querySelector('[data-settings-button]');
        
        // If the click is outside both the panel and button, close the panel
        if (panel && button && 
            !panel.contains(event.target) && 
            !button.contains(event.target)) {
          setIsOpen(false);
        }
      }
    };
    
    // Add event listener when the panel is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    // Clean up event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  return (
    <>
      {/* <SettingsButton
        data-settings-button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <PaletteIcon />
      </SettingsButton> */}
      
      {/* <ScrollToTopButton
        visible={showScrollTop}
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0,
          y: showScrollTop ? 0 : 20 
        }}
        transition={{ duration: 0.3 }}
        aria-label="Scroll to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24" fill="white" style={{minWidth: '24px', minHeight: '24px'}}>
          <path d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"/>
        </svg>
        <span style={{position: 'absolute', opacity: 0}}>↑</span> Hidden fallback text */}
      {/* </ScrollToTopButton> */}
      
      <AnimatePresence>
        {isOpen && (
          <SettingsPanel
            data-settings-panel
            initial={window.innerWidth <= 768 ? { y: "100%" } : { opacity: 0, scale: 0.9 }}
            animate={window.innerWidth <= 768 ? { y: 0 } : { opacity: 1, scale: 1 }}
            exit={window.innerWidth <= 768 ? { y: "100%" } : { opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <DragHandle />
            <PanelHeader>
              <h3>Customize Theme</h3>
              <button onClick={() => setIsOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" width="20" height="20" fill="currentColor">
                  <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>
                </svg>
              </button>
            </PanelHeader>
            
            <PanelContent>
              <SettingGroup>
                <GroupTitle>Colors</GroupTitle>
                
                <ColorOption>
                  <label>Primary Color</label>
                  <ColorPicker>
                    <input
                      type="color"
                      value={colors.primaryColor}
                      onChange={(e) => handleColorChange(e, 'primaryColor')}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18" height="18" fill={colors.primaryColor}>
                      <path d="M167.02 309.34c-40.12 2.58-76.53 17.86-97.19 72.3-2.35 6.21-8 9.98-14.59 9.98-11.11 0-45.46-27.67-55.25-34.35C0 439.62 37.93 512 128 512c75.86 0 128-43.77 128-120.19 0-3.11-.65-6.08-.97-9.13l-88.01-73.34zM457.89 0c-15.16 0-29.37 6.71-40.21 16.45C213.27 199.05 192 203.34 192 257.09c0 13.7 3.25 26.76 8.73 38.7l63.82 53.18c7.21 1.8 14.64 3.03 22.39 3.03 62.11 0 98.11-45.47 211.16-256.46 7.38-14.35 13.9-29.85 13.9-45.99C512 20.64 486 0 457.89 0z"/>
                    </svg>
                  </ColorPicker>
                </ColorOption>
                
                <ColorOption>
                  <label>Secondary Color</label>
                  <ColorPicker>
                    <input
                      type="color"
                      value={colors.secondaryColor}
                      onChange={(e) => handleColorChange(e, 'secondaryColor')}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18" height="18" fill={colors.secondaryColor}>
                      <path d="M8 256c0 136.966 111.033 248 248 248s248-111.034 248-248S392.966 8 256 8 8 119.033 8 256zm248 184V72c101.705 0 184 82.311 184 184 0 101.705-82.311 184-184 184z"/>
                    </svg>
                  </ColorPicker>
                </ColorOption>
                
                <ColorOption>
                  <label>Accent Color</label>
                  <ColorPicker>
                    <input
                      type="color"
                      value={colors.accentColor}
                      onChange={(e) => handleColorChange(e, 'accentColor')}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18" height="18" fill={colors.accentColor}>
                      <path d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"/>
                    </svg>
                  </ColorPicker>
                </ColorOption>
              </SettingGroup>
              
              <SettingGroup>
                <GroupTitle>Presets</GroupTitle>
                <PresetColors>
                  {colorPresets.map((preset, index) => (
                    <ColorPreset
                      key={index}
                      color={preset.primaryColor}
                      active={isPresetActive(preset)}
                      onClick={() => applyPreset(preset)}
                      aria-label={`Apply ${preset.name} preset`}
                    >
                      {isPresetActive(preset) && 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="14" height="14" fill="white" style={{minWidth: '14px', minHeight: '14px'}}>
                          <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/>
                        </svg>
                      }
                    </ColorPreset>
                  ))}
                </PresetColors>
                
                <ResetButton
                  onClick={resetColors}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" fill="currentColor">
                    <path d="M255.545 8c-66.269.119-126.438 26.233-170.86 68.685L48.971 40.971C33.851 25.851 8 36.559 8 57.941V192c0 13.255 10.745 24 24 24h134.059c21.382 0 32.09-25.851 16.971-40.971l-41.75-41.75c30.864-28.899 70.801-44.907 113.23-45.273 92.398-.798 170.283 73.977 169.484 169.442C423.236 348.009 349.816 424 256 424c-41.127 0-79.997-14.678-110.63-41.556-4.743-4.161-11.906-3.908-16.368.553L89.34 422.659c-4.872 4.872-4.631 12.815.482 17.433C133.798 479.813 192.074 504 256 504c136.966 0 247.999-111.033 248-247.998C504.001 119.193 392.354 7.755 255.545 8z"/>
                  </svg>
                  <span style={{ marginLeft: '5px' }}>Reset to Default</span>
                </ResetButton>
              </SettingGroup>
            </PanelContent>
          </SettingsPanel>
        )}
      </AnimatePresence>
    </>
  );
};

export default ThemeSettings; 