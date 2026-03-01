import Link from 'next/link';

export default function Footer({ siteName = process.env.SITE_NAME || 'VideoSite' }) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="font-display text-xl text-white">{siteName}</span>
            <p className="text-neutral-500 text-sm mt-2 leading-relaxed">
              Nonton bokep bocil terbaru, bokep chindo terbaik, bokep bocil smp, bokep hijab, bokep bocil colmek dan segudang bokep update terbaru setiap harinya. ${process.env.SITE_NAME || 'VideoSite'}.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-3">Navigasi</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-neutral-400 hover:text-white transition-colors">Beranda</Link></li>
              <li><Link href="/category" className="text-sm text-neutral-400 hover:text-white transition-colors">Kategori</Link></li>
              <li><Link href="/tags" className="text-sm text-neutral-400 hover:text-white transition-colors">Tag</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-3">Info</h3>
            <ul className="space-y-2">
              <li><Link href="/sitemap.xml" className="text-sm text-neutral-400 hover:text-white transition-colors">Sitemap</Link></li>
              <li><Link href="/robots.txt" className="text-sm text-neutral-400 hover:text-white transition-colors">Robots.txt</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-dark-700 mt-8 pt-6 text-center text-xs text-neutral-600">
          &copy; {year} {siteName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
