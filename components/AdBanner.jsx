'use client';

import { useEffect, useRef } from 'react';

/**
 * AdBanner - Flexible ad placement component.
 *
 * Usage:
 *   <AdBanner slot="leaderboard" />     → 728x90 banner (top/bottom)
 *   <AdBanner slot="rectangle" />       → 300x250 rectangle (sidebar)
 *   <AdBanner slot="half-page" />       → 300x600 half page
 *   <AdBanner slot="inline" />          → 970x90 wide inline
 *
 * To integrate Google AdSense:
 *   1. Add <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXX" crossorigin="anonymous"></script>
 *      in app/layout.jsx <head> via next/script
 *   2. Replace the placeholder div with your real <ins class="adsbygoogle"> tag
 *   3. Push to window.adsbygoogle in the useEffect
 */

const SLOT_CONFIG = {
  leaderboard: { label: 'Ad · 728×90', classes: 'h-[90px] w-full max-w-[728px]' },
  rectangle:   { label: 'Ad · 300×250', classes: 'h-[250px] w-[300px]' },
  'half-page': { label: 'Ad · 300×600', classes: 'h-[600px] w-[300px]' },
  inline:      { label: 'Ad · 970×90', classes: 'h-[90px] w-full max-w-[970px]' },
};

export default function AdBanner({ slot = 'leaderboard', className = '' }) {
  const adRef = useRef(null);
  const config = SLOT_CONFIG[slot] || SLOT_CONFIG.leaderboard;

  useEffect(() => {
    if (slot !== 'rectangle' || !adRef.current) return;

    adRef.current.innerHTML = '';
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://js.wpadmngr.com/static/adManager.js';
    script.setAttribute('data-admpid', '412147');
    adRef.current.appendChild(script);

    return () => {
      if (adRef.current) adRef.current.innerHTML = '';
    };
  }, [slot]);

  return (
    <div className={`flex justify-center my-6 ${className}`}>
      <div
        ref={adRef}
        className={`ad-banner ${config.classes}`}
        aria-label="Advertisement"
      >
        {slot !== 'rectangle' && <span>{config.label}</span>}
      </div>
    </div>
  );
}
