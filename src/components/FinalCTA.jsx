import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { HiArrowRight, HiOutlineGlobeAlt, HiOutlineUserGroup, HiOutlineQrcode } from 'react-icons/hi';
import { SITE, QR_UTM } from '../lib/constants.js';
import { asset } from '../lib/images.js';
import { buildCampaignUrl } from '../lib/utils.js';
import { trackEvent } from '../lib/analytics.js';
import { useRequestInfoModal } from '../lib/modal.jsx';

const PARTNER_PINS = [
  { cx: 200, cy: 150, label: 'San Francisco' },
  { cx: 280, cy: 140, label: 'New York' },
  { cx: 420, cy: 145, label: 'London' },
  { cx: 480, cy: 195, label: 'Lagos' },
  { cx: 495, cy: 215, label: 'Yola' },
  { cx: 580, cy: 175, label: 'Dubai' },
  { cx: 700, cy: 200, label: 'Singapore' },
  { cx: 760, cy: 250, label: 'Sydney' },
];

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

function WorldMap() {
  return (
    <svg
      viewBox="0 0 900 480"
      className="block h-auto w-full text-aun-300"
      role="img"
      aria-label="World map with AUN partner locations"
    >
      <defs>
        <pattern id="cta-dotgrid" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill="currentColor" />
        </pattern>
        <mask id="cta-continents">
          <rect width="900" height="480" fill="black" />
          <g fill="white">
            <path d="M120 90 Q 180 60 260 100 L 300 180 Q 250 230 180 220 Q 140 200 120 160 Z" />
            <path d="M260 250 Q 300 240 320 300 L 300 400 Q 270 430 250 380 Z" />
            <path d="M400 110 Q 450 95 500 120 L 510 175 Q 470 185 420 170 Z" />
            <path d="M460 195 Q 520 180 555 220 L 540 340 Q 500 380 470 340 Q 445 270 460 195 Z" />
            <path d="M555 175 Q 600 165 640 190 L 645 240 Q 605 250 570 235 Z" />
            <path d="M640 130 Q 720 110 800 150 L 810 250 Q 740 270 670 240 Q 640 200 640 130 Z" />
            <path d="M720 290 Q 770 280 800 310 L 790 350 Q 750 360 720 340 Z" />
          </g>
        </mask>
      </defs>
      <rect width="900" height="480" fill="url(#cta-dotgrid)" mask="url(#cta-continents)" />

      <g stroke="#f4b400" strokeWidth="1.2" fill="none" opacity="0.7">
        {PARTNER_PINS.filter((p) => p.label !== 'Yola').map((p, i) => (
          <motion.path
            key={p.label}
            d={`M495 215 Q ${(495 + p.cx) / 2} ${Math.min(p.cy, 215) - 60} ${p.cx} ${p.cy}`}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.7 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, delay: 0.2 + i * 0.08 }}
            strokeDasharray="4 4"
          />
        ))}
      </g>

      {PARTNER_PINS.map((p, i) => (
        <g key={p.label}>
          <motion.circle
            cx={p.cx}
            cy={p.cy}
            r={p.label === 'Yola' ? 9 : 5}
            fill={p.label === 'Yola' ? '#f4b400' : '#003366'}
            stroke="white"
            strokeWidth="2"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
          />
          {p.label === 'Yola' && (
            <motion.circle
              cx={p.cx}
              cy={p.cy}
              r="14"
              fill="none"
              stroke="#f4b400"
              strokeWidth="2"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
        </g>
      ))}
    </svg>
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
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(244,180,0,0.35),_transparent_55%)]"
      />
      <div className="relative flex h-full flex-col">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-200">
          Enrolling Now
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
            className="btn w-full border-2 border-white/40 bg-white/5 text-white hover:bg-white hover:text-aun-700"
          >
            Explore Programs
          </a>
        </div>
      </div>
    </motion.div>
  );
}
