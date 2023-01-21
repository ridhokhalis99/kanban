import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const protectedPaths = ["/"];
  const authPaths = ["/login", "/register"];
  const isPathProtected = protectedPaths?.some((path) => pathname === path);
  const isPathAuth = authPaths?.some((path) => pathname === path);
  const res = NextResponse.next();
  if (isPathProtected) {
    const token = await getToken({ req });
    if (!token) {
      const url = new URL(`/login`, req.url);
      return NextResponse.redirect(url);
    }
  }
  if (isPathAuth) {
    const token = await getToken({ req });
    if (token) {
      const url = new URL(`/`, req.url);
      return NextResponse.redirect(url);
    }
  }
  return res;
}
