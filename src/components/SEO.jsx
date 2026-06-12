import { Helmet } from 'react-helmet-async';
import { SITE } from '../lib/constants.js';

const DEFAULT_TITLE =
  'From Port Harcourt to Global Leadership | American University of Nigeria';
const DEFAULT_DESC =
  'Meet Israel Curtis Dike, AUN Honors Program President and Class Speaker 2026. Discover how the American University of Nigeria turns Port Harcourt talent into global leaders.';
const DEFAULT_IMAGE = '/og-image.svg';

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  image = DEFAULT_IMAGE,
  url = SITE.campaignBaseUrl,
  variant = 'A',
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollegeOrUniversity',
        name: SITE.name,
        url: SITE.url,
        sameAs: Object.values(SITE.socials),
        address: {
          '@type': 'PostalAddress',
          streetAddress: '98 Lamido Zubairu Way',
          addressLocality: 'Yola',
          addressRegion: 'Adamawa',
          addressCountry: 'NG',
        },
      },
      {
        '@type': 'WebPage',
        name: title,
        description,
        url,
        primaryImageOfPage: image,
        inLanguage: 'en',
        isPartOf: { '@type': 'WebSite', name: SITE.name, url: SITE.url },
      },
      {
        '@type': 'Person',
        name: 'Israel Curtis Dike',
        jobTitle: 'Honors Program President • Class Speaker 2026',
        affiliation: { '@type': 'CollegeOrUniversity', name: SITE.name },
        alumniOf: [
          { '@type': 'EducationalOrganization', name: 'Chohkman Academy' },
          { '@type': 'CollegeOrUniversity', name: SITE.name },
        ],
      },
    ],
  };

  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <meta name="campaign-variant" content={variant} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE.name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Performance hints */}
      <meta httpEquiv="x-dns-prefetch-control" content="on" />

      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
}
