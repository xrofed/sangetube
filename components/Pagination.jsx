'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({ page, totalPages, basePath }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function goTo(p) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', p);
    router.push(`${basePath}?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (totalPages <= 1) return null;

  const pages = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => goTo(page - 1)}
        disabled={page <= 1}
        className="px-3 py-2 rounded-lg bg-dark-800 text-neutral-400 hover:text-white hover:bg-dark-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
      >
        ← Prev
      </button>

      {start > 1 && (
        <>
          <button onClick={() => goTo(1)} className="w-9 h-9 rounded-lg bg-dark-800 text-neutral-400 hover:text-white hover:bg-dark-700 transition-colors text-sm">1</button>
          {start > 2 && <span className="text-neutral-600 px-1">…</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => goTo(p)}
          className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
            p === page
              ? 'bg-brand-600 text-white'
              : 'bg-dark-800 text-neutral-400 hover:text-white hover:bg-dark-700'
          }`}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="text-neutral-600 px-1">…</span>}
          <button onClick={() => goTo(totalPages)} className="w-9 h-9 rounded-lg bg-dark-800 text-neutral-400 hover:text-white hover:bg-dark-700 transition-colors text-sm">{totalPages}</button>
        </>
      )}

      <button
        onClick={() => goTo(page + 1)}
        disabled={page >= totalPages}
        className="px-3 py-2 rounded-lg bg-dark-800 text-neutral-400 hover:text-white hover:bg-dark-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
      >
        Next →
      </button>
    </div>
  );
}
