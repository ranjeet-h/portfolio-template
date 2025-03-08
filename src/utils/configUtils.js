import portfolioConfig from '../data/portfolio-config.json';

/**
 * Utility class to access portfolio configuration values
 */
export const config = {
  /**
   * Get a value from the portfolio configuration using dot notation path
   * @param {string} path - Path to the configuration value using dot notation (e.g., 'about.name')
   * @param {any} defaultValue - Default value to return if path is not found
   * @returns {any} - The configuration value or defaultValue if not found
   */
  get: (path, defaultValue = null) => {
    if (!path) return portfolioConfig;
    
    const keys = path.split('.');
    let result = portfolioConfig;
    
    for (const key of keys) {
      if (result === undefined || result === null || !Object.prototype.hasOwnProperty.call(result, key)) {
        return defaultValue;
      }
      result = result[key];
    }
    
    return result === undefined ? defaultValue : result;
  },
  
  /**
   * Get a theme value with fallback to default
   * @param {string} key - Theme key (e.g., 'primaryColor')
   * @returns {string} - The theme value
   */
  theme: (key) => {
    return config.get(`theme.${key}`);
  },
  
  /**
   * Get a color value from the theme
   * @param {string} colorName - Color name (e.g., 'primary')
   * @returns {string} - The color value
   */
  color: (colorName) => {
    const colorMap = {
      primary: 'primaryColor',
      secondary: 'secondaryColor',
      accent: 'accentColor',
      text: 'textColor',
      secondaryText: 'secondaryTextColor',
      background: 'backgroundColor',
      card: 'cardBackgroundColor'
    };
    
    const themeKey = colorMap[colorName] || colorName;
    return config.theme(themeKey);
  },
  
  /**
   * Get social links that are not empty
   * @returns {Object} - Object with non-empty social links
   */
  getActiveSocialLinks: () => {
    const socialLinks = config.get('social', {});
    const activeLinks = {};
    
    Object.entries(socialLinks).forEach(([platform, url]) => {
      if (url && url.trim() !== '') {
        activeLinks[platform] = url;
      }
    });
    
    return activeLinks;
  }
};

export default config; 