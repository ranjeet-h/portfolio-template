import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { 
  FaCertificate, 
  FaCalendarAlt, 
  FaExternalLinkAlt, 
  FaAward, 
  FaTrophy, 
  FaStar,
  FaCheckCircle,
  FaBuilding,
  FaCode,
  FaChalkboardTeacher,
  FaLink
} from 'react-icons/fa';
import Section from '../ui/Section';
import config from '../../utils/configUtils';

const CertificationsContainer = styled.div`
  max-width: 100%;
`;

const CertificationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CertificationCard = styled(motion.div)`
  background: var(--card-background-color);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: var(--box-shadow);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const CertHeader = styled.div`
  background: rgba(76, 161, 175, 0.1);
  padding: 1.5rem;
  position: relative;
  display: flex;
  align-items: center;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: var(--primary-color);
  }
`;

const CertIcon = styled.div`
  width: 45px;
  height: 45px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 1rem;
  font-size: 1.2rem;
  flex-shrink: 0;
  box-shadow: 0 4px 10px rgba(76, 161, 175, 0.4);
`;

const CertTitle = styled.h3`
  font-size: 1.2rem;
  color: var(--text-color);
  margin: 0;
  flex-grow: 1;
`;

const CertBody = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const CertIssuer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: var(--secondary-text-color);
  
  svg {
    color: var(--primary-color);
    font-size: 1rem;
  }
`;

const CertMeta = styled.div`
  display: flex;
  align-items: center;
  color: var(--secondary-text-color);
  font-size: 0.9rem;
  gap: 1rem;
  margin-bottom: 1rem;
  
  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    svg {
      color: var(--primary-color);
    }
  }
`;

const CertDescription = styled.p`
  color: var(--secondary-text-color);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: auto;
`;

const CertFooter = styled.div`
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CertBadge = styled.div`
  background: rgba(76, 161, 175, 0.1);
  color: var(--primary-color);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  
  svg {
    font-size: 0.9rem;
  }
`;

const CertLink = styled(motion.a)`
  color: var(--primary-color);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  
  &:hover {
    color: var(--accent-color);
  }
  
  svg {
    font-size: 0.9rem;
  }
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Get icon for certification based on its name
const getCertificationIcon = (certName) => {
  // Handle undefined or null value
  if (!certName) return <FaCertificate />;
  
  const lowerCaseName = certName.toLowerCase();
  
  if (lowerCaseName.includes('award') || lowerCaseName.includes('prize')) return <FaTrophy />;
  if (lowerCaseName.includes('honor') || lowerCaseName.includes('distinction')) return <FaStar />;
  if (lowerCaseName.includes('complete') || lowerCaseName.includes('mastery')) return <FaCheckCircle />;
  if (lowerCaseName.includes('developer') || lowerCaseName.includes('programming')) return <FaCode />;
  if (lowerCaseName.includes('teach') || lowerCaseName.includes('instructor')) return <FaChalkboardTeacher />;
  
  return <FaCertificate />;
};

const CertificationsSection = () => {
  const certificationsData = config.get('certifications', {});
  const items = certificationsData.items || [];
  
  return (
    <Section
      id="certifications"
      title={certificationsData.sectionTitle || "Certifications"}
      subtitle={certificationsData.sectionSubtitle || "Professional certifications and achievements"}
      bgColor="var(--background-color)"
    >
      <CertificationsContainer>
        <CertificationsGrid
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {items.map((cert, index) => (
            <CertificationCard
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <CertHeader>
                <CertIcon>
                  {getCertificationIcon(cert.name)}
                </CertIcon>
                <CertTitle>{cert.name || 'Certification'}</CertTitle>
              </CertHeader>
              
              <CertBody>
                {cert.issuer && (
                  <CertIssuer>
                    <FaBuilding />
                    {cert.issuer}
                  </CertIssuer>
                )}
                
                <CertMeta>
                  {cert.date && (
                    <div>
                      <FaCalendarAlt />
                      {cert.date}
                    </div>
                  )}
                  
                  {cert.credentialID && (
                    <div>
                      <FaAward />
                      {cert.credentialID}
                    </div>
                  )}
                </CertMeta>
                
                {cert.description && (
                  <CertDescription>{cert.description}</CertDescription>
                )}
                
                <CertFooter>
                  {cert.skills && cert.skills.length > 0 && (
                    <CertBadge>
                      <FaCode />
                      {cert.skills[0]}{cert.skills.length > 1 ? ` +${cert.skills.length - 1}` : ''}
                    </CertBadge>
                  )}
                  
                  {cert.url && (
                    <CertLink
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 3 }}
                    >
                      <FaLink />
                      Verify
                    </CertLink>
                  )}
                </CertFooter>
              </CertBody>
            </CertificationCard>
          ))}
        </CertificationsGrid>
      </CertificationsContainer>
    </Section>
  );
};

export default CertificationsSection; 