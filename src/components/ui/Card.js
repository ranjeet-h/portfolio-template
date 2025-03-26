import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../../styles/theme';

// Card variants
const CARD_VARIANTS = {
  default: {
    background: 'var(--card-background-color)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  glass: {
    background: 'rgba(44, 62, 80, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
  },
  solid: {
    background: 'var(--background-light-color)',
    border: 'none',
  },
  outline: {
    background: 'transparent',
    border: '1px solid var(--primary-color)',
  },
};

// Default animations
const DEFAULT_ANIMATIONS = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { 
    duration: 0.5,
    ease: [0.25, 0.1, 0.25, 1.0], // Cubic bezier for smooth easing
  },
  whileHover: { 
    y: -5,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
  },
};

const StyledCard = styled(motion.div)`
  position: relative;
  padding: ${({ padding, theme }) => padding || theme.spacing[6]};
  border-radius: ${({ rounded, theme }) => 
    rounded === 'full' ? theme.borderRadius.full : 
    rounded === 'xl' ? theme.borderRadius['2xl'] : 
    rounded === 'lg' ? theme.borderRadius.xl : 
    rounded === 'md' ? theme.borderRadius.lg : 
    theme.borderRadius.md
  };
  overflow: hidden;
  will-change: transform;
  height: ${({ height }) => height || 'auto'};
  width: ${({ width }) => width || '100%'};
  max-width: ${({ maxWidth }) => maxWidth || 'none'};
  box-shadow: ${({ theme, elevation }) => 
    elevation === 'none' ? theme.boxShadow.none :
    elevation === 'sm' ? theme.boxShadow.sm :
    elevation === 'md' ? theme.boxShadow.md :
    elevation === 'lg' ? theme.boxShadow.lg :
    elevation === 'xl' ? theme.boxShadow.xl :
    theme.boxShadow.default
  };
  
  /* Apply card variant styles */
  background: ${({ variant }) => CARD_VARIANTS[variant].background};
  border: ${({ variant }) => CARD_VARIANTS[variant].border};
  backdrop-filter: ${({ variant }) => CARD_VARIANTS[variant].backdropFilter || 'none'};
  
  /* Interactive states if hoverable */
  &:hover {
    cursor: ${({ hoverable }) => hoverable ? 'pointer' : 'default'};
  }
  
  /* Optional gradient overlay */
  ${({ gradient }) => gradient && `
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${gradient};
      z-index: -1;
      border-radius: inherit;
    }
  `}
  
  /* Optional accent border on top */
  ${({ accentTop, theme }) => accentTop && `
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: var(--primary-color);
    }
  `}
`;

const Card = ({
  children,
  variant = 'default',
  elevation = 'default',
  rounded = 'md',
  padding,
  width,
  height,
  maxWidth,
  hoverable = false,
  gradient,
  accentTop = false,
  animations = {},
  ...props
}) => {
  const theme = useTheme();
  
  // Merge default animations with custom ones
  const motionProps = hoverable ? {
    ...DEFAULT_ANIMATIONS,
    ...animations,
  } : {};
  
  return (
    <StyledCard
      variant={variant}
      elevation={elevation}
      rounded={rounded}
      padding={padding}
      width={width}
      height={height}
      maxWidth={maxWidth}
      hoverable={hoverable}
      gradient={gradient}
      accentTop={accentTop}
      theme={theme}
      {...motionProps}
      {...props}
    >
      {children}
    </StyledCard>
  );
};

export default Card; 