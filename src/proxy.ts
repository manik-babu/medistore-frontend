import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { UserRole } from "./constants/userRole";


export const proxy = async (request: NextRequest) => {
    const path = request.nextUrl.pathname;
    const { data } = await userService.getSession();

    if (!data && (path.startsWith("/admin") || path.startsWith("/customer") || path.startsWith("/seller"))) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    if (data && (path.startsWith("/login") || path.startsWith("/signup"))) {
        return NextResponse.redirect(new URL("/profile", request.url));
    }
    if (data && data.role !== UserRole.ADMIN && path.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/error/permission", request.url));
    }
    if (data && data.role !== UserRole.SELLER && path.startsWith("/seller")) {
        return NextResponse.redirect(new URL("/error/permission", request.url));
    }
    if (data && data.role !== UserRole.CUSTOMER && path.startsWith("/customer")) {
        return NextResponse.redirect(new URL("/error/permission", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/login", '/signup', '/admin/:path*', '/customer/:path*', '/seller/:path*']
}