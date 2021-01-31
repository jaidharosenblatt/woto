import React from "react";

import Roster from "../../instructor/roster/RosterChooser";
import CourseSettings from "../../instructor/adminCourseSettings/CourseSettings";
import TAHelp from "../../ta/TAHelp";
import WotoRoom from "../../wotos/WotoRoom";

import ScheduleHelper from "../../instructor/adminSchedHelper/SchedHelper";
import AtAGlance from "../../instructor/adminAtGlance/AtAGlance";
import SpecificSession from "../../instructor/adminSpecificSession/SpecificSession";
// import StudentsNotHelped from "../../instructor/adminAtGlance/StudentsNotHelped";
// import WotoRoomStats from "../../instructor/adminWotoRoom/WotoRoomStats";

import {
  SolutionOutlined,
  UserOutlined,
  TeamOutlined,
  SettingOutlined,
  FormOutlined,
  BarChartOutlined,
  CalendarOutlined,
  ZoomInOutlined,
  // ScheduleOutlined,
} from "@ant-design/icons";
import CustomizeQuestion from "../../instructor/adminCourseSettings/form/CustomizeQuestion";
const AdminPageDetailMap = [
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
  {
    title: "Question Form",
    path: "questionform",
    description:
      "Enter in the fields you want students to fill out when joining office hours and preview what the form will look like",
    page: CustomizeQuestion,
    icon: <FormOutlined />,
  },
  {
    title: "At a Glance",
    path: "ataglance",
    description:
      "View course statistic over a period of time or of specific teaching assistants",
    page: AtAGlance,
    icon: <BarChartOutlined />,
  },
  // {
  //   title: "Schedule",
  //   path: "schedule",
  //   description: "View your scheduled officed hours and TA assignments.",
  //   page: Schedule,
  //   icon: <ScheduleOutlined />,
  // },
  {
    title: "Schedule Helper",
    path: "schedulehelper",
    description:
      "Utilize key metrics broken down by day of the week and time of day to more efficiently schedule officer hours",
    page: ScheduleHelper,
    icon: <CalendarOutlined />,
  },
  {
    title: "Specific Session",
    path: "specificsession",
    description:
      "Select a session below to view specific statistics relevant to that date",
    page: SpecificSession,
    icon: <ZoomInOutlined />,
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
