import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { 
  FaQuoteLeft, 
  FaStar, 
  FaLinkedin, 
  FaTwitter,
  FaPause,
  FaPlay,
  FaUserCircle
} from 'react-icons/fa';
import Section from '../ui/Section';
import config from '../../utils/configUtils';

const TestimonialsContainer = styled.div`
  max-width: 950px;
  margin: 0 auto;
  padding: 1rem;
  position: relative;
  min-height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    min-height: 400px;
    padding: 0.5rem;
  }
`;

const CardStack = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    height: 350px;
  }
`;

const CardWrapper = styled(motion.div)`
  position: absolute;
  width: 100%;
  max-width: 700px;
  height: 300px;
  border-radius: var(--border-radius-md);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);

  &:active {
    cursor: grabbing;
  }
  
  @media (max-width: 768px) {
    height: 350px;
  }
`;

const TestimonialCard = styled(motion.div)`
  background: var(--card-background-color);
  border-radius: var(--border-radius-md);
  padding: 3rem;
  box-shadow: var(--box-shadow);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(to bottom, var(--primary-color), var(--accent-color));
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(76, 161, 175, 0.1) 0%,
      rgba(76, 161, 175, 0) 70%
    );
    z-index: 0;
  }
`;

const QuoteIcon = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  color: rgba(76, 161, 175, 0.1);
  font-size: 3.5rem;
  
  svg {
    width: 50px;
    height: 50px;
    fill: rgba(76, 161, 175, 0.1);
  }
  
  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
    
    svg {
      width: 30px;
      height: 30px;
    }
  }
`;

const TestimonialText = styled.div`
  color: var(--secondary-text-color);
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2.5rem;
  font-style: italic;
  position: relative;
  z-index: 1;
  flex: 1;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    max-height: 150px;
  }
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 1;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const AuthorImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.h4`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-color);
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const AuthorTitle = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: var(--secondary-text-color);
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const Rating = styled.div`
  display: flex;
  gap: 0.2rem;
  margin-top: 0.5rem;
  
  svg {
    width: 16px;
    height: 16px;
    fill: #FFD700;
  }
`;

const ProgressIndicator = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1.5rem;
  
  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

const Dot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.active ? 'var(--primary-color)' : 'rgba(76, 161, 175, 0.2)'};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? 'var(--primary-color)' : 'rgba(76, 161, 175, 0.4)'};
  }
  
  @media (max-width: 768px) {
    width: 10px;
    height: 10px;
  }
`;

const InstructionText = styled.p`
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: var(--secondary-text-color);
  opacity: 0.7;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-top: 1rem;
  }
`;

const AutoplayControl = styled.button`
  background: rgba(255, 255, 255, 0.15);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-color);
  margin-top: 1rem;
  backdrop-filter: blur(5px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.1);
  }
  
  &:focus {
    outline: none;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 0.7rem;
  margin-top: 0.7rem;
`;

const SocialLink = styled.a`
  color: var(--primary-color);
  transition: all 0.3s ease;
  opacity: 0.8;
  
  &:hover {
    opacity: 1;
    transform: translateY(-2px);
  }
`;

const BadgeContainer = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 2;
`;

const VerifiedBadge = styled(motion.div)`
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  color: white;
  font-size: 0.7rem;
  padding: 3px 8px;
  border-radius: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

// SVG Icons
const QuoteSvgIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z" />
  </svg>
);

const StarSvgIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
    <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
  </svg>
);

const TestimonialsSection = () => {
  const testimonialsData = config.get('testimonials', {});
  const items = testimonialsData.items || [];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitX, setExitX] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayInterval = useRef(null);
  
  // Motion values for drag
  const x = useMotionValue(0);
  const scale = useTransform(
    x, 
    [-300, 0, 300], 
    [0.8, 1, 0.8]
  );
  const rotate = useTransform(
    x, 
    [-300, 0, 300], 
    [-10, 0, 10]
  );
  const opacity = useTransform(
    x, 
    [-300, -150, 0, 150, 300], 
    [0, 1, 1, 1, 0]
  );
  
  // Handle swipe/drag
  const handleDragEnd = (e, info) => {
    if (info.offset.x > 100) {
      setExitX(1000);
      goToPreviousCard();
    } else if (info.offset.x < -100) {
      setExitX(-1000);
      goToNextCard();
    }
  };
  
  const goToPreviousCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  };
  
  const goToNextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  };
  
  const handleAutoplay = () => {
    if (autoplay) {
      clearInterval(autoplayInterval.current);
      setAutoplay(false);
    } else {
      setAutoplay(true);
      autoplayInterval.current = setInterval(() => {
        goToNextCard();
      }, 5000);
    }
  };
  
  useEffect(() => {
    x.set(0); // Reset position after index changes
  }, [currentIndex, x]);
  
  // Set up autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayInterval.current = setInterval(() => {
        goToNextCard();
      }, 5000);
    }
    
    return () => {
      if (autoplayInterval.current) {
        clearInterval(autoplayInterval.current);
      }
    };
  }, [autoplay, items.length]);
  
  // Get testimonial image
  const getTestimonialImage = (item) => {
    if (item?.image) {
      return item.image;
    }
    
    // Use name as seed for a consistent random image, or fallback to testimonial-index
    const seed = item?.name ? 
      item.name.toLowerCase().replace(/\s+/g, '-') : 
      `testimonial-${currentIndex}`;
    
    return `https://picsum.photos/seed/${seed}/200/200`;
  };
  
  // Generate rating stars
  const renderRating = (rating = 5) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div key={i} style={{ opacity: i < rating ? 1 : 0.3 }}>
        <StarSvgIcon />
      </div>
    ));
  };
  
  if (!items.length) {
    return null;
  }
  
  return (
    <Section
      id="testimonials"
      title={testimonialsData.sectionTitle || "Testimonials"}
      subtitle={testimonialsData.sectionSubtitle || "What others say about me"}
      bgColor="var(--alternate-background-color)"
    >
      <TestimonialsContainer>
        <CardStack>
          <AnimatePresence initial={false} mode="popLayout">
            <CardWrapper
              key={currentIndex}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                x: 0,
                rotate: 0
              }}
              exit={{ 
                x: exitX,
                opacity: 0,
                scale: 0.8,
                transition: { duration: 0.5 }
              }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              style={{ x, scale, rotate, opacity }}
              whileHover={{ boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)" }}
            >
              <TestimonialCard>
                {items[currentIndex]?.verified && (
                  <BadgeContainer>
                    <VerifiedBadge 
                      animate={{ y: [0, -3, 0] }} 
                      transition={{ repeat: Infinity, duration: 3 }}
                    >
                      <span>✓</span> Verified
                    </VerifiedBadge>
                  </BadgeContainer>
                )}
                
                <QuoteIcon>
                  <QuoteSvgIcon />
                </QuoteIcon>
                
                <TestimonialText>
                  <span>"</span>{items[currentIndex]?.testimonial}<span>"</span>
                </TestimonialText>
                
                <TestimonialAuthor>
                  <AuthorImage>
                    <img
                      src={getTestimonialImage(items[currentIndex])}
                      alt={items[currentIndex]?.name || 'Testimonial author'}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://picsum.photos/seed/fallback/200/200';
                      }}
                    />
                  </AuthorImage>
                  
                  <AuthorInfo>
                    <AuthorName>
                      {items[currentIndex]?.name || 'Anonymous'} 
                    </AuthorName>
                    <AuthorTitle>
                      {items[currentIndex]?.position}
                      {items[currentIndex]?.company && `, ${items[currentIndex]?.company}`}
                    </AuthorTitle>
                    
                    {items[currentIndex]?.rating && (
                      <Rating>
                        {renderRating(items[currentIndex].rating)}
                      </Rating>
                    )}
                    
                    <SocialLinks>
                      {items[currentIndex]?.linkedin && (
                        <SocialLink 
                          href={items[currentIndex].linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label="LinkedIn Profile"
                        >
                          <FaLinkedin />
                        </SocialLink>
                      )}
                      {items[currentIndex]?.twitter && (
                        <SocialLink 
                          href={items[currentIndex].twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label="Twitter Profile"
                        >
                          <FaTwitter />
                        </SocialLink>
                      )}
                    </SocialLinks>
                  </AuthorInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            </CardWrapper>
          </AnimatePresence>
        </CardStack>
        
        <ProgressIndicator>
          {items.map((_, index) => (
            <Dot 
              key={index} 
              active={index === currentIndex}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </ProgressIndicator>
        
        <InstructionText>
          Swipe or drag cards to navigate
        </InstructionText>
      </TestimonialsContainer>
    </Section>
  );
};

export default TestimonialsSection; 