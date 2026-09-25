import {
  get,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { cn } from "cn";

interface Props<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  inputClassName?: string;
  lableClassName?: string;
  clssName?: string;
}

const InputField = <T extends FieldValues>({
  name,
  label,
  type = "text",
  required = false,
  placeholder,
  inputClassName,
  lableClassName,
  clssName,
}: Props<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = get(errors, name);

  return (
    <Field className={cn("dir-rtl text-right ", clssName)} dir="rtl">
      <FieldLabel htmlFor={name} className={lableClassName}>
        {label}
      </FieldLabel>
      <Input
        {...register(name, {
          valueAsNumber: type === "number",
        })}
        required={required}
        id={name}
        type={type}
        className={inputClassName}
        placeholder={placeholder}
      />
      <FieldDescription className={cn("text-right", error && "text-pink-500 ")}>
        {String(error?.message || "")}
      </FieldDescription>
    </Field>
  );
};

export default InputField;
