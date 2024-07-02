import { CommentCard } from "@/entities/comment/ui/CommentCard"

const PostCommentList = ({ post }: { post: IPost }) => {
  return (
    <div>
      {post.comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  )
}

export { PostCommentList }
