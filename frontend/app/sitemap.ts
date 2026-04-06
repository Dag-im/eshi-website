import { MetadataRoute } from 'next';

const SITE_URL = 'https://eshi.org';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/services', '/contact'];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));
}
