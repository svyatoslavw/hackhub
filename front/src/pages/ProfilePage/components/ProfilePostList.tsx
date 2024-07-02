import { ProfilePostCard } from "@/entities/post/ui/ProfilePostCard"

const ProfilePostList = ({ profile }: { profile: IUser }) => {
  return (
    <div className="flex flex-col gap-4">
      {profile.posts.map((post) => (
        <ProfilePostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

export { ProfilePostList }
