import React from "react";
import CIcon from "@coreui/icons-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartArea,
  faPencil,
  faMessage,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <FontAwesomeIcon className="c-sidebar-nav-icon" icon={faChartArea} />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Blogs",
    to: "/blogs",
    icon: <FontAwesomeIcon className="c-sidebar-nav-icon" icon={faPencil} />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Comments",
    to: "/comments",
    icon: <FontAwesomeIcon className="c-sidebar-nav-icon" icon={faMessage} />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Categories",
    to: "/categories",
    icon: (
      <FontAwesomeIcon
        className="c-sidebar-nav-icon"
        icon={faMagnifyingGlass}
      />
    ),
  },
];

export default _nav;
