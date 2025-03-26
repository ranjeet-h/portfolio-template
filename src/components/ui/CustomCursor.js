import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectCursorType } from '../../redux/slices/uiSlice';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const StyledCursor = styled(motion.div)`
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  will-change: transform;
  
  &.cursor-outer {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.8);
    transition: all 0.2s ease-out;
  }
  
  &.cursor-inner {
    width: 6px;
    height: 6px;
    background-color: white;
    border-radius: 50%;
    transition: width 0.3s ease-out, height 0.3s ease-out;
  }
  
  &.link-cursor {
    width: 80px;
    height: 80px;
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    
    &::after {
      content: 'View';
      color: white;
      font-size: 10px;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
  }
  
  &.button-cursor {
    width: 60px;
    height: 60px;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(4px);
    
    &::after {
      content: 'Click';
      color: white;
      font-size: 10px;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
  }
  
  &.text-cursor {
    width: 8px;
    height: 25px;
    border-radius: 0;
    background-color: white;
    backdrop-filter: blur(4px);
  }
  
  &.video-cursor {
    width: 70px;
    height: 70px;
    background-color: rgba(255, 0, 0, 0.3);
    backdrop-filter: blur(4px);
    
    &::after {
      content: 'Play';
      color: white;
      font-size: 10px;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
  }
`;

const CustomCursor = () => {
  const cursorType = useSelector(selectCursorType);
  const cursorOuterRef = useRef(null);
  const cursorInnerRef = useRef(null);
  
  useEffect(() => {
    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      
      if (cursorOuterRef.current) {
        // Add some lag to outer cursor for a smoother effect
        cursorOuterRef.current.style.transform = `translate3d(calc(${clientX}px - 50%), calc(${clientY}px - 50%), 0)`;
      }
      
      if (cursorInnerRef.current) {
        // Inner cursor follows exactly
        cursorInnerRef.current.style.transform = `translate3d(calc(${clientX}px - 50%), calc(${clientY}px - 50%), 0)`;
      }
    };
    
    document.addEventListener('mousemove', moveCursor);
    
    return () => {
      document.removeEventListener('mousemove', moveCursor);
    };
  }, []);
  
  // Hide system cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);
  
  return (
    <>
      <StyledCursor 
        ref={cursorOuterRef}
        className={`cursor-outer custom-cursor ${cursorType}-cursor`}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {['link', 'button', 'video'].includes(cursorType) && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </StyledCursor>
      
      {cursorType === 'default' && (
        <StyledCursor 
          ref={cursorInnerRef}
          className="cursor-inner custom-cursor"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </>
  );
};

export default CustomCursor; 