import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getVideo } from '@/lib/api';
import { buildBreadcrumbJsonLd, buildMetadata } from '@/lib/seo';
import { formatDuration } from '@/lib/duration';
import AdBanner from '@/components/AdBanner';
import VideoCard from '@/components/VideoCard';

function toIso8601Duration(value, fallbackSec) {
  if (typeof value === 'string' && value.startsWith('P')) return value;

  let totalSeconds = Number(fallbackSec);
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) {
    if (typeof value === 'number' && Number.isFinite(value)) {
      totalSeconds = value;
    } else if (typeof value === 'string') {
      const parts = value.split(':').map((part) => Number(part));
      if (parts.every((part) => Number.isFinite(part))) {
        if (parts.length === 3) totalSeconds = (parts[0] * 3600) + (parts[1] * 60) + parts[2];
        if (parts.length === 2) totalSeconds = (parts[0] * 60) + parts[1];
      }
    }
  }

  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return undefined;

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return `P0DT${hours}H${minutes}M${seconds}S`;
}

export async function generateMetadata({ params }) {
  const data = await getVideo(params.slug).catch(() => null);
  if (!data?.data) return {};

  const video = data.data;
  return buildMetadata({
    title: video.title,
    description: `Nonton ${video.title} Terbaru dengan durasi ${video.duration ? formatDuration(video.duration) : '00:00'}. Video ini termasuk dalam kategori: ${video.categories.map((cat) => cat).join(', ')}. Streaming video bokep terbaru dan terlengkap hanya di ${process.env.SITE_NAME || 'VideoSite'}.`,
    path: `/video/${video.slug}`,
    image: video.thumbnail,
    type: 'video.other',
  });
}

export default async function VideoPage({ params }) {
  const data = await getVideo(params.slug).catch(() => null);
  if (!data?.data) notFound();

  const video = data.data;
  const recommendations = Array.isArray(data?.recommendations) ? data.recommendations : [];
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Beranda', path: '/' },
    { name: video.title, path: `/video/${video.slug}` },
  ]);

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description || video.title,
    duration: toIso8601Duration(video.duration, video.duration_sec),
    thumbnailUrl: video.thumbnail,
    uploadDate: video.upload_date || video.created_at,
    embedUrl: video.embed_url,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Ad */}
      <AdBanner slot="leaderboard" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Video Player */}
          <div className="relative w-full aspect-video bg-dark-900 rounded-xl overflow-hidden border border-dark-700">
            {video.embed_url ? (
              <iframe
                src={`https://round-wave-fbe6.gordon96376-f42.workers.dev/?url=https:${video.embed_url}`}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
                allow="autoplay; encrypted-media"
                title={video.title}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-neutral-600">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            )}
          </div>

          {/* Title & Meta */}
          <div className="mt-5">
            <h1 className="font-display text-2xl md:text-3xl text-white leading-snug">{video.title}</h1>
            <div className="flex items-center gap-4 mt-3 text-sm text-neutral-500">
              {video.views != null && <span>{video.views.toLocaleString('id-ID')} views</span>}
              {video.duration && <span>Durasi: {formatDuration(video.duration)}</span>}
              {video.upload_date && (
                <span>{new Date(video.upload_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              )}
            </div>
          </div>

          {/* Mid Ad */}
          <AdBanner slot="rectangle" className="my-6 justify-start" />

          {/* Description */}
          {video.description && (
            <div className="bg-dark-800 rounded-xl p-5 border border-dark-700">
              <h2 className="text-sm font-semibold text-neutral-400 mb-2 uppercase tracking-wider">Deskripsi</h2>
              <p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-line">Nonton {video.title} Terbaru dengan durasi {video.duration ? formatDuration(video.duration) : '00:00'}. Video ini termasuk dalam kategori: {video.categories.map((cat) => cat).join(', ')}. Streaming video bokep terbaru dan terlengkap hanya di {process.env.SITE_NAME || 'VideoSite'}.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          {/* Sidebar Ad */}
          <AdBanner slot="rectangle" className="my-0 justify-center" />

          {/* Categories */}
          {video.categories?.length > 0 && (
            <div className="bg-dark-800 rounded-xl p-5 border border-dark-700">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-3">Kategori</h2>
              <div className="flex flex-wrap gap-2">
                {video.categories.map((cat) => (
                  <Link key={cat} href={`/category/${encodeURIComponent(cat.toLowerCase().replace(/\s+/g, '-'))}`} className="tag-pill">
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {video.tags?.length > 0 && (
            <div className="bg-dark-800 rounded-xl p-5 border border-dark-700">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-3">Tag</h2>
              <div className="flex flex-wrap gap-2">
                {video.tags.map((tag) => (
                  <Link key={tag} href={`/tags/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'))}`} className="tag-pill">
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {recommendations.length > 0 && (
        <section className="mt-10">
          <h2 className="section-title">Rekomendasi Untukmu</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
            {recommendations.map((item) => (
              <VideoCard key={item._id || item.slug} video={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
