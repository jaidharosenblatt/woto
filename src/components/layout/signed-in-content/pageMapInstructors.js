import React from "react";

import Roster from "../../instructor/adminRoster/Roster";
import CourseSettings from "../../instructor/adminCourseSettings/CourseSettings";
import TAHelp from "../../ta/TAHelp";
import WotoRoom from "../../wotos/WotoRoom";

// import ScheduleHelper from "./pages/adminSchedHelper/SchedHelper";
// import AtAGlance from "./pages/adminAtGlance/AtAGlance";
// import SpecificSession from "./pages/adminSpecificSession/SpecificSession";
// import StudentsNotHelped from "./pages/adminAtGlance/StudentsNotHelped";
// import WotoRoomStats from "./pages/adminWotoRoom/WotoRoomStats";
// import Schedule from "./pages/adminSchedule/Schedule";

import {
  SolutionOutlined,
  UserOutlined,
  TeamOutlined,
  SettingOutlined,
  // BarChartOutlined,
  // CalendarOutlined,
  // ZoomInOutlined,
  // ScheduleOutlined,
} from "@ant-design/icons";
const AdminPageDetailMap = [
  // {
  //   title: "At a Glance",
  //   path: "ataglance",
  //   description:
  //     "View course statistic over a period of time or of specific teaching assistants",
  //   page: AtAGlance,
  //   icon: <BarChartOutlined />,
  // },
  {
    title: "Office Hours",
    path: "session",
    description: "",
    page: TAHelp,
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
  //   description: "View your scheduled officed hours and TA assignments.",
  //   page: Schedule,
  //   icon: <ScheduleOutlined />,
  // },
  // {
  //   title: "Schedule Helper",
  //   path: "schedulehelper",
  //   description:
  //     "Utilize key metrics broken down by day of the week and time of day to more efficiently schedule officer hours",
  //   page: ScheduleHelper,
  //   icon: <CalendarOutlined />,
  // },
  // {
  //   title: "Specific Session",
  //   path: "specificsession",
  //   description:
  //     "Select a session below to view specific statistics relevant to that date",
  //   page: SpecificSession,
  //   icon: <ZoomInOutlined />,
  // },
  {
    title: "Roster",
    path: "roster",
    description:
      "View, add, or remove teaching assistants and students in your course",
    page: Roster,
    icon: <UserOutlined />,
  },
  {
    title: "Course Settings",
    path: "coursesettings",
    description: "Configure your course policies, permissions, and defaults",
    page: CourseSettings,
    icon: <SettingOutlined />,
  },

  // {
  //   title: "Woto Room",
  //   path: "wotoRoom",
  //   description: "View Woto Room statistics for specific date range",
  //   page: WotoRoomStats,
  //   icon: <TeamOutlined />,
  // },
  // {
  //   title: "Students Not Helped",
  //   path: "nothelped",
  //   description: "View the interactions where students were not helped",
  //   page: StudentsNotHelped,
  //   icon: <UserOutlined />,
  // },
];

export default AdminPageDetailMap;
