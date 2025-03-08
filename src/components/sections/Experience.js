import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import Section from '../ui/Section';
import config from '../../utils/configUtils';

const ExperienceContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(76, 161, 175, 0.2),
      var(--primary-color),
      rgba(76, 161, 175, 0.2)
    );
    
    @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  justify-content: ${props => props.position === 'left' ? 'flex-end' : 'flex-start'};
  padding-bottom: 5rem;
  width: 100%;
  position: relative;
  
  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-left: 45px;
  }
  
  &:last-child {
    padding-bottom: 0;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 10px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--primary-color);
    left: ${props => props.position === 'left' ? 'calc(50% - 8px)' : 'calc(50% - 8px)'};
    z-index: 1;
    box-shadow: 0 0 0 5px rgba(76, 161, 175, 0.3);
    
    @media (max-width: 768px) {
      left: 12px;
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 10px;
    width: calc(50% - 65px);
    height: 2px;
    background: linear-gradient(
      ${props => props.position === 'left' ? 'to left' : 'to right'},
      var(--primary-color),
      rgba(76, 161, 175, 0.2)
    );
    ${props => props.position === 'left' ? 'right: 65px;' : 'left: 65px;'}
    
    @media (max-width: 768px) {
      width: 20px;
      left: 28px;
    }
  }
`;

const TimelineContent = styled(motion.div)`
  width: calc(50% - 70px);
  background: var(--card-background-color);
  padding: 2rem;
  border-radius: var(--border-radius-md);
  box-shadow: var(--box-shadow);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    width: 100%;
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: var(--text-color);
  }
  
  h4 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: var(--primary-color);
  }
`;

const JobMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  color: var(--secondary-text-color);
  font-size: 0.9rem;
  
  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    svg {
      color: var(--primary-color);
    }
  }
`;

const JobDescription = styled.p`
  color: var(--secondary-text-color);
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const AchievementsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-bottom: 1.5rem;
`;

const Achievement = styled(motion.li)`
  position: relative;
  padding-left: 25px;
  margin-bottom: 0.8rem;
  color: var(--secondary-text-color);
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 10px;
    width: 10px;
    height: 2px;
    background: var(--primary-color);
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const TechTag = styled(motion.span)`
  background: rgba(76, 161, 175, 0.1);
  color: var(--primary-color);
  padding: 0.3rem 0.8rem;
  border-radius: 30px;
  font-size: 0.8rem;
  border: 1px solid rgba(76, 161, 175, 0.2);
`;

const CompanyLogo = styled(motion.div)`
  background: rgba(0, 0, 0, 0.2);
  width: 60px;
  height: 60px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 1rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 10px;
  }
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const contentVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const achievementVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: i => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: i => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: "easeOut"
    }
  })
};

const ExperienceSection = () => {
  const experienceData = config.get('experience', {});
  const jobs = experienceData.jobs || [];
  const showLogos = experienceData.showCompanyLogos || false;
  
  return (
    <Section
      id="experience"
      title={experienceData.sectionTitle || "Work Experience"}
      subtitle={experienceData.sectionSubtitle || "My professional journey"}
      bgColor="var(--background-color)"
    >
      <ExperienceContainer
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {jobs.map((job, index) => (
          <TimelineItem 
            key={index}
            position={index % 2 === 0 ? 'right' : 'left'}
            variants={itemVariants}
          >
            <TimelineContent
              variants={contentVariants}
              whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)" }}
              transition={{ duration: 0.3 }}
            >
              {showLogos && job.logoUrl && (
                <CompanyLogo
                  initial={{ opacity: 0, rotateY: 90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <img src={job.logoUrl} alt={job.company} />
                </CompanyLogo>
              )}
              
              <h3>{job.position}</h3>
              <h4>{job.company}</h4>
              
              <JobMeta>
                <div>
                  <FaCalendarAlt />
                  <span>{job.period}</span>
                </div>
                
                {job.location && (
                  <div>
                    <FaMapMarkerAlt />
                    <span>{job.location}</span>
                  </div>
                )}
              </JobMeta>
              
              {job.description && <JobDescription>{job.description}</JobDescription>}
              
              {job.achievements && job.achievements.length > 0 && (
                <AchievementsList>
                  {job.achievements.map((achievement, achievementIndex) => (
                    <Achievement
                      key={achievementIndex}
                      custom={achievementIndex}
                      variants={achievementVariants}
                    >
                      {achievement}
                    </Achievement>
                  ))}
                </AchievementsList>
              )}
              
              {job.technologies && job.technologies.length > 0 && (
                <TechStack>
                  {job.technologies.map((tech, techIndex) => (
                    <TechTag
                      key={techIndex}
                      custom={techIndex}
                      variants={tagVariants}
                    >
                      {tech}
                    </TechTag>
                  ))}
                </TechStack>
              )}
            </TimelineContent>
          </TimelineItem>
        ))}
      </ExperienceContainer>
    </Section>
  );
};

export default ExperienceSection; 