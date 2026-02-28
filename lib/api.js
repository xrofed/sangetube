const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function fetcher(path) {
  const res = await fetch(`${API_URL}${path}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function getVideos(page = 1, limit = 24) {
  return fetcher(`/videos?page=${page}&limit=${limit}`);
}

export async function getVideo(slug) {
  return fetcher(`/videos/${slug}`);
}

export async function getCategories() {
  return fetcher('/categories');
}

export async function getTags() {
  return fetcher('/tags');
}

export async function getCategoryVideos(slug, page = 1, limit = 24) {
  return fetcher(`/categories/${slug}/videos?page=${page}&limit=${limit}`);
}

export async function getTagVideos(slug, page = 1, limit = 24) {
  return fetcher(`/tags/${slug}/videos?page=${page}&limit=${limit}`);
}

export async function getSearchVideos(q, page = 1, limit = 24) {
  const keyword = encodeURIComponent(String(q || '').trim());
  return fetcher(`/search?q=${keyword}&page=${page}&limit=${limit}`);
}