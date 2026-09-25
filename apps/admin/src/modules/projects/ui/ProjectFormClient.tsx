import FormProject from "@/modules/projects/ui/FormProject";
import { Breadcrumbs } from "@/ui/breadcrumb/Breadcrumbs";

const ProjectFormClient = () => {
  return (
    <div>
      <Breadcrumbs
        SectionOneLable={"پروژه"}
        SectionOneURL="/projects"
        SectionTwoLable="ایجاد پروژه"
      />
      <div className=" mt-6 rounded-md">
        <h1 className="text-2xl">ایجاد پروژه</h1>
        <div className="mt-6 px-3 p-5 rounded-2xl bg-(--color-card)">
          <FormProject />
        </div>
      </div>
    </div>
  );
};

export default ProjectFormClient;
