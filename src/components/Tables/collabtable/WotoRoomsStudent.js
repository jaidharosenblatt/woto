import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { HelpContext } from "../../../pages/studenthelp/util/HelpContext";
import { actions } from "../../../pages/studenthelp/util/actions";

import functions from "../../../pages/studenthelp/util/functions";
import { convertDiscussionsToColumns } from "./getCollabData";
import SearchTable from "./SearchTable";
import { seperateFields } from "./expandRow";

/**
 * @jaidharosenblatt
 * Table for collaborating with other students. Uses a current question passed
 * down form the Help page and GETs table data based on the course id
 */
const WotoRoomsStudent = (props) => {
  const { course, discussions, loading, activeDiscussion } = props;
  const authContext = useContext(AuthContext);
  const { requiredFields } = seperateFields(course);
  const userID = authContext.state.user._id;
  
  const converted = convertDiscussionsToColumns(
    discussions,
    authContext,
    requiredFields
  );

  const joinDiscussion = (discussion) => {
    props.joinDiscussion(discussion);
  };

  const colParams = { activeDiscussion, userID, joinDiscussion };

  return (
    <SearchTable
      data={[...converted]}
      course={course}
      loading={loading}
      colParams={colParams}
    />
  );
};

export default WotoRoomsStudent;
