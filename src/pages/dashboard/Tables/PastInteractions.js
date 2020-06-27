import React from "react";
import { Tag } from "antd";
import TableComponent from "../../../components/Tables/PastInteractionsTable";
import { thumbsDown, thumbsUp } from "../../../static/Images";

/*
@TommyTilton
This is really a data loading page. The PAST_INTERACTIONS_COLUMNS constant is 
array of collumns and how they should be formatted. Pass the data to
 TableComponent which will format the rest of the card.
*/
const PastInteractions = (props) => {
  return (
    <div className="past interactions main">
      <TableComponent
        data={props.tableData}
        columns={PAST_INTERACTIONS_COLUMNS}
        taFirstName={props.taFirstName}
      />
    </div>
  );
};

export default PastInteractions;

//Fetch thumbsup or thumbsdown image
const fetchImage = (rate) => {
    if (rate === "thumbsUp"){
        return thumbsUp
    }else{
        return thumbsDown
    }
};

//Create and assign color stage tag
const createTag = (stage) => {
    if (stage==="Just Started"){
        return (<Tag color='green' key={stage}>{`${stage}`}</Tag>);
    }
    
    else if (stage === "Debugging Solution"){
        return (<Tag color='blue' key={stage}>{`${stage}`}</Tag>);
    }
    else{
        return (<Tag color='volcano' key={stage}>{`${stage}`}</Tag>);
    }
}

//Column setup
const PAST_INTERACTIONS_COLUMNS = [
  {
    title: "Student",
    key: "fullName",
    render: (text, record) => <h4>{`${record.firstname} ${record.lastname}`}</h4>,
    fixed: 'left',
    width: 100,
  },
  {
    title: "HW #",
    dataIndex: "hwNumber",
    key: "hwNumber",
  },
  {
    title: "Problem #",
    dataIndex: "problemNumber",
    key: "problemNumber",
  },
  {
    title: "Stage",
    dataIndex: "stage",
    key: "stage",
  render: (stage) => <>{createTag(stage)}</>,
  width: 150
  },
  {
    title: "Time Waited (minutes)",
    dataIndex: "waitTime",
    key: "waitTime",
  },
  {
    title: "Interaction Length",
    dataIndex: "interactionLength",
    key: "interactionLength",
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Rating",
    key: "rating",
    render: (text, record) => <img src={fetchImage(record.rating)} />,
  },
];
