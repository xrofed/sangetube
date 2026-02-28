import Link from 'next/link';
import { buildBreadcrumbJsonLd } from '@/lib/seo';

export default function NotFound() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Beranda', path: '/' },
    { name: '404', path: '/404' },
  ]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <p className="text-brand-600 font-display text-8xl font-bold mb-4">404</p>
      <h1 className="font-display text-2xl text-white mb-3">Halaman Tidak Ditemukan</h1>
      <p className="text-neutral-500 mb-8 max-w-sm">
        Halaman yang kamu cari tidak ada atau sudah dihapus.
      </p>
      <Link href="/" className="btn-primary">
        ← Kembali ke Beranda
      </Link>
    </div>
  );
}
