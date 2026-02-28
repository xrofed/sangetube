import { Fragment, Suspense } from 'react';
import { getSearchVideos } from '@/lib/api';
import { buildBreadcrumbJsonLd, buildMetadata } from '@/lib/seo';
import VideoCard from '@/components/VideoCard';
import AdBanner from '@/components/AdBanner';
import Pagination from '@/components/Pagination';

export async function generateMetadata({ searchParams }) {
  const q = String(searchParams?.q || '').trim();

  if (!q) {
    return buildMetadata({
      title: 'Pencarian',
      description: `Cari video favorit kamu di ${process.env.SITE_NAME || 'VideoSite'}.`,
      path: '/search',
    });
  }

  const encoded = encodeURIComponent(q);
  return buildMetadata({
    title: `Hasil Pencarian: ${q}`,
    description: `Hasil pencarian untuk "${q}" di ${process.env.SITE_NAME || 'VideoSite'}.`,
    path: `/search?q=${encoded}`,
  });
}

export default async function SearchPage({ searchParams }) {
  const q = String(searchParams?.q || '').trim();
  const page = Math.max(Number(searchParams?.page) || 1, 1);

  const data = q ? await getSearchVideos(q, page, 24).catch(() => null) : null;
  const videos = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const total = data?.total || 0;
  const encoded = q ? encodeURIComponent(q) : '';
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Beranda', path: '/' },
    { name: 'Pencarian', path: q ? `/search?q=${encoded}` : '/search' },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <AdBanner slot="leaderboard" />

      <div className="mb-8 mt-6">
        <p className="text-xs uppercase tracking-widest text-brand-500 mb-1">Pencarian</p>
        <h1 className="font-display text-3xl md:text-4xl text-white">
          {q ? `Hasil untuk "${q}"` : 'Cari Video'}
        </h1>
        <p className="text-neutral-500 text-sm mt-2">
          {q ? `${total.toLocaleString('id-ID')} video ditemukan` : 'Masukkan kata kunci untuk mencari video.'}
        </p>
      </div>

      {!q ? (
        <div className="text-center py-20 text-neutral-500">Gunakan kolom pencarian di header untuk mulai mencari.</div>
      ) : videos.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 animate-fade-in">
          {videos.map((video, idx) => (
            <Fragment key={video._id || video.slug}>
              <VideoCard key={video._id || video.slug} video={video} />
              {(idx + 1) % 10 === 0 && idx + 1 < videos.length && (
                <div key={`ad-${idx}`} className="col-span-full">
                  <AdBanner slot="inline" />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-neutral-500">Tidak ada hasil untuk kata kunci "{q}".</div>
      )}

      {q && (
        <Suspense>
          <Pagination page={page} totalPages={totalPages} basePath="/search" />
        </Suspense>
      )}

      <AdBanner slot="leaderboard" className="mt-8" />
    </div>
  );
}
