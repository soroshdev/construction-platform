"use client";

import {
  CancelButton,
  Form,
  InputField,
  MultiSelectBox,
  SelectBox,
  SubmitButton,
  TextareaField,
} from "@/ui/form";
import { OptionTypeSelector } from "@/ui/form/SelectBox";

import {
  createProjectSchema,
  type CreateProjectInput as ProjectFormData,
} from "@construction/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { apiFetch } from "@/lib/api-client";

const USAGE_TYPE_OPTION: OptionTypeSelector[] = [
  { label: "مسکونی", value: "maskony" },
  { label: "تجاری", value: "tejart" },
  { label: "اداری", value: "edary" },
  { label: "خونه خالی", value: "home" },
];

const FormProject = () => {
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isCreated, setIsCreated] = useState(false);
  const method = useForm<ProjectFormData>({
    resolver: zodResolver(createProjectSchema),
  });

  const onSubmit = async (values: ProjectFormData) => {
    setIsLoading(true);
    setSubmitError(null);
    setIsCreated(false);
    console.log(values);

    try {
      await apiFetch("/projects", {
        method: "POST",
        body: JSON.stringify(values),
      });

      setIsCreated(true);
      route.push("/projects");
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "ارتباط با سرور برقرار نشد.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {submitError && (
        <p className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-700">
          {submitError}
        </p>
      )}
      {isCreated && (
        <p className="mb-4 rounded-md bg-green-100 p-3 text-sm text-green-700">
          پروژه با موفقیت ایجاد شد.
        </p>
      )}
      <Form<ProjectFormData> onSubmit={onSubmit} methods={method}>
        <div className="grid grid-cols-3 gap-3">
          <InputField<ProjectFormData> name={"projectName"} label="نام پروژه" />
          <SelectBox<ProjectFormData>
            name="usageType"
            option={USAGE_TYPE_OPTION}
            label="کاربری"
          />
          <InputField<ProjectFormData>
            name={"totalFloor"}
            type="number"
            label="تعداد طبقات"
          />
        </div>
        <div className="grid grid-cols-3 gap-3 my-3">
          <div>
            <span className="block text-sm">متراژ واحد</span>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
              <InputField<ProjectFormData> name="unitAreasFrom" type="number" />

              <span className="text-sm text-muted-foreground">تا</span>

              <InputField<ProjectFormData> name="unitAreasTo" type="number" />
            </div>
          </div>
          <InputField<ProjectFormData> name={"location"} label="موقعیت" />
          <InputField<ProjectFormData> name={"parcelId"} label="پلاک ثبتی" />
        </div>
        <div className="grid grid-cols-3 gap-3 my-3">
          <InputField<ProjectFormData>
            name="totalLandArea"
            type="number"
            label="مساحت کل زمین"
          />
          <InputField<ProjectFormData>
            name={"projectStructure"}
            label="ساختار پروژه"
          />
          <InputField<ProjectFormData> name={"landscape"} label="چشم انداز" />
        </div>
        <div className="grid grid-cols-2 gap-3 my-3">
          <TextareaField<ProjectFormData> name="description" label="توضیحات" />
          <TextareaField<ProjectFormData>
            name="projectStructureDetail"
            label="توضیحات ساختار پروژه"
          />
        </div>
        <div className="grid grid-cols-1 gap-3 my-3">
          <MultiSelectBox<ProjectFormData>
            name="features"
            option={USAGE_TYPE_OPTION}
            label="ویژگی ها"
          />
        </div>
        <div className="flex gap-3">
          <SubmitButton isLoading={isLoading} title="ایجاد پروژه" />
          <CancelButton
            title="انصراف"
            onClose={() => route.push("/projects")}
          />
        </div>
      </Form>
    </div>
  );
};

export default FormProject;
