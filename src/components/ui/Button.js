import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../../styles/theme';

// Button variants
const VARIANTS = {
  primary: {
    background: 'var(--primary-color)',
    color: 'white',
    border: 'none',
    hoverBackground: 'var(--accent-color)',
    hoverColor: 'white',
  },
  secondary: {
    background: 'transparent',
    color: 'var(--primary-color)',
    border: '2px solid var(--primary-color)',
    hoverBackground: 'var(--primary-color)',
    hoverColor: 'white',
  },
  accent: {
    background: 'var(--accent-color)',
    color: 'white',
    border: 'none',
    hoverBackground: 'var(--secondary-color)',
    hoverColor: 'white',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-color)',
    border: '1px solid var(--text-color)',
    hoverBackground: 'rgba(255, 255, 255, 0.1)',
    hoverColor: 'var(--accent-color)',
  },
  minimal: {
    background: 'transparent',
    color: 'var(--text-color)',
    border: 'none',
    hoverBackground: 'transparent',
    hoverColor: 'var(--primary-color)',
  },
};

// Button sizes
const SIZES = {
  small: {
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
  },
  medium: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
  },
  large: {
    padding: '1rem 2rem',
    fontSize: '1.125rem',
  },
};

// Base styles for both button and anchor
const baseStyles = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--font-primary);
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  outline: none;
  white-space: nowrap;
  text-decoration: none;
  
  /* Focus state */
  &:focus {
    box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.3);
  }
  
  /* Active state */
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  /* Icon positioning */
  .icon-left {
    margin-right: 0.5rem;
  }
  
  .icon-right {
    margin-left: 0.5rem;
  }
  
  /* Loading spinner */
  .loading-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const StyledButton = styled(motion.button)`
  ${baseStyles}
  
  border-radius: ${({ rounded, theme }) => (rounded ? theme.borderRadius.full : theme.borderRadius.md)};
  
  /* Apply variants */
  background: ${({ variant }) => VARIANTS[variant].background};
  color: ${({ variant }) => VARIANTS[variant].color};
  border: ${({ variant }) => VARIANTS[variant].border};
  
  /* Apply sizes */
  padding: ${({ size }) => SIZES[size].padding};
  font-size: ${({ size }) => SIZES[size].fontSize};
  
  /* Full width option */
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  
  /* Disabled state */
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  
  /* Hover state (only if not disabled) */
  &:hover:not(:disabled) {
    background: ${({ variant }) => VARIANTS[variant].hoverBackground};
    color: ${({ variant }) => VARIANTS[variant].hoverColor};
    transform: translateY(-2px);
  }
  
  /* Hide content when loading */
  ${({ isLoading }) => isLoading && `
    .button-content {
      opacity: 0;
    }
  `}
`;

const StyledAnchor = styled(motion.a)`
  ${baseStyles}
  
  border-radius: ${({ rounded, theme }) => (rounded ? theme.borderRadius.full : theme.borderRadius.md)};
  
  /* Apply variants */
  background: ${({ variant }) => VARIANTS[variant].background};
  color: ${({ variant }) => VARIANTS[variant].color};
  border: ${({ variant }) => VARIANTS[variant].border};
  
  /* Apply sizes */
  padding: ${({ size }) => SIZES[size].padding};
  font-size: ${({ size }) => SIZES[size].fontSize};
  
  /* Full width option */
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  
  /* Disabled state */
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  
  /* Hover state */
  &:hover {
    background: ${({ variant }) => VARIANTS[variant].hoverBackground};
    color: ${({ variant }) => VARIANTS[variant].hoverColor};
    transform: translateY(-2px);
  }
  
  /* Hide content when loading */
  ${({ isLoading }) => isLoading && `
    .button-content {
      opacity: 0;
    }
  `}
`;

// Spinner component for loading state
const LoadingSpinner = styled.div`
  width: 1.2em;
  height: 1.2em;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  rounded = false,
  fullWidth = false,
  disabled = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  onClick,
  href,
  whileHover = { scale: 1.02 },
  whileTap = { scale: 0.98 },
  ...props
}) => {
  const theme = useTheme();
  
  const content = (
    <>
      {isLoading && <LoadingSpinner className="loading-spinner" />}
      <span className="button-content">
        {leftIcon && <span className="icon-left">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="icon-right">{rightIcon}</span>}
      </span>
    </>
  );
  
  // If href is provided, render an anchor tag
  if (href) {
    return (
      <StyledAnchor
        href={href}
        variant={variant}
        size={size}
        rounded={rounded}
        fullWidth={fullWidth}
        disabled={disabled || isLoading}
        isLoading={isLoading}
        whileHover={whileHover}
        whileTap={whileTap}
        theme={theme}
        {...props}
      >
        {content}
      </StyledAnchor>
    );
  }
  
  // Otherwise render a button
  return (
    <StyledButton
      variant={variant}
      size={size}
      rounded={rounded}
      fullWidth={fullWidth}
      disabled={disabled || isLoading}
      isLoading={isLoading}
      onClick={onClick}
      whileHover={whileHover}
      whileTap={whileTap}
      theme={theme}
      {...props}
    >
      {content}
    </StyledButton>
  );
};

export default Button; 