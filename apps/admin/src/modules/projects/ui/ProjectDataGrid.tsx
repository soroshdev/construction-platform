"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Project } from "@construction/types";
import { Pencil, Power, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api-client";
import { DataGrid } from "@/ui/DataGrid/DataGrid";
import { Badge } from "@/components/ui/badge";

type ProjectsResponse = {
  data: Project[];
};

const ProjectDataGrid = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const projectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: () => apiFetch<ProjectsResponse>("/projects"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiFetch(`/projects/${id}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });

  const activeMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      apiFetch(`/projects/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ isActive }),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });

  if (projectsQuery.isLoading) {
    return <p className="text-muted-foreground">در حال دریافت پروژه‌ها...</p>;
  }

  if (projectsQuery.isError) {
    return (
      <p className="text-destructive">
        {projectsQuery.error instanceof Error
          ? projectsQuery.error.message
          : "دریافت پروژه‌ها انجام نشد."}
      </p>
    );
  }

  const projects = projectsQuery.data?.data ?? [];

  return (
    <DataGrid<Project>
      data={projects}
      columns={[
        { key: "projectName", label: "نام پروژه" },
        { key: "usageType", label: "کاربری" },
        { key: "totalFloor", label: "تعداد طبقات" },
        { key: "location", label: "موقعیت" },
        {
          key: "isActive",
          label: "وضعیت",
          render: (value) => (
            <Badge
              className={
                value
                  ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                  : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
              }
            >
              {value ? "فعال" : "غیرفعال"}
            </Badge>
          ),
        },
        {
          key: "__actions",
          label: "عملیات",
          render: (_value, project) => (
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                title="ویرایش"
                aria-label={`ویرایش ${project.projectName}`}
                onClick={() => router.push(`/projects/${project.id}/edit`)}
              >
                <Pencil />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                title={project.isActive ? "غیرفعال کردن" : "فعال کردن"}
                aria-label={project.isActive ? "غیرفعال کردن" : "فعال کردن"}
                onClick={() =>
                  activeMutation.mutate({
                    id: project.id,
                    isActive: !project.isActive,
                  })
                }
                disabled={activeMutation.isPending}
              >
                <Power />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                title="حذف"
                aria-label={`حذف ${project.projectName}`}
                className="text-destructive hover:text-destructive"
                onClick={() => {
                  if (window.confirm("آیا از حذف این پروژه مطمئن هستید؟")) {
                    deleteMutation.mutate(project.id);
                  }
                }}
                disabled={deleteMutation.isPending}
              >
                <Trash2 />
              </Button>
            </div>
          ),
        },
      ]}
    />
  );
};

export default ProjectDataGrid;
