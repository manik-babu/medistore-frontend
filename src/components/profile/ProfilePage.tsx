"use client"

import { User, Mail, Phone, Calendar, Store, Shield, Info, Edit, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { signOut } from "@/lib/auth-client"
import { useAppDispatch } from "@/redux/hooks"
import { setUser } from "@/redux/slice/userSlice"
import { setCartValue } from "@/redux/slice/cartSlice"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Spinner } from "../ui/spinner"
import RoleSwitchCard from "../ui/RoleSwitchCard"
import { UserRole } from "@/constants/userRole"
import Link from "next/link"
import { Toaster } from "../ui/sonner"

type UserProfile = {
  id: string
  name: string
  email: string
  role: string
  age?: number
  contact?: string
  bio?: string
  isBanned: boolean
  createdAt: string
  storeName?: string
  image?: string;
  _count: {
    carts: number;
  }
}

interface ProfilePageProps {
  user: UserProfile;
  className?: string;
  data: any;
}

export function ProfilePage({ user, className = "", data }: ProfilePageProps) {
  const [logginOut, setlogginOut] = useState(false)
  const dispatch = useAppDispatch();
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }
  function canSwitchRole(createdAt: string) {
    const created = new Date(createdAt).getTime()
    const now = Date.now()
    const twoDays = 2 * 24 * 60 * 60 * 1000

    return (now - created) <= twoDays
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-red-500"
      case "seller":
        return "bg-blue-500"
      case "customer":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }
  const handleLogout = async () => {
    setlogginOut(true);
    try {
      await signOut();
      dispatch(setUser(null));
    } catch (error) {
      toast.error("Logout faild!");
    }
    finally {
      setlogginOut(false);
    }
  }
  useEffect(() => {
    dispatch(setCartValue(user._count.carts));
    dispatch(setUser({ id: data.id, name: data.name, role: data.role, image: data.image }));
  }, []);

  return (
    <div className={`container mx-auto px-4 py-8 max-w-4xl ${className}`}>

      {/* Header Card */}
      <CardHeader className="flex justify-end mb-4">
        {
          logginOut ? <Button disabled className="w-fit bg-red-500 hover:bg-red-600 cursor-pointer">
            Logging out <Spinner />
          </Button>
            :
            <Button onClick={handleLogout} className="w-fit bg-red-500 hover:bg-red-600 cursor-pointer">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
        }
      </CardHeader>
      <Card className="mb-6">
        <CardHeader className="pb-4">

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
              <AvatarImage src={user.image ? user.image : `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
              <AvatarFallback className="text-2xl font-bold">
                {user.name}
              </AvatarFallback>
            </Avatar>

            {/* User Info */}
            <div className="flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <CardTitle className="text-3xl">{user.name}</CardTitle>
                <Badge className={getRoleBadgeColor(user.role)}>
                  {user.role}
                </Badge>
                {user.isBanned && (
                  <Badge variant="destructive">Banned</Badge>
                )}
              </div>
              <CardDescription className="text-base">{user.email}</CardDescription>
              {user.storeName && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Store className="h-4 w-4" />
                  <span>{user.storeName}</span>
                </div>
              )}
            </div>

            {/* Edit Button */}
            <Link href={"/profile/edit"}>
              <Button className="self-start sm:self-center">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </Link>
          </div>
        </CardHeader>
      </Card>
      {
        canSwitchRole(user.createdAt) && user.role === UserRole.CUSTOMER &&
        <RoleSwitchCard />
      }

      {/* Details Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Full Name</p>
              <p className="text-base">{user.name}</p>
            </div>

            {user.age && (
              <>
                <Separator />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Age</p>
                  <p className="text-base">{user.age} years old</p>
                </div>
              </>
            )}

            <Separator />
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Role</p>
              <p className="text-base capitalize">{user.role}</p>
            </div>

            <Separator />
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Account Status</p>
              <p className="text-base">
                {user.isBanned ? (
                  <span className="text-destructive font-medium">Banned</span>
                ) : (
                  <span className="text-green-600 font-medium">Active</span>
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Email Address</p>
              <p className="text-base break-all">{user.email}</p>
            </div>

            {user.contact && (
              <>
                <Separator />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                  <p className="text-base">{user.contact}</p>
                </div>
              </>
            )}

            <Separator />
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Member Since</p>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <p className="text-base">{formatDate(user.createdAt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bio Section - Full Width */}
        {user.bio && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                About
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base text-muted-foreground leading-relaxed">
                {user.bio}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Store Information - Only for Sellers */}
        {user.role.toLowerCase() === "seller" && user.storeName && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Store Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Store Name</p>
                <p className="text-lg font-semibold">{user.storeName}</p>
              </div>
              <Separator />
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Store ID</p>
                <p className="text-sm font-mono bg-muted px-3 py-2 rounded-md">{user.id}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Account Details */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Account Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">User ID</p>
                <p className="text-sm font-mono bg-muted px-3 py-2 rounded-md break-all">
                  {user.id}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Account Type</p>
                <p className="text-base capitalize">{user.role}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Toaster position="top-center" />
    </div>
  )
}
