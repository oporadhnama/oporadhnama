export const revalidate = 86400 // Revalidate at most once per day

export default async function sitemap() {
  // Static routes
  const staticRoutes = [
    {
      url: 'https://oporadhnama.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://oporadhnama.vercel.app/all-news',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ]

  // Fetch news articles from Django API
  const response = await fetch('https://oporadhnama.onrender.com/api/news/')
  const newsArticles = await response.json()

  // Dynamic routes for news articles
  const newsRoutes = newsArticles.map(article => ({
    url: `https://oporadhnama.vercel.app/news/${article.id}`,
    lastModified: new Date(article.published_at),
    changeFrequency: 'daily',
    priority: 0.7,
  }))

  return [...staticRoutes, ...newsRoutes]
}