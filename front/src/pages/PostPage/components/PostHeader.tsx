import { formatPostDate } from "@/shared/lib/utils"
import Link from "next/link"

const PostHeader = ({ post }: { post: IPost }) => {
  return (
    <div className="w-full rounded-lg bg-foreground/[0.02] p-3">
      <h1 className="text-2xl font-medium">{post.title}</h1>
      <div className="text-sm">
        Topic in category{" "}
        <Link
          href={`/forum/${post.subcategory.id}`}
          className="cursor-pointer text-primary hover:underline"
        >
          {post.subcategory.name}
        </Link>{" "}
        created by{" "}
        <span className="cursor-pointer text-primary hover:underline">{post.creator.login}</span>{" "}
        <span className="opacity-60">{formatPostDate(post.createdAt)}</span>
      </div>
    </div>
  )
}

export { PostHeader }
