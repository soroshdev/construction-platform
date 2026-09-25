import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "cn";

interface Props {
  title: string;
  isLoading: boolean;
  className?: string;
}

const SubmitButton = ({ title, isLoading, className }: Props) => {
  return (
    <Button disabled={isLoading} type="submit" className={cn(className)}>
      {isLoading ? <Spinner data-icon="inline-start" /> : title}
    </Button>
  );
};

export default SubmitButton;
