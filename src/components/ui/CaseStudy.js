import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTheme } from '../../styles/theme';
import Button from './Button';
import Card from './Card';
import { FiExternalLink, FiGithub, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const CaseStudyContainer = styled(motion.div)`
  margin-bottom: 4rem;
`;

const CaseStudyHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 3rem;
  margin-bottom: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ProjectImage = styled(motion.div)`
  position: relative;
  height: 300px;
  border-radius: 1rem;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6));
    z-index: 1;
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 0.3;
  }
`;

const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  p {
    color: var(--text-secondary-color);
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Tag = styled.span`
  background-color: rgba(76, 161, 175, 0.1);
  color: var(--primary-color);
  padding: 0.4rem 0.8rem;
  border-radius: 50px;
  font-size: 0.85rem;
  border: 1px solid rgba(76, 161, 175, 0.2);
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`;

const CaseStudyDetails = styled(motion.div)`
  overflow: hidden;
`;

const DetailSection = styled.div`
  margin-bottom: 2rem;
  
  h4 {
    margin-bottom: 1rem;
    font-size: 1.25rem;
    color: var(--primary-color);
  }
  
  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }
  
  ul {
    list-style-type: none;
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;
    
    li {
      position: relative;
      margin-bottom: 0.75rem;
      line-height: 1.5;
      
      &::before {
        content: '•';
        position: absolute;
        left: -1.5rem;
        color: var(--primary-color);
        font-size: 1.2rem;
      }
    }
  }
`;

const ToggleButton = styled(Button)`
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 0.5rem;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.02);
    }
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

const detailsVariants = {
  closed: { height: 0, opacity: 0 },
  open: { 
    height: 'auto', 
    opacity: 1,
    transition: { 
      height: {
        duration: 0.4,
      },
      opacity: {
        duration: 0.3,
        delay: 0.1
      }
    }
  }
};

const CaseStudy = ({
  project,
  index,
}) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const theme = useTheme();
  
  // Destructure project data
  const {
    title,
    description,
    longDescription,
    image,
    tech,
    liveUrl,
    githubUrl,
    situation,
    task,
    approach,
    results,
    gallery,
    highlights,
    challenges,
    learnings
  } = project;
  
  const toggleDetails = () => {
    setDetailsOpen(!detailsOpen);
  };
  
  // Determine animation direction based on index
  const direction = index % 2 === 0 ? 1 : -1;
  
  return (
    <CaseStudyContainer
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <CaseStudyHeader>
        <ProjectImage
          initial={{ opacity: 0, x: 30 * direction }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <img src={image} alt={title} />
        </ProjectImage>
        
        <ProjectInfo>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {title}
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {description}
          </motion.p>
          
          <TagsContainer>
            {tech.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Tag>{item}</Tag>
              </motion.div>
            ))}
          </TagsContainer>
          
          <ActionsContainer>
            {liveUrl && (
              <Button 
                variant="primary" 
                rightIcon={<FiExternalLink />}
                as="a"
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
              </Button>
            )}
            
            {githubUrl && (
              <Button 
                variant="secondary" 
                rightIcon={<FiGithub />}
                as="a"
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Code
              </Button>
            )}
          </ActionsContainer>
        </ProjectInfo>
      </CaseStudyHeader>
      
      <ToggleButton 
        variant="minimal"
        onClick={toggleDetails}
        rightIcon={detailsOpen ? <FiChevronUp /> : <FiChevronDown />}
      >
        {detailsOpen ? 'Hide Details' : 'View Case Study'}
      </ToggleButton>
      
      <CaseStudyDetails
        variants={detailsVariants}
        initial="closed"
        animate={detailsOpen ? "open" : "closed"}
      >
        <Card variant="glass" hoverable={false}>
          {longDescription && (
            <DetailSection>
              <h4>Overview</h4>
              <p>{longDescription}</p>
            </DetailSection>
          )}
          
          {situation && (
            <DetailSection>
              <h4>Situation</h4>
              <p>{situation}</p>
            </DetailSection>
          )}
          
          {task && (
            <DetailSection>
              <h4>Task</h4>
              <p>{task}</p>
            </DetailSection>
          )}
          
          {approach && (
            <DetailSection>
              <h4>Approach</h4>
              <p>{approach}</p>
            </DetailSection>
          )}
          
          {highlights && highlights.length > 0 && (
            <DetailSection>
              <h4>Key Features</h4>
              <ul>
                {highlights.map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </ul>
            </DetailSection>
          )}
          
          {challenges && challenges.length > 0 && (
            <DetailSection>
              <h4>Challenges Overcome</h4>
              <ul>
                {challenges.map((challenge, i) => (
                  <li key={i}>{challenge}</li>
                ))}
              </ul>
            </DetailSection>
          )}
          
          {results && (
            <DetailSection>
              <h4>Results</h4>
              <p>{results}</p>
            </DetailSection>
          )}
          
          {learnings && (
            <DetailSection>
              <h4>Key Learnings</h4>
              <p>{learnings}</p>
            </DetailSection>
          )}
          
          {gallery && gallery.length > 0 && (
            <DetailSection>
              <h4>Gallery</h4>
              <ImageGallery>
                {gallery.map((img, i) => (
                  <img key={i} src={img} alt={`${title} screenshot ${i + 1}`} />
                ))}
              </ImageGallery>
            </DetailSection>
          )}
        </Card>
      </CaseStudyDetails>
    </CaseStudyContainer>
  );
};

export default CaseStudy; 