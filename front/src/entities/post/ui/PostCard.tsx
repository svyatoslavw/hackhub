import { formatDistanceToNow } from "date-fns"
import { enUS } from "date-fns/locale"
import Link from "next/link"

const PostCard = ({ post }: { post: IPost }) => {
  return (
    <Link
      href={`/forum/${post.id}`}
      className="flex cursor-pointer justify-between bg-secondary/70 p-3 transition-all hover:bg-secondary dark:bg-secondary/30 dark:hover:bg-secondary"
    >
      <div className="flex flex-col gap-2">
        <div>{post.title}</div>
        <div className="flex gap-3 text-xs">
          <div className="text-primary">{post.creator.login}</div>
          <div className="opacity-60">{post.subcategory.name}</div>
          <div>{formatDistanceToNow(post.createdAt, { addSuffix: true, locale: enUS })}</div>
        </div>
      </div>
      <div className="text-xs">
        <div>{post.creator.login}</div>
        <div></div>
      </div>
    </Link>
  )
}

export { PostCard }
