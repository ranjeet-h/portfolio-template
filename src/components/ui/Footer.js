import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram, 
  FaFacebook,
  FaYoutube,
  FaMedium,
  FaDev,
  FaDribbble,
  FaBehance,
  FaChevronUp,
  FaReact,
  FaNode,
  FaDatabase,
  FaCodeBranch,
  FaCode,
  FaBlog,
  FaStar
} from 'react-icons/fa';
import config from '../../utils/configUtils';

const FooterContainer = styled.footer`
  background-color: var(--card-background-color);
  color: var(--text-color);
  padding: 4rem 0 2rem;
  position: relative;
  
  @media (max-width: 768px) {
    padding: var(--mobile-padding-top, 4rem) 0 var(--mobile-padding-bottom, 2rem);
  }
`;

const FooterContent = styled.div`
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 var(--mobile-padding-left, 1rem) 0 var(--mobile-padding-right, 1rem);
  }
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2.5rem;
  }
  
  @media (max-width: 480px) {
    gap: 2rem;
  }
`;

const FooterInfo = styled.div`
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--primary-color);
    
    @media (max-width: 480px) {
      font-size: 1.3rem;
      margin-bottom: 1.2rem;
    }
  }
  
  p {
    color: var(--secondary-text-color);
    margin-bottom: 1.5rem;
    font-size: 1rem;
    line-height: 1.6;
    
    @media (max-width: 480px) {
      font-size: 0.9rem;
      margin-bottom: 1.2rem;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    gap: 0.8rem;
  }
`;

const SocialIcon = styled.a`
  color: var(--text-color);
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(76, 161, 175, 0.1);
  transition: all 0.3s ease;
  
  @media (max-width: 480px) {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
  
  &:hover {
    color: white;
    background: var(--primary-color);
    transform: translateY(-5px);
  }
`;

const FooterNav = styled.div`
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--primary-color);
    
    @media (max-width: 480px) {
      font-size: 1.3rem;
      margin-bottom: 1.2rem;
    }
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin-bottom: 0.8rem;
    
    @media (max-width: 480px) {
      margin-bottom: 0.6rem;
    }
  }
  
  a {
    color: var(--secondary-text-color);
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-block;
    position: relative;
    font-size: 1rem;
    
    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
    
    &:hover {
      color: var(--primary-color);
      transform: translateX(5px);
    }
  }
`;

const FooterDivider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 2rem 0;
  
  @media (max-width: 480px) {
    margin: 1.5rem 0;
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Copyright = styled.p`
  color: var(--secondary-text-color);
  font-size: 0.9rem;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Credits = styled.p`
  color: var(--secondary-text-color);
  font-size: 0.9rem;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
  
  a {
    color: var(--primary-color);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ScrollToTop = styled(motion.button)`
  position: absolute;
  right: 2rem;
  bottom: 2rem;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  font-size: 1.2rem;
  z-index: 10;
  
  &:hover {
    background: var(--accent-color);
  }
  
  @media (max-width: 768px) {
    right: 1rem;
    bottom: 1rem;
  }
  
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
`;

// Enhanced styled components for the footer
const TechStackSection = styled.div`
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--primary-color);
    
    @media (max-width: 480px) {
      font-size: 1.3rem;
      margin-bottom: 1.2rem;
    }
  }
`;

const TechStackGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.8rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem 0.8rem;
  }
`;

const TechItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--secondary-text-color);
  font-size: 0.9rem;
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
    gap: 0.4rem;
  }
  
  svg {
    color: var(--primary-color);
  }
`;

const GitHubActivity = styled.div`
  margin-top: 2rem;
  
  @media (max-width: 480px) {
    margin-top: 1.5rem;
  }
  
  h4 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    color: var(--text-color);
    
    @media (max-width: 480px) {
      font-size: 1rem;
      margin-bottom: 0.8rem;
    }
  }
  
  .activity-item {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 0.8rem;
    padding: 0.8rem;
    border-radius: var(--border-radius-sm);
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    font-size: 0.9rem;
    color: var(--secondary-text-color);
    transition: all 0.3s ease;
    
    @media (max-width: 768px) {
      text-align: left;
    }
    
    @media (max-width: 480px) {
      font-size: 0.85rem;
      padding: 0.7rem;
      gap: 0.6rem;
    }
    
    &:hover {
      background: rgba(255, 255, 255, 0.05);
      transform: translateX(5px);
    }
    
    .icon {
      color: var(--primary-color);
    }
    
    .time {
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.5);
      
      @media (max-width: 480px) {
        font-size: 0.75rem;
      }
    }
  }
`;

const LatestBlogPost = styled.a`
  display: block;
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: var(--border-radius-sm);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  text-decoration: none;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    text-align: left;
    margin-left: auto;
    margin-right: auto;
    max-width: 500px;
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem;
    margin-top: 1.2rem;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-5px);
  }
  
  h4 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: var(--text-color);
    
    @media (max-width: 480px) {
      font-size: 1rem;
      margin-bottom: 0.4rem;
    }
  }
  
  p {
    color: var(--secondary-text-color);
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    
    @media (max-width: 480px) {
      font-size: 0.85rem;
      margin-bottom: 0.4rem;
    }
  }
  
  .meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);
    
    @media (max-width: 480px) {
      font-size: 0.75rem;
    }
    
    svg {
      color: var(--primary-color);
    }
  }
`;

const getSocialIcon = (platform) => {
  switch (platform) {
    case 'github':
      return <FaGithub />;
    case 'linkedin':
      return <FaLinkedin />;
    case 'twitter':
      return <FaTwitter />;
    case 'instagram':
      return <FaInstagram />;
    case 'facebook':
      return <FaFacebook />;
    case 'youtube':
      return <FaYoutube />;
    case 'medium':
      return <FaMedium />;
    case 'devto':
      return <FaDev />;
    case 'dribbble':
      return <FaDribbble />;
    case 'behance':
      return <FaBehance />;
    default:
      return null;
  }
};

// Sample GitHub activity data - in a real app, this would be fetched from GitHub API
const sampleGitHubActivity = [
  { 
    type: 'push', 
    repo: 'portfolio-site', 
    message: 'Added interactive contact form', 
    time: '2 hours ago'
  },
  { 
    type: 'star', 
    repo: 'react-three-fiber', 
    message: 'Starred repository', 
    time: '1 day ago'
  },
  {
    type: 'fork',
    repo: 'framer-motion-examples',
    message: 'Forked repository',
    time: '3 days ago'
  }
];

// Sample latest blog post - in a real app, this would be fetched from your blog API
const latestBlogPost = {
  title: 'Building 3D Visualizations with Three.js and React',
  excerpt: 'Learn how to create stunning 3D visualizations using Three.js with React and React Three Fiber...',
  date: '2 weeks ago',
  url: '#'
};

// Tech stack used in the portfolio
const techStack = [
  { name: 'React', icon: <FaReact /> },
  { name: 'Redux', icon: <FaCode /> },
  { name: 'Node.js', icon: <FaNode /> },
  { name: 'MongoDB', icon: <FaDatabase /> },
  { name: 'Three.js', icon: <FaCode /> },
  { name: 'Framer Motion', icon: <FaCode /> },
  { name: 'SCSS', icon: <FaCode /> },
  { name: 'Git', icon: <FaCodeBranch /> },
  { name: 'Jest', icon: <FaCode /> }
];

const Footer = () => {
  const footerData = config.get('footer', {});
  const socialLinks = config.getActiveSocialLinks();
  const navLinks = footerData.navLinks || [];
  
  // Get mobile padding from config or use defaults
  const mobilePadding = footerData.mobilePadding || {
    top: '4rem',
    bottom: '2rem',
    left: '1rem',
    right: '1rem'
  };
  
  // In a real app, you would fetch this data from GitHub API
  const [githubActivity, setGithubActivity] = useState(sampleGitHubActivity);
  const [blogPost, setBlogPost] = useState(latestBlogPost);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Placeholder function that would fetch GitHub activity in a real app
  useEffect(() => {
    const fetchGitHubActivity = async () => {
      // This would fetch real GitHub activity in a production app
      // const response = await fetch('https://api.github.com/users/yourusername/events');
      // const data = await response.json();
      // setGithubActivity(data.slice(0, 3));
    };
    
    fetchGitHubActivity();
  }, []);
  
  // Placeholder function that would fetch latest blog post in a real app
  useEffect(() => {
    const fetchLatestBlogPost = async () => {
      // This would fetch real blog posts in a production app
      // const response = await fetch('https://yourblog.com/api/latest');
      // const data = await response.json();
      // setBlogPost(data);
    };
    
    fetchLatestBlogPost();
  }, []);
  
  const getActivityIcon = (type) => {
    switch (type) {
      case 'push':
        return <FaCodeBranch className="icon" />;
      case 'star':
        return <FaStar className="icon" />;
      case 'fork':
        return <FaCodeBranch className="icon" />;
      default:
        return <FaGithub className="icon" />;
    }
  };
  
  // Get icon component based on string name from config
  const getTechIcon = (iconName) => {
    switch (iconName) {
      case 'react':
        return <FaReact />;
      case 'node':
        return <FaNode />;
      case 'database':
        return <FaDatabase />;
      case 'codeBranch':
        return <FaCodeBranch />;
      case 'code':
      default:
        return <FaCode />;
    }
  };
  
  return (
    <FooterContainer style={{ 
      "--mobile-padding-top": mobilePadding.top,
      "--mobile-padding-bottom": mobilePadding.bottom,
      "--mobile-padding-left": mobilePadding.left,
      "--mobile-padding-right": mobilePadding.right
    }}>
      <FooterContent>
        <FooterTop>
          <FooterInfo>
            <h3>{config.get('header.name', 'John Doe')}</h3>
            <p>
              {config.get('about.description', '').substring(0, 150)}
              {config.get('about.description', '').length > 150 ? '...' : ''}
            </p>
            
            {footerData.showSocialLinks && Object.keys(socialLinks).length > 0 && (
              <SocialLinks>
                {Object.entries(socialLinks).map(([platform, url]) => (
                  <SocialIcon 
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platform}
                  >
                    {getSocialIcon(platform)}
                  </SocialIcon>
                ))}
              </SocialLinks>
            )}
            
            <LatestBlogPost href={blogPost.url} target="_blank" rel="noopener noreferrer">
              <h4>{footerData.latestArticleTitle || "Latest Article"}</h4>
              <p>{blogPost.title}</p>
              <p>{blogPost.excerpt}</p>
              <div className="meta">
                <FaBlog />
                <span>{footerData.publishedText || "Published"} {blogPost.date}</span>
              </div>
            </LatestBlogPost>
          </FooterInfo>
          
          <TechStackSection>
            <h3>{footerData.techStackTitle || "Built With"}</h3>
            <TechStackGrid>
              {(footerData.techStack || techStack).map((tech, index) => (
                <TechItem key={index}>
                  {tech.icon ? getTechIcon(tech.icon) : <FaCode />}
                  <span>{tech.name}</span>
                </TechItem>
              ))}
            </TechStackGrid>
            
            <GitHubActivity>
              <h4>{footerData.githubActivityTitle || "Recent GitHub Activity"}</h4>
              {githubActivity.map((activity, index) => (
                <div className="activity-item" key={index}>
                  {getActivityIcon(activity.type)}
                  <div>
                    <div><strong>{activity.repo}</strong>: {activity.message}</div>
                    <div className="time">{activity.time}</div>
                  </div>
                </div>
              ))}
            </GitHubActivity>
          </TechStackSection>
          
          <div>
            <FooterNav>
              <h3>{footerData.quickLinksTitle || "Quick Links"}</h3>
              <ul>
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.url}>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </FooterNav>
            
            <FooterNav>
              <h3>{footerData.contactInfoTitle || "Contact Info"}</h3>
              <ul>
                <li>
                  <a href={`mailto:${config.get('contact.email', '')}`}>
                    {config.get('contact.email', 'john.doe@example.com')}
                  </a>
                </li>
                <li>
                  <a href={`tel:${config.get('contact.phone', '')}`}>
                    {config.get('contact.phone', '+1 (555) 123-4567')}
                  </a>
                </li>
                <li>
                  {config.get('contact.address', 'San Francisco, CA')}
                </li>
              </ul>
            </FooterNav>
          </div>
        </FooterTop>
        
        <FooterDivider />
        
        <FooterBottom>
          <Copyright>
            {footerData.copyright || `© ${new Date().getFullYear()} All Rights Reserved.`}
          </Copyright>
          
          <Credits>
            {footerData.credits || 'Designed & Developed with ❤️'}
          </Credits>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 