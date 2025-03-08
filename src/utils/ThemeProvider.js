import React from 'react';
import config from './configUtils';

const ThemeProvider = ({ children }) => {
  React.useEffect(() => {
    // Apply theme colors to CSS variables
    const root = document.documentElement;
    root.style.setProperty('--primary-color', config.theme('primaryColor'));
    root.style.setProperty('--secondary-color', config.theme('secondaryColor'));
    root.style.setProperty('--accent-color', config.theme('accentColor'));
    root.style.setProperty('--text-color', config.theme('textColor'));
    root.style.setProperty('--secondary-text-color', config.theme('secondaryTextColor'));
    root.style.setProperty('--background-color', config.theme('backgroundColor'));
    root.style.setProperty('--card-background-color', config.theme('cardBackgroundColor'));
    
    // Apply fonts
    root.style.setProperty('--font-primary', config.theme('fontPrimary'));
    root.style.setProperty('--font-secondary', config.theme('fontSecondary'));
    
    // Add Google Fonts
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(link);
    
    // Add favicon
    const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = config.get('siteMetadata.favicon', '/favicon.ico');
    if (!document.querySelector('link[rel="icon"]')) {
      document.head.appendChild(favicon);
    }
    
    // Set title
    document.title = config.get('siteMetadata.title', 'Professional Portfolio');
    
    // Add meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = config.get('siteMetadata.description', '');
    
    return () => {
      // Cleanup if needed
      document.head.removeChild(link);
    };
  }, []);
  
  return children;
};

export default ThemeProvider; 