"use client"

import { authClient } from "@/lib/auth-client";
import NavAuth from "./nav-auth";
import NavProfile from "./nav-profile";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/slice/userSlice";
import { useEffect } from "react";
import { getSession } from "@/actions/user.action";

export default function NavAuthProfile() {
    const dispatch = useAppDispatch()
    const session = useAppSelector((state) => state.user);

    const getSessionData = async () => {
        const { data, error } = await getSession();
        if (data) {
            dispatch(setUser({ id: data.id, name: data.name, role: data.role, image: data.image }));
        }
    }
    useEffect(() => {
        getSessionData();
    }, []);
    if (session) {
        return <NavProfile session={session} />
    }
    else
        return <NavAuth />
}