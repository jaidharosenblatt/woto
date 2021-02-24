import React from "react";

import HelpChooser from "./HelpChooser";
import WotoRoom from "../../wotos/WotoRoom";
import {
  SolutionOutlined,
  TeamOutlined,
  // CalendarOutlined,
} from "@ant-design/icons";
// import Calendar from "../../course/calendar/Schedule";

const map = [
  {
    title: "Office Hours",
    path: "session",
    description: "",
    page: HelpChooser,
    icon: <SolutionOutlined />,
  },

  {
    title: "Woto Rooms",
    path: "woto",
    description: "",
    page: WotoRoom,
    icon: <TeamOutlined />,
  },

  // {
  //   title: "Schedule",
  //   path: "schedule",
  //   description: "",
  //   page: Calendar,
  //   icon: <CalendarOutlined />,
  // },
];

export default map;
