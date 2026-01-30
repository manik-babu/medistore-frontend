"use client"

import { authClient } from "@/lib/auth-client";
import NavAuth from "./nav-auth";
import NavProfile from "./nav-profile";

export default function NavAuthProfile() {
    const { data, error } = authClient.useSession();

    if (data) {
        return <NavProfile session={data} />
    }
    else
        return <NavAuth />
}