import { Button } from "@/components/ui/button";
import { cn } from "cn";

interface Props {
  title: string;
  onClose: () => void;
  className?: string;
}

const CancelButton = ({ title, onClose, className }: Props) => {
  return (
    <Button
      type="reset"
      onClick={onClose}
      className={cn(
        " bg-pink-600 hover:bg-pink-700  transition-colors",
        className,
      )}
    >
      {title}
    </Button>
  );
};

export default CancelButton;
