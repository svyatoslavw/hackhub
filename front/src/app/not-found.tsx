import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container flex w-full flex-col items-center justify-center gap-2">
      <h1 className="text-8xl font-semibold">404!</h1>
      <div className={"text-center"}>
        <p className="text-xl">This page does not exist</p>
        <Link href="/" className="my-4 text-xs no-underline underline-offset-2 hover:underline">
          Go back to the home page
        </Link>
      </div>
    </div>
  )
}
