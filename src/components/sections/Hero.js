import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectHeader } from '../../redux/slices/portfolioSlice';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import Button from '../ui/Button';
import Typed from 'typed.js';

// Hero Particles background component
const ParticleBackground = () => {
  const count = 100;
  const particlesRef = useRef([]);
  
  useEffect(() => {
    // Initialize particles with random positions
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 5 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1,
    }));
    
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Reset if out of bounds
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        
        // Draw particle
        ctx.fillStyle = `rgba(76, 161, 175, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw connections between nearby particles
        particlesRef.current.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(76, 161, 175, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return <canvas id="particles-canvas" className="particles-canvas" />;
};

// Styled components
const HeroContainer = styled.section`
  position: relative;
  height: 100vh;
  min-height: 700px;
  display: flex;
  align-items: center;
  overflow: hidden;
  
  .particles-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
  }
  
  @media (max-width: 768px) {
    min-height: 600px;
    padding: 6rem 0 2rem;
    height: auto;
  }
  
  @media (max-width: 480px) {
    min-height: 550px;
    padding: 5rem 0 1rem;
  }
`;

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1rem;
  }
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 0 1rem;
  }
`;

const HeroText = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
    line-height: 1.2;
    
    @media (max-width: 992px) {
      font-size: 3rem;
    }
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }
    
    @media (max-width: 480px) {
      font-size: 2rem;
    }
  }
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--primary-color);
    font-weight: 500;
    
    @media (max-width: 992px) {
      font-size: 1.3rem;
      margin-bottom: 1.2rem;
    }
    
    @media (max-width: 768px) {
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }
    
    @media (max-width: 480px) {
      font-size: 1.1rem;
      margin-bottom: 0.8rem;
    }
  }
  
  p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    color: var(--text-secondary-color);
    max-width: 600px;
    
    @media (max-width: 992px) {
      margin: 0 auto 1.5rem;
      font-size: 1rem;
    }
    
    @media (max-width: 768px) {
      font-size: 0.95rem;
      margin-bottom: 1.5rem;
    }
    
    @media (max-width: 480px) {
      font-size: 0.9rem;
      margin-bottom: 1.2rem;
    }
  }
  
  .hero-cta {
    display: flex;
    gap: 1rem;
    
    @media (max-width: 992px) {
      justify-content: center;
    }
    
    @media (max-width: 480px) {
      flex-direction: column;
      gap: 0.7rem;
    }
  }
`;

const HeroVisual = styled(motion.div)`
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 992px) {
    height: 400px;
    margin-top: 2rem;
  }
  
  @media (max-width: 768px) {
    height: 350px;
    margin-top: 1rem;
  }
  
  @media (max-width: 480px) {
    height: 300px;
    margin-top: 0;
  }
`;

const ImageGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  width: 100%;
  height: 100%;
`;

const ImageWrapper = styled(motion.div)`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  
  &:first-of-type {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
  }
  
  &:nth-of-type(2) {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }
  
  &:nth-of-type(3) {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

// Animation variants
const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Hero = () => {
  const { ref, inView } = useIntersectionObserver('hero', 0.1, false);
  const typedRef = useRef(null);
  const typedElementRef = useRef(null);
  const headerData = useSelector(selectHeader);
  
  useEffect(() => {
    if (typedElementRef.current && headerData.typedStrings?.length > 0) {
      typedRef.current = new Typed(typedElementRef.current, {
        strings: headerData.typedStrings,
        typeSpeed: 60,
        backSpeed: 30,
        backDelay: 1500,
        startDelay: 500,
        loop: true,
      });
    }
    
    return () => {
      if (typedRef.current) {
        typedRef.current.destroy();
      }
    };
  }, [headerData.typedStrings]);
  
  return (
    <HeroContainer id="hero" ref={ref}>
      <ParticleBackground />
      
      <HeroContent
        variants={contentVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <HeroText>
          <motion.h2 variants={itemVariants}>Hello, I'm</motion.h2>
          <motion.h1 variants={itemVariants}>{headerData.name || 'John Doe'}</motion.h1>
          <motion.h2 variants={itemVariants}>
            <span ref={typedElementRef}></span>
          </motion.h2>
          <motion.p variants={itemVariants}>
            Passionate developer focused on creating beautiful, functional, and 
            user-friendly digital experiences with the latest technologies.
          </motion.p>
          <motion.div className="hero-cta" variants={itemVariants}>
            <Button size="large" variant="primary" href="#projects">
              View Projects
            </Button>
            <Button size="large" variant="secondary" href="#contact">
              Contact Me
            </Button>
          </motion.div>
        </HeroText>
        
        <HeroVisual variants={itemVariants}>
          <ImageGrid variants={itemVariants}>
            <ImageWrapper variants={imageVariants}>
              <motion.img 
                src="https://picsum.photos/id/1/600/800" 
                alt="Creative Code"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </ImageWrapper>
            <ImageWrapper variants={imageVariants}>
              <motion.img 
                src="https://picsum.photos/id/29/400/300" 
                alt="Technology"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </ImageWrapper>
            <ImageWrapper variants={imageVariants}>
              <motion.img 
                src="https://picsum.photos/id/48/400/300" 
                alt="Digital Design"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </ImageWrapper>
          </ImageGrid>
        </HeroVisual>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero; 