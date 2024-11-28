import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  let user = null;

  if (token) {
    const response = await fetch("http://localhost:3000/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    user = await response.json();
  }

  const { pathname } = request.nextUrl;

  // Logique pour les utilisateurs non connectés
  if (!user) {
    if (pathname === "/userpage") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // Logique pour les utilisateurs connectés
  if (user) {
    if (["/", "/login", "/signup"].includes(pathname)) {
      return NextResponse.redirect(new URL("/userpage", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup", "/userpage"],
};
