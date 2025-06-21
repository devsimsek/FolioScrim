import { useState, useEffect } from 'react';

// Default fallback configuration
const defaultConfig = {
  personal: {
    name: "Portfolio Owner",
    title: "Developer",
    tagline: "Developer",
    email: "hello@example.com",
    websites: [],
    profileImage: "/images/portfolio.jpg",
    about: "Welcome to my portfolio!",
    interests: "Technology and innovation."
  },
  social: {
    linkedin: { enabled: false, url: "", label: "LinkedIn" },
    github: { enabled: false, url: "", label: "GitHub" },
    mastodon: { enabled: false, url: "", label: "Mastodon" },
    pixelfed: { enabled: false, url: "", label: "Pixelfed" }
  },
  theme: {
    defaultTheme: "dark",
    allowThemeToggle: true,
    colors: {
      light: {
        backgroundPrimary: "linear-gradient(135deg, rgb(245, 246, 250) 0%, rgb(225, 230, 240) 100%)",
        backgroundSecondary: "rgb(255, 255, 255)",
        textPrimary: "#1a1a1a",
        textSecondary: "#666",
        accentPrimary: "#0066cc",
        accentSecondary: "#004499"
      },
      dark: {
        backgroundPrimary: "linear-gradient(135deg, rgb(32, 33, 39) 0%, rgb(20, 21, 25) 100%)",
        backgroundSecondary: "rgb(25, 26, 30)",
        textPrimary: "#fff",
        textSecondary: "#918E9B",
        accentPrimary: "#61dafb",
        accentSecondary: "#21b3d4"
      }
    }
  },
  features: {
    enableAnimations: true,
    enableHoverEffects: true,
    enableLoadingSpinner: true,
    enableErrorBoundary: true
  }
};

let configCache = null;

export const useConfig = () => {
  const [config, setConfig] = useState(configCache || defaultConfig);
  const [loading, setLoading] = useState(!configCache);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadConfig = async () => {
      if (configCache) {
        setConfig(configCache);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Try to get deployment config from build-time definition
        const deploymentConfig = typeof __DEPLOYMENT_CONFIG__ !== 'undefined' ? __DEPLOYMENT_CONFIG__ : { basePath: '/' };
        const basePath = deploymentConfig.basePath || '/';
        const configUrl = basePath === '/' ? '/config.json' : `${basePath}config.json`;
        
        const response = await fetch(configUrl);

        if (!response.ok) {
          throw new Error(`Failed to load config: ${response.status}`);
        }

        const configData = await response.json();

        // Merge with default config to ensure all required fields exist
        const mergedConfig = mergeDeep(defaultConfig, configData);

        configCache = mergedConfig;
        setConfig(mergedConfig);
        setError(null);
      } catch (err) {
        console.warn('Failed to load config.json, using default configuration:', err);
        setError(err.message);
        setConfig(defaultConfig);
        configCache = defaultConfig;
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  // Helper function to get nested config values with fallback
  const getConfig = (path, fallback = null) => {
    const keys = path.split('.');
    let current = config;

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return fallback;
      }
    }

    return current;
  };

  // Helper function to get enabled social links
  const getEnabledSocialLinks = () => {
    const social = config.social || {};
    return Object.entries(social)
      .filter(([_, value]) => value && value.enabled && value.url)
      .map(([platform, details]) => ({
        platform,
        ...details
      }));
  };

  // Helper function to get deployment-aware asset URLs
  const getAssetUrl = (path) => {
    const deploymentConfig = config.deployment || { basePath: '/' };
    const basePath = deploymentConfig.basePath || '/';
    
    if (path.startsWith('/')) {
      return basePath === '/' ? path : `${basePath}${path.substring(1)}`;
    }
    return path;
  };

  // Helper function to get theme colors for current theme
  const getThemeColors = (themeName) => {
    return getConfig(`theme.colors.${themeName}`, defaultConfig.theme.colors.dark);
  };

  // Helper function to update config (for future config editor)
  const updateConfig = (path, value) => {
    const keys = path.split('.');
    const newConfig = { ...config };
    let current = newConfig;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!(key in current) || typeof current[key] !== 'object') {
        current[key] = {};
      }
      current = current[key];
    }

    current[keys[keys.length - 1]] = value;
    setConfig(newConfig);
    configCache = newConfig;
  };

  return {
    config,
    loading,
    error,
    getConfig,
    getEnabledSocialLinks,
    getThemeColors,
    getAssetUrl,
    updateConfig,

    // Commonly used config sections for convenience
    personal: config.personal || defaultConfig.personal,
    social: config.social || defaultConfig.social,
    theme: config.theme || defaultConfig.theme,
    seo: config.seo || {},
    features: config.features || defaultConfig.features,
    ui: config.ui || {},
    contact: config.contact || {},
    footer: config.footer || {},
  };
};

// Deep merge utility function
function mergeDeep(target, source) {
  const output = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          output[key] = source[key];
        } else {
          output[key] = mergeDeep(target[key], source[key]);
        }
      } else {
        output[key] = source[key];
      }
    });
  }

  return output;
}

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

export default useConfig;
