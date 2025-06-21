import { useEffect } from 'react';
import { useConfig } from '../hooks/useConfig';
import { useTheme } from './ThemeContext';

export default function StyleManager() {
  const { config, getConfig, getThemeColors } = useConfig();
  const { theme } = useTheme();

  useEffect(() => {
    if (!config) return;

    // Generate dynamic CSS based on configuration
    const generateDynamicCSS = () => {
      const themeColors = getThemeColors(theme);
      const ui = config.ui || {};
      const features = config.features || {};

      let css = `
        :root {
          --config-card-max-width: ${ui.cardMaxWidth || '540px'};
          --config-border-radius: ${ui.borderRadius || '0.4rem'};
          --config-animation-duration: ${ui.animationDuration || '0.3s'};
          --config-animation-easing: ${ui.animationEasing || 'ease'};
          --config-font-family: ${ui.fontFamily || 'Inter, sans-serif'};
          --config-font-size-base: ${ui.fontSize?.base || '1rem'};
          --config-font-size-h1: ${ui.fontSize?.heading1 || '2rem'};
          --config-font-size-h2: ${ui.fontSize?.heading2 || '1.5rem'};
          --config-font-size-h4: ${ui.fontSize?.heading4 || '1.25rem'};
          --config-font-size-small: ${ui.fontSize?.small || '0.875rem'};
          --config-spacing-xs: ${ui.spacing?.xs || '0.25rem'};
          --config-spacing-sm: ${ui.spacing?.sm || '0.5rem'};
          --config-spacing-md: ${ui.spacing?.md || '1rem'};
          --config-spacing-lg: ${ui.spacing?.lg || '1.5rem'};
          --config-spacing-xl: ${ui.spacing?.xl || '2rem'};
          --config-spacing-xxl: ${ui.spacing?.xxl || '2.5rem'};
          --config-footer-height: ${config.footer?.height || '64px'};
          --config-social-icon-size: ${config.footer?.socialIconSize || '20px'};
          --config-social-gap: ${config.footer?.socialGap || '2rem'};
        }

        [data-theme="${theme}"] {
          --background-primary: ${themeColors.backgroundPrimary || 'linear-gradient(135deg, rgb(32, 33, 39) 0%, rgb(20, 21, 25) 100%)'};
          --background-secondary: ${themeColors.backgroundSecondary || 'rgb(25, 26, 30)'};
          --text-primary: ${themeColors.textPrimary || '#fff'};
          --text-secondary: ${themeColors.textSecondary || '#918E9B'};
          --accent-primary: ${themeColors.accentPrimary || '#61dafb'};
          --accent-secondary: ${themeColors.accentSecondary || '#21b3d4'};
          --shadow-primary: ${themeColors.shadowPrimary || 'rgba(0, 0, 0, 0.1)'};
          --shadow-hover: ${themeColors.shadowHover || 'rgba(0, 0, 0, 0.15)'};
          --footer-bg: ${themeColors.footerBg || '#161619'};
          --border-color: ${themeColors.borderColor || 'rgba(255, 255, 255, 0.1)'};
        }

        body {
          font-family: var(--config-font-family);
          font-size: var(--config-font-size-base);
        }

        .card {
          max-width: var(--config-card-max-width);
          border-radius: var(--config-border-radius);
        }

        .card .body {
          padding: var(--config-spacing-xxl);
        }

        .card .body h1 {
          font-size: var(--config-font-size-h1);
        }

        .card .body h2 {
          font-size: var(--config-font-size-h2);
          margin-top: var(--config-spacing-xl);
        }

        .card .body h4 {
          font-size: var(--config-font-size-h4);
          margin-bottom: var(--config-spacing-sm);
        }

        .card .body .current-occupancy {
          margin-bottom: var(--config-spacing-xl);
          font-size: var(--config-font-size-small);
        }

        .contact-options {
          gap: var(--config-spacing-md);
        }

        .footer {
          height: var(--config-footer-height);
        }

        .social-links {
          gap: var(--config-social-gap);
        }

        .social-link svg {
          width: var(--config-social-icon-size);
          height: var(--config-social-icon-size);
        }

        .theme-toggle {
          font-size: var(--config-font-size-small);
        }
      `;

      // Conditional animations based on features
      if (!features.enableAnimations) {
        css += `
          * {
            transition: none !important;
            animation: none !important;
          }
        `;
      } else {
        css += `
          * {
            transition-duration: var(--config-animation-duration);
            transition-timing-function: var(--config-animation-easing);
          }
        `;
      }

      // Conditional hover effects
      if (!features.enableHoverEffects) {
        css += `
          .card:hover,
          .social-link:hover,
          .theme-toggle:hover,
          .card .body button:hover {
            transform: none !important;
            box-shadow: inherit !important;
          }
        `;
      }

      // Responsive breakpoints
      if (ui.breakpoints) {
        css += `
          @media (max-width: ${ui.breakpoints.mobile || '768px'}) {
            .card {
              max-width: calc(100vw - 2rem);
              margin: 0 var(--config-spacing-md);
            }
            
            .card .body {
              padding: var(--config-spacing-xl);
            }
            
            .contact-options {
              flex-direction: column;
              gap: var(--config-spacing-sm);
            }
            
            .social-links {
              gap: var(--config-spacing-md);
            }
            
            .theme-toggle-container {
              position: relative;
              top: 0;
              right: 0;
              margin-bottom: var(--config-spacing-md);
              display: flex;
              justify-content: center;
            }
          }

          @media (max-width: ${ui.breakpoints.tablet || '1024px'}) {
            .card {
              max-width: calc(100vw - 4rem);
            }
          }

          @media (min-width: ${ui.breakpoints.desktop || '1200px'}) {
            .card {
              max-width: var(--config-card-max-width);
            }
          }
        `;
      }

      // Contact button styling based on configuration
      if (config.contact?.buttons) {
        const emailButton = config.contact.buttons.email;
        const linkedinButton = config.contact.buttons.linkedin;

        if (emailButton?.style === 'light') {
          css += `
            .email-button {
              background-color: #f8f9fa;
              color: #1e1f26;
            }
            .email-button:hover {
              background-color: #e9ecef;
            }
          `;
        }

        if (linkedinButton?.style === 'linkedin') {
          css += `
            .linkedin-button {
              background-color: #0077B5;
              color: #ffffff;
            }
            .linkedin-button:hover {
              background-color: #005885;
            }
          `;
        }
      }

      // Footer configuration
      if (!config.footer?.enableHoverEffects) {
        css += `
          .social-link:hover {
            transform: none !important;
            background-color: var(--border-color) !important;
          }
        `;
      }

      // Performance optimizations
      if (config.performance?.enableLazyLoading) {
        css += `
          img {
            loading: lazy;
          }
        `;
      }

      // Accessibility enhancements
      if (features.enableAccessibility !== false) {
        css += `
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }

          @media (prefers-contrast: high) {
            .card {
              border: 2px solid var(--text-primary);
            }
            
            .social-link {
              border: 1px solid var(--text-primary);
            }
            
            .theme-toggle {
              border: 2px solid var(--text-primary);
            }
          }

          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
          }
        `;
      }

      return css;
    };

    // Inject or update the dynamic stylesheet
    const updateStylesheet = () => {
      const styleId = 'config-dynamic-styles';
      let styleElement = document.getElementById(styleId);
      
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = styleId;
        styleElement.type = 'text/css';
        document.head.appendChild(styleElement);
      }
      
      styleElement.textContent = generateDynamicCSS();
    };

    // Update styles when config or theme changes
    updateStylesheet();

    // Cleanup function
    return () => {
      const styleElement = document.getElementById('config-dynamic-styles');
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, [config, theme, getConfig, getThemeColors]);

  // This component doesn't render anything visible
  return null;
}