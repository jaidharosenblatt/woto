import React from "react";
import ScheduleHelperTable from "../../../components/Tables/ScheduleHelperTable";

/*
@TommyTilton
This is really a data loading page. The PAST_INTERACTIONS_COLUMNS constant is 
array of collumns and how they should be formatted. Pass the data to
 TableComponent which will format the rest of the card.
*/
const ScheduleHelperTableSetup = (props) => {
  return (
    <div className="scheduleHelperTable">
      <ScheduleHelperTable
        data={props.tableData}
        columns={SCHEDULE_HELPER_COLUMNS}
        title={props.title}
      />
    </div>
  );
};

export default ScheduleHelperTableSetup;

//Create and assign color stage tag
const separate = (teachingAssistants) => {
  const listItems = teachingAssistants.map((ta) =>
  <li>{ta}</li>
);
  return listItems;
}


//Column setup
const SCHEDULE_HELPER_COLUMNS = [
  {
    title: "Date",
    key: "date",
    dataIndex: "date",
    fixed: 'left',
    width: 60,
  },
  {
    title: "Students",
    dataIndex: "students",
    key: "students",
    width: 90,
  },
  {
    title: "Average Wait Time (minute)",
    dataIndex: "avgWaitTime",
    key: "avgWaitTime",
    width: 90,
  },
  {
    title: "Teaching Assistants",
    dataIndex: "teachingAssistants",
    key: "teachingAssistants",
    render: (teachingAssistants) => <>{separate(teachingAssistants)}</>,
  
  }
];
