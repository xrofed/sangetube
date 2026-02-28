import Link from 'next/link';
import { getCategories } from '@/lib/api';
import { buildBreadcrumbJsonLd, buildMetadata } from '@/lib/seo';
import AdBanner from '@/components/AdBanner';

export async function generateMetadata() {
  return buildMetadata({
    title: 'Semua Kategori',
    description: `Jelajahi semua kategori video di ${process.env.SITE_NAME || 'VideoSite'}.`,
    path: '/category',
  });
}

export default async function CategoriesPage() {
  const data = await getCategories().catch(() => null);
  const categories = data?.data || [];
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Beranda', path: '/' },
    { name: 'Kategori', path: '/category' },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <AdBanner slot="leaderboard" />

      <h1 className="section-title mt-6">Semua Kategori</h1>
      <p className="text-neutral-500 text-sm mb-8">{categories.length} kategori tersedia</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-fade-in">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="group bg-dark-800 border border-dark-700 hover:border-brand-700 rounded-xl p-5 flex flex-col gap-2 transition-all duration-200 hover:-translate-y-0.5"
          >
            <span className="font-medium text-neutral-200 group-hover:text-white transition-colors line-clamp-2">
              {cat.name}
            </span>
            <span className="text-xs text-neutral-600 group-hover:text-brand-400 transition-colors">
              {cat.totalVideos.toLocaleString('id-ID')} video
            </span>
          </Link>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-20 text-neutral-500">Tidak ada kategori ditemukan.</div>
      )}

      <AdBanner slot="leaderboard" className="mt-10" />
    </div>
  );
}
