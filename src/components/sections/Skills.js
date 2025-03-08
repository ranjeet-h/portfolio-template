import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { 
  FaCode, 
  FaServer, 
  FaTools, 
  FaUsers, 
  FaReact, 
  FaNodeJs, 
  FaDatabase,
  FaDocker,
  FaGitAlt,
  FaJs,
  FaCss3Alt,
  FaHtml5,
  FaLaptopCode,
  FaChartLine,
  FaRegChartBar
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiRedux, 
  SiTailwindcss, 
  SiNextdotjs,
  SiMongodb, 
  SiPostgresql,
  SiGraphql, 
  SiAmazonwebservices,
  SiFirebase,
  SiExpress,
  SiJest,
  SiWebpack,
  SiVite
} from 'react-icons/si';
import Section from '../ui/Section';
import config from '../../utils/configUtils';

const SkillsContainer = styled.div`
  max-width: 100%;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SkillCategory = styled(motion.div)`
  background: var(--card-background-color);
  border-radius: var(--border-radius-md);
  padding: 2rem;
  box-shadow: var(--box-shadow);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: 100%;
  
  &:hover {
    box-shadow: var(--box-shadow-hover);
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
  
  svg {
    font-size: 2rem;
    color: var(--primary-color);
  }
  
  h3 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--text-color);
  }
`;

const SkillsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SkillItem = styled.div`
  width: 100%;
`;

const SkillTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  
  span {
    font-size: 0.9rem;
    color: var(--secondary-text-color);
  }
  
  .skill-name {
    font-weight: 500;
    color: var(--text-color);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    svg {
      color: var(--primary-color);
      font-size: 1.1rem;
    }
  }
  
  .skill-percentage {
    color: var(--primary-color);
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color) 0%, var(--accent-color) 100%);
  border-radius: 10px;
`;

// Get icon for skill category
const getCategoryIcon = (iconName) => {
  switch (iconName) {
    case 'code':
      return <FaCode />;
    case 'server':
      return <FaServer />;
    case 'tools':
      return <FaTools />;
    case 'users':
      return <FaUsers />;
    default:
      return <FaCode />;
  }
};

// Get icon for specific skill
const getSkillIcon = (skillName) => {
  const name = skillName.toLowerCase();
  
  if (name.includes('react')) return <FaReact />;
  if (name.includes('javascript')) return <FaJs />;
  if (name.includes('typescript')) return <SiTypescript />;
  if (name.includes('node')) return <FaNodeJs />;
  if (name.includes('html')) return <FaHtml5 />;
  if (name.includes('css')) return <FaCss3Alt />;
  if (name.includes('tailwind')) return <SiTailwindcss />;
  if (name.includes('redux')) return <SiRedux />;
  if (name.includes('next')) return <SiNextdotjs />;
  if (name.includes('mongo')) return <SiMongodb />;
  if (name.includes('postgres')) return <SiPostgresql />;
  if (name.includes('sql')) return <FaDatabase />;
  if (name.includes('database')) return <FaDatabase />;
  if (name.includes('express')) return <SiExpress />;
  if (name.includes('graphql')) return <SiGraphql />;
  if (name.includes('aws') || name.includes('amazon')) return <SiAmazonwebservices />;
  if (name.includes('firebase')) return <SiFirebase />;
  if (name.includes('docker')) return <FaDocker />;
  if (name.includes('git')) return <FaGitAlt />;
  if (name.includes('jest')) return <SiJest />;
  if (name.includes('webpack')) return <SiWebpack />;
  if (name.includes('vite')) return <SiVite />;
  if (name.includes('backend')) return <FaServer />;
  if (name.includes('frontend')) return <FaLaptopCode />;
  if (name.includes('analytics')) return <FaChartLine />;
  if (name.includes('metrics')) return <FaRegChartBar />;
  if (name.includes('optimization')) return <FaChartLine />;
  if (name.includes('analysis')) return <FaRegChartBar />;
  
  // Default icon
  return <FaCode />;
};

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

const categoryVariants = {
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

const barVariants = {
  hidden: { width: 0 },
  visible: (percent) => ({
    width: `${percent}%`,
    transition: {
      duration: 1.5,
      ease: "easeOut",
      delay: 0.3
    }
  })
};

const SkillsSection = () => {
  const skillsData = config.get('skills', {});
  const categories = skillsData.categories || [];
  
  return (
    <Section
      id="skills"
      title={skillsData.sectionTitle || "My Skills"}
      subtitle={skillsData.sectionSubtitle || "What I bring to the table"}
      bgColor="var(--background-color)"
    >
      <SkillsContainer>
        <CategoryGrid
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {categories.map((category, index) => (
            <SkillCategory 
              key={index}
              variants={categoryVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <CategoryHeader>
                {getCategoryIcon(category.icon)}
                <h3>{category.name}</h3>
              </CategoryHeader>
              
              <SkillsList>
                {category.skills.map((skill, skillIndex) => (
                  <SkillItem key={skillIndex}>
                    <SkillTop>
                      <span className="skill-name">
                        {getSkillIcon(skill.name)}
                        {skill.name}
                      </span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </SkillTop>
                    
                    <ProgressBarContainer>
                      <ProgressBar
                        custom={skill.level}
                        variants={barVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      />
                    </ProgressBarContainer>
                  </SkillItem>
                ))}
              </SkillsList>
            </SkillCategory>
          ))}
        </CategoryGrid>
      </SkillsContainer>
    </Section>
  );
};

export default SkillsSection; 