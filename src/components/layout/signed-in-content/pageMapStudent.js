import React from "react";

import HelpChooser from "./HelpChooser";
import WotoRoom from "../../wotos/WotoRoom";
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
    page: WotoRoom,
    icon: <TeamOutlined />,
  },
];

export default map;
