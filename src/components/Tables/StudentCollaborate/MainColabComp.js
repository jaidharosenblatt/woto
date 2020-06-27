import React from "react";
import { Tag, Button } from "antd";
import CardTableSetup from "./CardTableSetup";

/*
@TommyTilton
This is really a data loading page. The STUDENT_COLAB_COLUMNS constant is 
array of collumns and how they should be formatted. Pass the data to
 TableComponent which will format the rest of the card.
*/
const MainColabComp = (props) => {
  return (
    <div className="past interactions main">
      <CardTableSetup
        data={STUDENT_COLAB_DATA}
        columns={STUDENT_COLAB_COLUMNS}
      />
    </div>
  );
};

export default MainColabComp;

//Assign color to Stage tag
const createTag = (stage) => {
  if (stage === "Just Started") {
    return <Tag color="green" key={stage}>{`${stage}`}</Tag>;
  } else if (stage === "Debugging Solution") {
    return <Tag color="blue" key={stage}>{`${stage}`}</Tag>;
  } else {
    return <Tag color="volcano" key={stage}>{`${stage}`}</Tag>;
  }
};

//Collumn Setup

const STUDENT_COLAB_COLUMNS = [
  {
    title: "Group Lead",
    key: "fullName",
    render: (text, record) => (
      <h4>{`${record.firstname} ${record.lastname}`}</h4>
    ),
    fixed: "left",
    width: 50,
  },
  {
    title: "Size",
    dataIndex: "size",
    key: "size",
    width: 40,
    //responsive: ['sm'],
  },
  {
    title: "HW #",
    dataIndex: "hwNumber",
    key: "hwNumber",
    width: 40,
    //responsive: ['sm'],
  },
  {
    title: "Problem #",
    dataIndex: "problemNumber",
    key: "problemNumber",
    width: 60,
    //responsive: ['sm'],
  },
  {
    title: "Stage",
    dataIndex: "stage",
    key: "stage",
    render: (stage) => <>{createTag(stage)}</>,
    width: 80,
  },
  {
    title: "Zoom Room",
    dataIndex: "link",
    key: "link",
    fixed: "center",
    width: 50,
    render: (link) => (
      <Button type="primary" href={link} target="_blank">
        Join
      </Button>
    ),
  },
];

//Student info setup

const STUDENT_COLAB_DATA = [
  {
    key: "1",
    firstname: "Noah",
    lastname: "Karpel",
    size: "1",
    hwNumber: "1",
    problemNumber: "3",
    stage: "Debugging Solution",
    link: "https://zoom.us/",
  },
  {
    key: "2",
    firstname: "Tommy",
    lastname: "Tilton",
    size: "1",
    hwNumber: "2",
    problemNumber: "3",
    stage: "Just Started",
    link: "https://zoom.us/",
  },
  {
    key: "3",
    firstname: "Matthew",
    lastname: "Sclar",
    size: "2",
    hwNumber: "1",
    problemNumber: "3",
    stage: "Understand Question",
    link: "https://zoom.us/",
  },
  {
    key: "4",
    firstname: "Kaden",
    lastname: "Rosenblatt",
    size: "2",
    hwNumber: "1",
    problemNumber: "3",
    stage: "Debugging Solution",
    link: "https://zoom.us/",
  },
];
