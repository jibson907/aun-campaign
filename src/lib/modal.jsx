import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { trackEvent } from './analytics.js';

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState(null);

  const open = useCallback((src = 'unknown') => {
    setSource(src);
    setIsOpen(true);
    trackEvent('modal_open', { type: 'request_info', source: src });
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    trackEvent('modal_close', { type: 'request_info' });
  }, []);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close]);

  const value = useMemo(() => ({ isOpen, source, open, close }), [isOpen, source, open, close]);

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export function useRequestInfoModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error('useRequestInfoModal must be used inside <ModalProvider>');
  }
  return ctx;
}
