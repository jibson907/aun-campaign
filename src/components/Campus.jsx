import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiPlay } from 'react-icons/hi';
import { IMAGES, YOUTUBE } from '../lib/images.js';
import { trackEvent } from '../lib/analytics.js';

export default function Campus() {
  const [playing, setPlaying] = useState(false);
  const youtubeUrl = `https://www.youtube-nocookie.com/embed/${YOUTUBE.storyVideoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

  const handlePlay = () => {
    setPlaying(true);
    trackEvent('video_play', { id: YOUTUBE.storyVideoId, title: YOUTUBE.storyTitle, location: 'campus' });
  };

  return (
    <section id="campus" className="bg-white py-12 sm:py-16">
      <div className="container">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-14">
          {/* Column 1: Video */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="relative w-full overflow-hidden rounded-2xl bg-aun-900 shadow-elevated"
          >
            <div className="relative aspect-video w-full">
              {playing ? (
                <iframe
                  title={YOUTUBE.storyTitle}
                  src={youtubeUrl}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={handlePlay}
                  className="group absolute inset-0 block h-full w-full"
                  aria-label={`Play video: ${YOUTUBE.storyTitle}`}
                >
                  <img
                    src={`https://i.ytimg.com/vi/${YOUTUBE.storyVideoId}/hqdefault.jpg`}
                    alt={YOUTUBE.storyTitle}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = IMAGES.storyDetail;
                    }}
                  />
                  <span className="absolute inset-0 bg-aun-900/15" />
                  <span className="absolute left-4 top-4 right-4 text-left">
                    <span className="block font-display text-lg font-bold leading-tight text-white sm:text-xl">
                      Take a Virtual tour of the AUN campus
                    </span>
                    <span className="mt-1 block text-xs text-white/80 sm:text-sm">
                      American University of Nigeria
                    </span>
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-20 items-center justify-center rounded-xl bg-gold-500 text-white shadow-elevated transition group-hover:scale-105 sm:h-16 sm:w-24">
                      <HiPlay size={32} className="translate-x-0.5" />
                    </span>
                  </span>
                  <span className="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-aun-900/70 px-4 py-1.5 text-xs font-semibold text-white">
                    Watch on YouTube
                  </span>
                </button>
              )}
            </div>
          </motion.div>

          {/* Column 2: Write-up */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h3 className="font-display text-2xl font-bold leading-tight text-aun-900 sm:text-3xl">
              Learn, Lead, and Advance with AUN&rsquo;s Global Programs
            </h3>
            <p className="mt-5 text-base leading-relaxed text-ink-700 sm:text-lg">
              Hear from AUN students and faculty on how the American University of Nigeria
              is built for the next generation of African leaders. In just four years,
              you&rsquo;ll master key disciplines like business, technology, and the humanities
              through an integrated, hands-on curriculum that connects classroom theory to
              real-world impact &mdash; preparing you to lead in any industry.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
