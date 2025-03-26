import { Global, css } from '@emotion/react';
import { useTheme } from './theme';

const GlobalStyles = () => {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        /* Custom properties */
        :root {
          --primary-color: ${theme.colors.primary};
          --secondary-color: ${theme.colors.secondary};
          --accent-color: ${theme.colors.accent};
          --text-color: ${theme.colors.text};
          --text-secondary-color: ${theme.colors.textSecondary};
          --background-color: ${theme.colors.background};
          --background-light-color: ${theme.colors.backgroundLight};
          --card-background-color: ${theme.colors.cardBackground};
          --font-primary: ${theme.typography.fontFamily.primary};
          --font-secondary: ${theme.typography.fontFamily.secondary};
          --font-code: ${theme.typography.fontFamily.code};
        }

        /* Animation keyframes */
        ${Object.values(theme.animations.keyframes).join('\n')}

        /* Reset and Base Styles */
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          font-size: 16px;
          scroll-behavior: smooth;
          scrollbar-width: thin;
          scrollbar-color: var(--primary-color) var(--background-color);
        }

        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: var(--background-color);
        }

        ::-webkit-scrollbar-thumb {
          background-color: var(--primary-color);
          border-radius: 6px;
          border: 3px solid var(--background-color);
        }

        body {
          font-family: var(--font-primary);
          color: var(--text-color);
          background-color: var(--background-color);
          line-height: ${theme.typography.lineHeight.normal};
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          transition: background-color 0.3s ease;
          overflow-x: hidden;
        }

        a {
          color: var(--primary-color);
          text-decoration: none;
          transition: all 0.3s ease;
        }

        a:hover {
          color: var(--accent-color);
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: var(--font-secondary);
          font-weight: ${theme.typography.fontWeight.bold};
          line-height: ${theme.typography.lineHeight.tight};
          margin-bottom: ${theme.spacing[4]};
        }

        h1 {
          font-size: ${theme.typography.fontSize['4xl']};
          letter-spacing: ${theme.typography.letterSpacing.tight};
        }

        h2 {
          font-size: ${theme.typography.fontSize['3xl']};
        }

        h3 {
          font-size: ${theme.typography.fontSize['2xl']};
        }

        h4 {
          font-size: ${theme.typography.fontSize.xl};
        }

        h5 {
          font-size: ${theme.typography.fontSize.lg};
        }

        h6 {
          font-size: ${theme.typography.fontSize.md};
        }

        p {
          margin-bottom: ${theme.spacing[4]};
        }

        button, input, select, textarea {
          font-family: var(--font-primary);
        }

        img, svg {
          max-width: 100%;
          height: auto;
        }

        section {
          padding: ${theme.spacing[16]} 0;
        }

        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 ${theme.spacing[4]};
        }

        .section-title {
          position: relative;
          margin-bottom: ${theme.spacing[8]};
          text-align: center;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          width: 80px;
          height: 4px;
          background: var(--primary-color);
          transform: translateX(-50%);
        }

        .section-subtitle {
          text-align: center;
          color: var(--text-secondary-color);
          margin-bottom: ${theme.spacing[12]};
          font-size: ${theme.typography.fontSize.lg};
        }

        /* Common animation classes */
        .fade-in {
          animation: fadeIn ${theme.animations.duration.normal} ease forwards;
        }

        .fade-in-up {
          animation: fadeInUp ${theme.animations.duration.normal} ease forwards;
        }

        .fade-in-down {
          animation: fadeInDown ${theme.animations.duration.normal} ease forwards;
        }

        .pulse {
          animation: pulse ${theme.animations.duration.slower} ease infinite;
        }

        .float {
          animation: float ${theme.animations.duration.slower} ease infinite;
        }

        .spin {
          animation: spin ${theme.animations.duration.slower} linear infinite;
        }

        /* For CSS Grid layouts */
        .grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: ${theme.spacing[6]};
        }

        /* For accessibility */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        /* Media queries for responsive design */
        ${theme.mediaQueries.sm} {
          h1 { font-size: ${theme.typography.fontSize['5xl']}; }
          h2 { font-size: ${theme.typography.fontSize['4xl']}; }
          h3 { font-size: ${theme.typography.fontSize['3xl']}; }
          section { padding: ${theme.spacing[20]} 0; }
          .container { padding: 0 ${theme.spacing[6]}; }
        }

        ${theme.mediaQueries.md} {
          /* Tablet styles */
        }

        ${theme.mediaQueries.lg} {
          /* Desktop styles */
        }

        ${theme.mediaQueries.xl} {
          /* Large desktop styles */
        }
      `}
    />
  );
};

export default GlobalStyles; 