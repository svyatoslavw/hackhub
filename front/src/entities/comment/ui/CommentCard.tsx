import { formatPostDate } from '@/shared/lib/utils'
import Image from 'next/image'

const CommentCard = ({ comment }: { comment: IComment }) => {
  return (
    <div className="flex justify-between border-t-8 border-background p-3" key={comment.id}>
    <div className="flex items-start gap-3">
      <Image
        alt={comment.id}
        src={comment.creator.image}
        width={60}
        height={60}
        className="aspect-square h-12 w-12 rounded-full"
      />
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-medium">{comment.creator.login}</h3>
        <div dangerouslySetInnerHTML={{ __html: comment.content }}></div>
        <div className="text-xs opacity-60 font-light">{formatPostDate(comment.createdAt)}</div>
      </div>
    </div>
  </div>
  )
}

export { CommentCard }

