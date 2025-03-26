import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { setAnimationComplete } from '../redux/slices/uiSlice';
import { setActiveSection } from '../redux/slices/portfolioSlice';

export const useIntersectionObserver = (
  sectionId,
  threshold = 0.3,
  triggerOnce = false,
  rootMargin = '0px'
) => {
  const dispatch = useDispatch();
  
  const { ref, inView, entry } = useInView({
    threshold,
    triggerOnce,
    rootMargin,
  });

  useEffect(() => {
    if (inView) {
      // Mark animation as complete for this section
      dispatch(setAnimationComplete({
        section: sectionId,
        isComplete: true,
      }));
      
      // Set this as the active section
      dispatch(setActiveSection(sectionId));
    }
  }, [inView, sectionId, dispatch]);

  return { ref, inView, entry };
};

export default useIntersectionObserver; 