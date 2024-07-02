import { formatDate } from "@/shared/lib/utils"

const ProfileInfoCard = ({ profile }: { profile: IUser }) => {
  return (
    <div className="w-full bg-popover px-3">
      <h2 className="border-b-4 border-background py-4 text-lg font-medium text-gray-300">
        {profile.login}
      </h2>
      <div className="flex gap-20 border-b-4 border-background py-4 text-sm">
        <h4>Registered</h4>
        <span>{formatDate(profile.createdAt)}</span>
      </div>
    </div>
  )
}

export { ProfileInfoCard }
