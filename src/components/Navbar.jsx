import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlinePhone } from 'react-icons/hi';
import { SITE } from '../lib/constants.js';
import { asset } from '../lib/images.js';
import { trackEvent } from '../lib/analytics.js';
import { useRequestInfoModal } from '../lib/modal.jsx';

export default function Navbar({ variant = 'A' }) {
  const [scrolled, setScrolled] = useState(false);
  const { open: openModal } = useRequestInfoModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const phoneHref = `tel:${SITE.admissions.phone.replace(/\s/g, '')}`;

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={[
        'fixed inset-x-0 top-0 z-40 bg-aun-700 transition-shadow duration-300',
        scrolled ? 'shadow-elevated' : 'shadow-soft',
      ].join(' ')}
    >
      <div className="container flex items-center justify-between py-3">
        <a
          href="#top"
          className="flex items-center gap-3"
          onClick={() => trackEvent('nav_click', { target: 'logo' })}
        >
          <img
            src={asset('aun-logo-top.png')}
            alt="American University of Nigeria"
            className="h-12 w-auto sm:h-14"
          />
        </a>

        <div className="flex items-center gap-3 sm:gap-5">
          <a
            href={phoneHref}
            className="flex items-center gap-2 text-sm font-semibold text-white hover:text-gold-300"
            onClick={() => trackEvent('nav_click', { target: 'phone' })}
          >
            <HiOutlinePhone size={18} />
            <span>{SITE.admissions.phone}</span>
          </a>
          <button
            type="button"
            onClick={() => {
              trackEvent('cta_click', { location: 'navbar', cta: 'Request Information' });
              openModal('navbar');
            }}
            className="btn-gold !px-4 !py-2.5 !text-[13px] sm:!px-5"
          >
            Request Information
          </button>
        </div>
      </div>
    </motion.header>
  );
}
