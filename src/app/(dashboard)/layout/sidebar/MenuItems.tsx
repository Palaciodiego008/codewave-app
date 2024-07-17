import {
  IconLayoutDashboard,
  IconUser,
  IconApi,
  IconShieldCheck,
  IconCode,

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
  // {
  //   id: uniqueId(),
  //   title: "Users",
  //   icon: IconUser,
  //   href: "/users",
  // },
  {
    id: uniqueId(),
    title: "Projects",
    icon: IconCode,
    href: "/projects",
  },
  {
    id: uniqueId(),
    title: "API Analysis",
    icon: IconApi,
    href: "/api-analysis",
  },
  {
    id: uniqueId(),
    title: "Security Recommendations",
    icon: IconShieldCheck,
    href: "/security-recommendations",
  },
];

export default Menuitems;
