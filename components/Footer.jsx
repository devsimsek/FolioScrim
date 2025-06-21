import { useConfig } from '../hooks/useConfig';

const SocialIcons = {
  linkedin: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" fill="currentColor" />
      <circle cx="4" cy="4" r="2" fill="currentColor" />
    </svg>
  ),
  mastodon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M21.327 8.566c0-4.339-2.843-5.61-2.843-5.61-1.433-.658-3.894-.935-6.451-.956h-.063c-2.557.021-5.016.298-6.45.956 0 0-2.843 1.272-2.843 5.61 0 .993-.019 2.181.012 3.441.103 4.244.778 8.425 4.701 9.463 1.809.479 3.362.579 4.612.510 2.268-.126 3.541-.809 3.541-.809l-.075-1.646s-1.621.512-3.44.449c-1.804-.062-3.707-.194-3.999-2.409a4.523 4.523 0 01-.04-.621s1.77.433 4.014.536c1.372.063 2.658-.08 3.965-.236 2.506-.299 4.688-1.843 4.962-3.254.434-2.233.398-5.438.398-5.438zm-3.353 5.59h-2.081V9.057c0-1.075-.452-1.62-1.357-1.62-1.005 0-1.507.647-1.507 1.927v2.791h-2.069V9.364c0-1.28-.502-1.927-1.507-1.927-.905 0-1.357.546-1.357 1.62v5.099H6.014V8.903c0-1.074.273-1.927.823-2.558.566-.631 1.307-.955 2.228-.955 1.065 0 1.872.409 2.405 1.228l.518.869.519-.869c.533-.819 1.34-1.228 2.405-1.228.92 0 1.662.324 2.228.955.549.631.822 1.484.822 2.558v5.253z" fill="currentColor" />
    </svg>
  ),
  pixelfed: (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" height="24" width="24" aria-hidden="true">
      <path d="M12 24C5.3726 24 0 18.6274 0 12S5.3726 0 12 0s12 5.3726 12 12 -5.3726 12 -12 12m-0.9526 -9.3802h2.2014c2.0738 0 3.7549 -1.6366 3.7549 -3.6554S15.3226 7.309 13.2488 7.309h-3.1772c-1.1964 0 -2.1663 0.9442 -2.1663 2.1089v8.208z" fill="currentColor" strokeWidth="1" />
    </svg>
  ),
  github: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  twitter: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" fill="currentColor" />
    </svg>
  ),
  instagram: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  youtube: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" fill="currentColor"/>
      <polygon points="9.75,15.02 15.5,11.75 9.75,8.48" fill="white"/>
    </svg>
  ),
  medium: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" fill="currentColor"/>
    </svg>
  )
};

export default function Footer() {
  const { getEnabledSocialLinks, getConfig } = useConfig();
  const enabledSocialLinks = getEnabledSocialLinks();
  const footerHeight = getConfig('footer.height', '64px');
  const socialGap = getConfig('footer.socialGap', '2rem');

  const footerStyle = {
    height: footerHeight
  };

  const socialLinksStyle = {
    gap: socialGap
  };

  return (
    <footer className="footer" style={footerStyle}>
      <div className="footer-content">
        <div className="social-links" style={socialLinksStyle}>
          {enabledSocialLinks.map(({ platform, url, label }) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label={label}
            >
              {SocialIcons[platform] || SocialIcons.github}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
