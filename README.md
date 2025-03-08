# 🚀 React Portfolio Template

A beautiful, highly customizable React portfolio template built with modern technologies and best UI/UX practices.

![Portfolio Preview](preview.png)

## ✨ Features

- **📱 Fully Responsive**: Looks great on any device
- **🎨 Customizable**: Just edit the JSON config file to customize your portfolio
- **✅ Modern Design**: Beautiful UI with smooth animations and transitions
- **⚡ Performance Optimized**: Fast load times and smooth experience
- **🔍 SEO Friendly**: Built with best SEO practices
- **🌐 Social Media Integration**: Connect all your social platforms
- **📊 Analytics Ready**: Easy integration with Google Analytics and Meta Pixel
- **🔄 Dynamic Sections**: All sections are driven by your config file - add, remove, or reorder as needed
- **🌙 Customizable Theme**: Change colors, fonts, and styling with ease

## 🛠️ Technologies Used

- React.js (v19.0.0)
- Framer Motion for animations
- Emotion Styled for styling
- React Icons
- Modern CSS with CSS Variables

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

The entire portfolio is customized through a single JSON configuration file. No need to touch any code!

### 1. Edit the Configuration File

Open `src/data/portfolio-config.json` in your editor and customize each section:

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

### 2. Add Your Assets

Place your images and other assets in the `public` folder:

- Profile photo: `/profile.jpg`
- Project images: `/projects/...`
- Company logos: `/logos/...`
- Certificate logos: `/certificates/...`
- Testimonial photos: `/testimonials/...`

### 3. Deploy Your Portfolio

Build your portfolio for production:

```bash
npm run build
# or
yarn build
```

Deploy the `build` folder to your hosting provider of choice. 

Recommended hosting options:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

## 📦 Project Structure

```
├── public/               # Public assets (images, favicon, etc.)
├── src/
│   ├── components/       # React components
│   │   ├── sections/     # Major portfolio sections
│   │   └── ui/           # Reusable UI components
│   │   
│   ├── data/             # JSON configuration files
│   ├── styles/           # Global styles
│   ├── utils/            # Utility functions
│   ├── App.js            # Main application component
│   └── index.js          # Entry point
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

## 📝 Adding Custom Sections

If you want to add custom sections beyond what's provided:

1. Create a new component in `src/components/sections/`
2. Add the corresponding configuration in `src/data/portfolio-config.json`
3. Import and include your new section in `src/App.js`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [React.js](https://reactjs.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [Emotion](https://emotion.sh/)
- [React Icons](https://react-icons.github.io/react-icons/)

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
