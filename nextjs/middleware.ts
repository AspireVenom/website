import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const host = req.headers.get("host") || url.host;
  const isBlogSubdomain = host.startsWith("blog.");

  if (isBlogSubdomain) {
    // On blog subdomain, serve blog without /blog prefix
    if (url.pathname === "/") {
      url.pathname = "/blog";
      return NextResponse.rewrite(url);
    }
    if (!url.pathname.startsWith("/blog/")) {
      url.pathname = `/blog${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|favicon.ico).*)"],
};


