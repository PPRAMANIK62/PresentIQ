import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type Props = {
  children: React.ReactNode;
  className?: string;
  description: string;
  loading?: boolean;
  onClick?: () => void;
  open: boolean;
  handleOpen: () => void;
};

const AlertDialogBox = ({
  children,
  description,
  handleOpen,
  open,
  className,
  loading,
  onClick,
}: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={handleOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Calcel</AlertDialogCancel>
          <Button
            variant={"destructive"}
            className={cn(className)}
            onClick={onClick}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Loading...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogBox;
