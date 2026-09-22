"use client";

import {
  ProjectFormData,
  projectSchema,
} from "@/modules/projects/validations/project.schema";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const USAGE_TYPE_OPTION: OptionTypeSelector[] = [
  { label: "مسکونی", value: "maskony" },
  { label: "تجاری", value: "tejart" },
  { label: "اداری", value: "edary" },
  { label: "خونه خالی", value: "home" },
];

const FormProject = () => {
  const route = useRouter();
  const method = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });
  return (
    <div>
      <Form<ProjectFormData>
        onSubmit={() => console.log("first")}
        methods={method}
      >
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
          <InputField<ProjectFormData> name={"features"} label="چشم انداز" />
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
          <SubmitButton isLoading={false} title="ایجاد پروژه" />
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
