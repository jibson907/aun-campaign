/* Lightweight analytics layer: GA4 + Meta Pixel. Safe no-ops when IDs are missing. */

const GA_ID = import.meta.env.VITE_GA4_ID;
const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;

let initialized = false;

function loadScript(src, async = true) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement('script');
    s.src = src;
    s.async = async;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

function initGA4() {
  if (!GA_ID || GA_ID.startsWith('G-XXXX')) return;
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`).catch(() => {});
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, {
    send_page_view: true,
    transport_type: 'beacon',
  });
}

function initMetaPixel() {
  if (!PIXEL_ID || PIXEL_ID.startsWith('0000')) return;
  /* eslint-disable */
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */
  window.fbq('init', PIXEL_ID);
  window.fbq('track', 'PageView');
}

export function initAnalytics() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;
  initGA4();
  initMetaPixel();
}

export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined') return;
  try {
    if (window.gtag) window.gtag('event', name, params);
    if (window.fbq) window.fbq('trackCustom', name, params);
    // Always log for debugging during development
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.info('[analytics]', name, params);
    }
  } catch {
    /* silent */
  }
}

export function trackPageView(path) {
  if (typeof window === 'undefined') return;
  if (window.gtag && GA_ID) {
    window.gtag('event', 'page_view', { page_path: path });
  }
  if (window.fbq && PIXEL_ID) {
    window.fbq('track', 'PageView');
  }
}

export function trackLead(payload = {}) {
  if (typeof window === 'undefined') return;
  if (window.gtag) {
    window.gtag('event', 'generate_lead', {
      currency: 'USD',
      value: 1,
      ...payload,
    });
  }
  if (window.fbq) {
    window.fbq('track', 'Lead', payload);
  }
}
