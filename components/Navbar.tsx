"use client";

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Box, Home, Package2, PanelLeft, Search, User } from "lucide-react";
import Link from "next/link";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import axiosInstance from "@/helper/axiosInstance";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { logout } from "@/redux/slices/authSlice";
import { useFetchData } from "@/hooks/useFetchData";
import retreiveUserDataFromCookie from "@/helper/retreiveUserDataFromCookie";
import toast from "react-hot-toast";

const Navbar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const isActive = (href: string) => pathname === href;
  const dataFromUserToken = retreiveUserDataFromCookie();

  const { data: yourData } = useFetchData({
    queryKey: ["yourData"],
    dataProtected: `users/${dataFromUserToken?.sub}`,
  });

  const handleLogout = async (e: any) => {
    e.preventDefault();
    const logout = await axiosInstance.delete("/auth/logout");

    if (logout?.data.statusCode === 200) {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("userData");
      toast.success("Successfully logged out!");
      router.push("/");
    } else {
      toast.error("Error during the process!");
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Auction</span>
            </Link>
            <Link
              href="/dashboard"
              className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground ${
                isActive("/dashboard") ? "text-normal" : null
              }`}
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/users"
              className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground ${
                isActive("/dashboard/users") ? "text-normal" : null
              }`}
            >
              <User className="h-5 w-5" />
              Users
            </Link>
            <Link
              href="/dashboard/items"
              className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground ${
                isActive("/dashboard/items") ? "text-normal" : null
              }`}
            >
              <Box className="h-5 w-5" />
              items
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div>
        <h1 className="font-bold text-xl uppercase">Auction</h1>
      </div>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Avatar>
              <AvatarImage src={yourData?.data.image} />
              <AvatarFallback>AUC</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            {yourData !== null ? yourData?.data.name : "My account"}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={"/dashboard/user-settings"}>Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Button
              onClick={handleLogout}
              className="w-full"
              variant={"secondary"}
            >
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Navbar;
