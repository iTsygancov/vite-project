import { deleteItem } from "@/api/items";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Item } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Row } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

type ItemDropdownProps = {
  row: Row<Item>;
};

const ItemDropdown = ({ row }: ItemDropdownProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: deleteItemMutation } = useMutation({
    mutationKey: ["items"],
    mutationFn: deleteItem,
    onSuccess: async () => {
      setIsDialogOpen(false);
      await queryClient.invalidateQueries({
        queryKey: ["items"]
      });
    }
  });

  return (
    <div className='flex items-center'>
      <span> {row.original.updatedDate} </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='ml-4 h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreVertical className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem asChild>
            <Link to={`/item/${row.original.id}`}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className='text-red-500'
            onClick={() => setIsDialogOpen(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Item</DialogTitle>
          </DialogHeader>
          Are you sure you want to delete this item?
          <DialogFooter>
            <Button variant='secondary' onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
            <Button
              variant='destructive'
              onClick={() => {
                deleteItemMutation(row.original?.id as string);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ItemDropdown;
