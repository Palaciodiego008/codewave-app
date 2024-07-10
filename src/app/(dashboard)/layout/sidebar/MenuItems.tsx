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
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Users",
    icon: IconUser,
    href: "/users",
  },
  {
    id: uniqueId(),
    title: "Projects",
    icon: IconBook,
    href: "/projects",
  },
];

export default Menuitems;
