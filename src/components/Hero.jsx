import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { HiArrowRight, HiOutlineGlobeAlt, HiSparkles, HiOutlineUserGroup, HiOutlineAcademicCap } from 'react-icons/hi';
import { IMAGES, asset } from '../lib/images.js';
import { SITE } from '../lib/constants.js';
import { trackEvent } from '../lib/analytics.js';
import { useRequestInfoModal } from '../lib/modal.jsx';

const HERO_SLIDES = [
  asset('aun.jpg'),
  asset('aun4.jpg'),
  asset('aun5.jpg'),
  asset('aun6.jpg'),
];
const SLIDE_INTERVAL_MS = 5000;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

const FLOATING_STATS = [
  { icon: HiOutlineGlobeAlt, value: 50, suffix: '+', label: 'Countries' },
  { icon: HiOutlineUserGroup, value: 15000, suffix: '+', label: 'Alumni' },
  { icon: HiOutlineAcademicCap, value: 92, suffix: '%', label: 'Employed' },
];

export default function Hero({ variant = 'A' }) {
  const { open: openModal } = useRequestInfoModal();
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setSlide((s) => (s + 1) % HERO_SLIDES.length),
      SLIDE_INTERVAL_MS,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      className="relative isolate flex items-center overflow-hidden bg-[#F3F4F6] pt-20 pb-6 sm:pt-24 sm:pb-8 lg:pt-24 lg:pb-10"
    >
      {/* World map watermark */}
      <WorldWatermark className="absolute -right-32 top-24 -z-10 hidden h-[520px] w-[820px] text-aun-200/70 lg:block" />

      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* Left copy */}
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
            >
              <span className="eyebrow">
                <HiSparkles /> Port Harcourt Recruitment Campaign
              </span>
            </motion.div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="lede mt-5 max-w-xl"
            >
              Join a new generation of <span className="font-semibold text-aun-700">leaders,
              innovators, entrepreneurs, and changemakers</span> at the American University of
              Nigeria.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="mt-7 flex flex-wrap gap-4"
            >
              <button
                type="button"
                onClick={() => {
                  trackEvent('cta_click', { location: 'hero', cta: 'Request Information' });
                  openModal('hero');
                }}
                className="btn-gold"
              >
                Request Information <HiArrowRight />
              </button>
              <a
                href={SITE.programsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('cta_click', { location: 'hero', cta: 'Explore Programs' })}
                className="btn-primary"
              >
                Explore Programs
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="mt-7 flex flex-wrap items-center gap-5"
            >
              <div className="flex -space-x-3">
                {[0, 1, 2, 3].map((i) => (
                  <img
                    key={i}
                    src={IMAGES.gallery[i]}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm"
                  />
                ))}
              </div>
              <div className="text-sm text-ink-600">
                <p className="font-semibold text-aun-700">Join 1,500+ AUN students</p>
                <p>from 50+ countries shaping the future, today.</p>
              </div>
            </motion.div>
          </div>

          {/* Right portrait — sliding carousel */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-[#F3F4F6] shadow-elevated ring-1 ring-black/5">
              <AnimatePresence mode="sync" initial={false}>
                <motion.img
                  key={HERO_SLIDES[slide]}
                  src={HERO_SLIDES[slide]}
                  alt="American University of Nigeria campus life"
                  initial={{ opacity: 0, x: '8%', scale: 1.04 }}
                  animate={{ opacity: 1, x: '0%', scale: 1 }}
                  exit={{ opacity: 0, x: '-8%', scale: 1.02 }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-aun-900/75 via-aun-900/30 to-transparent p-6 text-white">
                <p className="mt-1 font-display text-2xl font-semibold">
                  Leaders, innovators, changemakers
                </p>
                <p className="text-sm text-white/85">American University of Nigeria</p>
              </div>

              {/* Slide dots */}
              <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                {HERO_SLIDES.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    aria-label={`Show slide ${i + 1}`}
                    onClick={() => setSlide(i)}
                    className={[
                      'h-1.5 rounded-full transition-all duration-300',
                      i === slide ? 'w-8 bg-white' : 'w-4 bg-white/50 hover:bg-white/80',
                    ].join(' ')}
                  />
                ))}
              </div>
            </div>

            {/* Floating achievement stats */}
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: 0.9 } } }}
              className="pointer-events-none absolute -left-4 top-10 hidden flex-col gap-3 sm:flex"
            >
              {FLOATING_STATS.slice(0, 2).map((s) => (
                <FloatingStat key={s.label} {...s} />
              ))}
            </motion.ul>
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { delayChildren: 1.4 } } }}
              className="pointer-events-none absolute -right-4 bottom-32 hidden flex-col gap-3 sm:flex"
            >
              <FloatingStat {...FLOATING_STATS[2]} />
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FloatingStat({ icon: Icon, value, suffix, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString());
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, { duration: 1.6, ease: 'easeOut' });
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, value, mv, rounded]);

  return (
    <motion.li
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 16, scale: 0.92 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: 'easeOut' } },
      }}
      className="pointer-events-auto flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-soft ring-1 ring-black/5"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3F4F6] text-aun-700">
        <Icon size={20} />
      </span>
      <div className="leading-tight">
        <p className="font-display text-xl font-bold text-aun-800">
          {display}
          <span className="text-gold-500">{suffix}</span>
        </p>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-500">{label}</p>
      </div>
    </motion.li>
  );
}

function WorldWatermark({ className }) {
  return (
    <svg viewBox="0 0 900 480" className={className} aria-hidden>
      <defs>
        <pattern id="hero-dotgrid" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill="currentColor" />
        </pattern>
        <mask id="hero-continents">
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
      <rect width="900" height="480" fill="url(#hero-dotgrid)" mask="url(#hero-continents)" />
    </svg>
  );
}
