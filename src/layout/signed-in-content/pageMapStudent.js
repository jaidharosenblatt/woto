import React from "react";

import HelpChooser from "./HelpChooser";
import { SolutionOutlined, TeamOutlined } from "@ant-design/icons";

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
    page: null,
    icon: <TeamOutlined />,
  },
];

export default map;
