import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram, 
  FaFacebook,
  FaYoutube,
  FaMedium,
  FaDev,
  FaDribbble,
  FaBehance,
  FaChevronUp
} from 'react-icons/fa';
import config from '../../utils/configUtils';

const FooterContainer = styled.footer`
  background-color: var(--card-background-color);
  color: var(--text-color);
  padding: 4rem 0 2rem;
  position: relative;
`;

const FooterContent = styled.div`
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterInfo = styled.div`
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--primary-color);
  }
  
  p {
    color: var(--secondary-text-color);
    margin-bottom: 1.5rem;
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialIcon = styled.a`
  color: var(--text-color);
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(76, 161, 175, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    color: white;
    background: var(--primary-color);
    transform: translateY(-5px);
  }
`;

const FooterNav = styled.div`
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--primary-color);
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin-bottom: 0.8rem;
  }
  
  a {
    color: var(--secondary-text-color);
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-block;
    position: relative;
    
    &:hover {
      color: var(--primary-color);
      transform: translateX(5px);
    }
  }
`;

const FooterDivider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 2rem 0;
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Copyright = styled.p`
  color: var(--secondary-text-color);
  font-size: 0.9rem;
`;

const Credits = styled.p`
  color: var(--secondary-text-color);
  font-size: 0.9rem;
  
  a {
    color: var(--primary-color);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ScrollToTop = styled(motion.button)`
  position: absolute;
  right: 2rem;
  bottom: 2rem;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  font-size: 1.2rem;
  z-index: 10;
  
  &:hover {
    background: var(--accent-color);
  }
  
  @media (max-width: 768px) {
    right: 1rem;
    bottom: 1rem;
  }
`;

const getSocialIcon = (platform) => {
  switch (platform) {
    case 'github':
      return <FaGithub />;
    case 'linkedin':
      return <FaLinkedin />;
    case 'twitter':
      return <FaTwitter />;
    case 'instagram':
      return <FaInstagram />;
    case 'facebook':
      return <FaFacebook />;
    case 'youtube':
      return <FaYoutube />;
    case 'medium':
      return <FaMedium />;
    case 'devto':
      return <FaDev />;
    case 'dribbble':
      return <FaDribbble />;
    case 'behance':
      return <FaBehance />;
    default:
      return null;
  }
};

const Footer = () => {
  const footerData = config.get('footer', {});
  const socialLinks = config.getActiveSocialLinks();
  const navLinks = footerData.navLinks || [];
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterTop>
          <FooterInfo>
            <h3>{config.get('header.name', 'John Doe')}</h3>
            <p>
              {config.get('about.description', '').substring(0, 150)}
              {config.get('about.description', '').length > 150 ? '...' : ''}
            </p>
            
            {footerData.showSocialLinks && Object.keys(socialLinks).length > 0 && (
              <SocialLinks>
                {Object.entries(socialLinks).map(([platform, url]) => (
                  <SocialIcon 
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platform}
                  >
                    {getSocialIcon(platform)}
                  </SocialIcon>
                ))}
              </SocialLinks>
            )}
          </FooterInfo>
          
          <FooterNav>
            <h3>Quick Links</h3>
            <ul>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.url}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </FooterNav>
          
          <FooterNav>
            <h3>Contact Info</h3>
            <ul>
              <li>
                <a href={`mailto:${config.get('about.email', '')}`}>
                  {config.get('about.email', 'john.doe@example.com')}
                </a>
              </li>
              <li>
                <a href={`tel:${config.get('about.phone', '')}`}>
                  {config.get('about.phone', '+1 (555) 123-4567')}
                </a>
              </li>
              <li>
                {config.get('about.location', 'San Francisco, CA')}
              </li>
            </ul>
          </FooterNav>
        </FooterTop>
        
        <FooterDivider />
        
        <FooterBottom>
          <Copyright>
            {footerData.copyright || `© ${new Date().getFullYear()} All Rights Reserved.`}
          </Copyright>
          
          <Credits>
            {footerData.credits || 'Designed & Developed with ❤️'}
          </Credits>
        </FooterBottom>
      </FooterContent>
      
      <ScrollToTop
        onClick={scrollToTop}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaChevronUp />
      </ScrollToTop>
    </FooterContainer>
  );
};

export default Footer; 