import { categoryService } from "@/entities/category/api"
import { TypeDataFilters } from "@/entities/filter/model/filter.slice"
import { postService } from "@/entities/post/api/post.service"
import { HomePage } from "@/pages/HomePage"
import { SEO, SITE_URL } from "@/shared/lib/config/seo.config"
import { Metadata } from "next"

type TypeParamsFilters = {
  searchParams: TypeDataFilters
}

export const metadata: Metadata = {
  title: {
    default: `Home - ${SEO.SITE_NAME}`,
    template: `%s | ${SEO.SITE_NAME}`
  },
  icons: {
    icon: "512x512.png",
    shortcut: "256x256.png"
  },
  openGraph: {
    type: "website",
    description: "Programming community forum with high quality content and fast response time",
    siteName: SEO.SITE_NAME,
    emails: `example@${SEO.SITE_NAME}`
  },
  metadataBase: new URL(SITE_URL),
  applicationName: SEO.SITE_NAME,
  creator: SEO.CREATOR,
  authors: {
    name: SEO.CREATOR,
    url: SEO.GITHUB_URL
  },
  keywords: SEO.SITE_KEYWORDS
}
async function getPosts(searchParams: TypeDataFilters) {
  return postService.getSome(searchParams)
}

async function getSubcategories() {
  const data = await categoryService.getAllSubcategories()
  return data.data
}

export default async function Home({ searchParams }: TypeParamsFilters) {
  const data = await getPosts(searchParams)
  const subcategories = await getSubcategories()
  return <HomePage subcategories={subcategories} initialData={data} />
}
