import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent, trackPageView } from './analytics.js';

export function usePageView() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    trackPageView(pathname + search);
  }, [pathname, search]);
}

const SCROLL_BUCKETS = [25, 50, 75, 100];

export function useScrollDepthTracking() {
  const firedRef = useRef(new Set());
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.round((scrollTop / docHeight) * 100);
      SCROLL_BUCKETS.forEach((bucket) => {
        if (pct >= bucket && !firedRef.current.has(bucket)) {
          firedRef.current.add(bucket);
          trackEvent('scroll_depth', { percent: bucket });
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}
