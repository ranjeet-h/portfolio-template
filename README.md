# 🚀 Modern React Portfolio Template

A professionally designed, fully customizable React portfolio template built with modern web technologies. Perfect for developers, designers, and creatives looking to showcase their work with a polished online presence.

![Portfolio Preview](preview.png)

## ✨ Features

- **📱 Fully Responsive**: Looks great on all devices from mobile to desktop
- **🎨 Customizable**: Easy configuration through JSON files - no code editing required
- **✅ Modern Design**: Beautiful UI with smooth animations and micro-interactions
- **⚡ Performance Optimized**: Fast load times and optimized rendering
- **🔍 SEO Friendly**: Built with best SEO practices for better discoverability
- **🌐 Social Media Integration**: Connect all your social platforms seamlessly
- **🎭 Animation Rich**: Engaging animations powered by Framer Motion
- **📊 State Management**: Redux Toolkit for efficient state handling
- **🔄 Dynamic Sections**: All sections driven by configuration - add, remove, or reorder as needed
- **🌙 Theme Customization**: Fully customizable colors, fonts, and styling
- **🧩 Modular Components**: Clean, reusable component architecture
- **📱 Custom Cursor**: Engaging custom cursor interactions
- **🖼️ 3D Elements**: Three.js integration for immersive 3D elements
- **📝 Form Handling**: Robust contact form with validation via React Hook Form

## 🛠️ Technologies Used

- **React.js (v19.0.0)**: Core framework
- **React Router (v5.1.2)**: For navigation and routing
- **Redux Toolkit (v2.6.1)**: State management
- **Framer Motion (v12.4.5)**: Advanced animations
- **Emotion Styled (v11.14.0)**: Component styling
- **React Hook Form (v7.54.2)**: Form handling with validation
- **Yup (v1.6.1)**: Schema validation
- **React Icons (v5.5.0)**: Icon library
- **Three.js (v0.174.0)**: 3D graphics
- **React Three Fiber (v9.1.0)**: React renderer for Three.js
- **React Three Drei (v10.0.5)**: Useful helpers for React Three Fiber
- **GSAP (v3.12.7)**: Advanced animations
- **Typed.js (v2.1.0)**: Typing animation
- **React Intersection Observer (v9.16.0)**: Viewport detection

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone this repository
```bash
git clone https://github.com/yourusername/react-portfolio-template.git
cd react-portfolio-template
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm start
# or
yarn start
```

4. Visit `http://localhost:3000` to see your portfolio

## 📄 Customization

The entire portfolio is customizable through JSON configuration files:

### 1. Edit the Configuration Files

Open `src/data/portfolio-config.json` to customize each section:

- **Site Metadata**: Title, description, favicon, etc.
- **Theme**: Colors, fonts, and overall styling
- **Header**: Your name, title, profile image, etc.
- **About**: Your biography and personal details
- **Social Links**: All your social media profiles
- **Skills**: Group your skills by category with proficiency levels
- **Experience**: Your work history with achievements
- **Projects**: Showcase your best work with images and descriptions
- **Education**: Academic background and achievements
- **Certifications**: Professional credentials and awards
- **Testimonials**: What others say about you
- **Contact**: How people can reach you
- **Footer & Navigation**: Footer content and navigation links

Alternatively, you can edit `src/data/portfolio-data.js` for a more programmatic approach.

### 2. Add Your Assets

Place your images and other assets in the `public` folder:

- Profile photo: `/profile.jpg`
- Project images: `/projects/...`
- Company logos: `/logos/...`
- Certificate logos: `/certificates/...`
- Testimonial photos: `/testimonials/...`

## 📦 Project Structure

```
├── public/               # Public assets (images, favicon, etc.)
├── src/
│   ├── components/       # React components
│   │   ├── sections/     # Major portfolio sections
│   │   │   ├── About.js            # About me section
│   │   │   ├── Certifications.js   # Certifications section
│   │   │   ├── Contact.js          # Contact form section
│   │   │   ├── Education.js        # Education section
│   │   │   ├── Experience.js       # Work experience section
│   │   │   ├── Hero.js             # Hero/landing section
│   │   │   ├── Projects.js         # Projects showcase section
│   │   │   ├── Skills.js           # Skills section
│   │   │   └── Testimonials.js     # Testimonials section
│   │   │
│   │   └── ui/           # Reusable UI components
│   │       ├── Button.js           # Custom button component
│   │       ├── Card.js             # Card component for projects, etc.
│   │       ├── CaseStudy.js        # Case study component
│   │       ├── CustomCursor.js     # Custom cursor effect
│   │       ├── Footer.js           # Site footer component
│   │       ├── Navigation.js       # Navigation/header component
│   │       ├── Section.js          # Base section component
│   │       └── ThemeSettings.js    # Theme customization panel
│   │   
│   ├── data/             # Configuration data
│   │   ├── portfolio-config.json   # Main configuration file 
│   │   └── portfolio-data.js       # JavaScript configuration
│   │
│   ├── hooks/            # Custom React hooks
│   ├── redux/            # Redux state management
│   ├── routes/           # Application routes
│   ├── styles/           # Global styles
│   ├── utils/            # Utility functions
│   ├── App.js            # Main application component
│   └── index.js          # Entry point
│
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

## 🧪 Testing

The project includes comprehensive tests for components and functionality:

```bash
# Run all tests
npm test

# Run tests with coverage report
npm test -- --coverage
```

## 🚀 Deployment

Build your portfolio for production:

```bash
npm run build
# or
yarn build
```

The build folder can be deployed to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting
- AWS Amplify

## 🔧 Advanced Customization

### Adding New Sections

1. Create a new component in `src/components/sections/`
2. Add the corresponding configuration in `src/data/portfolio-config.json`
3. Import and include your section in `src/App.js`

### Customizing Animations

Animation settings can be modified in the individual components using Framer Motion or by adjusting the animation properties in the configuration.

### 3D Elements

The template includes Three.js for 3D elements. You can customize or extend these in the relevant components.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [React.js](https://reactjs.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [Emotion](https://emotion.sh/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Three.js](https://threejs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

---

Made with ❤️ by [Your Name](https://github.com/yourusername)

# Navigation Component Testing

This directory contains test cases for the Navigation component of the application. The Navigation component is responsible for the site's main navigation bar, including desktop and mobile views, smooth scrolling behavior, and handling active link states based on scroll position.

## Test Structure

The test suite is organized into multiple files, each focusing on specific aspects of the Navigation component:

1. **Navigation.test.js**: Core tests covering basic rendering and functionality
2. **Navigation.integration.test.js**: Integration tests that verify how the component works in a more realistic environment
3. **Navigation.handleScroll.test.js**: Focused tests for the scroll-related functionality
4. **Navigation.handleLinkClick.test.js**: Detailed tests for link click behavior

## Test Coverage

The tests cover the following key functionality:

- Basic rendering of navigation elements (logo, links, CTA)
- Mobile menu toggle behavior
- Scroll event handling and navbar appearance changes
- Link click handling for internal navigation
- Active link state updates based on scroll position
- Body scroll locking when mobile menu is open

## Running Tests

To run the tests, use one of the following commands:

```bash
# Run all tests
npm test

# Run tests for a specific file
npm test -- Navigation.test.js

# Run tests with coverage report
npm test -- --coverage
```

## Mocking Approach

The tests use various mocking strategies:

1. **Component Dependencies**: We mock external dependencies like framer-motion, styled-components, and react-icons
2. **Browser APIs**: We mock browser APIs like window.scrollTo and document.getElementById
3. **Configuration**: We mock the configuration utilities to provide predictable test data

## Notes for Test Maintenance

- If the component's behavior changes, update the tests accordingly
- When adding new features to the Navigation component, add corresponding tests
- The tests are designed to be independent and should not rely on each other
- Some tests mock the DOM directly due to limitations in testing certain browser behaviors

## Troubleshooting Common Test Issues

- If tests fail with "TypeError: Cannot read property 'offsetTop' of null", check the document.getElementById mocks
- If animations cause test failures, verify that framer-motion mocks are set up correctly
- For unexpected scroll behavior, check the window.scrollY and window.scrollTo mocks
