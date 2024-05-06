"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { ChevronsUpDown, MoreHorizontal } from "lucide-react";
import { Badge, badgeVariants } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { convertToRupiah } from "@/helper/convertToRupiah";
import { formatDate } from "@/helper/formatDate";
import Image from "next/image";

enum ItemStatus {
  PERMITTED = "PERMITTED",
  NOT_PERMITTED = "NOT_PERMITTED",
}

export type Item = {
  id: string;
  isActive: boolean;
  status: ItemStatus;
  name: string;
  startingBid: number | null;
  highestBid?: number | null;
  image: string | null;
  description: string;
  startBidDate: Date;
  endBidDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export const itemcColumns: ColumnDef<Item>[] = [
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
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) =>
      row.getValue("image") !== null ? (
        <Image src={row.getValue("image")} width={80} height={80} alt="item" />
      ) : (
        <Image src={"/placeholder.svg"} width={80} height={80} alt="item" />
      ),
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
          <h1 className={`${badgeVariants({ variant: "yellow" })} lowercase`}>
            Not active
          </h1>
        )}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) =>
      row.getValue("status") === "PERMITTED" ? (
        <h1 className={`${badgeVariants({ variant: "default" })} lowercase`}>
          {row.getValue("status")}
        </h1>
      ) : (
        <h1
          className={`${badgeVariants({ variant: "destructive" })} lowercase`}
        >
          {row.getValue("status")}
        </h1>
      ),
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
    accessorKey: "startingBid",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Starting Bid
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="">
        {row.getValue("startingBid") === null
          ? "-"
          : convertToRupiah(row.getValue("startingBid"))}
      </div>
    ),
  },
  {
    accessorKey: "highestBid",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Highest Bid
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="">
        {row.getValue("highestBid") === null
          ? "-"
          : convertToRupiah(row.getValue("highestBid"))}
      </div>
    ),
  },
  {
    accessorKey: "startBidDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start bid date
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <h1>{formatDate(row.getValue("startBidDate"))}</h1>,
  },
  {
    accessorKey: "endBidDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End bid date
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <h1>{formatDate(row.getValue("endBidDate"))}</h1>,
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
              Copy item name
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/dashboard/items/${user.id}`}>View item</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
