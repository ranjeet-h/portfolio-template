import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * A hook for intelligently lazy loading sections when they're about to come into view
 * 
 * @param {number} threshold - Visibility threshold to trigger loading (0-1)
 * @param {string} rootMargin - Root margin for intersection observer (CSS format)
 * @param {boolean} preloadWhenClose - Whether to preload when close to viewport
 * @returns {Object} Containing ref to attach and whether the section should load
 */
export const useLazySection = (
  threshold = 0.1,
  rootMargin = '200px 0px', // Preload content 200px before it comes into view
  preloadWhenClose = true
) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  
  // Always define both hooks but with different options
  const { ref: preloadRef, inView: approaching } = useInView({
    rootMargin: '500px 0px',
    threshold: 0,
    triggerOnce: true,
    skip: !preloadWhenClose // Skip this observer if preloading is disabled
  });
  
  // Main observer to determine when element is actually visible
  const { ref: visibleRef, inView: visible } = useInView({
    threshold,
    rootMargin,
    triggerOnce: true,
  });
  
  // Combine refs
  const setRefs = (element) => {
    if (preloadWhenClose) {
      preloadRef(element);
    }
    visibleRef(element);
  };
  
  useEffect(() => {
    // If approaching or visible, we should load the component
    if (approaching || visible) {
      setShouldLoad(true);
    }
  }, [approaching, visible]);
  
  return { ref: setRefs, shouldLoad };
};

export default useLazySection; 