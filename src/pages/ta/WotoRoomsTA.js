import React, { useState, useEffect } from "react";
import { Space } from "antd";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import util from "../../util";
import SearchTable from "../../components/analytics/tables/questionTable/SearchTable";
import AddWotoButton from "../../components/buttons/AddWotoButton";
import LeftRightRow from "../../components/leftrightrow/LeftRightRow";
import { connect } from "react-redux";
import {
  loadDiscussions,
  postDiscussion,
} from "../../redux/courses/actions/wotos";
import selectors from "../../redux/selectors";

const WotoRoomsTA = (props) => {
  const [data, setData] = useState([]);
  const { course, loading } = props;

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    const discussions = course.discussions;
    const filtered = util.convertDiscussionsToColumns(
      discussions,
      props.userID,
      course.questionTemplate
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
            {course.code}'s Woto Rooms{" "}
            {loading ? (
              <LoadingOutlined />
            ) : (
              <ReloadOutlined onClick={() => props.loadDiscussions()} />
            )}
          </h2>
        }
        right={
          <AddWotoButton
            videoRoom
            questionTemplate={course.questionTemplate}
            handleSubmit={(values) => {
              props.postDiscussion(values, values.meetingURL);
            }}
          />
        }
      />

      <SearchTable data={data} course={course} loading={loading} />
    </Space>
  );
};

const mapStateToProps = (state) => {
  return {
    course: selectors.getCourse(state),
    loading: selectors.getLoading(state),
    userID: selectors.getUserID(state),
  };
};
export default connect(mapStateToProps, { loadDiscussions, postDiscussion })(
  WotoRoomsTA
);
