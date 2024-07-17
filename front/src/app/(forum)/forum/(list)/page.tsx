import { categoryService } from "@/entities/category/api"
import { TypeDataFilters } from "@/entities/filter/model/filter.slice"
import { postService } from "@/entities/post/api/post.service"
import { ForumPage } from "@/pages/ForumPage"

type TypeParamsFilters = {
  searchParams: TypeDataFilters
}
async function getPosts(searchParams: TypeDataFilters) {
  return postService.getAll(searchParams)
}

async function getSubcategories() {
  const data = await categoryService.getAllSubcategories()
  return data.data
}

export default async function Forum({ searchParams }: TypeParamsFilters) {
  const data = await getPosts(searchParams)
  const subcategories = await getSubcategories()

  return <ForumPage subcategories={subcategories} initialData={data} />
}
