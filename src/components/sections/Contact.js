import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaPaperPlane, 
  FaCheckCircle, 
  FaClock, 
  FaStar, 
  FaInfoCircle
} from 'react-icons/fa';
import Section from '../ui/Section';
import config from '../../utils/configUtils';

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
  
  @media (max-width: 480px) {
    gap: 2rem;
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
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem;
  }
  
  h3 {
    font-size: 1.8rem;
    margin-bottom: 2rem;
    color: var(--text-color);
    position: relative;
    
    @media (max-width: 480px) {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
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
    
    @media (max-width: 480px) {
      margin-bottom: 1.5rem;
      font-size: 0.95rem;
    }
  }
`;

const ContactMethods = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  
  @media (max-width: 480px) {
    gap: 1.2rem;
    margin-bottom: 1.5rem;
  }
`;

const ContactMethod = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  
  @media (max-width: 480px) {
    gap: 1rem;
  }
  
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
    
    @media (max-width: 480px) {
      width: 40px;
      height: 40px;
      font-size: 1rem;
    }
  }
  
  .details {
    h4 {
      color: var(--text-color);
      font-size: 1.1rem;
      margin-bottom: 0.3rem;
      
      @media (max-width: 480px) {
        font-size: 1rem;
      }
    }
    
    a, p {
      color: var(--secondary-text-color);
      text-decoration: none;
      margin: 0;
      font-size: 1rem;
      transition: all 0.3s ease;
      
      @media (max-width: 480px) {
        font-size: 0.9rem;
      }
      
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
  
  @media (max-width: 480px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
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
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem;
  }
  
  h3 {
    font-size: 1.8rem;
    margin-bottom: 2rem;
    color: var(--text-color);
    position: relative;
    
    @media (max-width: 480px) {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
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
  
  @media (max-width: 480px) {
    margin-bottom: 1.2rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--secondary-text-color);
    font-size: 0.95rem;
    
    @media (max-width: 480px) {
      font-size: 0.9rem;
      margin-bottom: 0.4rem;
    }
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.2rem;
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
  
  @media (max-width: 480px) {
    padding: 0.8rem;
    font-size: 0.95rem;
  }
  
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
  
  @media (max-width: 480px) {
    padding: 0.8rem;
    font-size: 0.95rem;
    min-height: 120px;
  }
  
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
  
  @media (max-width: 480px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
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

const PreferredBadge = styled.span`
  background: rgba(76, 161, 175, 0.2);
  color: var(--primary-color);
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 20px;
  margin-left: 0.5rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  
  @media (max-width: 480px) {
    font-size: 0.65rem;
    padding: 0.15rem 0.4rem;
  }
`;

const AvailabilityIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  padding: 1rem;
  border-radius: var(--border-radius-sm);
  background: rgba(76, 161, 175, 0.05);
  border: 1px solid rgba(76, 161, 175, 0.1);
  
  @media (max-width: 480px) {
    margin-top: 1.5rem;
    padding: 0.8rem;
  }
  
  .status {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${props => props.available ? '#2ecc71' : '#e74c3c'};
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: inherit;
      opacity: 0.3;
      animation: pulse 2s infinite;
    }
  }
  
  p {
    color: var(--secondary-text-color);
    font-size: 0.9rem;
    margin: 0;
    
    @media (max-width: 480px) {
      font-size: 0.85rem;
    }
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.3;
    }
    70% {
      transform: scale(2);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
`;

const ResponseTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--secondary-text-color);
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
  
  svg {
    color: var(--primary-color);
  }
`;

const FormFieldError = styled(motion.div)`
  color: #e74c3c;
  font-size: 0.8rem;
  margin-top: 0.3rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const FormFieldSuccess = styled(motion.div)`
  color: #2ecc71;
  font-size: 0.8rem;
  margin-top: 0.3rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const ValidationIcon = styled.span`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.valid ? '#2ecc71' : '#e74c3c'};
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 0.3s ease;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const InputProgress = styled.div`
  height: 2px;
  background: ${props => props.valid ? '#2ecc71' : props.error ? '#e74c3c' : 'var(--primary-color)'};
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const ContactOptionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const ContactOption = styled.button`
  background: ${props => props.selected ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.05)'};
  color: ${props => props.selected ? 'white' : 'var(--secondary-text-color)'};
  border: 1px solid ${props => props.selected ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: var(--border-radius-sm);
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  @media (max-width: 480px) {
    padding: 0.6rem 1rem;
    width: 100%;
  }
  
  &:hover {
    background: ${props => props.selected ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.1)'};
  }
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
    message: '',
    contactPreference: 'email'
  });
  
  const [validation, setValidation] = useState({
    name: { valid: true, message: '', touched: false },
    email: { valid: true, message: '', touched: false },
    subject: { valid: true, message: '', touched: false },
    message: { valid: true, message: '', touched: false }
  });
  
  const [currentTime, setCurrentTime] = useState(new Date());
  const officeHours = contactData.officeHours || { start: 9, end: 17 }; // 9 AM to 5 PM
  const currentHour = currentTime.getHours();
  const isOfficeHours = currentHour >= officeHours.start && currentHour < officeHours.end;
  
  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);
  
  const validateField = (name, value) => {
    let valid = true;
    let message = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          valid = false;
          message = contactData.formValidation?.nameRequired || 'Name is required';
        } else if (value.trim().length < 2) {
          valid = false;
          message = contactData.formValidation?.nameMinLength || 'Name must be at least 2 characters';
        }
        break;
      
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          valid = false;
          message = contactData.formValidation?.emailRequired || 'Email is required';
        } else if (!emailRegex.test(value)) {
          valid = false;
          message = contactData.formValidation?.emailInvalid || 'Please enter a valid email address';
        }
        break;
      
      case 'subject':
        if (!value.trim()) {
          valid = false;
          message = contactData.formValidation?.subjectRequired || 'Subject is required';
        } else if (value.trim().length < 5) {
          valid = false;
          message = contactData.formValidation?.subjectMinLength || 'Subject must be at least 5 characters';
        }
        break;
      
      case 'message':
        if (!value.trim()) {
          valid = false;
          message = contactData.formValidation?.messageRequired || 'Message is required';
        } else if (value.trim().length < 20) {
          valid = false;
          message = contactData.formValidation?.messageMinLength || 'Message must be at least 20 characters';
        }
        break;
        
      default:
        break;
    }
    
    return { valid, message };
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (validation[name]?.touched) {
      const { valid, message } = validateField(name, value);
      setValidation({
        ...validation,
        [name]: { ...validation[name], valid, message }
      });
    }
  };
  
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const { valid, message } = validateField(name, value);
    
    setValidation({
      ...validation,
      [name]: { valid, message, touched: true }
    });
  };
  
  const calculateProgress = (value, minLength) => {
    if (!value) return 0;
    const progress = (value.length / minLength) * 100;
    return Math.min(progress, 100);
  };
  
  const setContactPreference = (preference) => {
    setFormData({ ...formData, contactPreference: preference });
  };
  
  const isFormValid = () => {
    return Object.keys(validation).every(key => validation[key].valid && validation[key].touched);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    let isValid = true;
    const newValidation = { ...validation };
    
    Object.keys(newValidation).forEach(field => {
      const { valid, message } = validateField(field, formData[field]);
      newValidation[field] = { valid, message, touched: true };
      if (!valid) isValid = false;
    });
    
    setValidation(newValidation);
    
    if (!isValid) {
      setFormStatus({
        submitting: false,
        success: false,
        error: true,
        message: contactData.formErrorMessage || 'Please correct the errors in the form.'
      });
      return;
    }
    
    setFormStatus({ ...formStatus, submitting: true });
    
    try {
      // If Formspree endpoint is configured, submit form
      if (contactData.formspreeEndpoint) {
        const response = await fetch(contactData.formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...formData,
            contactPreference: formData.contactPreference
          })
        });
        
        if (response.ok) {
          setFormStatus({
            submitting: false,
            success: true,
            error: false,
            message: contactData.formSuccessMessage || 'Thank you! Your message has been sent successfully.'
          });
          setFormData({ name: '', email: '', subject: '', message: '', contactPreference: 'email' });
          // Reset validation
          Object.keys(validation).forEach(key => {
            validation[key].touched = false;
          });
          setValidation({ ...validation });
        } else {
          throw new Error(contactData.formNetworkErrorMessage || 'Something went wrong. Please try again later.');
        }
      } else {
        // Simulated success for demo purposes
        setTimeout(() => {
          setFormStatus({
            submitting: false,
            success: true,
            error: false,
            message: contactData.formSuccessMessage || 'Thank you! Your message has been sent successfully.'
          });
          setFormData({ name: '', email: '', subject: '', message: '', contactPreference: 'email' });
          // Reset validation
          Object.keys(validation).forEach(key => {
            validation[key].touched = false;
          });
          setValidation({ ...validation });
        }, 1500);
      }
    } catch (error) {
      setFormStatus({
        submitting: false,
        success: false,
        error: true,
        message: error.message || (contactData.formNetworkErrorMessage || 'Something went wrong. Please try again later.')
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
          <h3>{contactData.contactInfoTitle || "Contact Information"}</h3>
          <p>{contactData.contactInfoDescription || "Feel free to reach out to me for any inquiries, project discussions, or collaboration opportunities. I'm always open to new challenges!"}</p>
          
          <ContactMethods>
            {contactData.email && (
              <ContactMethod>
                <div className="icon">
                  <FaEnvelope />
                </div>
                <div className="details">
                  <h4>{contactData.emailLabel || "Email"} <PreferredBadge><FaStar size={10} /> {contactData.emailIsPrefLabel || "Preferred"}</PreferredBadge></h4>
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
                  <h4>{contactData.phoneLabel || "Phone"}</h4>
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
                  <h4>{contactData.locationLabel || "Location"}</h4>
                  <p>{contactData.address}</p>
                </div>
              </ContactMethod>
            )}
          </ContactMethods>
          
          <AvailabilityIndicator available={isOfficeHours}>
            <div className="status"></div>
            <p>{isOfficeHours 
              ? (contactData.availabilityOnlineText || "Currently available for inquiries") 
              : (contactData.availabilityOfflineText || "Currently offline, but I'll respond soon")
            }</p>
          </AvailabilityIndicator>
          
          <ResponseTime>
            <FaClock />
            <span>{contactData.responseTimeText || "Average response time: 24 hours"}</span>
          </ResponseTime>
          
          {contactData.calendlyUrl && (
            <CalendlyButton
              href={contactData.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FaCalendarAlt /> {contactData.scheduleButtonText || "Schedule a Meeting"}
            </CalendlyButton>
          )}
        </ContactInfo>
        
        <ContactForm variants={itemVariants} onSubmit={handleSubmit}>
          <h3>{contactData.formTitle || "Send Me a Message"}</h3>
          
          <AnimatePresence>
            {formStatus.success && (
              <SuccessMessage
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {formStatus.message}
              </SuccessMessage>
            )}
            
            {formStatus.error && (
              <ErrorMessage
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {formStatus.message}
              </ErrorMessage>
            )}
          </AnimatePresence>
          
          <FormGroup>
            <label htmlFor="contactPreference">{contactData.contactMethodsLabel || "Preferred Contact Method"}</label>
            <ContactOptionsContainer>
              <ContactOption 
                type="button"
                selected={formData.contactPreference === 'email'}
                onClick={() => setContactPreference('email')}
              >
                {contactData.contactMethods?.email || "Email"}
              </ContactOption>
              <ContactOption
                type="button"
                selected={formData.contactPreference === 'phone'}
                onClick={() => setContactPreference('phone')}
              >
                {contactData.contactMethods?.phone || "Phone"}
              </ContactOption>
              <ContactOption
                type="button"
                selected={formData.contactPreference === 'meeting'}
                onClick={() => setContactPreference('meeting')}
              >
                {contactData.contactMethods?.meeting || "Video Call"}
              </ContactOption>
            </ContactOptionsContainer>
          </FormGroup>
          
          <FormRow>
            <FormGroup>
              <label htmlFor="name">{contactData.formLabels?.name || "Name"}</label>
              <InputWrapper>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={contactData.formPlaceholders?.name || "Your name"}
                  required
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  whileFocus="focus"
                  whileBlur="blur"
                  variants={inputVariants}
                  style={{ borderColor: validation.name.touched ? (validation.name.valid ? 'rgba(46, 204, 113, 0.5)' : 'rgba(231, 76, 60, 0.5)') : '' }}
                />
                <ValidationIcon valid={validation.name.valid} show={validation.name.touched}>
                  {validation.name.valid ? <FaCheckCircle /> : <FaInfoCircle />}
                </ValidationIcon>
                <InputProgress 
                  progress={calculateProgress(formData.name, 2)} 
                  valid={validation.name.valid} 
                  error={validation.name.touched && !validation.name.valid}
                />
              </InputWrapper>
              <AnimatePresence>
                {validation.name.touched && !validation.name.valid && (
                  <FormFieldError
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <FaInfoCircle /> {validation.name.message}
                  </FormFieldError>
                )}
              </AnimatePresence>
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="email">{contactData.formLabels?.email || "Email"}</label>
              <InputWrapper>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={contactData.formPlaceholders?.email || "Your email"}
                  required
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  whileFocus="focus"
                  whileBlur="blur"
                  variants={inputVariants}
                  style={{ borderColor: validation.email.touched ? (validation.email.valid ? 'rgba(46, 204, 113, 0.5)' : 'rgba(231, 76, 60, 0.5)') : '' }}
                />
                <ValidationIcon valid={validation.email.valid} show={validation.email.touched}>
                  {validation.email.valid ? <FaCheckCircle /> : <FaInfoCircle />}
                </ValidationIcon>
                <InputProgress 
                  progress={calculateProgress(formData.email, 5)} 
                  valid={validation.email.valid} 
                  error={validation.email.touched && !validation.email.valid}
                />
              </InputWrapper>
              <AnimatePresence>
                {validation.email.touched && !validation.email.valid && (
                  <FormFieldError
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <FaInfoCircle /> {validation.email.message}
                  </FormFieldError>
                )}
              </AnimatePresence>
            </FormGroup>
          </FormRow>
          
          <FormGroup>
            <label htmlFor="subject">{contactData.formLabels?.subject || "Subject"}</label>
            <InputWrapper>
              <Input
                type="text"
                id="subject"
                name="subject"
                placeholder={contactData.formPlaceholders?.subject || "Subject"}
                required
                value={formData.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                whileFocus="focus"
                whileBlur="blur"
                variants={inputVariants}
                style={{ borderColor: validation.subject.touched ? (validation.subject.valid ? 'rgba(46, 204, 113, 0.5)' : 'rgba(231, 76, 60, 0.5)') : '' }}
              />
              <ValidationIcon valid={validation.subject.valid} show={validation.subject.touched}>
                {validation.subject.valid ? <FaCheckCircle /> : <FaInfoCircle />}
              </ValidationIcon>
              <InputProgress 
                progress={calculateProgress(formData.subject, 5)} 
                valid={validation.subject.valid} 
                error={validation.subject.touched && !validation.subject.valid}
              />
            </InputWrapper>
            <AnimatePresence>
              {validation.subject.touched && !validation.subject.valid && (
                <FormFieldError
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <FaInfoCircle /> {validation.subject.message}
                </FormFieldError>
              )}
            </AnimatePresence>
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="message">{contactData.formLabels?.message || "Message"}</label>
            <InputWrapper>
              <Textarea
                id="message"
                name="message"
                placeholder={contactData.formPlaceholders?.message || "Your message"}
                required
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                whileFocus="focus"
                whileBlur="blur"
                variants={inputVariants}
                style={{ borderColor: validation.message.touched ? (validation.message.valid ? 'rgba(46, 204, 113, 0.5)' : 'rgba(231, 76, 60, 0.5)') : '' }}
              />
              <ValidationIcon 
                valid={validation.message.valid} 
                show={validation.message.touched}
                style={{ top: '1.5rem' }}
              >
                {validation.message.valid ? <FaCheckCircle /> : <FaInfoCircle />}
              </ValidationIcon>
              <InputProgress 
                progress={calculateProgress(formData.message, 20)} 
                valid={validation.message.valid} 
                error={validation.message.touched && !validation.message.valid}
              />
            </InputWrapper>
            <AnimatePresence>
              {validation.message.touched && !validation.message.valid && (
                <FormFieldError
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <FaInfoCircle /> {validation.message.message}
                </FormFieldError>
              )}
            </AnimatePresence>
          </FormGroup>
          
          <SubmitButton
            type="submit"
            disabled={formStatus.submitting || !isFormValid()}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <FaPaperPlane /> {formStatus.submitting 
              ? (contactData.submittingButtonText || "Sending...") 
              : (contactData.submitButtonText || "Send Message")
            }
          </SubmitButton>
        </ContactForm>
      </ContactContainer>
    </Section>
  );
};

export default ContactSection; 