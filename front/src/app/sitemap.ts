import { postService } from "@/entities/post/api/post.service"
import { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const APP_URL = process.env.APP_URL as string
  const response = await postService.getAll()

  const posts = response.posts.map((post) => {
    return {
      url: `${APP_URL}/forum/${post.id}`,
      lastModified: post.createdAt
    }
  })

  return [
    {
      url: APP_URL,
      lastModified: new Date()
    },
    ...posts
  ]
}
