import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
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
  FaRegChartBar,
  FaFilter,
  FaSearch
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
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { selectSkills } from '../../redux/slices/portfolioSlice';

const SkillsContainer = styled.div`
  max-width: 100%;
  position: relative;
`;

const SkillsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CategoryFilters = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const CategoryFilter = styled(motion.button)`
  background: ${props => props.active ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.05)'};
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
  backdrop-filter: blur(10px);
  box-shadow: ${props => props.active ? '0 5px 10px rgba(0, 0, 0, 0.2)' : 'none'};
  
  &:hover {
    background: ${props => props.active ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.1)'};
    transform: translateY(-2px);
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.4rem 1rem;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  max-width: 300px;
  
  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
  }
`;

const SearchInput = styled.input`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border-radius: 30px;
  color: var(--text-color);
  width: 100%;
  font-size: 0.9rem;
  backdrop-filter: blur(10px);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(76, 161, 175, 0.2);
  }
  
  &::placeholder {
    color: var(--secondary-text-color);
    opacity: 0.5;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--secondary-text-color);
  font-size: 0.9rem;
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  }
`;

const SkillCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  border-radius: var(--border-radius-md);
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      transparent 0%,
      rgba(255, 255, 255, 0.03) 50%,
      transparent 100%
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(76, 161, 175, 0.3);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    
    &::before {
      transform: translateX(100%);
    }
    
    .skill-icon {
      transform: scale(1.1);
      color: var(--primary-color);
    }
  }
  
  @media (max-width: 768px) {
    padding: 1.2rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const SkillIcon = styled.div`
  font-size: 2.5rem;
  color: ${props => `rgba(76, 161, 175, ${props.level / 100})`};
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    width: ${props => `${props.level}%`};
    height: 3px;
    background: linear-gradient(90deg, var(--primary-color) 0%, var(--accent-color) 100%);
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 3px;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 0.8rem;
  }
`;

const SkillName = styled.span`
  font-size: 0.9rem;
  text-align: center;
  color: var(--text-color);
  font-weight: 500;
  transition: all 0.3s ease;
  line-height: 1.4;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const SkillLevel = styled.span`
  font-size: 0.75rem;
  color: var(--primary-color);
  margin-top: 0.3rem;
  font-weight: 500;
  
  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const SkillDetailOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  padding: 1rem;
`;

const SkillDetailCard = styled(motion.div)`
  background: var(--card-background-color);
  border-radius: var(--border-radius-md);
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    max-width: 90%;
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const SkillDetailHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SkillDetailIcon = styled.div`
  font-size: 4rem;
  color: var(--primary-color);
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const SkillDetailInfo = styled.div`
  flex: 1;
`;

const SkillDetailTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CategoryBadge = styled.span`
  background: rgba(76, 161, 175, 0.1);
  color: var(--primary-color);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  
  svg {
    font-size: 0.9rem;
  }
`;

const SkillLevelBar = styled.div`
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  margin-top: 1.5rem;
  position: relative;
  overflow: hidden;
`;

const SkillLevelProgress = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color) 0%, var(--accent-color) 100%);
  border-radius: 3px;
`;

const SkillLevelLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  
  span {
    font-size: 0.8rem;
    color: var(--secondary-text-color);
  }
  
  .percentage {
    color: var(--primary-color);
    font-weight: 500;
  }
`;

const SkillDetailContent = styled.div`
  margin-top: 2rem;
`;

const SkillDetailDescription = styled.p`
  color: var(--secondary-text-color);
  line-height: 1.7;
  margin-bottom: 1.5rem;
`;

const RelatedSkillsTitle = styled.h4`
  font-size: 1.1rem;
  color: var(--text-color);
  margin-bottom: 1rem;
`;

const RelatedSkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const RelatedSkillTag = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  color: var(--secondary-text-color);
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-color);
    border-color: rgba(76, 161, 175, 0.3);
  }
`;

const NoSkillsFound = styled(motion.div)`
  padding: 3rem;
  text-align: center;
  color: var(--secondary-text-color);
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--border-radius-md);
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
  
  h3 {
    margin-bottom: 1rem;
    color: var(--text-color);
  }
`;

const SkillDetailMasteryLevel = styled(motion.div)`
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(76, 161, 175, 0.05);
  border-radius: var(--border-radius-sm);
  border: 1px solid rgba(76, 161, 175, 0.1);
  
  h4 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-color);
    margin-bottom: 0.5rem;
    font-size: 1rem;
    
    svg {
      color: var(--primary-color);
    }
  }
  
  p {
    color: var(--secondary-text-color);
    font-size: 0.9rem;
    line-height: 1.6;
  }
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

// Get mastery description based on skill level
const getMasteryDescription = (level) => {
  if (level >= 90) {
    return "Expert level proficiency. Extensive experience with complex implementations, optimization, and mentoring others.";
  } else if (level >= 80) {
    return "Advanced proficiency. Comfortable with complex implementations and best practices.";
  } else if (level >= 70) {
    return "Strong working proficiency. Good understanding of most features and implementation approaches.";
  } else if (level >= 60) {
    return "Working proficiency. Comfortable with basic implementations and some advanced features.";
  } else {
    return "Foundational knowledge. Familiar with core concepts and basic implementations.";
  }
};

// Find related skills based on name
const findRelatedSkills = (currentSkill, allSkills, categoryData) => {
  const relatedSkills = [];
  const currentName = currentSkill.name.toLowerCase();
  const category = categoryData.name;
  
  // First find skills in the same category with related keywords
  allSkills.forEach(category => {
    category.skills.forEach(skill => {
      if (skill.name !== currentSkill.name) {
        const skillName = skill.name.toLowerCase();
        
        // Check for keyword matches
        if (
          (currentName.includes('react') && skillName.includes('react')) ||
          (currentName.includes('javascript') && skillName.includes('script')) ||
          (currentName.includes('node') && skillName.includes('node')) ||
          (currentName.includes('aws') && skillName.includes('aws')) ||
          (currentName.includes('test') && skillName.includes('test')) ||
          (currentName.includes('ui') && skillName.includes('ui')) ||
          (currentName.includes('css') && skillName.includes('css')) ||
          (currentName.includes('api') && skillName.includes('api')) ||
          (currentName.includes('database') && (
            skillName.includes('database') || 
            skillName.includes('sql') || 
            skillName.includes('mongo')
          ))
        ) {
          relatedSkills.push(skill);
        }
      }
    });
  });
  
  // If we don't have enough related skills, add some from the same category
  if (relatedSkills.length < 3) {
    allSkills.forEach(cat => {
      if (cat.name === category) {
        cat.skills.forEach(skill => {
          if (skill.name !== currentSkill.name && !relatedSkills.some(s => s.name === skill.name)) {
            relatedSkills.push(skill);
          }
        });
      }
    });
  }
  
  // Return up to 5 related skills
  return relatedSkills.slice(0, 5);
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

const skillCardVariants = {
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

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.2
    }
  }
};

const detailCardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const progressVariants = {
  hidden: { width: 0 },
  visible: (level) => ({
    width: `${level}%`,
    transition: {
      duration: 1.2,
      delay: 0.3,
      ease: "easeOut"
    }
  })
};

const SkillsSection = () => {
  const reduxSkills = useSelector(selectSkills);
  const skillsData = config.get('skills', reduxSkills);
  const categories = skillsData.categories || [];
  
  // Local state for filtered skills
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // Intersection observer to trigger animations
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  // Filter skills based on activeCategory and searchQuery
  useEffect(() => {
    let results = [];
    
    if (activeCategory === 'all') {
      // Get all skills
      categories.forEach(category => {
        category.skills.forEach(skill => {
          results.push({
            ...skill,
            category: category.name,
            categoryIcon: category.icon
          });
        });
      });
    } else {
      // Get skills from selected category
      const category = categories.find(cat => cat.name.toLowerCase() === activeCategory.toLowerCase());
      if (category) {
        results = category.skills.map(skill => ({
          ...skill,
          category: category.name,
          categoryIcon: category.icon
        }));
      }
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        skill => skill.name.toLowerCase().includes(query)
      );
    }
    
    // Sort skills by level in descending order
    results.sort((a, b) => b.level - a.level);
    
    setFilteredSkills(results);
  }, [activeCategory, searchQuery, categories]);
  
  // Handle category filter click
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setSearchQuery('');
  };
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle skill card click
  const handleSkillClick = (skill) => {
    const category = categories.find(cat => cat.name === skill.category);
    setSelectedSkill(skill);
    setSelectedCategory(category);
  };
  
  // Close detail modal
  const closeModal = () => {
    setSelectedSkill(null);
    setSelectedCategory(null);
  };
  
  // Handle related skill click
  const handleRelatedSkillClick = (skill) => {
    // Find the complete skill data
    let foundSkill = null;
    let foundCategory = null;
    
    categories.forEach(category => {
      category.skills.forEach(s => {
        if (s.name === skill.name) {
          foundSkill = {
            ...s,
            category: category.name,
            categoryIcon: category.icon
          };
          foundCategory = category;
        }
      });
    });
    
    if (foundSkill) {
      setSelectedSkill(foundSkill);
      setSelectedCategory(foundCategory);
    }
  };
  
  return (
    <Section
      id="skills"
      title={skillsData.sectionTitle || "My Skills"}
      subtitle={skillsData.sectionSubtitle || "What I bring to the table"}
      bgColor="var(--background-color)"
    >
      <SkillsContainer ref={ref}>
        <SkillsHeader>
          <CategoryFilters>
            <CategoryFilter
              active={activeCategory === 'all'}
              onClick={() => handleCategoryClick('all')}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaFilter /> All Skills
            </CategoryFilter>
            
            {categories.map((category, index) => (
              <CategoryFilter
                key={index}
                active={activeCategory === category.name.toLowerCase()}
                onClick={() => handleCategoryClick(category.name.toLowerCase())}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                {getCategoryIcon(category.icon)} {category.name}
              </CategoryFilter>
            ))}
          </CategoryFilters>
          
          <SearchContainer>
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </SearchContainer>
        </SkillsHeader>
        
        {filteredSkills.length > 0 ? (
          <SkillsGrid
            as={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {filteredSkills.map((skill, index) => (
              <SkillCard
                key={index}
                variants={skillCardVariants}
                onClick={() => handleSkillClick(skill)}
                whileHover={{ y: -10 }}
                whileTap={{ scale: 0.95 }}
              >
                <SkillIcon className="skill-icon" level={skill.level}>
                  {getSkillIcon(skill.name)}
                </SkillIcon>
                <SkillName>{skill.name}</SkillName>
                <SkillLevel>{skill.level}%</SkillLevel>
              </SkillCard>
            ))}
          </SkillsGrid>
        ) : (
          <NoSkillsFound
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaSearch />
            <h3>No skills found</h3>
            <p>Try adjusting your search criteria</p>
          </NoSkillsFound>
        )}
        
        <AnimatePresence>
          {selectedSkill && (
            <SkillDetailOverlay
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={closeModal}
            >
              <SkillDetailCard
                variants={detailCardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                onClick={e => e.stopPropagation()}
              >
                <CloseButton 
                  onClick={closeModal}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </CloseButton>
                
                <SkillDetailHeader>
                  <SkillDetailIcon>
                    {getSkillIcon(selectedSkill.name)}
                  </SkillDetailIcon>
                  
                  <SkillDetailInfo>
                    <SkillDetailTitle>{selectedSkill.name}</SkillDetailTitle>
                    <CategoryBadge>
                      {getCategoryIcon(selectedSkill.categoryIcon)} {selectedSkill.category}
                    </CategoryBadge>
                    
                    <SkillLevelBar>
                      <SkillLevelProgress
                        custom={selectedSkill.level}
                        variants={progressVariants}
                        initial="hidden"
                        animate="visible"
                      />
                    </SkillLevelBar>
                    
                    <SkillLevelLabel>
                      <span>Proficiency</span>
                      <span className="percentage">{selectedSkill.level}%</span>
                    </SkillLevelLabel>
                  </SkillDetailInfo>
                </SkillDetailHeader>
                
                <SkillDetailContent>
                  <SkillDetailMasteryLevel
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h4>
                      <FaChartLine /> Mastery Level
                    </h4>
                    <p>
                      {getMasteryDescription(selectedSkill.level)}
                    </p>
                  </SkillDetailMasteryLevel>
                  
                  {selectedCategory && (
                    <>
                      <RelatedSkillsTitle>Related Skills</RelatedSkillsTitle>
                      <RelatedSkillsList>
                        {findRelatedSkills(selectedSkill, categories, selectedCategory).map((skill, index) => (
                          <RelatedSkillTag
                            key={index}
                            onClick={() => handleRelatedSkillClick(skill)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {skill.name}
                          </RelatedSkillTag>
                        ))}
                      </RelatedSkillsList>
                    </>
                  )}
                </SkillDetailContent>
              </SkillDetailCard>
            </SkillDetailOverlay>
          )}
        </AnimatePresence>
      </SkillsContainer>
    </Section>
  );
};

export default SkillsSection;