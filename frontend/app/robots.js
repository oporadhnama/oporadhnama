export const revalidate = 86400 // Revalidate at most once per day

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://oporadhnama.vercel.app/sitemap.xml',
  }
}