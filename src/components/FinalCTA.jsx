import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { HiArrowRight, HiOutlineGlobeAlt, HiOutlineUserGroup, HiOutlineQrcode } from 'react-icons/hi';
import { SITE, QR_UTM } from '../lib/constants.js';
import { asset } from '../lib/images.js';
import { buildCampaignUrl } from '../lib/utils.js';
import { trackEvent } from '../lib/analytics.js';
import { useRequestInfoModal } from '../lib/modal.jsx';

const PARTNER_PINS = []; // legacy data — retained only to avoid breaking imports if re-introduced
void PARTNER_PINS;

const GLOBAL_STATS = [
  { icon: HiOutlineGlobeAlt, value: 50, suffix: '+', label: 'Countries' },
  { icon: HiOutlineUserGroup, value: 15000, suffix: '+', label: 'Global Alumni' },
];

export default function FinalCTA({ variant = 'A' }) {
  const { open: openModal } = useRequestInfoModal();
  const qrUrl = useMemo(() => buildCampaignUrl(SITE.campaignBaseUrl, QR_UTM), []);

  return (
    <section id="cta" className="relative overflow-hidden bg-surface-alt pt-10 pb-12 sm:pt-12 sm:pb-14">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aun-200 to-transparent"
      />

      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow-blue">A Global Future</span>
          <h2 className="heading-2 mt-4">
            Your future <span className="text-aun-700">starts at AUN</span>
          </h2>
          <p className="lede mt-3">
            Scan, share, and step into a global community of scholars, builders, and
            changemakers.
          </p>
        </div>

        <div className="mt-8 grid items-stretch gap-5 lg:grid-cols-3 lg:gap-6">
          <WorldCard />
          <QrCard url={qrUrl} />
          <FinalCard onRequest={() => openModal('final_cta')} />
        </div>
      </div>
    </section>
  );
}

function WorldCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="card relative flex flex-col overflow-hidden p-5 sm:p-6"
    >
      <span className="eyebrow w-fit">Global Impact</span>
      <h3 className="mt-4 font-display text-2xl font-semibold text-aun-800">
        International opportunities from day one
      </h3>
      <p className="mt-2 text-sm text-ink-600">
        Yola is your launchpad to study, intern, and lead across four continents.
      </p>

      <div className="mt-5 flex-1">
        <YolaMap />
      </div>

      <ul className="mt-5 grid grid-cols-2 gap-3">
        {GLOBAL_STATS.map((s, i) => (
          <CountStat key={s.label} {...s} delay={i * 0.1} />
        ))}
      </ul>
    </motion.div>
  );
}

function CountStat({ icon: Icon, value, suffix, label, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString());
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, { duration: 1.6, ease: 'easeOut', delay });
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, value, delay, mv, rounded]);

  return (
    <li
      ref={ref}
      className="flex items-center gap-3 rounded-2xl bg-surface-alt px-3 py-3"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-aun-50 text-aun-700">
        <Icon size={18} />
      </span>
      <div>
        <p className="font-display text-xl font-bold text-aun-800">
          {display}
          <span className="text-gold-500">{suffix}</span>
        </p>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-500">
          {label}
        </p>
      </div>
    </li>
  );
}

function YolaMap() {
  return (
    <div className="relative overflow-hidden rounded-2xl ring-1 ring-aun-100 shadow-soft">
      <iframe
        title="American University of Nigeria, Yola — Campus Map"
        src="https://www.google.com/maps?q=American+University+of+Nigeria+Yola&output=embed&z=13"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="block h-64 w-full border-0 sm:h-72"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-aun-900/85 via-aun-900/40 to-transparent px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white"
      >
        <span>AUN · Yola, Adamawa State</span>
        <span className="text-gold-300">Live Map</span>
      </div>
    </div>
  );
}

function QrCard({ url }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="card relative overflow-hidden p-5 sm:p-6"
    >
      <div
        aria-hidden
        className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold-100"
      />
      <div className="relative">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-aun-700">
          <HiOutlineQrcode /> Scan to learn more
        </div>
        <h3 className="mt-3 font-display text-2xl font-semibold text-aun-800">
          Take AUN with you
        </h3>
        <p className="mt-2 text-sm text-ink-600">
          Snap this code to share the campaign, or revisit it later from your phone.
        </p>

        <div className="mt-6 flex justify-center">
          <div className="relative w-52 rounded-[2rem] bg-aun-900 p-2 shadow-elevated sm:w-56">
            <div className="rounded-[1.75rem] bg-white p-4">
              <div className="flex items-center justify-between text-[10px] font-semibold text-aun-700">
                <span>AUN</span>
                <span className="rounded-full bg-gold-100 px-2 py-0.5 text-[9px]">LIVE</span>
              </div>
              <div className="mt-3 flex justify-center rounded-xl bg-white p-2 ring-1 ring-aun-100">
                <img
                  src={asset('qr-billboard.png')}
                  alt="Scan to open the AUN Port Harcourt campaign page"
                  loading="lazy"
                  className="h-40 w-40 object-contain"
                />
              </div>
              <p className="mt-3 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-aun-700">
                Port Harcourt &middot; Billboard
              </p>
            </div>
            <span
              aria-hidden
              className="absolute left-1/2 top-1 h-1.5 w-12 -translate-x-1/2 rounded-full bg-white/40"
            />
          </div>
        </div>

        <a
          href={url}
          onClick={() => trackEvent('cta_click', { location: 'qr_card', cta: 'Open Link' })}
          className="btn-primary mt-6 w-full"
        >
          Open campaign link <HiArrowRight />
        </a>

        <code className="mt-4 block break-all rounded-lg bg-surface-alt p-3 font-mono text-[10px] leading-snug text-ink-600">
          {url}
        </code>
      </div>
    </motion.div>
  );
}

function FinalCard({ onRequest }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative overflow-hidden rounded-3xl bg-aun-700 p-6 text-white shadow-elevated sm:p-8"
    >
      <div className="relative flex h-full flex-col">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-200">
          Enroll Now
        </span>
        <h3 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
          Your future starts at <span className="text-gold-300">AUN</span>
        </h3>
        <p className="mt-4 text-sm text-white/85 sm:text-base">
          Apply today and join a global community of scholars, builders, and changemakers.
          Scholarships and counselor support included.
        </p>

        <div className="mt-auto flex flex-col gap-3 pt-8">
          <button
            type="button"
            onClick={() => {
              trackEvent('cta_click', { location: 'final_cta', cta: 'Request Information' });
              onRequest();
            }}
            className="btn-gold w-full"
          >
            Request Information <HiArrowRight />
          </button>
          <a
            href={SITE.programsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('cta_click', { location: 'final_cta', cta: 'Explore Programs' })}
            className="btn-primary w-full"
          >
            Explore Programs
          </a>
        </div>
      </div>
    </motion.div>
  );
}
