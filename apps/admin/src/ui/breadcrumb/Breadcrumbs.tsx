import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

interface Props {
  SectionOneLable: string;
  SectionOneURL: string;
  SectionTwoLable: string;
}

export function Breadcrumbs({
  SectionOneLable,
  SectionOneURL,
  SectionTwoLable,
}: Props) {
  return (
    <Breadcrumb dir="rtl">
      <BreadcrumbList className="text-base font-medium gap-3">
        <BreadcrumbItem>
          <BreadcrumbLink className="hover:text-primary text-xl">
            <Link href="/">داشبورد</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator className="[&>svg]:rotate-180 [&>svg]:size-5" />

        <BreadcrumbItem>
          <BreadcrumbLink className="hover:text-primary text-xl">
            <Link href={SectionOneURL}>{SectionOneLable}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator className="[&>svg]:rotate-180 [&>svg]:size-5" />

        <BreadcrumbItem>
          <BreadcrumbPage className="hover:text-primary text-xl">
            {SectionTwoLable}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
      <div className="my-4 border-t" />
    </Breadcrumb>
  );
}
