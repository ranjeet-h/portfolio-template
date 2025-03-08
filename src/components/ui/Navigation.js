import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import config from '../../utils/configUtils';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  
  ${({ scrolled }) => scrolled && `
    background-color: rgba(26, 26, 26, 0.9);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    padding: 0.5rem 2rem;
  `}
  
  @media (max-width: 768px) {
    padding: 1rem;
    ${({ scrolled }) => scrolled && `
      padding: 0.5rem 1rem;
      background-color: rgba(26, 26, 26, 0.95);
    `}
  }
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: var(--container-width);
  margin: 0 auto;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  z-index: 1001;
  
  a {
    display: flex;
    align-items: center;
    font-family: var(--font-secondary);
    font-weight: 700;
    font-size: 1.5rem;
    color: var(--text-color);
    text-decoration: none;
    
    &:hover {
      color: var(--primary-color);
    }
  }
  
  img {
    height: 40px;
    margin-right: 0.5rem;
    border-radius: 50%;
    overflow: hidden;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: color 0.3s ease;
  font-size: 1rem;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 0;
    height: 2px;
    background: var(--primary-color);
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: var(--primary-color);
    
    &::after {
      width: 100%;
    }
  }
  
  &.active {
    color: var(--primary-color);
    
    &::after {
      width: 100%;
    }
  }
`;

const CTA = styled.a`
  background: var(--primary-color);
  color: #fff;
  padding: 0.6rem 1.2rem;
  border-radius: 50px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(76, 161, 175, 0.3);
  
  &:hover {
    background: var(--accent-color);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(76, 161, 175, 0.4);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuToggle = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: var(--text-color);
  font-size: 1.4rem;
  cursor: pointer;
  z-index: 1001;
  padding: 0.5rem;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: var(--background-color);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: 998;
  overflow-y: auto;
  padding-top: 80px;
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: center;
  width: 100%;
  padding: 1rem;
`;

const MobileNavLink = styled(motion.a)`
  color: var(--text-color);
  text-decoration: none;
  font-weight: 600;
  font-size: 1.4rem;
  padding: 0.8rem 0;
  position: relative;
  width: 100%;
  text-align: center;
  
  &.active, &:hover {
    color: var(--primary-color);
  }
`;

const MobileCTA = styled(motion.a)`
  margin-top: 2rem;
  background: var(--primary-color);
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.2rem;
  box-shadow: 0 4px 10px rgba(76, 161, 175, 0.3);
  
  &:hover {
    background: var(--accent-color);
  }
`;

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  
  const navLinks = config.get('navigation.links', []);
  const logo = config.get('navigation.logo', {});
  const cta = config.get('navigation.cta', {});
  
  // Handle scroll event to add background to navbar when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Update active link based on scroll position
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          setActiveLink(sectionId);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Disable body scroll when mobile menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isMenuOpen]);
  
  // Close menu when a link is clicked
  const handleLinkClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        setActiveLink(targetId);
        setIsMenuOpen(false);
      }
    }
  };
  
  // Animation variants for mobile menu items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };
  
  // Mobile menu animation variants
  const menuVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        when: "beforeChildren", 
        staggerChildren: 0.1 
      } 
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      } 
    }
  };
  
  return (
    <NavContainer
      scrolled={isScrolled}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <NavContent>
        <Logo>
          <a href="#home">
            {logo.showLogoImage && logo.image && <img src={logo.image || "https://picsum.photos/seed/logo/100/100"} alt="Logo" />}
            {logo.text && logo.text}
          </a>
        </Logo>
        
        <NavLinks>
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              href={link.url}
              className={activeLink === link.url.substring(1) ? 'active' : ''}
              onClick={(e) => handleLinkClick(e, link.url)}
            >
              {link.name}
            </NavLink>
          ))}
        </NavLinks>
        
        {cta.showCta && (
          <CTA href={cta.url}>{cta.text}</CTA>
        )}
        
        <MobileMenuToggle onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuToggle>
        
        <AnimatePresence>
          {isMenuOpen && (
            <MobileMenu
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MobileNavLinks>
                {navLinks.map((link, index) => (
                  <MobileNavLink
                    key={link.name}
                    href={link.url}
                    className={activeLink === link.url.substring(1) ? 'active' : ''}
                    onClick={(e) => handleLinkClick(e, link.url)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {link.name}
                  </MobileNavLink>
                ))}
                
                {cta.showCta && (
                  <MobileCTA
                    href={cta.url}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navLinks.length * 0.1 }}
                  >
                    {cta.text}
                  </MobileCTA>
                )}
              </MobileNavLinks>
            </MobileMenu>
          )}
        </AnimatePresence>
      </NavContent>
    </NavContainer>
  );
};

export default Navigation; 