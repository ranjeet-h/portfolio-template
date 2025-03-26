import React, { useEffect, lazy, Suspense, useState } from 'react';
import './App.css';
import ThemeProvider from './utils/ThemeProvider';
import GlobalStyles from './styles/GlobalStyles';
import Navigation from './components/ui/Navigation';
import Footer from './components/ui/Footer';
import ThemeSettings from './components/ui/ThemeSettings';
import useScrollPosition from './hooks/useScrollPosition';
import useCursorEffect from './hooks/useCursorEffect';
import useLazySection from './hooks/useLazySection';
import { useDispatch } from 'react-redux';
import { updateDimensions } from './redux/slices/uiSlice';

// Chunk sizes:
// - Hero: 9.7KB
// - About: 13KB
// - Projects: 14KB
// - Skills: 24KB
// - Experience: 14KB
// - Contact: 30KB

// Lazy load section components with explicit chunk names
const Hero = lazy(() => import(/* webpackChunkName: "hero" */ './components/sections/Hero'));
const About = lazy(() => import(/* webpackChunkName: "about" */ './components/sections/About'));
const Projects = lazy(() => import(/* webpackChunkName: "projects" */ './components/sections/Projects'));
const Skills = lazy(() => import(/* webpackChunkName: "skills" */ './components/sections/Skills'));
const ExperienceSection = lazy(() => import(/* webpackChunkName: "experience" */ './components/sections/Experience'));
const ContactSection = lazy(() => import(/* webpackChunkName: "contact" */ './components/sections/Contact'));

// Loading component
const LoadingFallback = () => (
  <div className="section-loading">
    <div className="loader"></div>
  </div>
);

// LazySection component to intelligently load sections
const LazySection = ({ component: Component, id }) => {
  const { ref, shouldLoad } = useLazySection();
  
  return (
    <div ref={ref} id={id} className="lazy-section-wrapper">
      {shouldLoad && (
        <Suspense fallback={<LoadingFallback />}>
          <Component />
        </Suspense>
      )}
      {!shouldLoad && <LoadingFallback />}
    </div>
  );
};

function App() {
  const dispatch = useDispatch();
  
  // Initialize scroll position tracking for these sections
  useScrollPosition([
    'hero',
    'about',
    'skills',
    'experience',
    'projects',
    'education',
    'certifications',
    'testimonials',
    'contact'
  ]);
  
  // Initialize custom cursor effects
  useCursorEffect();
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      dispatch(updateDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      }));
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  return (
    <ThemeProvider>
      <GlobalStyles />
      <div className="App">
        <Navigation />
        <main>
          {/* Hero section should always load immediately */}
          <Suspense fallback={<LoadingFallback />}>
            <Hero />
          </Suspense>
          
          {/* Other sections load as user scrolls */}
          <LazySection component={About} id="about" />
          <LazySection component={Projects} id="projects" />
          <LazySection component={Skills} id="skills" />
          <LazySection component={ExperienceSection} id="experience" />
          <LazySection component={ContactSection} id="contact" />
        </main>
        <Footer />
        <ThemeSettings />
        {/* <CustomCursor /> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
