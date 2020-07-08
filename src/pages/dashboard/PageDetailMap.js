import ScheduleHelper from "./pages/adminSchedHelper/SchedHelper";
import AtAGlance from "./pages/adminAtGlance/AtAGlance";
import SpecificSession from "./pages/adminSpecificSession/SpecificSession";
import Roster from "./pages/adminRoster/Roster";
import CourseSettings from "./pages/adminCourseSettings/CourseSettings";
import StudentsNotHelped from "./pages/adminAtGlance/StudentsNotHelped";

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

  studentsNotHelped: {
    title: "Students Not Helped",
    description: "View the interactions where students were not helped",
    page: StudentsNotHelped,
  }
};

export default AdminPageDetailMap;
