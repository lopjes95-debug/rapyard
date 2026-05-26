import { NextResponse } from "next/server";

export function middleware(req) {
  const host = req.headers.get("host") || "";

  if (host.startsWith("docs.")) {
    return NextResponse.rewrite(new URL(/docs, req.url));
  }

  if (host.endsWith(".rapyard.club")) {
    const tenant = host.replace(".rapyard.club", "");
    return NextResponse.rewrite(new URL(/tenant/, req.url));
  }

  return NextResponse.next();
}
