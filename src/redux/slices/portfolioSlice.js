import { createSlice } from '@reduxjs/toolkit';
import portfolioData from '../../data/portfolio-config.json';

const initialState = {
  siteMetadata: portfolioData.siteMetadata || {},
  theme: portfolioData.theme || {},
  header: portfolioData.header || {},
  about: portfolioData.about || {},
  social: portfolioData.social || {},
  skills: portfolioData.skills || { categories: [] },
  experience: portfolioData.experience || { jobs: [] },
  projects: portfolioData.projects || { items: [] },
  education: portfolioData.education || { items: [] },
  certifications: portfolioData.certifications || { items: [] },
  testimonials: portfolioData.testimonials || { items: [] },
  contact: portfolioData.contact || {},
  activeSection: 'hero',
};

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setActiveSection: (state, action) => {
      state.activeSection = action.payload;
    },
    updateTheme: (state, action) => {
      state.theme = { ...state.theme, ...action.payload };
    },
    toggleProjectDetails: (state, action) => {
      const projectId = action.payload;
      state.projects.items = state.projects.items.map((project) => {
        if (project.id === projectId) {
          return { ...project, detailsVisible: !project.detailsVisible };
        }
        return project;
      });
    },
    filterProjects: (state, action) => {
      state.projects.activeFilter = action.payload;
    },
    filterSkills: (state, action) => {
      state.skills.activeCategory = action.payload;
    },
  },
});

// Export actions
export const { 
  setActiveSection, 
  updateTheme, 
  toggleProjectDetails, 
  filterProjects,
  filterSkills
} = portfolioSlice.actions;

// Selectors
export const selectSiteMetadata = (state) => state.portfolio.siteMetadata;
export const selectTheme = (state) => state.portfolio.theme;
export const selectHeader = (state) => state.portfolio.header;
export const selectAbout = (state) => state.portfolio.about;
export const selectSocial = (state) => state.portfolio.social;
export const selectSkills = (state) => state.portfolio.skills;
export const selectExperience = (state) => state.portfolio.experience;
export const selectProjects = (state) => state.portfolio.projects;
export const selectEducation = (state) => state.portfolio.education;
export const selectCertifications = (state) => state.portfolio.certifications;
export const selectTestimonials = (state) => state.portfolio.testimonials;
export const selectContact = (state) => state.portfolio.contact;
export const selectActiveSection = (state) => state.portfolio.activeSection;

export default portfolioSlice.reducer; 