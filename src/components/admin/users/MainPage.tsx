"use client"

import { getUsers } from "@/actions/admin.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldContent, FieldLabel, FieldTitle } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Toaster } from "@/components/ui/sonner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAdminUserData } from "@/redux/slice/userAdminSlice";
import { User, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PaginationUser } from "./Pagination";
import UserList from "./UserList";
import { UserRole } from "@/constants/userRole";
import { PageLoader } from "@/components/ui/Loader";


export default function UserSearchBar() {
    const dispatch = useAppDispatch();
    const usersData = useAppSelector(state => state.adminUser);

    const [searching, setSearching] = useState(false)

    // Params and query
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    const [searchText, setSearchText] = useState<string>(params.get("search") || "");
    const router = useRouter();


    const setSearchParams = (key: string, value: string) => {
        params.set(key, value);
        router.push(`?${params.toString()}`);
        handleSearch();
    }

    const handleSearch = async () => {
        setSearching(true);
        try {
            const searchData = {
                searchText: params.get("search") || "",
                banned: params.get("banned") || "false",
                role: params.get("role") || "All",
                page: params.get("page") || "1"
            }
            const { data, error } = await getUsers(searchData);
            if (!data) {
                toast.error(error);
                return;
            }
            if (!data.ok) {
                toast.error(data.message);
            }
            else {
                dispatch(setAdminUserData(data.data));
                console.log(data.data)
            }
        } catch (error: any) {
            toast.error(error.message)
        }
        finally {
            setSearching(false);
        }

    }
    useEffect(() => {
        if (usersData.data.length === 0) {
            handleSearch();
        }
    }, []);

    return (
        <div className="p-4">
            <Card className="relative w-full gap-4">
                <CardHeader>
                    <CardTitle>
                        Search for user
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex gap-4 flex-col">
                    <div className="flex items-center gap-2 relative">
                        <Input
                            type="text"
                            placeholder="Search by name, email, store name"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="pr-10 h-11"
                        />
                        {searchText && (
                            <button
                                onClick={() => { setSearchParams("search", ""); setSearchText("") }}
                                className="absolute right-24 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                        <Button className="h-11" onClick={() => setSearchParams("search", searchText)}>Search</Button>
                    </div>
                    <div>
                        <RadioGroup defaultValue="All" onValueChange={(value) => setSearchParams('role', value)} className="flex flex-wrap">
                            {
                                ["All", UserRole.SELLER, UserRole.CUSTOMER].map((role) => (
                                    <FieldLabel key={role} htmlFor={role} className="w-fit! h-11 cursor-pointer flex justify-center items-center">
                                        <Field>
                                            <FieldContent>
                                                <FieldTitle>
                                                    {role}
                                                </FieldTitle>
                                            </FieldContent>
                                            <RadioGroupItem hidden value={role} id={role} />
                                        </Field>
                                    </FieldLabel>
                                ))
                            }
                        </RadioGroup>
                    </div>
                    <FieldLabel className="w-36! h-11! flex justify-center">
                        <Field orientation="horizontal" className="py-0! px-4 flex! justify-center items-center cursor-pointer">
                            <Checkbox checked={params.get("banned") ? params.get("banned") === "true" : false} onCheckedChange={(value) => setSearchParams("banned", value ? "true" : "false")} id="toggle-checkbox" name="oldest-first" />
                            <FieldContent>
                                <FieldTitle>Banned</FieldTitle>
                            </FieldContent>
                        </Field>
                    </FieldLabel>
                </CardContent>
            </Card>
            <Card className="mt-6">
                <CardContent>
                    <h1 className="font-bold text-2xl">Total Users ({usersData.data.length})</h1>
                    {
                        searching ? <PageLoader message="Searching users" />
                            :
                            usersData.data.length === 0 ?
                                <div className="text-muted-foreground mt-11 flex justify-center flex-col items-center">
                                    <User className="w-16 h-16" />
                                    <h1 >No search result</h1>
                                </div>
                                :
                                <div>
                                    <PaginationUser setSearchParams={setSearchParams} metaData={usersData.meta} className="my-4" />
                                    <UserList users={usersData.data} />
                                </div>
                    }

                </CardContent>

            </Card>
            <Toaster position="top-center" />
        </div>
    );
}