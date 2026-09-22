import {
  LayoutDashboard,
  Folder,
  //   User,
  //   Briefcase,
  //   GraduationCap,
  //   Code,
} from "lucide-react";

export const sidebaerMenu = [
  {
    key: "dashboard",
    label: "داشبورد",
    icon: LayoutDashboard,
    url: "/",
  },
  {
    key: "prohects",
    label: "پروژه",
    icon: Folder,
    children: [
      {
        label: "ایجاد پروژه",
        url: "createproject",
      },
      {
        label: "لیست پروژه ها",
        url: "/projects",
      },
    ],
  },
  //   {
  //     key: "profile",
  //     label: "پروفایل",
  //     icon: User,
  //     children: [
  //       {
  //         label: "مشاهده پروفایل",
  //         url: "profile",
  //       },
  //     ],
  //   },
  //   {
  //     key: "experince",
  //     label: "تجربه کاری",
  //     icon: Briefcase,
  //     children: [
  //       {
  //         label: "ایجاد تجربه کاری",
  //         url: "createexperience",
  //       },
  //       {
  //         label: "مشاهده تجربه کاری",
  //         url: "experiences",
  //       },
  //     ],
  //   },
  //   {
  //     key: "education",
  //     label: "تحصیلات ",
  //     icon: GraduationCap,
  //     children: [
  //       {
  //         label: "ایجاد تحصیل",
  //         url: "createeducation",
  //       },
  //       {
  //         label: "مشاهده تحصیلات ",
  //         url: "educations",
  //       },
  //     ],
  //   },
  //   {
  //     key: "skills",
  //     label: "مهارت ها",
  //     icon: Code,
  //     children: [
  //       {
  //         label: "ایجاد مهارت",
  //         url: "createskill",
  //       },
  //       {
  //         label: "مشاهده مهارت ها",
  //         url: "skills",
  //       },
  //     ],
  //   },
];
