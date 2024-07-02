import { postService } from "@/entities/post/api/post.service"
import { PostPage } from "@/pages/PostPage"

type TypeParamPostSlug = {
  id?: string
}

async function getPost(params: TypeParamPostSlug) {
  const { data: post } = await postService.getById(params?.id as string)

  return post
}

export default async function ForumId({ params }: { params: TypeParamPostSlug }) {
  const post = await getPost(params)

  return <PostPage post={post} />
}
