import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "cn";
import {
  get,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
}

const TextareaField = <T extends FieldValues>({
  name,
  label,
  placeholder = "توضیح دهید ...",
  required = false,
}: Props<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = get(errors, name);

  return (
    <Field>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Textarea
        {...register(name)}
        id={name}
        required={required}
        placeholder={placeholder}
      />
      <FieldDescription className={cn("text-right", error && "text-pink-500")}>
        {String(error?.message || "")}
      </FieldDescription>
    </Field>
  );
};

export default TextareaField;
