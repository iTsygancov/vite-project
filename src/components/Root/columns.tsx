import ItemDropdown from "../ItemDropdown/ItemDropdown";
import { Button } from "@/components/ui/button";
import { Item } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "phone",
    header: "Phone"
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "country",
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Country
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    }
  },
  {
    accessorKey: "state",
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          State
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    }
  },
  {
    accessorKey: "city",
    header: "City"
  },
  {
    accessorKey: "createdDate",
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created date
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    }
  },
  {
    accessorKey: "updatedDate",
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated date
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => <ItemDropdown row={row} />
  }
];
