import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import styled from '@emotion/styled';
import { portfolioData } from '../data/portfolio-data';
import { FaGithub, FaLinkedin, FaTwitter, FaExternalLinkAlt, FaDownload, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const PortfolioContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%);
  color: #ffffff;
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1rem;

  @media (min-width: 768px) {
    padding: 4rem 2rem;
  }
`;

const Header = styled(motion.header)`
  text-align: center;
  padding: 4rem 1rem;
  background: rgba(44, 62, 80, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    padding: 6rem 2rem;
  }
`;

const Bio = styled(motion.div)`
  max-width: 800px;
  margin: 2rem auto;
  text-align: center;
  line-height: 1.8;
  color: #bdc3c7;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 1rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 2rem;
  
  a {
    color: #fff;
    font-size: 1.5rem;
    transition: all 0.3s ease;
    padding: 0.7rem;
    border-radius: 50%;
    background: rgba(76, 161, 175, 0.1);
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2), -4px -4px 8px rgba(255, 255, 255, 0.05);
    
    &:hover {
      color: #4ca1af;
      transform: translateY(-3px);
      box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.3), -6px -6px 12px rgba(255, 255, 255, 0.1);
    }
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
`;

const SkillCategory = styled(motion.div)`
  background: rgba(44, 62, 80, 0.8);
  padding: 2rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    margin-bottom: 1.5rem;
    color: #4ca1af;
    font-size: 1.3rem;
    letter-spacing: 0.5px;
  }
`;

const SkillTag = styled(motion.span)`
  display: inline-block;
  background: rgba(76, 161, 175, 0.1);
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  margin: 0.5rem;
  font-size: 0.9rem;
  color: #ecf0f1;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2), -3px -3px 6px rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(76, 161, 175, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(76, 161, 175, 0.2);
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3), -4px -4px 8px rgba(255, 255, 255, 0.1);
  }
`;

const ExperienceTimeline = styled.div`
  max-width: 800px;
  margin: 3rem auto;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 2px;
    background: #4ca1af;
    opacity: 0.3;

    @media (max-width: 768px) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  padding: 2rem;
  background: rgba(44, 62, 80, 0.8);
  border-radius: 20px;
  margin-bottom: 2rem;
  margin-left: 3rem;
  backdrop-filter: blur(10px);
  box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.2), -8px -8px 16px rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 3rem;
  }

  &::before {
    content: '';
    position: absolute;
    left: -3.5rem;
    top: 2rem;
    width: 1rem;
    height: 1rem;
    background: #4ca1af;
    border-radius: 50%;
    box-shadow: 0 0 0 5px rgba(76, 161, 175, 0.2);

    @media (max-width: 768px) {
      left: 50%;
      top: -1.5rem;
      transform: translateX(-50%);
    }
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
`;

const ProjectCard = styled(motion.div)`
  background: rgba(44, 62, 80, 0.8);
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .content {
    padding: 1.8rem;
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;

  a {
    color: #4ca1af;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
    padding: 0.5rem 1rem;
    border-radius: 15px;
    background: rgba(76, 161, 175, 0.1);
    box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2), -3px -3px 6px rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;

    &:hover {
      background: rgba(76, 161, 175, 0.2);
      transform: translateY(-2px);
      box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3), -4px -4px 8px rgba(255, 255, 255, 0.1);
    }
  }
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #4ca1af;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
  padding: 0 1rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    color: #bdc3c7;
    padding: 0.8rem 1.5rem;
    border-radius: 15px;
    background: rgba(44, 62, 80, 0.8);
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2), -4px -4px 8px rgba(255, 255, 255, 0.05);
    
    svg {
      color: #4ca1af;
    }
  }
`;

const ScrollProgress = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #4ca1af;
  transform-origin: 0%;
  z-index: 1000;
`;

const ResumeButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background: #4ca1af;
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 2rem;
  box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.3), -6px -6px 12px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.4), -8px -8px 16px rgba(255, 255, 255, 0.15);
    background: #3a99a1;
  }
`;

const StatNumber = styled(motion.div)`
  font-size: 2.5rem;
  font-weight: bold;
  color: #4ca1af;
  margin-bottom: 0.8rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
  text-align: center;
  padding: 0 1rem;
`;

const StatCard = styled(motion.div)`
  background: rgba(44, 62, 80, 0.8);
  padding: 2rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #bdc3c7;
`;

function Portfolio() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { personalInfo, skills, experience, projects } = portfolioData;

  const stats = [
    { number: '4.5+', label: 'Years of Experience' },
    { number: '50+', label: 'Projects Completed' },
    { number: '30+', label: 'Happy Clients' },
    { number: '99%', label: 'Client Satisfaction' }
  ];

  return (
    <PortfolioContainer>
      <ScrollProgress style={{ scaleX }} />
      
      <Header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          style={{ fontSize: '3.5rem', marginBottom: '1rem' }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
        >
          {personalInfo.name}
        </motion.h1>
        <motion.h2
          style={{ fontSize: '2rem', color: '#61dafb', marginBottom: '1.5rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {personalInfo.title}
        </motion.h2>
        <Bio
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {personalInfo.bio}
        </Bio>
        
        <ContactInfo
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div>
            <FaEnvelope />
            {personalInfo.email}
          </div>
          <div>
            <FaMapMarkerAlt />
            {personalInfo.location}
          </div>
        </ContactInfo>

        <SocialLinks>
          <motion.a
            href={personalInfo.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
          >
            <FaGithub />
          </motion.a>
          <motion.a
            href={personalInfo.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
          >
            <FaLinkedin />
          </motion.a>
          <motion.a
            href={personalInfo.socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
          >
            <FaTwitter />
          </motion.a>
        </SocialLinks>

        <ResumeButton
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaDownload /> Download Resume
        </ResumeButton>
      </Header>

      <Section>
        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <StatNumber>{stat.number}</StatNumber>
              <div>{stat.label}</div>
            </StatCard>
          ))}
        </StatsGrid>
      </Section>

      <Section>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Skills
        </SectionTitle>
        <SkillsGrid>
          {Object.entries(skills).map(([category, skillList], index) => (
            <SkillCategory
              key={category}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
              {skillList.map((skill, i) => (
                <SkillTag
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skill}
                </SkillTag>
              ))}
            </SkillCategory>
          ))}
        </SkillsGrid>
      </Section>

      <Section>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Experience
        </SectionTitle>
        <ExperienceTimeline>
          {experience.map((exp, index) => (
            <TimelineItem
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3>{exp.position}</h3>
              <h4 style={{ color: '#61dafb', marginTop: '0.5rem' }}>{exp.company}</h4>
              <p style={{ color: '#999', marginTop: '0.5rem' }}>{exp.period}</p>
              <p style={{ marginTop: '1rem' }}>{exp.description}</p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                {exp.achievements.map((achievement, i) => (
                  <li key={i} style={{ marginBottom: '0.5rem' }}>{achievement}</li>
                ))}
              </ul>
            </TimelineItem>
          ))}
        </ExperienceTimeline>
      </Section>

      <Section>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Projects
        </SectionTitle>
        <ProjectGrid>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <img src={project.image} alt={project.title} />
              <div className="content">
                <h3 style={{ marginBottom: '1rem' }}>{project.title}</h3>
                <p style={{ color: '#cccccc', marginBottom: '1rem' }}>
                  {project.description}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      style={{
                        background: 'rgba(97, 218, 251, 0.1)',
                        padding: '0.3rem 0.8rem',
                        borderRadius: '15px',
                        fontSize: '0.9rem'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
                  {project.highlights.map((highlight, i) => (
                    <li key={i} style={{ marginBottom: '0.5rem' }}>{highlight}</li>
                  ))}
                </ul>
                <ProjectLinks>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                  >
                    <FaGithub /> View Code
                  </motion.a>
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </motion.a>
                </ProjectLinks>
              </div>
            </ProjectCard>
          ))}
        </ProjectGrid>
      </Section>
    </PortfolioContainer>
  );
}

export default Portfolio; 