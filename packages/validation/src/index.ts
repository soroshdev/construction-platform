import { z } from "zod";

export const createProjectSchema = z.object({
  projectName: z.string().min(3, "نام پروژه نمیتواند خالی باشد.").max(100),
  usageType: z.string().min(3),
  totalFloor: z.number().min(1),
  unitAreasFrom: z.number().min(1),
  unitAreasTo: z.number().min(1),
  location: z.string().min(3),
  parcelId: z.string().min(1),
  totalLandArea: z.number().min(1),
  projectStructure: z.string().min(1),
  projectStructureDetail: z.string().min(1),
  landscape: z.string().min(1),
  features: z.array(z.string()).min(1),
  description: z.string().min(1),
});

export type CreateProjectInput = z.input<typeof createProjectSchema>;
export type CreateProjectOutput = z.output<typeof createProjectSchema>;
