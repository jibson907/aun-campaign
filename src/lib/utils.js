export function buildCampaignUrl(baseUrl, params = {}) {
  try {
    const url = new URL(baseUrl);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value));
      }
    });
    return url.toString();
  } catch {
    return baseUrl;
  }
}

export function readUtmFromLocation(search = window.location.search) {
  const params = new URLSearchParams(search);
  const utm = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((k) => {
    const v = params.get(k);
    if (v) utm[k] = v;
  });
  return utm;
}

export function classNames(...values) {
  return values.filter(Boolean).join(' ');
}
