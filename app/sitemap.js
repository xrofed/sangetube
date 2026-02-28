import { getVideos, getCategories, getTags } from '@/lib/api';

const BASE_URL = process.env.SITE_URL || 'https://example.com';

export default async function sitemap() {
  const entries = [];

  // Static pages
  entries.push(
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/category`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/tags`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  );

  // Videos - fetch first page (up to 100 latest)
  try {
    const data = await getVideos(1, 100);
    const videos = data?.data || [];
    for (const video of videos) {
      entries.push({
        url: `${BASE_URL}/video/${video.slug}`,
        lastModified: video.created_at ? new Date(video.created_at) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  } catch (_) {}

  // Categories
  try {
    const data = await getCategories();
    for (const cat of data?.data || []) {
      entries.push({
        url: `${BASE_URL}/category/${cat.slug}`,
        changeFrequency: 'daily',
        priority: 0.6,
      });
    }
  } catch (_) {}

  // Tags
  try {
    const data = await getTags();
    for (const tag of data?.data || []) {
      entries.push({
        url: `${BASE_URL}/tags/${tag.slug}`,
        changeFrequency: 'daily',
        priority: 0.5,
      });
    }
  } catch (_) {}

  return entries;
}
