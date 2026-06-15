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

  try {
    // Fetch news articles from Django API
    const response = await fetch('https://oporadhnama.onrender.com/api/news/')
    
    // API রেসপন্স ঠিক না থাকলে শুধু স্ট্যাটিক রাউটগুলো রিটার্ন করবে, বিল্ড ক্র্যাশ করবে না
    if (!response.ok) {
      console.error(`Sitemap fetch failed with status: ${response.status}`)
      return staticRoutes
    }

    const data = await response.json()
    
    // Django REST Framework এ অনেক সময় ডাটা 'results' অ্যারের ভেতর থাকে
    // তাই এটি সরাসরি অ্যারে নাকি 'results' এর ভেতর আছে তা চেক করে নেওয়া ভালো
    const newsArticles = Array.isArray(data) ? data : (data.results || [])

    // Dynamic routes for news articles
    const newsRoutes = newsArticles.map(article => ({
      url: `https://oporadhnama.vercel.app/news/${article.id}`,
      lastModified: new Date(article.published_at || new Date()),
      changeFrequency: 'daily',
      priority: 0.7,
    }))

    return [...staticRoutes, ...newsRoutes]

  } catch (error) {
    // কোনো কারণে HTML আসলে বা পার্সিং ফেইল করলে শুধু স্ট্যাটিক রাউটগুলো দেখাবে
    console.error('Error generating sitemap:', error)
    return staticRoutes
  }
}