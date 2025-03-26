import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCursorType } from '../redux/slices/uiSlice';

export const useCursorEffect = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cursor = document.querySelector('.custom-cursor');
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseEnter = (e) => {
      const cursorType = e.currentTarget.dataset.cursor;
      if (cursorType) {
        dispatch(setCursorType(cursorType));
      }
    };

    const handleMouseLeave = () => {
      dispatch(setCursorType('default'));
    };

    // Add mousemove event listener to update cursor position
    document.addEventListener('mousemove', handleMouseMove);

    // Find all elements with data-cursor attribute and set up event listeners
    const cursorElements = document.querySelectorAll('[data-cursor]');
    cursorElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Add specific cursor types for common elements
    const links = document.querySelectorAll('a:not([data-cursor])');
    const buttons = document.querySelectorAll('button:not([data-cursor])');
    
    links.forEach((link) => {
      link.dataset.cursor = 'link';
      link.addEventListener('mouseenter', handleMouseEnter);
      link.addEventListener('mouseleave', handleMouseLeave);
    });

    buttons.forEach((button) => {
      button.dataset.cursor = 'button';
      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      
      cursorElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      
      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleMouseEnter);
        link.removeEventListener('mouseleave', handleMouseLeave);
      });
      
      buttons.forEach((button) => {
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [dispatch]);

  return null;
};

export default useCursorEffect; 