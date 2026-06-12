import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import { FaQuoteLeft } from 'react-icons/fa';
import { STUDENT, SITE } from '../lib/constants.js';
import { IMAGES } from '../lib/images.js';
import { trackEvent } from '../lib/analytics.js';
import { useRequestInfoModal } from '../lib/modal.jsx';

export default function StudentSpotlight() {
  const { open: openModal } = useRequestInfoModal();

  return (
    <section id="spotlight" className="section bg-white">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Student Success Spotlight</span>
          <h2 className="heading-2 mt-5">
            Meet <span className="text-aun-700">{STUDENT.name}</span>
          </h2>
          <p className="lede mt-5">
            From Chokhmah International Academy in Port Harcourt to the podium of AUN&rsquo;s
            17th Commencement &mdash; how a Rivers State son made us all proud.
          </p>
        </div>

        <div className="mt-14 grid items-stretch gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          {/* Large photo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-gold-200/80 via-aun-100 to-transparent blur-2xl"
            />

            {/* Hero portrait */}
            <div className="relative overflow-hidden rounded-3xl bg-aun-100 shadow-elevated ring-1 ring-aun-100">
              <img
                src={IMAGES.storyPortrait}
                alt={`${STUDENT.name}, ${STUDENT.title}`}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover sm:aspect-[5/6]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-aun-900/85 via-aun-900/30 to-transparent p-6 text-white">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-300">
                  Speaker, AUN Class of 2026
                </p>
                <p className="mt-1 font-display text-2xl font-semibold">{STUDENT.name}</p>
                <p className="text-sm text-white/85">{STUDENT.title}</p>
              </div>
            </div>
          </motion.div>

          {/* Story side */}
          <div className="lg:pl-2">
            <motion.figure
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl bg-aun-700 p-7 text-white shadow-soft sm:p-9"
            >
              <FaQuoteLeft className="text-gold-300" size={22} />
              <blockquote className="mt-3 font-display text-xl leading-snug sm:text-2xl">
                &ldquo;{STUDENT.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-200">
                {STUDENT.name} &middot; Speaker, AUN Class of 2026
              </figcaption>
            </motion.figure>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-8"
            >
              <h3 className="font-display text-2xl font-bold text-aun-800">
                A Rivers State son who made us all proud
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-ink-700 sm:text-base">
                Israel joined <strong>Chokhmah International Academy</strong>, Port Harcourt,
                in 2018 &mdash; an arts student who routinely outperformed science peers in
                mathematics and went on to be named <strong>Nigeria&rsquo;s National Best in
                English as a Second Language</strong> at the Cambridge IGCSE examinations. As
                Head Boy, he absorbed Chokhmah&rsquo;s core values &mdash; Diligence,
                Integrity, Excellence and Teamwork (DIET) &mdash; that still shape every
                decision he makes today.
              </p>

              <p className="mt-3 text-sm leading-relaxed text-ink-700 sm:text-base">
                Nearly a thousand kilometres from home, Israel earned his
                <strong> Bachelor of Laws (LL.B.) with honors</strong> at AUN, founded the
                university&rsquo;s first <strong>TEDxAUN</strong> conference as
                <strong> President of the AUN Honor Society</strong>, and was honored with the
                <strong> AUN President&rsquo;s Award for Leadership</strong> and the AUN
                Honor Society Award.
              </p>

              <p className="mt-3 text-sm leading-relaxed text-ink-700 sm:text-base">
                On May 9, 2026, he stood before graduates, parents, faculty and dignitaries as
                <strong> Speaker of the Class of 2026</strong>. In a powerful gesture, the
                leadership of Chokhmah International Academy travelled from Port Harcourt to
                Yola to witness the moment &mdash; a living testament to mentorship that
                shaped a journey from its earliest foundations.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={SITE.articleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent('cta_click', { location: 'spotlight', cta: 'Read Israel\u2019s Full Story' })
                  }
                  className="btn-primary"
                >
                  Read Israel&apos;s Full Story <HiArrowRight />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    trackEvent('cta_click', { location: 'spotlight', cta: 'Request Information' });
                    openModal('spotlight');
                  }}
                  className="btn-gold"
                >
                  Request Information
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
