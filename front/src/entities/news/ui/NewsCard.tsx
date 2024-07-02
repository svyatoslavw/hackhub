import { formatPostDate } from "@/shared/lib/utils"
import { BookmarkIcon, HeartIcon } from "lucide-react"
import React from "react"

interface NewsCardProps {
  news: INews
  children?: React.ReactNode
}

const NewsCard = ({ news, children }: NewsCardProps) => {
  return (
    <div
      key={news.id}
      className="flex w-full flex-col gap-4 rounded px-3 py-2 transition hover:bg-secondary/50"
    >
      <div className="grid gap-2" dangerouslySetInnerHTML={{ __html: news.content }}></div>
      <div className="flex justify-between">
        <div className="flex gap-4">
          <HeartIcon size={20} color="gray" className="hover:fill-gray-500" />
          <BookmarkIcon size={20} color="gray" className="hover:fill-gray-500" />
        </div>
        <div className="text-xs text-zinc-400">Created at: {formatPostDate(news.createdAt)}</div>
      </div>
      <div>{children}</div>
    </div>
  )
}

export { NewsCard }
