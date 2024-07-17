"use client"

import { useProfile } from "@/entities/user/hooks/useProfile"
import { AddNews, CreatePoll, UpdateProfileImage } from "@/features"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import Image from "next/image"
import { ProfileInfoCard } from "./ProfileInfoCard"
import { ProfilePostList } from "./ProfilePostList"
import { ProfileWallList } from "./ProfileWallList"

const ProfilePage = () => {
  const { profile } = useProfile()

  if (!profile) return

  return (
    <main className="flex items-start gap-4 rounded-lg p-3">
      <div className="flex flex-col gap-2 rounded-lg bg-foreground/[0.02] p-3">
        <Image alt="image" src={profile.image} className="rounded-lg" width={180} height={180} />
        <UpdateProfileImage profile={profile} />
      </div>
      <div className="flex w-full flex-col gap-4">
        <ProfileInfoCard profile={profile} />
        <div className="flex flex-col gap-3 rounded-lg bg-foreground/[0.02] p-3">
          <AddNews />
          <CreatePoll />
        </div>
        <div className=" rounded-lg bg-foreground/[0.02] px-3">
          <Tabs defaultValue="wall" className="w-full py-2">
            <TabsList className="gap-4 bg-transparent">
              <TabsTrigger value="wall">Wall</TabsTrigger>
              <TabsTrigger value="posts">My posts</TabsTrigger>
            </TabsList>
            <TabsContent value="wall">
              <ProfileWallList profile={profile} />
            </TabsContent>
            <TabsContent value="posts">
              <ProfilePostList profile={profile} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}

export { ProfilePage }
