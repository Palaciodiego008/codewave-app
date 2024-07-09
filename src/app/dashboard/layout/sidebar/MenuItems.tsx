import {
  IconLayoutDashboard,
  IconUser,
  IconBook
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/dashboard",
  },
  {
    id: uniqueId(),
    title: "Users",
    icon: IconUser,
    href: "/dashboard/users",
  },
  {
    id: uniqueId(),
    title: "Projects",
    icon: IconBook,
    href: "/dashboard/projects",
  },
];

export default Menuitems;
