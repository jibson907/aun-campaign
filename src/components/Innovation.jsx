import { motion } from 'framer-motion';
import { HiCheck } from 'react-icons/hi';
import { FaQuoteLeft } from 'react-icons/fa';
import { IMAGES } from '../lib/images.js';

const HIGHLIGHTS = [
  'Rolling Admissions: Fall & Spring Start Dates',
  'No GMAT / GRE Required',
];

export default function Innovation() {
  return (
    <section id="innovation" className="section bg-white">
      <div className="container">
        {/* Heading + intro paragraph */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Innovation, Leadership &amp; Opportunities</span>
          <h2 className="mt-5 font-display text-3xl font-bold text-aun-900 sm:text-4xl lg:text-5xl">
            Become a Global Leader and Innovator with Your AUN Degree
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink-600 sm:text-lg">
            The American University of Nigeria offers an integrated, American-style curriculum
            that blends innovation, leadership, and real-world experience. In just four years
            on the Yola campus, you will work with world-class faculty to build ventures,
            lead student initiatives, and graduate ready for any career, anywhere.
          </p>

          {/* Checkmark highlights */}
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {HIGHLIGHTS.map((h) => (
              <li key={h} className="flex items-center gap-2 text-sm font-semibold text-aun-900 sm:text-base">
                <HiCheck className="text-success-500" size={22} />
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Quote card */}
        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mt-16 overflow-hidden rounded-3xl bg-aun-900 shadow-elevated ring-1 ring-aun-100"
        >
          <div className="grid items-stretch lg:grid-cols-[1.35fr_1fr]">
            {/* Quote text */}
            <div className="flex flex-col justify-center p-8 text-white sm:p-12 lg:p-16">
              <FaQuoteLeft className="text-gold-300" size={26} />
              <blockquote className="mt-5 font-display text-xl leading-snug text-white sm:text-2xl lg:text-[1.7rem]">
                &ldquo;Knowledge isn&rsquo;t just memorisation &mdash; it&rsquo;s a craft, and
                leadership is the key. I chose AUN to better understand the art of building
                things that matter.&rdquo;
              </blockquote>

              <figcaption className="mt-8">
                <p className="font-display text-lg font-semibold text-white">
                  &mdash; Alexander Owens
                </p>
              </figcaption>
            </div>

            {/* Portrait */}
            <div className="relative min-h-[320px] overflow-hidden lg:min-h-full">
              <img
                src={IMAGES.innovationPortrait}
                alt="Alexander Owens, AUN Class of 2026"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-aun-900/60 via-aun-900/10 to-transparent lg:bg-gradient-to-r lg:from-aun-900/80 lg:via-transparent lg:to-transparent"
              />
            </div>
          </div>
        </motion.figure>
      </div>
    </section>
  );
}
