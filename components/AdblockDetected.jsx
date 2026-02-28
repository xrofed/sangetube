'use client';

import { useEffect, useState } from 'react';

export default function AdblockDetected() {
  const [detected, setDetected] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const bait = document.createElement('div');
    bait.className = 'adsbox ad adsbygoogle ad-banner ad-placement';
    bait.style.position = 'absolute';
    bait.style.left = '-9999px';
    bait.style.height = '1px';
    bait.style.width = '1px';
    bait.style.pointerEvents = 'none';
    document.body.appendChild(bait);

    const timer = window.setTimeout(() => {
      const baitHidden = bait.offsetParent === null
        || bait.offsetHeight === 0
        || bait.offsetWidth === 0
        || window.getComputedStyle(bait).display === 'none'
        || window.getComputedStyle(bait).visibility === 'hidden';

      const adManagerLoaded = typeof window !== 'undefined' && typeof window.adManager !== 'undefined';

      if (baitHidden || !adManagerLoaded) {
        setDetected(true);
      }

      bait.remove();
    }, 1200);

    return () => {
      window.clearTimeout(timer);
      if (bait.parentNode) bait.parentNode.removeChild(bait);
    };
  }, []);

  if (!detected || dismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[70] md:left-auto md:right-6 md:max-w-md rounded-2xl border border-amber-400/40 bg-amber-50 text-amber-900 shadow-2xl p-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 9v4M12 17h.01" />
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm">AdBlock Terdeteksi</p>
          <p className="text-sm leading-relaxed mt-1">
            Mohon nonaktifkan AdBlock untuk membantu biaya operasional situs.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-600 text-white hover:bg-amber-700 transition-colors"
            >
              Saya sudah nonaktifkan
            </button>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-amber-700/30 hover:bg-amber-100 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

