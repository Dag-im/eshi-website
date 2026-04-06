import { MetadataRoute } from 'next';

const SITE_URL = 'https://eshi.org';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/admin/*'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
