export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/admin'],
      },
    ],
    sitemap: 'https://oporadhnama.info/sitemaps-v2.xml',
    host: 'https://oporadhnama.info',
  };
}