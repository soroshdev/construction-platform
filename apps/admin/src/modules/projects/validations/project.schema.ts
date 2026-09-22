import { z } from "zod";

const projectSchema = z.object({
  projectName: z.string().min(3, "نام پروژه نمیتواند خالی باشد.").max(100),
  usageType: z.string().min(3, ""),
  totalFloor: z.number().min(1, ""),
  unitAreasFrom: z.number().min(1, ""),
  unitAreasTo: z.number().min(1, ""),
  location: z.string().min(3, ""),
  parcelId: z.number().min(1),
  totalLandArea: z.number().min(1),
  projectStructure: z.string().min(1),
  projectStructureDetail: z.string().min(1),
  Landscape: z.string().min(1),
  features: z.string().min(1),
  description: z.string().min(1),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export { projectSchema };
export type { ProjectFormData };
