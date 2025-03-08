import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaPaperPlane } from 'react-icons/fa';
import Section from '../ui/Section';
import config from '../../utils/configUtils';

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled(motion.div)`
  background: var(--card-background-color);
  border-radius: var(--border-radius-md);
  padding: 2.5rem;
  box-shadow: var(--box-shadow);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: 100%;
  
  h3 {
    font-size: 1.8rem;
    margin-bottom: 2rem;
    color: var(--text-color);
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -0.7rem;
      width: 50px;
      height: 3px;
      background: var(--primary-color);
    }
  }
  
  p {
    color: var(--secondary-text-color);
    line-height: 1.7;
    margin-bottom: 2.5rem;
  }
`;

const ContactMethods = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`;

const ContactMethod = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  
  .icon {
    width: 50px;
    height: 50px;
    background: rgba(76, 161, 175, 0.1);
    color: var(--primary-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    flex-shrink: 0;
  }
  
  .details {
    h4 {
      color: var(--text-color);
      font-size: 1.1rem;
      margin-bottom: 0.3rem;
    }
    
    a, p {
      color: var(--secondary-text-color);
      text-decoration: none;
      margin: 0;
      font-size: 1rem;
      transition: all 0.3s ease;
      
      &:hover {
        color: var(--primary-color);
      }
    }
  }
`;

const CalendlyButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  background: var(--primary-color);
  color: white;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  box-shadow: 0 5px 15px rgba(76, 161, 175, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--accent-color);
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(76, 161, 175, 0.4);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const ContactForm = styled(motion.form)`
  background: var(--card-background-color);
  border-radius: var(--border-radius-md);
  padding: 2.5rem;
  box-shadow: var(--box-shadow);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: 100%;
  
  h3 {
    font-size: 1.8rem;
    margin-bottom: 2rem;
    color: var(--text-color);
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -0.7rem;
      width: 50px;
      height: 3px;
      background: var(--primary-color);
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--secondary-text-color);
    font-size: 0.95rem;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Input = styled(motion.input)`
  width: 100%;
  padding: 1rem;
  border-radius: var(--border-radius-sm);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-color);
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(76, 161, 175, 0.1);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const Textarea = styled(motion.textarea)`
  width: 100%;
  padding: 1rem;
  border-radius: var(--border-radius-sm);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-color);
  font-size: 1rem;
  resize: vertical;
  min-height: 150px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(76, 161, 175, 0.1);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const SubmitButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  background: var(--primary-color);
  color: white;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(76, 161, 175, 0.3);
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: var(--accent-color);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(76, 161, 175, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: rgba(46, 204, 113, 0.1);
  border: 1px solid rgba(46, 204, 113, 0.3);
  color: #2ecc71;
  padding: 1rem;
  border-radius: var(--border-radius-sm);
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ErrorMessage = styled(motion.div)`
  background: rgba(231, 76, 60, 0.1);
  border: 1px solid rgba(231, 76, 60, 0.3);
  color: #e74c3c;
  padding: 1rem;
  border-radius: var(--border-radius-sm);
  margin-bottom: 1.5rem;
  text-align: center;
`;

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

const itemVariants = {
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

const inputVariants = {
  focus: { 
    scale: 1.01,
    transition: { duration: 0.2 }
  },
  blur: { 
    scale: 1,
    transition: { duration: 0.2 }
  }
};

const ContactSection = () => {
  const contactData = config.get('contact', {});
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: ''
  });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ ...formStatus, submitting: true });
    
    try {
      // If Formspree endpoint is configured, submit form
      if (contactData.formspreeEndpoint) {
        const response = await fetch(contactData.formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        if (response.ok) {
          setFormStatus({
            submitting: false,
            success: true,
            error: false,
            message: 'Thank you! Your message has been sent successfully.'
          });
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          throw new Error('Something went wrong. Please try again later.');
        }
      } else {
        // Simulated success for demo purposes
        setTimeout(() => {
          setFormStatus({
            submitting: false,
            success: true,
            error: false,
            message: 'Thank you! Your message has been sent successfully.'
          });
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1500);
      }
    } catch (error) {
      setFormStatus({
        submitting: false,
        success: false,
        error: true,
        message: error.message || 'Something went wrong. Please try again later.'
      });
    }
  };
  
  return (
    <Section
      id="contact"
      title={contactData.sectionTitle || "Get In Touch"}
      subtitle={contactData.sectionSubtitle || "Let's talk about your project"}
      bgColor="var(--background-color)"
    >
      <ContactContainer as={motion.div} variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
        <ContactInfo variants={itemVariants}>
          <h3>Contact Information</h3>
          <p>Feel free to reach out to me for any inquiries, project discussions, or collaboration opportunities. I'm always open to new challenges!</p>
          
          <ContactMethods>
            {contactData.email && (
              <ContactMethod>
                <div className="icon">
                  <FaEnvelope />
                </div>
                <div className="details">
                  <h4>Email</h4>
                  <a href={`mailto:${contactData.email}`}>{contactData.email}</a>
                </div>
              </ContactMethod>
            )}
            
            {contactData.phone && (
              <ContactMethod>
                <div className="icon">
                  <FaPhone />
                </div>
                <div className="details">
                  <h4>Phone</h4>
                  <a href={`tel:${contactData.phone}`}>{contactData.phone}</a>
                </div>
              </ContactMethod>
            )}
            
            {contactData.address && (
              <ContactMethod>
                <div className="icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="details">
                  <h4>Location</h4>
                  <p>{contactData.address}</p>
                </div>
              </ContactMethod>
            )}
          </ContactMethods>
          
          {contactData.calendlyUrl && (
            <CalendlyButton
              href={contactData.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FaCalendarAlt /> Schedule a Meeting
            </CalendlyButton>
          )}
        </ContactInfo>
        
        <ContactForm variants={itemVariants} onSubmit={handleSubmit}>
          <h3>Send Me a Message</h3>
          
          {formStatus.success && (
            <SuccessMessage
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {formStatus.message}
            </SuccessMessage>
          )}
          
          {formStatus.error && (
            <ErrorMessage
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {formStatus.message}
            </ErrorMessage>
          )}
          
          <FormRow>
            <FormGroup>
              <label htmlFor="name">Name</label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                required
                value={formData.name}
                onChange={handleChange}
                whileFocus="focus"
                whileBlur="blur"
                variants={inputVariants}
              />
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Your email"
                required
                value={formData.email}
                onChange={handleChange}
                whileFocus="focus"
                whileBlur="blur"
                variants={inputVariants}
              />
            </FormGroup>
          </FormRow>
          
          <FormGroup>
            <label htmlFor="subject">Subject</label>
            <Input
              type="text"
              id="subject"
              name="subject"
              placeholder="Subject"
              required
              value={formData.subject}
              onChange={handleChange}
              whileFocus="focus"
              whileBlur="blur"
              variants={inputVariants}
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="message">Message</label>
            <Textarea
              id="message"
              name="message"
              placeholder="Your message"
              required
              value={formData.message}
              onChange={handleChange}
              whileFocus="focus"
              whileBlur="blur"
              variants={inputVariants}
            />
          </FormGroup>
          
          <SubmitButton
            type="submit"
            disabled={formStatus.submitting}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <FaPaperPlane /> {formStatus.submitting ? 'Sending...' : 'Send Message'}
          </SubmitButton>
        </ContactForm>
      </ContactContainer>
    </Section>
  );
};

export default ContactSection; 