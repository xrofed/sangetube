import Link from 'next/link';
import Image from 'next/image';
import { formatDuration } from '@/lib/duration';

function formatViews(n) {
  if (!n) return '0';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

export default function VideoCard({ video }) {
  return (
    <Link
      href={`/video/${video.slug}`}
      className="group block bg-dark-800 rounded-xl overflow-hidden border border-dark-700 hover:border-brand-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-950"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-dark-700 overflow-hidden">
        {video.thumbnail ? (
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-10 h-10 text-dark-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}

        {/* Duration badge */}
        {video.duration && (
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">
            {formatDuration(video.duration, { compact: true })}
          </span>
        )}

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
          <div className="w-12 h-12 rounded-full bg-brand-600/90 flex items-center justify-center">
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="text-sm font-medium text-neutral-200 line-clamp-2 group-hover:text-white transition-colors leading-snug">
          {video.title}
        </h3>
        <div className="flex items-center gap-2 mt-2 text-xs text-neutral-500">
          {video.views != null && <span>{formatViews(video.views)} views</span>}
          {video.views != null && video.upload_date && <span>&bull;</span>}
          {video.upload_date && (
            <span>{new Date(video.upload_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          )}
        </div>
        {/* Categories */}
        {video.categories?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {video.categories.slice(0, 2).map((cat) => (
              <span key={cat} className="text-xs px-2 py-0.5 rounded-full bg-dark-700 text-neutral-500">
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}