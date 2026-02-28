export const siteConfig = {
  url: process.env.SITE_URL || 'https://example.com',
  name: process.env.SITE_NAME || 'VideoSite',
};

export function buildMetadata({
  title,
  description,
  path = '',
  image,
  type = 'website',
}) {
  const url = `${siteConfig.url}${path}`;
  const siteName = siteConfig.name;
  const socialTitle = title ? `${title} | ${siteName}` : siteName;

  return {
    ...(title ? { title } : {}),
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName,
      type,
      ...(image ? { images: [{ url: image, width: 1280, height: 720 }] } : {}),
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: socialTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export function buildBreadcrumbJsonLd(items = []) {
  const itemListElement = items
    .filter((item) => item?.name && (item?.path || item?.url))
    .map((item, index) => {
      const itemUrl = item.url
        || (String(item.path).startsWith('http')
          ? item.path
          : `${siteConfig.url}${item.path}`);

      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: itemUrl,
      };
    });

  if (itemListElement.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
}
