"use client";

import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { DataTableColumnHeader } from "./column-header";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Expense = {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: string;
  currency: string;
  paymentMethod: string;
  location: string;
  receipt: string;
};

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <DataTableColumnHeader title={"ID"} column={column} />;
    },
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return <DataTableColumnHeader title={"Date"} column={column} />;
    },
    enableHiding: false,
  },
  {
    accessorKey: "category",
    header: "Category",
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: "Description",
    enableHiding: true,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return <DataTableColumnHeader title={"Amount"} column={column} />;
    },
    enableHiding: false,
  },
  {
    accessorKey: "currency",
    header: "Currency",
    enableHiding: false,
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    enableHiding: true,
  },
  {
    accessorKey: "location",
    header: "Location",
    enableHiding: true,
  },
  {
    accessorKey: "receipt",
    header: "Receipt",
    enableHiding: true,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

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
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
