import { NextRequest, NextResponse } from "next/server";

const apiUrl = process.env.AUTH_API_URL ?? "http://localhost:3002";

export async function middleware(request: NextRequest) {
  const cookie = request.headers.get("cookie");

  if (!cookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const response = await fetch(`${apiUrl}/api/auth/get-session`, {
      headers: { cookie },
      cache: "no-store",
    });

    if (!response.ok || !(await response.json())) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } catch (error) {
    console.error("Failed to verify admin session", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/projects/:path*", "/profile/:path*"],
};
