import { formatPostDate } from "@/shared/lib/utils"
import Link from "next/link"
import React from "react"

interface ProfilePostCardProps {
  post: IPost
  children?: React.ReactNode
}

const ProfilePostCard = ({ post, children }: ProfilePostCardProps) => {
  return (
    <div className="flex flex-col gap-1 rounded border">
      <div className="w-full rounded-lg bg-[#f0f0f0] p-3 dark:bg-popover">
        <h1 className="text-lg font-medium">{post.title}</h1>
        <div className="text-xs">
          Topic in category{" "}
          <Link
            href={`/forum/${post.subcategory.id}`}
            className="cursor-pointer text-primary hover:underline"
          >
            {post.subcategory.name}
          </Link>{" "}
          created by{" "}
          <span className="cursor-pointer text-primary hover:underline">{post.creator.login}</span>{" "}
          <span className="opacity-60 font-light">{formatPostDate(post.createdAt)}</span>
        </div>
      </div>
      <div className="h-full w-full rounded-lg bg-[#f0f0f0] py-3 dark:bg-popover">
        <div
          className="grid gap-2 bg-secondary/40 p-3"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      </div>
      <div className="w-full">{children}</div>
    </div>
  )
}

export { ProfilePostCard }

