import React from 'react';
import './App.css';
import ThemeProvider from './utils/ThemeProvider';
import GlobalStyles from './styles/GlobalStyles';
import Navigation from './components/ui/Navigation';
import Hero from './components/sections/Hero';
import Footer from './components/ui/Footer';
import AboutSection from './components/sections/About';
import SkillsSection from './components/sections/Skills';
import ExperienceSection from './components/sections/Experience';
import ProjectsSection from './components/sections/Projects';
import TestimonialsSection from './components/sections/Testimonials';
import ContactSection from './components/sections/Contact';
import EducationSection from './components/sections/Education';
import CertificationsSection from './components/sections/Certifications';
import ThemeSettings from './components/ui/ThemeSettings';

function App() {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <div className="App">
        <Navigation />
        <main>
          <Hero />
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <EducationSection />
          <CertificationsSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
        <ThemeSettings />
      </div>
    </ThemeProvider>
  );
}

export default App;
