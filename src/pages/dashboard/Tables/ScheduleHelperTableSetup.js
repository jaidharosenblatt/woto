import React from "react";
import ScheduleHelperTable from "../../../components/Tables/ScheduleHelperTable";

/*
@TommyTilton
This is really a data loading page. The PAST_INTERACTIONS_COLUMNS constant is 
array of collumns and how they should be formatted. Pass the data to
 TableComponent which will format the rest of the card.
*/
const ScheduleHelperTableSetup = (props) => {
  const styles = {
    card: {

      height: "100%"
    },
  }

  return (
    <div className="scheduleHelperTable" style={styles.card}>
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
  <li key={ta}>{ta}</li>
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
    width: 100,
  },
  {
    title: "Students",
    dataIndex: "students",
    key: "students",
   // width: 100,
  },
  {
    title: "Average Wait Time (minute)",
    dataIndex: "avgWaitTime",
    key: "avgWaitTime",
    //width: 200,
  },
  {
    title: "Teaching Assistants",
    dataIndex: "teachingAssistants",
    key: "teachingAssistants",
    render: (teachingAssistants) => <>{separate(teachingAssistants)}</>,
  
  }
];
