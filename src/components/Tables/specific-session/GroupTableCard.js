import React from "react";
import { Tag } from "antd";
import GroupTable from "./GroupTable";

/*
@TommyTilton
This is really a data loading page. The STUDENT_COLAB_COLUMNS constant is
array of collumns and how they should be formatted. Pass the data to
 TableComponent which will format the rest of the card.
*/
const MainColabComp = (props) => {
    const styles = {
        card: {
            width: "100%",
          backgroundColor: "#ffffff",
          padding: "0px",
         // height: "100%",
          lineHeight: 1,
         // margin: "0px",
        },
      };
    
  return (
 //   <div className="groupTable" style={styles.card}>
      <GroupTable
        data={GROUP_DATA}
        columns={GROUP_COLUMNS}
      />
    //  </div>
    
  );
};

export default MainColabComp;

//Assign color to Stage tag
const createStageTag = (stage) => {
  if (stage === "Just Started") {
    return <Tag color="green" key={stage}>{`${stage}`}</Tag>;
  } else if (stage === "Debugging Solution") {
    return <Tag color="blue" key={stage}>{`${stage}`}</Tag>;
  } else {
    return <Tag color="volcano" key={stage}>{`${stage}`}</Tag>;
  }
};

const createTag = (tags) => {
    var tagList = tags.map((tag) => <Tag key={tag}> {`${tag}`}</Tag>);
    return tagList;
}

//Collumn Setup

const GROUP_COLUMNS = [
  {
    title: "HW #",
    dataIndex: "hwNumber",
    key: "hwNumber",
    width: 40,
    align: "center"
    //responsive: ['sm'],
  },
  {
    title: "Problem #",
    dataIndex: "problemNumber",
    key: "problemNumber",
    width: 60,
    align: "center"
    //responsive: ['sm'],
  },
  {
    title: "Stage",
    dataIndex: "stage",
    key: "stage",
    render: (stage) => <>{createStageTag(stage)}</>,
    width: 80,
  },
  {
    title: "Tags",
    dataIndex: "tags",
    key: "tags",
    render: (tags) => <>{createTag(tags)}</>,
    width: 80,
  },

];

//Student info setup

const GROUP_DATA = [
  {
    key: "1",
    hwNumber: "1",
    problemNumber: "3",
    stage: "Debugging Solution",
    tags: ["LinkedList", "Array"],
  },
  {
    key: "2",
    hwNumber: "2",
    problemNumber: "3",
    stage: "Just Started",
    tags: ["LinkedList", "Array"],
  },
  {
    key: "3",

    hwNumber: "1",
    problemNumber: "3",
    stage: "Understand Question",
    tags: ["LinkedList", "Array"],
  },
  {
    key: "4",
    hwNumber: "1",
    problemNumber: "3",
    stage: "Debugging Solution",
    tags: ["LinkedList", "Array"],
  },
  {
    key: "5",
    hwNumber: "1",
    problemNumber: "3",
    stage: "Debugging Solution",
    tags: ["LinkedList", "Array"],
  },
  {
    key: "2",
    hwNumber: "7",
    problemNumber: "12",
    stage: "Just Started",
    tags: ["Hashing"],
  },
  {
    key: "3",

    hwNumber: "10",
    problemNumber: "4",
    stage: "Just Started",
    tags: ["APT", "Array"],
  },
  {
    key: "4",
    hwNumber: "1",
    problemNumber: "3",
    stage: "Debugging Solution",
    tags: ["LinkedList", "Array"],
  },
];
