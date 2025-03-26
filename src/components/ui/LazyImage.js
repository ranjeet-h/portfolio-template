import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * LazyImage component that loads images only when they're in/near the viewport
 * Implements progressive loading with blur-up effect and proper handling of different 
 * image sizes, formats, and loading states
 */
const LazyImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  lowQualitySrc, // Optional low quality placeholder
  onLoad,
  style = {},
  placeholderColor = '#e2e2e2',
  rootMargin = '200px 0px',
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin
  });

  // Track when image becomes visible
  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  // Handle image load
  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const imageStyles = {
    ...style,
    transition: 'filter 0.5s ease, opacity 0.5s ease',
    filter: !isLoaded ? 'blur(10px)' : 'blur(0)',
    opacity: !isLoaded ? 0.6 : 1,
    width: width || 'auto',
    height: height || 'auto'
  };

  const placeholderStyles = {
    backgroundColor: placeholderColor,
    width: width || '100%',
    height: height || '300px',
    display: isLoaded ? 'none' : 'block'
  };

  return (
    <div 
      ref={ref}
      className={`lazy-image-container ${className}`}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Placeholder shown until image loads */}
      <div style={placeholderStyles} aria-hidden="true" />

      {/* Only start loading when near viewport */}
      {isVisible && (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          style={imageStyles}
          loading="lazy" // Use browser's native lazy loading
          decoding="async" // Hint to browser to decode image asynchronously
          {...rest}
        />
      )}
      
      {/* Optional low quality placeholder image for blur-up effect */}
      {lowQualitySrc && !isLoaded && isVisible && (
        <img
          src={lowQualitySrc}
          alt=""
          aria-hidden="true"
          style={{
            ...imageStyles,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            filter: 'blur(15px)',
            opacity: 0.7,
          }}
        />
      )}
    </div>
  );
};

export default LazyImage; 