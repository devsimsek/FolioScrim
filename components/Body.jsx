import { useConfig } from '../hooks/useConfig';

export default function Body() {
  const { personal, contact, getConfig } = useConfig();

  const handleEmailClick = () => {
    const email = personal.email || 'hello@example.com';
    const subject = getConfig('contact.emailSubject', 'Hello!');
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  };

  const handleLinkedInClick = () => {
    const linkedinUrl = getConfig('social.linkedin.url', 'https://linkedin.com');
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="body">
      <h1>{personal.name}</h1>
      <h4>{personal.tagline}</h4>
      <p className="current-occupancy">
        {personal.websites && personal.websites.length > 0 ? (
          personal.websites.map((website, index) => (
            <span key={website.url}>
              <a href={website.url} target="_blank" rel="noopener noreferrer" className="website-link">
                {website.name}
              </a>
              {index < personal.websites.length - 1 && ' | '}
            </span>
          ))
        ) : (
          <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="website-link">
            Portfolio
          </a>
        )}
      </p>
      <div className="contact-options">
        {getConfig('contact.enableEmailButton', true) && (
          <button 
            onClick={handleEmailClick}
            aria-label={`Send email to ${personal.name}`}
            className="contact-button email-button"
          >
          <svg
            width="13"
            height="10"
            viewBox="0 0 13 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M0.102406 1.70721L6.50001 4.90561L12.8976 1.70721C12.8739 1.29957 12.6953 0.916403 12.3983 0.636194C12.1012 0.355985 11.7083 0.199937 11.3 0.200012H1.70001C1.29167 0.199937 0.898764 0.355985 0.601748 0.636194C0.304733 0.916403 0.126089 1.29957 0.102406 1.70721Z"
              fill="currentColor"
            />
            <path
              d="M12.9 3.49441L6.50001 6.69441L0.100006 3.49441V8.20001C0.100006 8.62436 0.268577 9.03133 0.568635 9.33138C0.868693 9.63144 1.27566 9.80001 1.70001 9.80001H11.3C11.7244 9.80001 12.1313 9.63144 12.4314 9.33138C12.7314 9.03133 12.9 8.62436 12.9 8.20001V3.49441Z"
              fill="currentColor"
            />
          </svg>
            {getConfig('contact.buttons.email.text', 'Email')}
          </button>
        )}
        {getConfig('contact.enableLinkedInButton', true) && getConfig('social.linkedin.enabled', false) && (
          <button 
            onClick={handleLinkedInClick}
            aria-label={`Visit ${personal.name}'s LinkedIn profile`}
            className="contact-button linkedin-button"
          >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
              fill="currentColor"
            />
            <circle cx="4" cy="4" r="2" fill="currentColor" />
          </svg>
            {getConfig('contact.buttons.linkedin.text', 'LinkedIn')}
          </button>
        )}
      </div>
      <h2>About</h2>
      <p>
        {personal.about}
      </p>
      <h2>Interests</h2>
      <p>
        {personal.interests}
      </p>
    </div>
  );
}
