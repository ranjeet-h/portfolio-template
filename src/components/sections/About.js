import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectAbout } from '../../redux/slices/portfolioSlice';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import Button from '../ui/Button';
import { FiDownload, FiArrowRight, FiUser, FiAward, FiBook, FiCode } from 'react-icons/fi';

const AboutContainer = styled.section`
  padding: 5rem 0;
  background: var(--background-alt-color);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: radial-gradient(circle at 10% 20%, rgba(76, 161, 175, 0.03) 0%, transparent 50%);
    z-index: 0;
  }
`;

const AboutContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
  
  h2 {
    position: relative;
    display: inline-block;
    font-size: 2.5rem;
    margin-bottom: 1rem;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: var(--primary-color);
    }
  }
  
  p {
    max-width: 600px;
    margin: 0 auto;
    color: var(--text-secondary-color);
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const BiographyContainer = styled(motion.div)`
  h3 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: var(--text-color);
  }
  
  p {
    color: var(--text-secondary-color);
    margin-bottom: 1.5rem;
    line-height: 1.8;
    font-size: 1.05rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 2.5rem 0;
`;

const StatItem = styled(motion.div)`
  background: var(--card-background-color);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  
  .icon {
    font-size: 2rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
  }
  
  h4 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  p {
    font-size: 0.9rem;
    color: var(--text-secondary-color);
    margin: 0;
  }
`;

const DownloadResume = styled(motion.div)`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ProfileImage = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .main-image {
    position: relative;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: var(--box-shadow);
    max-width: 100%;
    z-index: 2;
    
    img {
      width: 100%;
      height: auto;
      object-fit: cover;
      display: block;
    }
    
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.3)
      );
      z-index: 1;
    }
  }
  
  .decoration {
    position: absolute;
    width: 70%;
    height: 70%;
    border: 3px solid var(--primary-color);
    border-radius: 1rem;
    bottom: -25px;
    right: -25px;
    z-index: 1;
  }
  
  .experience-badge {
    position: absolute;
    top: -20px;
    right: -20px;
    background: var(--card-background-color);
    box-shadow: var(--box-shadow);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    z-index: 3;
    
    h4 {
      font-size: 1.8rem;
      margin: 0;
      color: var(--primary-color);
    }
    
    p {
      font-size: 0.8rem;
      margin: 0;
      color: var(--text-secondary-color);
    }
  }
`;

const PhilosophyContainer = styled(motion.div)`
  margin-top: 3rem;
  position: relative;
  
  h3 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: var(--text-color);
  }
`;

const PhilosophyCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const PhilosophyCard = styled(motion.div)`
  background: var(--card-background-color);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  height: 100%;
  
  .icon {
    font-size: 1.5rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
  }
  
  h4 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: var(--text-color);
  }
  
  p {
    font-size: 0.95rem;
    color: var(--text-secondary-color);
    line-height: 1.7;
  }
`;

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, 0.01, 0.9],
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.6, 0.05, 0.01, 0.9],
    }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.6, 0.05, 0.01, 0.9],
    }
  }
};

const About = () => {
  const { ref, inView } = useIntersectionObserver('about', 0.1, false);
  const aboutData = useSelector(selectAbout);
  
  // Stats for the profile section
  const stats = [
    { 
      icon: <FiAward className="icon" />, 
      value: aboutData?.experience || "8+", 
      label: "Years Experience" 
    },
    { 
      icon: <FiCode className="icon" />, 
      value: aboutData?.projectsCompleted || "60+", 
      label: "Projects Completed" 
    },
    { 
      icon: <FiUser className="icon" />, 
      value: aboutData?.clientsServed || "25+", 
      label: "Clients Served" 
    },
    { 
      icon: <FiBook className="icon" />, 
      value: aboutData?.technologies || "15+", 
      label: "Technologies Mastered" 
    }
  ];
  
  // Philosophy cards
  const philosophies = aboutData?.philosophies || [
    {
      title: "User-Centered Design",
      description: "I believe in creating digital experiences that prioritize user needs and preferences, ensuring intuitive and accessible interfaces for all.",
      icon: <FiUser className="icon" />
    },
    {
      title: "Clean Code Architecture",
      description: "I'm passionate about writing maintainable, efficient code with clear patterns and structure that makes collaboration and future development easier.",
      icon: <FiCode className="icon" />
    },
    {
      title: "Continuous Learning",
      description: "Technology evolves rapidly, and I'm committed to staying current with the latest tools, frameworks, and best practices in frontend development.",
      icon: <FiBook className="icon" />
    }
  ];
  
  return (
    <AboutContainer id="about" ref={ref}>
      <AboutContent>
        <SectionHeader
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2>{aboutData?.sectionTitle || 'About Me'}</h2>
          <p>{aboutData?.sectionSubtitle || 'Get to know me better: my background, skills, and what drives me as a developer.'}</p>
        </SectionHeader>
        
        <AboutGrid>
          <BiographyContainer
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3>{aboutData?.bioTitle || 'Who I Am'}</h3>
            <p>{aboutData?.bioDescription || 'I am a passionate frontend developer with extensive experience building modern, responsive web applications. My journey in web development started 8 years ago, and since then, I\'ve worked with various technologies and frameworks, continuously expanding my skills and knowledge.'}</p>
            <p>{aboutData?.bioDescription2 || 'My approach combines technical expertise with creative problem-solving, allowing me to transform complex requirements into intuitive user experiences. I specialize in React and its ecosystem, with a focus on creating high-performance, accessible, and visually appealing web applications.'}</p>
            
            <StatsGrid>
              {stats.map((stat, index) => (
                <StatItem 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  {stat.icon}
                  <h4>{stat.value}</h4>
                  <p>{stat.label}</p>
                </StatItem>
              ))}
            </StatsGrid>
            
            <DownloadResume
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Button 
                variant="primary" 
                rightIcon={<FiDownload />}
                as="a"
                href={aboutData?.resumePdfUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV (PDF)
              </Button>
              
              <Button 
                variant="secondary" 
                rightIcon={<FiDownload />}
                as="a"
                href={aboutData?.resumeJsonUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                JSON Resume
              </Button>
            </DownloadResume>
          </BiographyContainer>
          
          <ProfileImage
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              className="decoration"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
            />
            
            <motion.div 
              className="main-image"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img src={aboutData?.profileImage || 'https://picsum.photos/seed/developer/500/650'} alt="Profile" />
            </motion.div>
            
            <motion.div 
              className="experience-badge"
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ 
                rotate: 5, 
                scale: 1.05,
                transition: { duration: 0.2 } 
              }}
            >
              <h4>{aboutData?.experienceYears || '8+'}</h4>
              <p>Years Exp.</p>
            </motion.div>
          </ProfileImage>
        </AboutGrid>
        
        <PhilosophyContainer
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h3 variants={fadeInUp}>My Philosophy</motion.h3>
          
          <PhilosophyCards>
            {philosophies.map((item, index) => (
              <PhilosophyCard
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                {item.icon}
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </PhilosophyCard>
            ))}
          </PhilosophyCards>
        </PhilosophyContainer>
      </AboutContent>
    </AboutContainer>
  );
};

export default About; 