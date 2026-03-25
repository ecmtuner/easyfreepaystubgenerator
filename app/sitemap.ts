import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.easyfreepaystubgenerator.com'
  const now = new Date()

  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/generate`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/blog/free-pay-stub-generator-online`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog/best-pay-stub-generator-self-employed`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog/free-check-stub-maker`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog/pay-stub-generator-no-sign-up`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog/pay-stub-generator-for-contractors`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog/proof-of-income-pay-stub-generator`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]
}
