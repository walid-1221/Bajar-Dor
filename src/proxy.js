import { NextResponse } from "next/server";
// Only the lightweight cookie helper is imported here. The proxy runs as an
// edge function on Netlify, and the full auth server (with the MongoDB driver)
// can't be bundled there. Pages that show private data still verify the
// session on the server.
import { getSessionCookie } from "better-auth/cookies";

const protectedPaths = ["/product", "/profile", "/update-user"];
const authPaths = ["/sign-in", "/sign-up"];

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
  const isAuthPage = authPaths.some((p) => pathname.startsWith(p));

  // home, category egulo public, session check lagbe na
  if (!isProtected && !isAuthPage) return NextResponse.next();

  const session = getSessionCookie(request);

  // login nai, protected page e jete chay -> sign-in e pathao
  if (!session && isProtected) {
    const url = new URL("/sign-in", request.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // login ache, sign-in/sign-up e jete chay -> home e pathao
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp|ico)$).*)",
  ],
};