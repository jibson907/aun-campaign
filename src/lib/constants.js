export const SITE = {
  name: 'American University of Nigeria',
  short: 'AUN',
  url: 'https://www.aun.edu.ng',
  campaignPath: '/israel-dike-campaign',
  campaignBaseUrl:
    import.meta.env.VITE_CAMPAIGN_BASE_URL ||
    'https://www.aun.edu.ng/israel-dike-campaign',
  articleUrl:
    'https://www.aun.edu.ng/index.php/news-events/news/from-chokhmah-international-academy-port-harcourt-to-the-american-university-of-nigeria-how-a-river-state-son-made-us-all-proud',
  programsUrl: 'https://aun.edu.ng/index.php/academics/academics',
  socials: {
    facebook: 'https://www.facebook.com/AUNigeria',
    instagram: 'https://www.instagram.com/aunigeria',
    twitter: 'https://twitter.com/AUNigeria',
    linkedin: 'https://www.linkedin.com/school/american-university-of-nigeria/',
    youtube: 'https://www.youtube.com/@AUNigeria',
  },
  admissions: {
    email: 'admissions@aun.edu.ng',
    phone: '+234 805 200 0703',
    address: '98 Lamido Zubairu Way, Yola Township By-Pass, Yola, Adamawa State, Nigeria',
  },
};

export const STUDENT = {
  name: 'Israel Chimzibudu Curtis-Dike',
  title: 'LL.B. Honors • Class Speaker, AUN Class of 2026',
  city: 'Port Harcourt, Rivers State',
  badges: [
    'Chokhmah International Academy Alum',
    'Nigeria’s National Best, Cambridge IGCSE English (2nd Language)',
    'President, AUN Honor Society',
    'AUN President’s Award for Leadership',
  ],
  quote:
    'Every decision I make is fueled by diligence, built on integrity, marked with excellence, and done with the right people by my side.',
};

export const QR_UTM = {
  utm_source: 'portharcourt_billboard',
  utm_medium: 'qr',
  utm_campaign: 'israel_dike_campaign',
};
