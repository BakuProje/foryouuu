'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface MobileContextType {
  isMobile: boolean;
  isLowPerformance: boolean;
}

const MobileContext = createContext<MobileContextType>({
  isMobile: false,
  isLowPerformance: false,
});

export const useMobile = () => useContext(MobileContext);

export function MobileOptimizer({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      // Check for low performance indicators
      const connection = (navigator as any).connection;
      const isSlowConnection = connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g';
      const hasLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      setIsLowPerformance(mobile && (isSlowConnection || hasLowMemory || prefersReducedMotion));
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <MobileContext.Provider value={{ isMobile, isLowPerformance }}>
      {children}
    </MobileContext.Provider>
  );
}
