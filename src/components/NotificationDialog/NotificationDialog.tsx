import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useActiveItemContext } from "@/lib/context/ActiveItemContext";
import { useNavigate } from "react-router-dom";

type NotificationDialogProps = {
  isOpen: boolean;
  title: string;
  description: string;
  onClose: () => void;
  id: string | undefined;
};

export const NotificationDialog = ({
  id,
  isOpen,
  title,
  description,
  onClose
}: NotificationDialogProps) => {
  const navigate = useNavigate();
  const { setActiveItemId } = useActiveItemContext();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setActiveItemId(id || "");
        navigate("/");
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {description}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='secondary' onClick={onClose}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default NotificationDialog;
