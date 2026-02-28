import Link from 'next/link';
import { getTags } from '@/lib/api';
import { buildBreadcrumbJsonLd, buildMetadata } from '@/lib/seo';
import AdBanner from '@/components/AdBanner';

export async function generateMetadata() {
  return buildMetadata({
    title: 'Semua Tag',
    description: `Jelajahi semua tag video di ${process.env.SITE_NAME || 'VideoSite'}.`,
    path: '/tags',
  });
}

export default async function TagsPage() {
  const data = await getTags().catch(() => null);
  const tags = data?.data || [];
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Beranda', path: '/' },
    { name: 'Tag', path: '/tags' },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <AdBanner slot="leaderboard" />

      <h1 className="section-title mt-6">Semua Tag</h1>
      <p className="text-neutral-500 text-sm mb-8">{tags.length} tag tersedia</p>

      <div className="flex flex-wrap gap-3 animate-fade-in">
        {tags.map((tag) => (
          <Link
            key={tag.slug}
            href={`/tags/${tag.slug}`}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-800 border border-dark-700 hover:border-brand-700 hover:bg-dark-700 transition-all duration-200"
            style={{ fontSize: `${Math.min(1 + tag.totalVideos / 100, 1.5)}rem` }}
          >
            <span className="text-neutral-300 group-hover:text-white transition-colors font-medium">
              #{tag.name}
            </span>
            <span className="text-xs text-neutral-600 group-hover:text-brand-400 transition-colors">
              {tag.totalVideos}
            </span>
          </Link>
        ))}
      </div>

      {tags.length === 0 && (
        <div className="text-center py-20 text-neutral-500">Tidak ada tag ditemukan.</div>
      )}

      <AdBanner slot="leaderboard" className="mt-10" />
    </div>
  );
}
