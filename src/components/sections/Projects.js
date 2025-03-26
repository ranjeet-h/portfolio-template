import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaTimes,
  FaInfoCircle,
  FaMobile,
  FaDesktop,
  FaServer,
  FaTools,
  FaCode,
  FaLaptopCode,
  FaReact,
  FaNodeJs,
  FaJs,
  FaDatabase,
  FaFire
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiRedux, 
  SiTailwindcss, 
  SiNextdotjs,
  SiMongodb, 
  SiPostgresql,
  SiGraphql, 
  SiAwslambda,
  SiDocker,
  SiRedis,
  SiElasticsearch,
  SiOpenai
} from 'react-icons/si';
import Section from '../ui/Section';
import config from '../../utils/configUtils';
import { useSelector } from 'react-redux';
import { selectProjects } from '../../redux/slices/portfolioSlice';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import CaseStudy from '../ui/CaseStudy';

const ProjectsContainer = styled.section`
  padding: 5rem 0;
`;

const ProjectsContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
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

const FilterContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const FilterButton = styled.button`
  background: ${({ active }) => active ? 'var(--primary-color)' : 'transparent'};
  color: ${({ active }) => active ? 'white' : 'var(--text-color)'};
  border: 1px solid ${({ active }) => active ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.2)'};
  padding: 0.5rem 1.2rem;
  border-radius: 50px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ active }) => active ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const ProjectsList = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const ProjectFilters = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: var(--card-background-color);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: var(--box-shadow);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: 100%;
  
  .card-image {
    position: relative;
    height: 200px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    
    .overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        var(--card-background-color)
      );
      opacity: 0.7;
    }
    
    .tech-badges {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      padding: 1rem;
    }
  }
  
  .card-content {
    padding: 1.5rem;
  }
  
  h3 {
    font-size: 1.3rem;
    margin-bottom: 0.8rem;
    color: var(--text-color);
  }
  
  p {
    color: var(--secondary-text-color);
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  
  .card-actions {
    display: flex;
    gap: 1rem;
  }
`;

const ProjectLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  
  &:hover {
    color: var(--accent-color);
  }
  
  svg {
    font-size: 1rem;
  }
`;

const TechBadge = styled(motion.span)`
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 0.7rem;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 0.3rem;
  
  svg {
    font-size: 0.8rem;
  }
`;

const ProjectDetail = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow-y: auto;
`;

const DetailContent = styled(motion.div)`
  background: var(--card-background-color);
  width: 100%;
  max-width: 900px;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  position: relative;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
`;

const DetailHeader = styled.div`
  position: relative;
  height: 300px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3),
      var(--card-background-color)
    );
  }
  
  .title {
    position: absolute;
    bottom: 1.5rem;
    left: 2rem;
    right: 2rem;
    
    h2 {
      font-size: 2rem;
      color: white;
      margin-bottom: 0.5rem;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    }
  }
`;

const DetailBody = styled.div`
  padding: 2rem;
  overflow-y: auto;
  
  p {
    color: var(--secondary-text-color);
    line-height: 1.8;
    margin-bottom: 2rem;
  }
  
  h3 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: var(--primary-color);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    svg {
      font-size: 1.1rem;
    }
  }
`;

const DetailTechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 2rem;
`;

const DetailTechBadge = styled(motion.span)`
  background: rgba(76, 161, 175, 0.1);
  color: var(--primary-color);
  padding: 0.5rem 1rem;
  border-radius: 30px;
  font-size: 0.9rem;
  border: 1px solid rgba(76, 161, 175, 0.2);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    font-size: 1rem;
  }
`;

const DetailHighlights = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
`;

const DetailHighlight = styled(motion.li)`
  position: relative;
  padding-left: 25px;
  margin-bottom: 1rem;
  color: var(--secondary-text-color);
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 10px;
    width: 12px;
    height: 2px;
    background: var(--primary-color);
  }
`;

const DetailLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const DetailLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  background: rgba(76, 161, 175, 0.1);
  border: 1px solid rgba(76, 161, 175, 0.2);
  
  &:hover {
    background: var(--primary-color);
    color: white;
  }
  
  svg {
    font-size: 1.1rem;
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  
  svg {
    font-size: 1.2rem;
  }
`;

// Get icon for filter category
const getFilterIcon = (tech) => {
  const lowerCaseTech = tech.toLowerCase();
  
  if (lowerCaseTech === 'all') return <FaLaptopCode />;
  if (lowerCaseTech.includes('react')) return <FaReact />;
  if (lowerCaseTech.includes('next')) return <SiNextdotjs />;
  if (lowerCaseTech.includes('node')) return <FaNodeJs />;
  if (lowerCaseTech.includes('typescript')) return <SiTypescript />;
  if (lowerCaseTech.includes('javascript')) return <FaJs />;
  if (lowerCaseTech.includes('redux')) return <SiRedux />;
  if (lowerCaseTech.includes('tailwind')) return <SiTailwindcss />;
  if (lowerCaseTech.includes('mongo')) return <SiMongodb />;
  if (lowerCaseTech.includes('postgres')) return <SiPostgresql />;
  if (lowerCaseTech.includes('sql')) return <FaDatabase />;
  if (lowerCaseTech.includes('graphql')) return <SiGraphql />;
  if (lowerCaseTech.includes('aws')) return <SiAwslambda />;
  if (lowerCaseTech.includes('docker')) return <SiDocker />;
  if (lowerCaseTech.includes('redis')) return <SiRedis />;
  if (lowerCaseTech.includes('elasticsearch')) return <SiElasticsearch />;
  if (lowerCaseTech.includes('openai')) return <SiOpenai />;
  if (lowerCaseTech.includes('firebase')) return <FaFire />;
  if (lowerCaseTech.includes('mobile')) return <FaMobile />;
  if (lowerCaseTech.includes('desktop')) return <FaDesktop />;
  if (lowerCaseTech.includes('server')) return <FaServer />;
  if (lowerCaseTech.includes('tool')) return <FaTools />;
  
  return <FaCode />;
};

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

const filterVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const badgeVariants = {
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

const highlightVariants = {
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

const detailVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

const contentVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: 50,
    transition: {
      duration: 0.3
    }
  }
};

const Projects = () => {
  const { ref, inView } = useIntersectionObserver('projects', 0.1, false);
  const projectsData = useSelector(selectProjects);
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Create a list of unique technology categories
  const allTechnologies = projectsData?.items?.reduce((acc, project) => {
    project.tech?.forEach(tech => {
      if (!acc.includes(tech)) {
        acc.push(tech);
      }
    });
    return acc;
  }, []) || [];
  
  // Filter projects based on selected technology
  const filteredProjects = projectsData?.items?.filter(project => {
    if (activeFilter === 'all') return true;
    return project.tech?.includes(activeFilter);
  }) || [];
  
  // Handle filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };
  
  // Add the STAR methodology fields to each project
  const projectsWithDetails = filteredProjects.map(project => {
    // Add default STAR fields if not provided
    return {
      ...project,
      situation: project.situation || project.longDescription,
      task: project.task || 'The goal was to develop a solution that addresses the needs outlined in the situation.',
      approach: project.approach || 'I implemented a solution using the technologies listed above, focusing on best practices and performance optimization.',
      results: project.results || 'The project was successfully completed, meeting all requirements and delivering a high-quality solution.',
    };
  });
  
  return (
    <ProjectsContainer id="projects" ref={ref}>
      <ProjectsContent>
        <SectionHeader
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2>{projectsData?.sectionTitle || 'My Projects'}</h2>
          <p>{projectsData?.sectionSubtitle || 'Explore my portfolio of web development projects showcasing my skills and experience.'}</p>
        </SectionHeader>
        
        <FilterContainer
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <FilterButton 
            active={activeFilter === 'all'} 
            onClick={() => handleFilterChange('all')}
          >
            All
          </FilterButton>
          
          {allTechnologies.slice(0, 8).map((tech, index) => (
            <FilterButton
              key={index}
              active={activeFilter === tech}
              onClick={() => handleFilterChange(tech)}
            >
              {tech}
            </FilterButton>
          ))}
        </FilterContainer>
        
        <ProjectsList
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projectsWithDetails.map((project, index) => (
            <CaseStudy 
              key={index} 
              project={project}
              index={index}
            />
          ))}
          
          {filteredProjects.length === 0 && (
            <motion.p
              variants={itemVariants}
              style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-secondary-color)' }}
            >
              No projects found with the selected technology.
            </motion.p>
          )}
        </ProjectsList>
      </ProjectsContent>
    </ProjectsContainer>
  );
};

export default Projects; 