import { useEffect } from 'react';
import SEO from '../components/SEO.jsx';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import Innovation from '../components/Innovation.jsx';
import Campus from '../components/Campus.jsx';
import StudentSpotlight from '../components/StudentSpotlight.jsx';
import FinalCTA from '../components/FinalCTA.jsx';
import Footer from '../components/Footer.jsx';
import RequestInfoModal from '../components/RequestInfoModal.jsx';
import { ModalProvider } from '../lib/modal.jsx';
import { usePageView, useScrollDepthTracking } from '../lib/hooks.js';
import { trackEvent } from '../lib/analytics.js';
import { readUtmFromLocation } from '../lib/utils.js';

export default function CampaignPage({ variant = 'A' }) {
  usePageView();
  useScrollDepthTracking();

  useEffect(() => {
    const utm = readUtmFromLocation();
    trackEvent('campaign_landing_view', { variant, ...utm });
  }, [variant]);

  const seoTitle =
    variant === 'B'
      ? 'AUN \u00d7 Chohkman \u2014 From Port Harcourt to Global Leadership'
      : 'From Port Harcourt to Global Leadership | American University of Nigeria';

  return (
    <ModalProvider>
      <SEO title={seoTitle} variant={variant} />
      <Navbar variant={variant} />
      <main>
        {/* 1. Hero */}
        <Hero variant={variant} />
        {/* 2. Innovation, Leadership & Opportunities */}
        <Innovation />
        {/* 3. Student Success Spotlight */}
        <StudentSpotlight />
        {/* 4. Campus Life & Global Experience */}
        <Campus />
        {/* 5. Final CTA + QR + Footer */}
        <FinalCTA variant={variant} />
      </main>
      <Footer variant={variant} />
      <RequestInfoModal />
    </ModalProvider>
  );
}
