import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

const ALLOWED_REDIRECTS = ["/login", "/home"];

function isValidRedirect(url: string, baseUrl: string): boolean {
    try {
        const parsed = new URL(url);
        const base = new URL(baseUrl);
        // Only allow same-origin URLs
        if (parsed.origin !== base.origin) {
            return false;
        }
        return ALLOWED_REDIRECTS.includes(parsed.pathname);
    } catch {
        return false;
    }
}

export function middleware(request: NextRequest) {
    const token = request.cookies.get("auth-token")

    if (!token) {
        const loginUrl = new URL("/login", request.url);
        if (isValidRedirect(loginUrl.toString(), request.url)) {
            return NextResponse.redirect(loginUrl);
        }
    }

    if (request.nextUrl.pathname === "/" && token) {
        return NextResponse.redirect(new URL("/home", request.url));
    }
    return NextResponse.next()
}

export const config: MiddlewareConfig = {
    matcher: ["/"]
}