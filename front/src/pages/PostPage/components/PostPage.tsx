"use client"
import { SendComment } from "@/features/SendComment/SendComment"
import { PostCommentList } from "./PostCommentList"
import { PostFooter } from "./PostFooter"
import { PostHeader } from "./PostHeader"

const PostPage = ({ post }: { post: IPost }) => {
  return (
    <div className="relative flex flex-col gap-2">
      <PostHeader post={post} />
      <div className="h-full w-full rounded-lg bg-foreground/[0.02] py-3">
        <div className="grid gap-2 p-3" dangerouslySetInnerHTML={{ __html: post.content }}></div>
        <PostFooter />
        <PostCommentList post={post} />
      </div>
      <div className="h-20 rounded-lg"></div>
      <SendComment />
    </div>
  )
}

export { PostPage }
