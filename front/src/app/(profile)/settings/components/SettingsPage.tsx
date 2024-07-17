"use client"

import { ConfirmationAlert } from "@/app/(profile)/settings/components/ConfirmationAlert"
import { useProfile } from "@/entities/user/hooks/useProfile"
import { AccountSettings } from "./AccountSettings"
import { DangerSettings } from "./DangerSettings"
import { GeneralSettings } from "./GeneralSettings"

const SettingsPage = () => {
  const { profile } = useProfile()
  if (!profile) return

  return (
    <main className="flex w-full flex-col items-start justify-start rounded-lg p-3">
      <div className="mx-auto flex flex-col gap-4">
        <ConfirmationAlert email={profile.email} isConfirmed={profile.isConfirmed} />
        <GeneralSettings />
        <AccountSettings profile={profile} />
        <DangerSettings />
      </div>
    </main>
  )
}

export { SettingsPage }
