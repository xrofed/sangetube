import { Fragment, Suspense } from 'react';
import { getVideos } from '@/lib/api';
import { buildBreadcrumbJsonLd, buildMetadata } from '@/lib/seo';
import VideoCard from '@/components/VideoCard';
import AdBanner from '@/components/AdBanner';
import Pagination from '@/components/Pagination';

export async function generateMetadata() {
  return buildMetadata({
    description: `Nonton bokep bocil terbaru, bokep chindo terbaik, bokep bocil smp, bokep hijab, bokep bocil colmek dan segudang bokep update terbaru setiap harinya. ${process.env.SITE_NAME || 'VideoSite'}.`,
  });
}

export default async function HomePage({ searchParams }) {
  const page = Math.max(Number(searchParams?.page) || 1, 1);
  const data = await getVideos(page, 24).catch(() => null);

  const videos = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Beranda', path: '/' },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Top Ad */}
      <AdBanner slot="leaderboard" />

      {/* Hero */}
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl text-white mb-2">
          Video Terbaru
        </h1>
        <p className="text-neutral-500 text-sm">
          {data?.total ? `${data.total.toLocaleString('id-ID')} video tersedia` : 'Memuat…'}
        </p>
      </div>

      {/* Grid */}
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
        <div className="text-center py-20 text-neutral-500">Tidak ada video tersedia.</div>
      )}

      {/* Pagination */}
      <Suspense>
        <Pagination page={page} totalPages={totalPages} basePath="/" />
      </Suspense>

      {/* Bottom Ad */}
      <AdBanner slot="leaderboard" className="mt-8" />
    </div>
  );
}
