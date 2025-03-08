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

const ProjectsContainer = styled.div`
  max-width: 100%;
`;

const ProjectFilters = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const FilterButton = styled(motion.button)`
  background: ${props => props.active ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.active ? 'white' : 'var(--secondary-text-color)'};
  border: 1px solid ${props => props.active ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.1)'};
  padding: 0.5rem 1.2rem;
  border-radius: 30px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    font-size: 0.9rem;
  }
  
  &:hover {
    background: ${props => props.active ? 'var(--primary-color)' : 'rgba(76, 161, 175, 0.1)'};
    border-color: var(--primary-color);
  }
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

const ProjectsSection = () => {
  const projectsData = config.get('projects', {});
  const projects = projectsData.items || [];
  
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Get unique tech categories
  const allTech = projects.reduce((acc, project) => {
    if (project.tech && project.tech.length > 0) {
      return [...acc, ...project.tech];
    }
    return acc;
  }, []);
  
  const uniqueTech = ['all', ...new Set(allTech)];
  
  // Filter projects by tech
  const filterProjects = (filter) => {
    setActiveFilter(filter);
    
    if (filter === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => 
        project.tech && project.tech.includes(filter)
      );
      setFilteredProjects(filtered);
    }
  };
  
  // Open project detail modal
  const openProjectDetail = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };
  
  // Close project detail modal
  const closeProjectDetail = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };
  
  // Get project image with picsum photos
  const getProjectImage = (project, size = '400x250') => {
    if (project.image) {
      return project.image;
    }
    // Generate a consistent random image based on project title
    const seed = project.title.toLowerCase().replace(/\s+/g, '-');
    return `https://picsum.photos/seed/${seed}/${size.split('x')[0]}/${size.split('x')[1]}`;
  };
  
  return (
    <Section
      id="projects"
      title={projectsData.sectionTitle || "Portfolio Projects"}
      subtitle={projectsData.sectionSubtitle || "Showcasing my best work"}
      bgColor="var(--background-color)"
    >
      <ProjectsContainer>
        <ProjectFilters
          as={motion.div}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {uniqueTech.map((tech, index) => (
            <FilterButton
              key={tech}
              active={activeFilter === tech}
              onClick={() => filterProjects(tech)}
              variants={filterVariants}
              custom={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {getFilterIcon(tech)}
              {tech.charAt(0).toUpperCase() + tech.slice(1)}
            </FilterButton>
          ))}
        </ProjectFilters>
        
        <ProjectsGrid
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          layout
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <div className="card-image">
                  <img src={getProjectImage(project)} alt={project.title} />
                  <div className="overlay"></div>
                  <div className="tech-badges">
                    {project.tech && project.tech.slice(0, 3).map((tech, techIndex) => (
                      <TechBadge
                        key={techIndex}
                        variants={badgeVariants}
                        custom={techIndex}
                      >
                        {getFilterIcon(tech)}
                        {tech}
                      </TechBadge>
                    ))}
                    {project.tech && project.tech.length > 3 && (
                      <TechBadge
                        variants={badgeVariants}
                        custom={3}
                      >
                        +{project.tech.length - 3}
                      </TechBadge>
                    )}
                  </div>
                </div>
                
                <div className="card-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  
                  <div className="card-actions">
                    {project.githubUrl && (
                      <ProjectLink
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 3 }}
                      >
                        <FaGithub /> GitHub
                      </ProjectLink>
                    )}
                    
                    {project.liveUrl && (
                      <ProjectLink
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 3 }}
                      >
                        <FaExternalLinkAlt /> Live Demo
                      </ProjectLink>
                    )}
                    
                    <ProjectLink
                      as={motion.button}
                      whileHover={{ x: 3 }}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer',
                        marginLeft: 'auto'
                      }}
                      onClick={() => openProjectDetail(project)}
                    >
                      <FaInfoCircle /> Details
                    </ProjectLink>
                  </div>
                </div>
              </ProjectCard>
            ))}
          </AnimatePresence>
        </ProjectsGrid>
        
        <AnimatePresence>
          {selectedProject && (
            <ProjectDetail
              variants={detailVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={closeProjectDetail}
            >
              <DetailContent
                variants={contentVariants}
                onClick={(e) => e.stopPropagation()}
              >
                <CloseButton
                  onClick={closeProjectDetail}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes />
                </CloseButton>
                
                <DetailHeader>
                  <img 
                    src={getProjectImage(selectedProject, '900x500')} 
                    alt={selectedProject.title}
                  />
                  <div className="overlay"></div>
                  <div className="title">
                    <h2>{selectedProject.title}</h2>
                  </div>
                </DetailHeader>
                
                <DetailBody>
                  <p>{selectedProject.longDescription || selectedProject.description}</p>
                  
                  {selectedProject.tech && selectedProject.tech.length > 0 && (
                    <>
                      <h3><FaLaptopCode /> Technologies Used</h3>
                      <DetailTechStack>
                        {selectedProject.tech.map((tech, index) => (
                          <DetailTechBadge
                            key={index}
                            variants={badgeVariants}
                            custom={index}
                            initial="hidden"
                            animate="visible"
                          >
                            {getFilterIcon(tech)}
                            {tech}
                          </DetailTechBadge>
                        ))}
                      </DetailTechStack>
                    </>
                  )}
                  
                  {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                    <>
                      <h3><FaInfoCircle /> Project Highlights</h3>
                      <DetailHighlights>
                        {selectedProject.highlights.map((highlight, index) => (
                          <DetailHighlight
                            key={index}
                            variants={highlightVariants}
                            custom={index}
                            initial="hidden"
                            animate="visible"
                          >
                            {highlight}
                          </DetailHighlight>
                        ))}
                      </DetailHighlights>
                    </>
                  )}
                  
                  <DetailLinks>
                    {selectedProject.githubUrl && (
                      <DetailLink
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaGithub /> View Code
                      </DetailLink>
                    )}
                    
                    {selectedProject.liveUrl && (
                      <DetailLink
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaExternalLinkAlt /> Live Demo
                      </DetailLink>
                    )}
                  </DetailLinks>
                </DetailBody>
              </DetailContent>
            </ProjectDetail>
          )}
        </AnimatePresence>
      </ProjectsContainer>
    </Section>
  );
};

export default ProjectsSection; 