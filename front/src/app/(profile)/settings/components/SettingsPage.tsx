"use client"

import { ConfirmationAlert } from "@/app/(profile)/settings/components/ConfirmationAlert"
import { SettingsItem } from "@/app/(profile)/settings/components/SettingsItem"
import { useProfile } from "@/entities/user/hooks/useProfile"

const SettingsPage = () => {
  const { profile } = useProfile()
  if (!profile) return

  return (
    <main className="flex flex-col items-center justify-between py-24">
      <div className="mb-32 grid gap-4 text-center lg:mb-0 lg:w-full lg:max-w-7xl lg:grid-cols-3 lg:text-left">
        <ConfirmationAlert email={profile.email} isConfirmed={profile.isConfirmed} />
        <SettingsItem name="email" value={profile.email} />
        <SettingsItem name="login" value={profile.login} />
        <SettingsItem name="phone" value={profile.phone} />
      </div>
    </main>
  )
}

export { SettingsPage }
