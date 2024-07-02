import { BookmarkIcon, HeartIcon, MessageCircleIcon } from "lucide-react"

const PostFooter = () => {
  return (
    <div className="flex items-center gap-4 px-6 py-3 text-sm">
      <div className="flex items-center gap-2">
        <HeartIcon size={22} color="gray" className="hover:fill-gray-500" />
        <span>12</span>
      </div>
      <div className="flex items-center gap-2">
        <MessageCircleIcon size={22} color="gray" className="hover:fill-gray-500" />
        <span>24</span>
      </div>
      <BookmarkIcon size={22} color="gray" className="hover:fill-gray-500" />
    </div>
  )
}

export { PostFooter }
