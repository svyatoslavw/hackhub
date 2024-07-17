import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const APP_URL = process.env.APP_URL as string

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/forum"],
      disallow: []
    },
    sitemap: `${APP_URL}/sitemap.xml`
  }
}
