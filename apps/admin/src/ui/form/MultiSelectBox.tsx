import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { MultiSelect } from "@/ui/multiSelect/MultiSelect";
import { cn } from "cn";
import {
  Controller,
  get,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";

export interface OptionTypeSelector {
  value: string;
  label: string;
}

interface Props<T extends FieldValues> {
  name: Path<T>;
  label: string;
  option: OptionTypeSelector[];
  placeholder?: string;
}

const MultiSelectBox = <T extends FieldValues>({
  name,
  label,
  option,
  placeholder,
}: Props<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const error = get(errors, name);

  return (
    <Field>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <MultiSelect
            options={option}
            selected={Array.isArray(field.value) ? field.value : []}
            onChange={field.onChange}
            placeholder={placeholder}
          />
        )}
      />
      <FieldDescription className={cn("text-right", error && "text-pink-500 ")}>
        {String(error?.message || "")}
      </FieldDescription>
    </Field>
  );
};

export default MultiSelectBox;
