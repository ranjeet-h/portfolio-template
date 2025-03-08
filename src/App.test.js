import { render, screen } from '@testing-library/react';
import App from './App';

// Mock all dependencies to prevent errors
jest.mock('./utils/ThemeProvider', () => ({ children }) => <div data-testid="theme-provider">{children}</div>);
jest.mock('./styles/GlobalStyles', () => () => <div data-testid="global-styles" />);
jest.mock('./components/ui/Navigation', () => () => <nav data-testid="navigation" />);
jest.mock('./components/sections/Hero', () => () => <section data-testid="section-home" />);
jest.mock('./components/ui/Footer', () => () => <footer data-testid="footer" role="contentinfo" />);
jest.mock('./components/sections/About', () => () => <section data-testid="section-about" />);
jest.mock('./components/sections/Skills', () => () => <section data-testid="section-skills" />);
jest.mock('./components/sections/Experience', () => () => <section data-testid="section-experience" />);
jest.mock('./components/sections/Projects', () => () => <section data-testid="section-projects" />);
jest.mock('./components/sections/Testimonials', () => () => <section data-testid="section-testimonials" />);
jest.mock('./components/sections/Contact', () => () => <section data-testid="section-contact" />);
jest.mock('./components/sections/Education', () => () => <section data-testid="section-education" />);
jest.mock('./components/sections/Certifications', () => () => <section data-testid="section-certifications" />);
jest.mock('./components/ui/ThemeSettings', () => () => <div data-testid="theme-settings" />);

// Mock IntersectionObserver
beforeAll(() => {
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    observe() { return null; }
    unobserve() { return null; }
    disconnect() { return null; }
  };
});

describe('App Component', () => {
  test('renders main navigation', () => {
    render(<App />);
    const navElement = screen.getByTestId('navigation');
    expect(navElement).toBeInTheDocument();
  });

  test('renders main content area', () => {
    render(<App />);
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });

  test('renders footer', () => {
    render(<App />);
    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
  });

  test('renders all sections', () => {
    render(<App />);
    
    // Check for main content sections
    const sections = [
      'home', 'about', 'skills', 'experience', 
      'projects', 'education', 'certifications', 
      'testimonials', 'contact'
    ];
    
    sections.forEach(section => {
      const sectionElement = screen.getByTestId(`section-${section}`);
      expect(sectionElement).toBeInTheDocument();
    });
  });
});
