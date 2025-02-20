export const portfolioData = {
  personalInfo: {
    name: "John Doe",
    title: "Senior React Developer",
    yearsOfExperience: 4.5,
    email: "john.doe@example.com",
    location: "San Francisco, CA",
    bio: "Senior React Developer with 4.5 years of expertise in building high-performance web applications. Specialized in creating scalable frontend architectures, optimizing application performance, and implementing modern UI/UX practices. Proven track record of leading teams and delivering enterprise-level solutions that drive business growth.",
    socialLinks: {
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      twitter: "https://twitter.com/johndoe"
    }
  },

  skills: {
    frontend: [
      "React.js", "Next.js", "Redux", "TypeScript",
      "JavaScript (ES6+)", "HTML5/CSS3", "Tailwind CSS",
      "Material-UI", "Styled Components", "Framer Motion",
      "React Query", "React Hook Form", "Webpack", "Vite"
    ],
    backend: [
      "Node.js", "Express.js", "MongoDB",
      "PostgreSQL", "RESTful APIs", "GraphQL",
      "Firebase", "AWS Lambda", "Microservices"
    ],
    tools: [
      "Git", "Docker", "Jenkins", "Jest",
      "React Testing Library", "CI/CD", "AWS",
      "Jira", "Figma", "Performance Optimization"
    ],
    softSkills: [
      "Team Leadership", "Agile/Scrum",
      "Technical Mentoring", "Problem Solving",
      "Code Reviews", "Documentation"
    ]
  },

  experience: [
    {
      company: "Tech Solutions Inc.",
      position: "Senior React Developer",
      period: "2022 - Present",
      description: "Lead developer for enterprise-level React applications serving 1M+ users, focusing on performance optimization and team leadership.",
      achievements: [
        "Architected and implemented a microservices-based frontend architecture, reducing deployment time by 60%",
        "Led the migration from Create React App to Next.js, improving initial load time by 40% and SEO performance",
        "Implemented advanced caching strategies with React Query, reducing API calls by 70%",
        "Mentored a team of 5 junior developers, conducting regular code reviews and technical training sessions",
        "Established coding standards and best practices, improving code quality and reducing technical debt by 45%"
      ]
    },
    {
      company: "Digital Innovations Co.",
      position: "React Developer",
      period: "2020 - 2022",
      description: "Full-stack React developer working on high-traffic e-commerce platforms and business applications.",
      achievements: [
        "Developed a reusable component library used across 8 different projects, reducing development time by 40%",
        "Implemented real-time order tracking system using WebSocket, improving customer satisfaction by 35%",
        "Optimized Redux store structure and implemented Redux Toolkit, reducing boilerplate code by 60%",
        "Created automated testing suite with 90% code coverage using Jest and React Testing Library",
        "Integrated multiple payment gateways and improved checkout flow, increasing conversion rate by 25%"
      ]
    },
    {
      company: "StartUp Tech",
      position: "Frontend Developer",
      period: "2019 - 2020",
      description: "Frontend developer focused on creating responsive and user-friendly interfaces for SaaS products.",
      achievements: [
        "Built responsive dashboards and data visualization components using D3.js and React",
        "Implemented client-side form validation and error handling, reducing support tickets by 50%",
        "Developed custom hooks and utilities, improving code reusability across the application",
        "Collaborated with UX team to implement pixel-perfect designs and smooth animations",
        "Reduced bundle size by 45% through code splitting and lazy loading strategies"
      ]
    }
  ],

  projects: [
    {
      title: "Enterprise E-Commerce Platform",
      description: "A high-performance e-commerce platform handling 100K+ daily transactions with real-time inventory management",
      image: "https://via.placeholder.com/300x200",
      liveUrl: "https://enterprise-ecommerce.com",
      githubUrl: "https://github.com/johndoe/enterprise-ecommerce",
      tech: ["React", "Next.js", "TypeScript", "Redux Toolkit", "Node.js", "PostgreSQL", "Redis", "AWS"],
      highlights: [
        "Microservices architecture with Node.js backend",
        "Real-time inventory and order management",
        "Advanced caching with Redis",
        "Elasticsearch for product search",
        "Multi-vendor support with admin dashboard"
      ]
    },
    {
      title: "SaaS Analytics Dashboard",
      description: "Real-time analytics dashboard for SaaS companies with advanced data visualization and reporting",
      image: "https://via.placeholder.com/300x200",
      liveUrl: "https://saas-analytics.com",
      githubUrl: "https://github.com/johndoe/saas-analytics",
      tech: ["React", "TypeScript", "D3.js", "GraphQL", "Node.js", "MongoDB", "WebSocket"],
      highlights: [
        "Real-time data visualization with D3.js",
        "Custom dashboard builder",
        "Automated report generation",
        "User behavior analytics",
        "Integration with popular SaaS tools"
      ]
    },
    {
      title: "AI-Powered Content Platform",
      description: "Content generation and management platform leveraging OpenAI's GPT-3 for automated content creation",
      image: "https://via.placeholder.com/300x200",
      liveUrl: "https://ai-content-platform.com",
      githubUrl: "https://github.com/johndoe/ai-content",
      tech: ["React", "Next.js", "OpenAI API", "Node.js", "MongoDB", "TailwindCSS"],
      highlights: [
        "AI-powered content generation",
        "SEO optimization tools",
        "Content performance analytics",
        "Team collaboration features",
        "Multi-language support"
      ]
    },
    {
      title: "Real-time Collaboration Tool",
      description: "Team collaboration platform with real-time document editing and project management features",
      image: "https://via.placeholder.com/300x200",
      liveUrl: "https://collab-tool.com",
      githubUrl: "https://github.com/johndoe/collab-tool",
      tech: ["React", "Socket.io", "Redux", "Node.js", "MongoDB", "Docker"],
      highlights: [
        "Real-time document collaboration",
        "Video conferencing integration",
        "Task management system",
        "File sharing and version control",
        "Activity tracking and analytics"
      ]
    }
  ],

  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023"
    },
    {
      name: "Advanced React Patterns",
      issuer: "Frontend Masters",
      date: "2022"
    },
    {
      name: "TypeScript Professional",
      issuer: "Microsoft",
      date: "2021"
    },
    {
      name: "GraphQL Advanced Concepts",
      issuer: "Apollo GraphQL",
      date: "2021"
    }
  ]
}; 