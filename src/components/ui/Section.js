import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const SectionContainer = styled.section`
  padding: ${props => props.padding || '5rem 0'};
  background-color: ${props => props.bgColor || 'transparent'};
  position: relative;
  overflow: hidden;
  
  ${props => props.fullHeight && `
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    @media (max-width: 768px) {
      min-height: calc(100vh - 60px);
    }
  `}
  
  ${props => props.hasBgImage && `
    background-image: url(${props.bgImage});
    background-size: cover;
    background-position: center;
    background-attachment: ${props.parallax ? 'fixed' : 'scroll'};
    
    @media (max-width: 768px) {
      background-attachment: scroll;
    }
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      z-index: 1;
    }
  `}
  
  @media (max-width: 768px) {
    padding: ${props => props.mobilepadding || '2.5rem 0'};
  }
`;

const SectionContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const SectionTitle = styled(motion.div)`
  text-align: ${props => props.align || 'center'};
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
  
  h2 {
    color: var(--primary-color);
    margin-bottom: 0.5rem;
    position: relative;
    display: inline-block;
    
    ${props => props.align === 'center' && `
      &::after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: -0.5rem;
        transform: translateX(-50%);
        width: 80px;
        height: 3px;
        background: var(--primary-color);
        
        @media (max-width: 768px) {
          width: 60px;
          height: 2px;
        }
      }
    `}
    
    ${props => props.align === 'left' && `
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -0.5rem;
        width: 80px;
        height: 3px;
        background: var(--primary-color);
        
        @media (max-width: 768px) {
          width: 60px;
          height: 2px;
        }
      }
    `}
  }
  
  p {
    color: var(--secondary-text-color);
    font-size: 1.2rem;
    max-width: ${props => props.align === 'center' ? '700px' : 'none'};
    margin: ${props => props.align === 'center' ? '0 auto' : '0'};
    
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

/**
 * A reusable section component with animation on scroll
 */
const Section = ({
  id,
  title,
  subtitle,
  bgColor,
  bgImage,
  fullHeight = false,
  padding,
  mobilepadding,
  align = 'center',
  parallax = false,
  titleAnimation = {},
  contentAnimation = {},
  children
}) => {
  const sectionRef = useRef(null);
  
  // Animation variants
  const defaultTitleAnimation = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      } 
    }
  };
  
  const defaultContentAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        delay: 0.3,
        ease: "easeOut"
      } 
    }
  };
  
  // Merge default animations with provided ones
  const titleVariants = { ...defaultTitleAnimation, ...titleAnimation };
  const contentVariants = { ...defaultContentAnimation, ...contentAnimation };
  
  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <SectionContainer 
      id={id}
      ref={sectionRef}
      className="visible-animation"
      bgColor={bgColor}
      hasBgImage={!!bgImage}
      bgImage={bgImage}
      fullHeight={fullHeight}
      padding={padding}
      mobilepadding={mobilepadding}
      parallax={parallax}
      data-testid={`section-${id}`}
    >
      <SectionContent>
        {(title || subtitle) && (
          <SectionTitle
            align={align}
            as={motion.div}
            initial="hidden"
            animate="visible"
            variants={titleVariants}
          >
            {title && <h2>{title}</h2>}
            {subtitle && <p>{subtitle}</p>}
          </SectionTitle>
        )}
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={contentVariants}
        >
          {children}
        </motion.div>
      </SectionContent>
    </SectionContainer>
  );
};

export default Section; 