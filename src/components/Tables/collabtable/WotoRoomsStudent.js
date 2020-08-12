import React, { useContext, useState, useEffect } from "react";
import { Card } from "antd";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import { AuthContext } from "../../../contexts/AuthContext";
import { HelpContext } from "../../../pages/studenthelp/util/HelpContext";
import { actions } from "../../../pages/studenthelp/util/actions";

import functions from "../../../pages/studenthelp/util/functions";
import { convertDiscussionsToColumns } from "./getCollabData";
import SearchTable from "./SearchTable";
import { seperateFields } from "./expandRow";
import AddWotoButton from "../../buttons/AddWotoButton";
import LeftRightRow from "../../leftrightrow/LeftRightRow";

/**
 * @jaidharosenblatt
 * Table for collaborating with other students. Uses a current question passed
 * down form the Help page and GETs table data based on the course id
 */
const WotoRoomsStudent = ({ addWotoButton, title }) => {
  const authContext = useContext(AuthContext);
  const { state, dispatch } = useContext(HelpContext);
  const { questionTemplate, requiredFields } = seperateFields(
    state.course?.sessionAttributes
  );

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
      console.log(state);

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
    <Card
      title={
        title && (
          <LeftRightRow
            left={
              <h2>
                {state.course.code}'s Woto Rooms{" "}
                {state.loading ? (
                  <LoadingOutlined />
                ) : (
                  <ReloadOutlined onClick={loadData} />
                )}
              </h2>
            }
            right={
              addWotoButton && (
                <AddWotoButton
                  videoRoom
                  questionTemplate={questionTemplate}
                  handleSubmit={(values) =>
                    functions.postDiscussion(state, dispatch, values)
                  }
                />
              )
            }
          />
        )
      }
    >
      <SearchTable
        data={data}
        course={state.course}
        loading={state.loading}
        colParams={colParams}
      />
    </Card>
  );
};

export default WotoRoomsStudent;
