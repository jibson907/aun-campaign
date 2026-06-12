import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';
import { ChohkmanLogo } from './Logos.jsx';
import { SITE } from '../lib/constants.js';
import { asset } from '../lib/images.js';
import { trackEvent } from '../lib/analytics.js';

const QUICK_LINKS = [
  { label: 'Admissions', href: 'https://www.aun.edu.ng/admissions' },
  { label: 'Academics', href: 'https://www.aun.edu.ng/academics' },
  { label: 'Scholarships', href: 'https://www.aun.edu.ng/financial-aid' },
  { label: 'Visit Campus', href: 'https://www.aun.edu.ng/visit' },
];

const SOCIALS = [
  { href: SITE.socials.facebook, icon: FaFacebookF, label: 'Facebook' },
  { href: SITE.socials.instagram, icon: FaInstagram, label: 'Instagram' },
  { href: SITE.socials.twitter, icon: FaTwitter, label: 'Twitter' },
  { href: SITE.socials.linkedin, icon: FaLinkedinIn, label: 'LinkedIn' },
  { href: SITE.socials.youtube, icon: FaYoutube, label: 'YouTube' },
];

export default function Footer({ variant = 'A' }) {
  return (
    <footer className="relative bg-aun-900 text-white">
      <div className="container grid gap-12 py-16 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-4">
            <img
              src={asset('aun-logo-top.png')}
              alt="American University of Nigeria"
              className="h-12 w-auto sm:h-14"
            />
            {variant === 'B' && (
              <>
                <span className="h-10 w-px bg-white/20" aria-hidden />
                <ChohkmanLogo className="h-12 w-auto" tone="light" />
              </>
            )}
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/75">
            AUN is Nigeria&apos;s first American-style university, preparing developmental
            leaders who go on to shape global industries, governments, and communities.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-white/85">
            <li className="flex items-start gap-3">
              <HiOutlineLocationMarker className="mt-0.5 shrink-0 text-gold-300" size={18} />
              {SITE.admissions.address}
            </li>
            <li className="flex items-center gap-3">
              <HiOutlinePhone className="text-gold-300" size={18} />
              <a
                href={`tel:${SITE.admissions.phone.replace(/\s/g, '')}`}
                className="hover:text-white"
                onClick={() => trackEvent('footer_click', { target: 'phone' })}
              >
                {SITE.admissions.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <HiOutlineMail className="text-gold-300" size={18} />
              <a
                href={`mailto:${SITE.admissions.email}`}
                className="hover:text-white"
                onClick={() => trackEvent('footer_click', { target: 'email' })}
              >
                {SITE.admissions.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-gold-300">
            Quick Links
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-white/85">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                  onClick={() => trackEvent('footer_click', { target: l.label })}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-gold-300">
            Follow AUN
          </h3>
          <ul className="mt-5 flex flex-wrap gap-3">
            {SOCIALS.map(({ href, icon: Icon, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  onClick={() => trackEvent('social_click', { network: label })}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-gold-400 hover:text-aun-900"
                >
                  <Icon size={15} />
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
            Campaign Variant {variant}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/65 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="https://www.aun.edu.ng/privacy" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="https://www.aun.edu.ng/terms" className="hover:text-white">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
