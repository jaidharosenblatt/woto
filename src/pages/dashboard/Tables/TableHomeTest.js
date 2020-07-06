import React from "react";
import PastInteractions from "./PastInteractions";

//Note for Jaidha:
/*
This file is a tester for tables. The table that concerns you is "MainColabComp"
All you need to do to implement the Table for the "Student Collaboration page"
is type: 

    <MainColabComp />

It just has to be imported from "components/Tables/StudentCollaborate/MainColabComp"

*/
const TableHome = () => {
  return (
    <div className="test-tables">
      <PastInteractions
        tableData={PAST_INTERACTIONS_DATA}
        taFirstName={taFirstName}
      />
    </div>
  );
};

export default TableHome;

//FAKE DATA SOURCES

//const taFirstName = "Jaidha"

const PAST_INTERACTIONS_DATA = [
  {
    key: "1",
    firstname: "Noah",
    lastname: "Karpel",
    hwNumber: "1",
    problemNumber: "3",
    stage: "Debugging Solution",
    waitTime: "13:32",
    interactionLength: "11:30",
    time: "3:49pm",
    rating: "thumbsUp",
  },
  {
    key: "2",
    firstname: "Tommy",
    lastname: "Tilton",
    hwNumber: "2",
    problemNumber: "3",
    stage: "Just Started",
    waitTime: "24:02",
    interactionLength: "4:30",
    time: "3:45pm",
    rating: "thumbsUp",
  },
  {
    key: "3",
    firstname: "Matthew",
    lastname: "Sclar",
    hwNumber: "1",
    problemNumber: "3",
    stage: "Understand Question",
    waitTime: "12:23",
    interactionLength: "11:30",
    time: "3:15pm",
    rating: "thumbsUp",
  },
  {
    key: "4",
    firstname: "Kaden",
    lastname: "Rosenblatt",
    hwNumber: "1",
    problemNumber: "3",
    stage: "Debugging Solution",
    waitTime: "49:30",
    interactionLength: "11:30",
    time: "3:03pm",
    rating: "thumbsDown",
  },
];
