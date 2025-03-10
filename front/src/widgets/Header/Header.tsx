import { Button } from "@/shared/ui/button"

import { useProfile } from "@/entities/user/hooks/useProfile"
import { Skeleton } from "@/shared/ui/skeleton"
import Image from "next/image"
import Link from "next/link"
import { HeaderProfileDropdown } from "./HeaderProfileDropdown"

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/forum", label: "Forum" },
  { href: "/conversations", label: "Messages" }
]

const Header = () => {
  const { profile, isLoading } = useProfile()

  return (
    <header className="mx-auto flex h-12 w-full bg-foreground/[0.02]">
      <div className="mx-auto flex h-12 w-[1100px] items-center justify-between ">
        <div className="flex items-center gap-5">
          <Link href="/">
            <Image
              alt="Logo"
              src={"/logotype.png"}
              width={36}
              height={36}
              className="invert-0 dark:invert"
            />
          </Link>
          <div className="flex gap-3">
            {LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs font-medium">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex h-full items-center gap-5">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-16 rounded" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          ) : (
            !profile && (
              <div className="flex gap-3">
                <Button size={"sm"}>
                  <Link href={"/auth"}>Войти</Link>
                </Button>
                <Button size={"sm"} variant={"ghost"}>
                  <Link href={"/auth"}>Создать аккаунт</Link>
                </Button>
              </div>
            )
          )}
          {profile && <HeaderProfileDropdown profile={profile} />}
        </div>
      </div>
    </header>
  )
}

export { Header }
