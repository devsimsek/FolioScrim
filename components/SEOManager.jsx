import { useEffect } from 'react';
import { useConfig } from '../hooks/useConfig';

export default function SEOManager() {
  const { personal, seo, getConfig, getAssetUrl } = useConfig();

  useEffect(() => {
    if (!personal || !seo) return;

    const updateMetaTags = () => {
      // Update document title
      const title = seo.title || `${personal.name} - ${personal.title}`;
      document.title = title;

      // Update or create meta tags
      const updateMetaTag = (name, content, property = false) => {
        if (!content) return;
        
        const attribute = property ? 'property' : 'name';
        const selector = `meta[${attribute}="${name}"]`;
        let metaTag = document.querySelector(selector);
        
        if (!metaTag) {
          metaTag = document.createElement('meta');
          metaTag.setAttribute(attribute, name);
          document.head.appendChild(metaTag);
        }
        
        metaTag.setAttribute('content', content);
      };

      // Basic meta tags
      updateMetaTag('description', seo.description || personal.about);
      updateMetaTag('author', personal.name);
      updateMetaTag('robots', 'index, follow');
      
      // Keywords
      if (seo.keywords && Array.isArray(seo.keywords)) {
        updateMetaTag('keywords', seo.keywords.join(', '));
      }

      // Open Graph tags
      updateMetaTag('og:type', 'website', true);
      updateMetaTag('og:url', seo.siteUrl || window.location.href, true);
      updateMetaTag('og:title', title, true);
      updateMetaTag('og:description', seo.description || personal.about, true);
      updateMetaTag('og:image', getAssetUrl(seo.ogImage || personal.profileImage), true);
      updateMetaTag('og:site_name', personal.name, true);

      // Twitter Card tags
      updateMetaTag('twitter:card', 'summary_large_image');
      updateMetaTag('twitter:url', seo.siteUrl || window.location.href);
      updateMetaTag('twitter:title', title);
      updateMetaTag('twitter:description', seo.description || personal.about);
      updateMetaTag('twitter:image', getAssetUrl(seo.ogImage || personal.profileImage));
      
      if (seo.twitterHandle) {
        updateMetaTag('twitter:creator', seo.twitterHandle);
        updateMetaTag('twitter:site', seo.twitterHandle);
      }

      // Additional SEO enhancements
      updateMetaTag('theme-color', getConfig('theme.colors.dark.accentPrimary', '#61dafb'));
      updateMetaTag('msapplication-TileColor', getConfig('theme.colors.dark.accentPrimary', '#61dafb'));
      
      // Structured data (JSON-LD)
      const updateStructuredData = () => {
        const structuredDataId = 'structured-data';
        let scriptTag = document.getElementById(structuredDataId);
        
        if (!scriptTag) {
          scriptTag = document.createElement('script');
          scriptTag.id = structuredDataId;
          scriptTag.type = 'application/ld+json';
          document.head.appendChild(scriptTag);
        }

        const structuredData = {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": personal.name,
          "jobTitle": personal.title,
          "description": personal.about,
          "url": seo.siteUrl || window.location.href,
          "image": getAssetUrl(seo.ogImage || personal.profileImage),
          "email": `mailto:${personal.email}`,
          "sameAs": []
        };

        // Add social media URLs to sameAs
        const enabledSocial = getConfig('social', {});
        Object.entries(enabledSocial).forEach(([platform, config]) => {
          if (config.enabled && config.url) {
            structuredData.sameAs.push(config.url);
          }
        });

        // Add websites
        if (personal.websites && Array.isArray(personal.websites)) {
          personal.websites.forEach(website => {
            structuredData.sameAs.push(website.url);
          });
        }

        scriptTag.textContent = JSON.stringify(structuredData, null, 2);
      };

      updateStructuredData();

      // Canonical URL
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = seo.siteUrl || window.location.href;

      // Language
      document.documentElement.lang = seo.language || 'en';

      // Viewport for responsive design
      let viewportMeta = document.querySelector('meta[name="viewport"]');
      if (!viewportMeta) {
        viewportMeta = document.createElement('meta');
        viewportMeta.name = 'viewport';
        viewportMeta.content = 'width=device-width, initial-scale=1.0';
        document.head.appendChild(viewportMeta);
      }

      // Charset
      let charsetMeta = document.querySelector('meta[charset]');
      if (!charsetMeta) {
        charsetMeta = document.createElement('meta');
        charsetMeta.setAttribute('charset', 'UTF-8');
        document.head.insertBefore(charsetMeta, document.head.firstChild);
      }

      // Preconnect to external domains for performance
      const addPreconnect = (href) => {
        if (document.querySelector(`link[href="${href}"]`)) return;
        
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = href;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      };

      // Preconnect to Google Fonts
      addPreconnect('https://fonts.googleapis.com');
      addPreconnect('https://fonts.gstatic.com');

      // Add DNS prefetch for better performance
      const addDNSPrefetch = (href) => {
        if (document.querySelector(`link[href="${href}"]`)) return;
        
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = href;
        document.head.appendChild(link);
      };

      // DNS prefetch for social media domains
      const socialDomains = [
        'https://linkedin.com',
        'https://github.com',
        'https://pixelfed.social',
        'https://universeodon.com'
      ];

      socialDomains.forEach(addDNSPrefetch);
    };

    updateMetaTags();
  }, [personal, seo, getConfig]);

  // This component doesn't render anything visible
  return null;
}