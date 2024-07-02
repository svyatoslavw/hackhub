import { NextRequest, NextResponse } from "next/server"
import { EnumTokens } from "./entities/user/api/auth-token.service"

export async function middleware(request: NextRequest, response: NextResponse) {
  const { url, cookies } = request

  const accessToken = cookies.get(EnumTokens.ACCESS_TOKEN)?.value
  const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value

  try {
    const user = await fetch(`${process.env.SERVER_URL}/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((response) => response.json())
      .catch((error) => {
        throw error
      })

    const isConfirmationPage = url.includes("/settings/confirmation")
    const isAdminPage = url.includes("/admin")

    if (isConfirmationPage && refreshToken && user && user.isConfirmed) {
      return NextResponse.redirect(new URL("/", url))
    }

    if (isConfirmationPage && refreshToken && user && !user.isConfirmed) {
      return NextResponse.next()
    }

    if (isAdminPage) {
      if (user.role === "ADMIN") {
        return NextResponse.next()
      }
      return NextResponse.rewrite(new URL("/404", url))
    }
  } catch (error) {
    console.error(error)

    return NextResponse.redirect(new URL("/", request.url))
  }

  const isAuthPage = url.includes("/auth")

  if (isAuthPage && refreshToken) {
    return NextResponse.redirect(new URL("/", url))
  }

  if (isAuthPage) {
    return NextResponse.next()
  }

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/auth", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/auth/:path*",
    "/settings/confirmation",
    "/settings",
    "/admin/:path*"
  ]
}
