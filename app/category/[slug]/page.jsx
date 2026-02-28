import { Fragment, Suspense } from 'react';
import { getCategoryVideos } from '@/lib/api';
import { buildBreadcrumbJsonLd, buildMetadata } from '@/lib/seo';
import VideoCard from '@/components/VideoCard';
import Pagination from '@/components/Pagination';
import AdBanner from '@/components/AdBanner';

function slugToLabel(slug) {
  return decodeURIComponent(slug).replace(/-/g, ' ');
}

export async function generateMetadata({ params }) {
  const label = slugToLabel(params.slug);
  return buildMetadata({
    title: `Kategori: ${label}`,
    description: `Tonton video kategori ${label} di ${process.env.SITE_NAME || 'VideoSite'}.`,
    path: `/category/${params.slug}`,
  });
}

export default async function CategoryVideosPage({ params, searchParams }) {
  const page = Math.max(Number(searchParams?.page) || 1, 1);
  const label = slugToLabel(params.slug);

  const data = await getCategoryVideos(params.slug, page, 24).catch(() => null);
  const videos = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const total = data?.total || 0;
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Beranda', path: '/' },
    { name: 'Kategori', path: '/category' },
    { name: label, path: `/category/${params.slug}` },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <AdBanner slot="leaderboard" />

      <div className="mb-8 mt-6">
        <p className="text-xs uppercase tracking-widest text-brand-500 mb-1">Kategori</p>
        <h1 className="font-display text-3xl md:text-4xl text-white capitalize">{label}</h1>
        {total > 0 && <p className="text-neutral-500 text-sm mt-1">{total.toLocaleString('id-ID')} video</p>}
      </div>

      {videos.length > 0 ? (
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
        <div className="text-center py-20 text-neutral-500">Tidak ada video dalam kategori ini.</div>
      )}

      <Suspense>
        <Pagination page={page} totalPages={totalPages} basePath={`/category/${params.slug}`} />
      </Suspense>

      <AdBanner slot="leaderboard" className="mt-8" />
    </div>
  );
}
