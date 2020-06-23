import React from "react";
import ScheduleHelper from "./pages/ScheduleHelper";
import AtAGlance from "./pages/ataglance/AtAGlance";

const PageDecider = (page) => {
  switch (page) {
    case "At a Glance":
      return <AtAGlance />;
    case "Schedule Helper":
      return <ScheduleHelper />;
    case "Specific Session":
      return null;
    case "Roster":
      return null;
    case "Course Settings":
      return null;
    case "default":
      return <AtAGlance />;
  }
};

export default PageDecider;
