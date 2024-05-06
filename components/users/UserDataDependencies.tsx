"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { ChevronsUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { badgeVariants } from "../ui/badge";

export type User = {
  id: string;
  role: "ADMINISTRATOR" | "BUYER" | "SELLER";
  email: string;
  name: string;
  isActive: boolean;
};

export const usercColumns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("role")}</div>,
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          isActive
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">
        {row.getValue("isActive") === true ? (
          <h1 className={`${badgeVariants({ variant: "blue" })} lowercase`}>
            Active
          </h1>
        ) : (
          <h1
            className={`${badgeVariants({ variant: "destructive" })} lowercase`}
          >
            Not active
          </h1>
        )}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.name)}
            >
              Copy user name
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/dashboard/users/${user.id}`}>View user</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
