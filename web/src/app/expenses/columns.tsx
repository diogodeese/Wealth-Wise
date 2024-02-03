"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Expense = {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  location: string;
  receipt: string;
};

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: "Date",
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
    header: "Amount",
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
