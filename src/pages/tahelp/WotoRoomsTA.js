import React, { useContext, useState, useEffect } from "react";
import { Space } from "antd";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import { AuthContext } from "../../contexts/AuthContext";
import { convertDiscussionsToColumns } from "../../components/Tables/collabtable/getCollabData";
import SearchTable from "../../components/Tables/collabtable/SearchTable";
import { seperateFields } from "../../components/Tables/collabtable/expandRow";
import AddWotoButton from "../../components/buttons/AddWotoButton";
import LeftRightRow from "../../components/leftrightrow/LeftRightRow";
import { connect } from "react-redux";
import redux from "../../redux/courses";
import { CourseContext } from "./util/CourseContext";

const WotoRoomsTA = (props) => {
  const courseID = useContext(CourseContext);
  const authContext = useContext(AuthContext);
  const [data, setData] = useState([]);
  const state = redux.select(props.courses, courseID);
  const userID = authContext.state.user._id;

  const { requiredFields } = seperateFields(state.course);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    const discussions = state.course.discussions;
    const filtered = convertDiscussionsToColumns(
      discussions,
      authContext,
      requiredFields
    );

    if (filtered && filtered.length > 0) {
      setData([...filtered]);
    }
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <LeftRightRow
        left={
          <h2>
            {state.course.code}'s Woto Rooms{" "}
            {state.loading ? (
              <LoadingOutlined />
            ) : (
              <ReloadOutlined
                onClick={() => props.loadDiscussions(courseID, userID)}
              />
            )}
          </h2>
        }
        right={
          <AddWotoButton
            videoRoom
            questionTemplate={state.course.questionTemplate}
            handleSubmit={(values) => {
              props.postDiscussion(courseID, userID, values, values.meetingURL);
            }}
          />
        }
      />

      <SearchTable data={data} course={state.course} loading={state.loading} />
    </Space>
  );
};

export default connect(redux.mapStateToProps, redux)(WotoRoomsTA);
