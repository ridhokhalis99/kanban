import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { authPaths, protectedPaths } from "./router";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const isPathProtected = protectedPaths?.some((path) => pathname === path);
  const isPathAuth = authPaths?.some((path) => pathname === path);
  const res = NextResponse.next();
  const token = await getToken({ req });
  if (isPathProtected && !token) {
    const url = new URL(`/login`, req.url);
    return NextResponse.redirect(url);
  }
  if (isPathAuth && token) {
    const url = new URL(`/`, req.url);
    return NextResponse.redirect(url);
  }
  return res;
}
