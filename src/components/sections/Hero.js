import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import config from '../../utils/configUtils';
import Typed from 'typed.js';

// Animation variants
const textVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 0.2,
      ease: "easeOut"
    }
  }
};

const buttonVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.4,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
    transition: {
      duration: 0.3,
      yoyo: Infinity
    }
  }
};

// Styled components
const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  
  @media (max-width: 992px) {
    flex-direction: column-reverse;
    text-align: center;
  }
`;

const HeroContent = styled(motion.div)`
  flex: 1;
  
  @media (max-width: 992px) {
    width: 100%;
  }
`;

const Name = styled(motion.h1)`
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(
    135deg, 
    var(--primary-color) 0%, 
    var(--accent-color) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Title = styled(motion.h2)`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--text-color);
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const TypedContainer = styled.span`
  color: var(--primary-color);
  font-weight: 600;
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  max-width: 600px;
  margin-bottom: 2rem;
  color: var(--secondary-text-color);
  
  @media (max-width: 992px) {
    margin: 0 auto 2rem auto;
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CtaButton = styled(motion.a)`
  display: inline-block;
  background: var(--primary-color);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 500;
  font-size: 1.1rem;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(76, 161, 175, 0.4);
  
  &:hover {
    background: var(--accent-color);
    color: white;
  }
`;

const HeroImageContainer = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 992px) {
    width: 100%;
    max-width: 400px;
    margin-bottom: 3rem;
  }
`;

const ProfileImage = styled(motion.div)`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid rgba(76, 161, 175, 0.3);
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
`;

// Hero component
const Hero = () => {
  const typedRef = useRef(null);
  const typedElement = useRef(null);
  
  const headerData = config.get('header', {});
  
  // Initialize typed.js
  useEffect(() => {
    if (headerData.typedStrings && headerData.typedStrings.length > 0 && typedElement.current) {
      typedRef.current = new Typed(typedElement.current, {
        strings: headerData.typedStrings,
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        startDelay: 500,
        loop: true,
      });
      
      return () => {
        if (typedRef.current) {
          typedRef.current.destroy();
        }
      };
    }
  }, [headerData.typedStrings]);
  
  // Determine profile image source
  const getProfileImage = () => {
    if (headerData.profileImage) {
      return headerData.profileImage;
    }
    // Use a seed to get consistent random image
    return "https://picsum.photos/200/300";
  };
  
  return (
    <Section
      id="home"
      fullHeight
      bgColor="var(--background-color)"
      padding="0"
    >
      <HeroContainer>
        <HeroContent
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          <Name variants={textVariants}>
            {headerData.name || 'John Doe'}
          </Name>
          
          <Title variants={textVariants}>
            {headerData.title ? (
              <>
                I'm a <TypedContainer ref={typedElement}></TypedContainer>
              </>
            ) : (
              'Senior React Developer'
            )}
          </Title>
          
          <Description variants={textVariants}>
            Specialized in creating beautiful, high-performance web applications with modern technologies and best practices.
          </Description>
          
          {headerData.ctaText && (
            <CtaButton
              href={headerData.ctaUrl || '#contact'}
              variants={buttonVariants}
              whileHover="hover"
            >
              {headerData.ctaText}
            </CtaButton>
          )}
        </HeroContent>
        
        <HeroImageContainer
          initial="hidden"
          animate="visible"
        >
          <ProfileImage variants={imageVariants}>
            <img 
              src={getProfileImage()} 
              alt={headerData.name || 'Profile'}
            />
          </ProfileImage>
        </HeroImageContainer>
      </HeroContainer>
    </Section>
  );
};

export default Hero; 