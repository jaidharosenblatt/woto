import React from "react";
import ScheduleHelper from "./pages/adminSchedHelper/SchedHelper";
import AtAGlance from "./pages/adminAtGlance/AtAGlance";
import SpecificSession from "./pages/adminSpecificSession/SpecificSession";
import Roster from "./pages/adminRoster/Roster";
import CourseSettings from "./pages/adminCourseSettings/CourseSettings";
import StudentsNotHelped from "./pages/adminAtGlance/StudentsNotHelped";
import {
  BarChartOutlined,
  CalendarOutlined,
  ZoomInOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
const AdminPageDetailMap = [
  {
    title: "At a Glance",
    path: "ataglance",
    description:
      "View course statistic over a period of time or of specific teaching assistants",
    page: AtAGlance,
    icon: <BarChartOutlined />,
  },
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
    title: "Students Not Helped",
    path: "nothelped",
    description: "View the interactions where students were not helped",
    page: StudentsNotHelped,
    icon: <UserOutlined />,
  },
];

export default AdminPageDetailMap;
