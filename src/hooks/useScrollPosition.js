import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateScrollProgress, setScrollDirection, setNavVisibility, setActiveHash } from '../redux/slices/uiSlice';

export const useScrollPosition = (sections = []) => {
  const dispatch = useDispatch();
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollHeight > 0 ? currentScrollY / scrollHeight : 0;
      
      // Update scroll progress in Redux
      dispatch(updateScrollProgress(scrollProgress));
      
      // Check scroll direction
      const isScrollingUp = currentScrollY < lastScrollTop;
      dispatch(setScrollDirection(isScrollingUp));
      
      // Auto hide/show nav based on scroll direction
      if (currentScrollY > 100) {
        dispatch(setNavVisibility(isScrollingUp));
      } else {
        dispatch(setNavVisibility(true));
      }
      
      // Update active section based on scroll position
      if (sections.length > 0) {
        const viewportHeight = window.innerHeight;
        const currentPosition = currentScrollY + viewportHeight * 0.3;
        
        for (let i = 0; i < sections.length; i++) {
          const section = document.getElementById(sections[i]);
          
          if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (
              currentPosition >= sectionTop && 
              currentPosition < sectionTop + sectionHeight
            ) {
              dispatch(setActiveHash(`#${sections[i]}`));
              break;
            }
          }
        }
      }
      
      setLastScrollTop(currentScrollY);
      setScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop, dispatch, sections]);
  
  return scrollY;
};

export default useScrollPosition; 