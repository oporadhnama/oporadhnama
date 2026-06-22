export const dynamic = 'force-dynamic' // Revalidate at most once per day

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://oporadhnama.info/sitemap.xml',
  }
}