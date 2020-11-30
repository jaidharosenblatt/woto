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
import actions from "../../redux/courses/actionCreators";
import selectors from "../../redux/selectors";

const WotoRoomsTA = (props) => {
  const courseID = props.course?._id;
  const authContext = useContext(AuthContext);
  const [data, setData] = useState([]);
  const { course, loading } = props;
  const userID = authContext.state.user._id;

  const { requiredFields } = seperateFields(course);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    const discussions = course.discussions;
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
            {course.code}'s Woto Rooms{" "}
            {loading ? (
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
            questionTemplate={course.questionTemplate}
            handleSubmit={(values) => {
              props.postDiscussion(courseID, userID, values, values.meetingURL);
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
  };
};
const { loadDiscussions, postDiscussion } = actions;
export default connect(mapStateToProps, { loadDiscussions, postDiscussion })(
  WotoRoomsTA
);
