import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, useAnimation } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaPlus, FaMinus } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectExperience } from '../../redux/slices/portfolioSlice';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
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

// New styled components
const InteractiveTimelineItem = styled(TimelineItem)`
  cursor: pointer;
  
  &:hover::before {
    transform: scale(1.2);
    box-shadow: 0 0 0 8px rgba(76, 161, 175, 0.2);
    transition: all 0.3s ease;
  }
`;

const ExpandButton = styled(motion.button)`
  background: rgba(76, 161, 175, 0.1);
  color: var(--primary-color);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 1rem;
  top: 1rem;
  cursor: pointer;
  z-index: 5;
  
  &:hover {
    background: rgba(76, 161, 175, 0.2);
  }
`;

const DetailAnimation = {
  hidden: { opacity: 0, height: 0 },
  visible: { 
    opacity: 1, 
    height: 'auto',
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const ConnectorLine = styled(motion.div)`
  position: absolute;
  background: linear-gradient(90deg, 
    rgba(76, 161, 175, 0.8) 0%, 
    rgba(76, 161, 175, 0.4) 100%);
  height: 2px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 0;
  opacity: 0.6;
  right: ${props => props.position === 'left' ? '0' : 'auto'};
  left: ${props => props.position === 'right' ? '0' : 'auto'};
  width: 50px;
  
  @media (max-width: 768px) {
    left: 0;
    width: 40px;
  }
`;

const TimelinePeriod = styled(motion.div)`
  position: absolute;
  top: 5px;
  color: var(--primary-color);
  font-weight: 500;
  font-size: 0.9rem;
  z-index: 2;
  background: rgba(0, 0, 0, 0.7);
  padding: 0.2rem 0.5rem;
  border-radius: var(--border-radius-sm);
  right: ${props => props.position === 'left' ? 'calc(50% + 30px)' : 'auto'};
  left: ${props => props.position === 'right' ? 'calc(50% + 30px)' : 'auto'};
  
  @media (max-width: 768px) {
    left: 40px;
    right: auto;
  }
`;

const YearDot = styled(motion.div)`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--primary-color);
  position: absolute;
  top: 10px;
  left: ${props => props.position === 'left' ? 'calc(50% - 8px)' : 'calc(50% - 8px)'};
  z-index: 3;
  
  @media (max-width: 768px) {
    left: 12px;
  }
`;

const ExperienceSection = () => {
  // Fallback to useRef if the custom hook is causing issues
  const sectionRef = React.useRef(null);
  const [inView, setInView] = useState(false);
  
  // Get experience data from Redux, fallback to config if not available
  const reduxExperienceData = useSelector(selectExperience);
  const configExperienceData = config.get('experience', {});
  
  // Use Redux data if available, otherwise fallback to config data
  const experienceData = reduxExperienceData?.jobs?.length ? reduxExperienceData : configExperienceData;
  
  const jobs = experienceData?.jobs || [];
  const showLogos = experienceData?.showCompanyLogos || false;
  const [expandedJob, setExpandedJob] = useState(null);
  const controls = useAnimation();
  
  // Use Intersection Observer API directly if custom hook is causing issues
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [sectionRef]);
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);
  
  // Start animation immediately if not visible
  useEffect(() => {
    // Force animation to start if no jobs are showing
    if (jobs.length > 0 && !inView) {
      setTimeout(() => {
        controls.start('visible');
      }, 500);
    }
  }, [jobs, controls]);
  
  const toggleJobExpansion = (index) => {
    if (expandedJob === index) {
      setExpandedJob(null);
    } else {
      setExpandedJob(index);
    }
  };
  
  // Extract years for the timeline
  const timelineYears = jobs.map(job => {
    const period = job.period || '';
    return period.split(' - ')[0];
  });
  
  return (
    <Section
      id="experience"
      ref={sectionRef}
      title={experienceData?.sectionTitle || "Work Experience"}
      subtitle={experienceData?.sectionSubtitle || "My professional journey"}
      bgColor="var(--background-color)"
    >
      <ExperienceContainer
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        viewport={{ once: true, amount: 0.1 }}
      >
        {jobs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-color)' }}
          >
            No work experience data available.
          </motion.div>
        ) : (
          jobs.map((job, index) => {
            const isExpanded = expandedJob === index;
            const position = index % 2 === 0 ? 'right' : 'left';
            return (
              <InteractiveTimelineItem 
                key={index}
                position={position}
                variants={itemVariants}
                onClick={() => toggleJobExpansion(index)}
              >
                <YearDot 
                  position={position} 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 * index, duration: 0.5 }}
                />
                
                <ConnectorLine 
                  position={position}
                  initial={{ width: 0 }}
                  animate={{ width: 50 }}
                  transition={{ delay: 0.3 * index, duration: 0.5 }}
                />
                
                <TimelinePeriod
                  position={position}
                  initial={{ opacity: 0, x: position === 'right' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 * index + 0.2, duration: 0.5 }}
                >
                  {job.period}
                </TimelinePeriod>
                
                <TimelineContent
                  variants={contentVariants}
                  whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)" }}
                  transition={{ duration: 0.3 }}
                >
                  <ExpandButton
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 * index + 0.5 }}
                  >
                    {isExpanded ? <FaMinus /> : <FaPlus />}
                  </ExpandButton>
                  
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
                  
                  <motion.div
                    initial="hidden"
                    animate={isExpanded ? "visible" : "hidden"}
                    variants={DetailAnimation}
                    style={{ overflow: 'hidden' }}
                  >
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
                  </motion.div>
                </TimelineContent>
              </InteractiveTimelineItem>
            );
          })
        )}
      </ExperienceContainer>
    </Section>
  );
};

export default ExperienceSection; 