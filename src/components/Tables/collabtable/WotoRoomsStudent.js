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
const WotoRoomsStudent = () => {
  const authContext = useContext(AuthContext);
  const { state, dispatch } = useContext(HelpContext);
  const { requiredFields } = seperateFields(state.course);

  const [data, setData] = useState([]);

  const loadData = async () => {
    dispatch({ type: actions.SET_LOADING });
    const discussions = await functions.setDiscussions(state, dispatch);
    const converted = convertDiscussionsToColumns(
      discussions,
      authContext,
      requiredFields
    );
    setData([...converted]);
  };

  useEffect(() => {
    if (!state.discussions) {
      loadData();
    } else {
      const converted = convertDiscussionsToColumns(
        state.discussions,
        authContext,
        requiredFields
      );
      setData([...converted]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.discussion, state?.discussions]);

  const joinDiscussion = (value) => {
    functions.joinDiscussion(state, dispatch, value, authContext.state);
  };

  const colParams = { state, joinDiscussion };

  return (
    <SearchTable
      data={data}
      course={state.course}
      loading={state.loading}
      colParams={colParams}
    />
  );
};

export default WotoRoomsStudent;
