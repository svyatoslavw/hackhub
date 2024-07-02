import { FullPageProvider } from "@/shared/ui/providers"

export default function CreateForumLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <FullPageProvider>{children}</FullPageProvider>
}
