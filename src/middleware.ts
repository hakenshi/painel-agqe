import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    if (request.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/home", request.url))
    }


    return NextResponse.next()
}

export const config: MiddlewareConfig = {
    matcher: ["/"]
}