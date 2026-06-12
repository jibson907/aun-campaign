/* Centralised image paths. All files live in /public so Vite serves them
   at the root (e.g. /aun.jpg). Swap files in /Images and re-copy to /public
   to update site imagery without touching components. */

// Prefix every public-folder asset with Vite's BASE_URL so the same code works
// in dev ("/") and under a sub-path deployment (e.g. GitHub Pages "/aun-campaign/").
export const asset = (path) =>
  `${import.meta.env.BASE_URL}${String(path).replace(/^\/+/, '')}`;

const LOCAL = {
  aun: asset('aun.jpg'),
  aun2: asset('aun2.jpg'),
  aun3: asset('aun3.jpg'),
  graduate: asset('graduate.jpg'),
  pledge: asset('pleage.jpg'),
  isreal: asset('isreal.jpg'),
  alex: asset('alex.jpg'),
};

export const IMAGES = {
  // Hero portrait (also reused inside Innovation quote card)
  heroPortrait: LOCAL.aun,
  heroBackdrop: LOCAL.graduate,

  // Innovation quote card portrait
  innovationPortrait: LOCAL.alex,

  // Spotlight / story
  storyPortrait: LOCAL.isreal,
  storyDetail: LOCAL.aun3,

  // Why-AUN feature card backgrounds (kept for any legacy usage)
  why: {
    education: LOCAL.aun3,
    leadership: LOCAL.pledge,
    entrepreneurship: LOCAL.aun,
    global: LOCAL.graduate,
    scholarships: LOCAL.aun2,
    career: LOCAL.aun3,
  },

  // Campus + global impact gallery (8 slots, cycled across 5 local photos)
  gallery: [
    LOCAL.aun,
    LOCAL.aun2,
    LOCAL.graduate,
    LOCAL.pledge,
    LOCAL.aun3,
    LOCAL.aun,
    LOCAL.aun2,
    LOCAL.graduate,
  ],

  // Form-side inspirational image
  formInspire: LOCAL.aun2,

  // Article cover
  articleCover: LOCAL.graduate,

  // Mobile phone mockup background (subtle)
  qrBackdrop: LOCAL.aun3,
};

export const YOUTUBE = {
  storyVideoId: 'jMmgKhYaL0w',
  storyTitle:
    'American University of Nigeria \u2014 Campus Life & Student Experience',
};
