"use client"

import { PageLoader } from "@/components/ui/Loader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User } from "@/types/admin";
import { UserDropdownMenu } from "./DropDownMenu";

export default function UserList({ users }: { users: User[] }) {

    if (!users) {
        return <PageLoader message="Loading users" />
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead ></TableHead>
                    <TableHead >Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead >Store Name</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users && users.map((user: User) => (
                    <TableRow key={user.id}>
                        <TableCell className="w-8">
                            <UserDropdownMenu user={{ id: user.id, isBanned: user.isBanned }} />
                        </TableCell>
                        <TableCell className="font-medium">
                            {user.name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.storeName}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}