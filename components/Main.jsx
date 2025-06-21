import Body from "./Body";
import Footer from "./Footer";
import { useConfig } from '../hooks/useConfig';

export default function Main() {
  const { personal, getConfig, getAssetUrl } = useConfig();
  
  const cardMaxWidth = getConfig('ui.cardMaxWidth', '540px');
  const imageAlt = `${personal.name} - ${personal.title} Portfolio`;
  const profileImageUrl = getAssetUrl(personal.profileImage || "/images/portfolio.jpg");
  
  return (
    <main>
      <section className="card" style={{ maxWidth: cardMaxWidth }}>
        <img 
          src={profileImageUrl}
          alt={imageAlt}
          loading="lazy"
          width="540"
          height="auto"
        />
        <Body />
        <Footer />
      </section>
    </main>
  );
}
