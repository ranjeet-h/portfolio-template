import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFileDownload } from 'react-icons/fa';
import Section from '../ui/Section';
import config from '../../utils/configUtils';

const AboutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const AboutContent = styled.div`
  p {
    color: var(--secondary-text-color);
    line-height: 1.8;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }
  
  @media (max-width: 992px) {
    order: 2;
  }
`;

const AboutImage = styled(motion.div)`
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  height: 400px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(44, 62, 80, 0) 0%,
      rgba(76, 161, 175, 0.3) 100%
    );
    z-index: 1;
  }
  
  @media (max-width: 992px) {
    order: 1;
    max-width: 400px;
    margin: 0 auto;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 992px) {
    align-items: center;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--secondary-text-color);
  
  svg {
    color: var(--primary-color);
    font-size: 1.2rem;
  }
  
  a {
    color: var(--secondary-text-color);
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--primary-color);
    }
  }
`;

const ResumeButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--primary-color);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-weight: 500;
  text-decoration: none;
  margin-top: 2rem;
  box-shadow: 0 4px 15px rgba(76, 161, 175, 0.3);
  
  svg {
    font-size: 1.2rem;
  }
  
  &:hover {
    background: var(--accent-color);
    color: white;
    transform: translateY(-3px);
  }
`;

const AboutSection = () => {
  const aboutData = config.get('about', {});
  
  // Animation variants
  const imageVariants = {
    offscreen: { opacity: 0, x: -50 },
    onscreen: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring",
        bounce: 0.4,
        duration: 1 
      }
    }
  };
  
  // Get about image URL
  const getAboutImage = () => {
    if (aboutData.imageUrl) {
      return aboutData.imageUrl;
    }
    return "https://picsum.photos/seed/about/800/1200";
  };
  
  return (
    <Section
      id="about"
      title={aboutData.title || "About Me"}
      subtitle={aboutData.subtitle || "My journey as a developer"}
      bgColor="var(--background-color)"
    >
      <AboutContainer>
        <AboutContent>
          <p>{aboutData.description || "No description available."}</p>
          
          <ContactInfo>
            {aboutData.email && (
              <ContactItem>
                <FaEnvelope />
                <a href={`mailto:${aboutData.email}`}>{aboutData.email}</a>
              </ContactItem>
            )}
            
            {aboutData.phone && (
              <ContactItem>
                <FaPhone />
                <a href={`tel:${aboutData.phone}`}>{aboutData.phone}</a>
              </ContactItem>
            )}
            
            {aboutData.location && (
              <ContactItem>
                <FaMapMarkerAlt />
                <span>{aboutData.location}</span>
              </ContactItem>
            )}
          </ContactInfo>
          
          {aboutData.resumeUrl && (
            <ResumeButton 
              href={aboutData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaFileDownload /> Download Resume
            </ResumeButton>
          )}
        </AboutContent>
        
        <AboutImage
          as={motion.div}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          variants={imageVariants}
        >
          <img 
            src={getAboutImage()} 
            alt={config.get('header.name', 'About Me')} 
          />
        </AboutImage>
      </AboutContainer>
    </Section>
  );
};

export default AboutSection; 