import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const protectedPaths = ["/product", "/profile", "/update-user"];
const authPaths = ["/sign-in", "/sign-up"];

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
  const isAuthPage = authPaths.some((p) => pathname.startsWith(p));

  // home, category egulo public, session check lagbe na
  if (!isProtected && !isAuthPage) return NextResponse.next();

  const session = await auth.api.getSession({ headers: request.headers });

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