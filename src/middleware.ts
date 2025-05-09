import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")

    if (request.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/home", request.url))
    }

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    return NextResponse.next()
}

export const config: MiddlewareConfig = {
    matcher: ["/", "/((?!_next|api|static|favicon.ico).*)"]
}