import VideoCard from './VideoCard';
import AdBanner from './AdBanner';

export default function VideoGrid({ videos = [] }) {
  if (!videos.length) {
    return (
      <div className="text-center py-20 text-neutral-500">
        <svg className="w-12 h-12 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.369A1 1 0 0121 8.58v6.84a1 1 0 01-1.447.894L15 14M4 8a2 2 0 012-2h9a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V8z" />
        </svg>
        <p>Tidak ada video ditemukan.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Insert inline ad after every 12 videos */}
      {videos.map((video, idx) => (
        <div key={video._id || video.slug || idx} className="contents">
          <div className="contents">
            {/* VideoCard is rendered inside the CSS grid via the wrapper below */}
          </div>
          {(idx + 1) % 12 === 0 && idx + 1 < videos.length && (
            <div className="col-span-full">
              <AdBanner slot="inline" />
            </div>
          )}
        </div>
      ))}

      {/* Actual grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 animate-fade-in">
        {videos.map((video) => (
          <VideoCard key={video._id || video.slug} video={video} />
        ))}
      </div>
    </div>
  );
}