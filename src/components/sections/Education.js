import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { 
  FaGraduationCap, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaAward, 
  FaCertificate, 
  FaUserGraduate, 
  FaUniversity,
  FaBook,
  FaBriefcase
} from 'react-icons/fa';
import Section from '../ui/Section';
import config from '../../utils/configUtils';

const EducationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    left: 10px;
    top: 8px;
    height: calc(100% - 15px);
    width: 2px;
    background: linear-gradient(to bottom, var(--primary-color), rgba(76, 161, 175, 0.2));
    
    @media (max-width: 768px) {
      left: 8px;
    }
  }
`;

const EducationItem = styled(motion.div)`
  position: relative;
  padding-left: 40px;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--primary-color);
    box-shadow: 0 0 0 4px rgba(76, 161, 175, 0.2);
    z-index: 1;
    
    @media (max-width: 768px) {
      width: 18px;
      height: 18px;
    }
  }
`;

const DegreeMeta = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--secondary-text-color);
  font-size: 0.9rem;
  
  svg {
    color: var(--primary-color);
    font-size: 1rem;
  }
`;

const DegreeTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: var(--primary-color);
    font-size: 1.2rem;
  }
`;

const Institution = styled.div`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: var(--secondary-text-color);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: var(--primary-color);
    font-size: 1.1rem;
  }
`;

const Description = styled.p`
  color: var(--secondary-text-color);
  line-height: 1.6;
  margin: 0.5rem 0;
`;

const AchievementsList = styled.ul`
  padding-left: 1.2rem;
  margin: 1rem 0;
`;

const Achievement = styled(motion.li)`
  color: var(--secondary-text-color);
  margin-bottom: 0.5rem;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    left: -1.2rem;
    top: 0.7rem;
    width: 0.5rem;
    height: 0.5rem;
    background-color: var(--primary-color);
    border-radius: 50%;
  }
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
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
      duration: 0.5
    }
  })
};

const getDegreeIcon = (degree) => {
  const lowerDegree = degree.toLowerCase();
  
  if (lowerDegree.includes('phd') || lowerDegree.includes('doctor')) return <FaUserGraduate />;
  if (lowerDegree.includes('master')) return <FaGraduationCap />;
  if (lowerDegree.includes('bachelor')) return <FaGraduationCap />;
  if (lowerDegree.includes('certificate') || lowerDegree.includes('certification')) return <FaCertificate />;
  if (lowerDegree.includes('diploma')) return <FaAward />;
  if (lowerDegree.includes('course')) return <FaBook />;
  
  return <FaGraduationCap />;
};

const EducationSection = () => {
  const educationData = config.get('education', {});
  const items = educationData.items || [];
  
  return (
    <Section
      id="education"
      title={educationData.sectionTitle || "Education"}
      subtitle={educationData.sectionSubtitle || "My academic background"}
      bgColor="var(--alternate-background-color)"
    >
      <EducationList
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {items.map((item, index) => (
          <EducationItem
            key={index}
            variants={itemVariants}
          >
            <DegreeTitle>
              {getDegreeIcon(item.degree)}
              {item.degree}
            </DegreeTitle>
            
            <Institution>
              <FaUniversity />
              {item.institution}
            </Institution>
            
            <DegreeMeta>
              {item.date && (
                <MetaItem>
                  <FaCalendarAlt />
                  {item.date}
                </MetaItem>
              )}
              
              {item.location && (
                <MetaItem>
                  <FaMapMarkerAlt />
                  {item.location}
                </MetaItem>
              )}
              
              {item.field && (
                <MetaItem>
                  <FaBriefcase />
                  {item.field}
                </MetaItem>
              )}
            </DegreeMeta>
            
            {item.description && (
              <Description>{item.description}</Description>
            )}
            
            {item.achievements && item.achievements.length > 0 && (
              <AchievementsList>
                {item.achievements.map((achievement, i) => (
                  <Achievement
                    key={i}
                    variants={achievementVariants}
                    custom={i}
                  >
                    {achievement}
                  </Achievement>
                ))}
              </AchievementsList>
            )}
          </EducationItem>
        ))}
      </EducationList>
    </Section>
  );
};

export default EducationSection; 