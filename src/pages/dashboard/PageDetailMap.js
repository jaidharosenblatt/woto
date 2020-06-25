import ScheduleHelper from "./pages/ScheduleHelper";
import AtAGlance from "./pages/ataglance/AtAGlance";
import SpecificSession from "./pages/SpecificSession";
import Roster from "./pages/Roster";
import CourseSettings from "./pages/CourseSettings";

const AdminPageDetailMap = {
  ataglance: {
    title: "At a Glance",
    description:
      "View course statistic over a period of time or of specific teaching assistants",
    page: AtAGlance,
  },
  schedulehelper: {
    title: "Schedule Helper",
    description:
      "Utilize key metrics broken down by day of the week and time of day to more efficiently schedule officer hours",
    page: ScheduleHelper,
  },
  specificsession: {
    title: "Specific Session",
    description:
      "Select a session below to view specific statistics relevant to that date",
    page: SpecificSession,
  },
  roster: {
    title: "Roster",
    description:
      "View, add, or remove teaching assistants and students in your course",
    page: Roster,
  },
  coursesettings: {
    title: "Course Settings",
    description: "Configure your course policies, permissions, and defaults",
    page: CourseSettings,
  },
};

export default AdminPageDetailMap;
