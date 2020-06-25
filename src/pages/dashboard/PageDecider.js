import React from "react";
import ScheduleHelper from "./pages/adminSchedHelper/ScheduleHelper";
import AtAGlance from "./pages/adminAtGlance/AtAGlance";
import AtGlanceSpecificTA from "./pages/adminAtGlance/AtGlanceSpecificTA"
const PageDecider = (page) => {
  switch (page) {
    case "At a Glance":
      return <AtAGlance />;
      //return <AtGlanceSpecificTA />;
    case "Schedule Helper":
      return <ScheduleHelper />;
    case "Specific Session":
      return null;
    case "Roster":
      return null;
    case "Course Settings":
      return null;
    default:
      return <AtAGlance />;
  }
};

export default PageDecider;

//<DataPieChart data={PIE_DATA}/>
//
//PIE CHART DATA VARIABLES
const PIE_DATA = [{ name: "Linked List", value: 400 },
{ name: "Array", value: 300 },
{ name: "Queue", value: 300 },
{ name: "Stack", value: 200 }];

//import DataPieChart from "../../../../components/stat/DataPieChart"