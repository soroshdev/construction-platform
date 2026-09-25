import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
}

const SelectField = <T extends FieldValues>({
  name,
  label,
  option,
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
          <Select
            onValueChange={field.onChange}
            value={field.value ?? ""}
            items={option}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {option.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
      <FieldDescription className={cn("text-right", error && "text-pink-500 ")}>
        {String(error?.message || "")}
      </FieldDescription>
    </Field>
  );
};

export default SelectField;
