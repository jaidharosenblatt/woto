import React, { useContext } from "react";
import { Card, Space } from "antd";
import { CourseContext } from "../../util/CourseContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import CollapsedQuestion from "../../../../components/collapsedquestion/CollapsedQuestion";
import EditSubmission from "../../../../components/buttons/EditSubmission";
import { connect } from "react-redux";
import redux from "../../../../redux/courses";

const YourQuestion = ({ courses, editSubmission }) => {
  const courseID = useContext(CourseContext);
  const authContext = useContext(AuthContext);
  const userID = authContext.state.user._id;

  const { activeQuestion, activeDiscussion, course } = redux.select(
    courses,
    courseID
  );

  return (
    <Card
      bodyStyle={{ overflow: "scroll", marginRight: 8 }}
      title={
        <Space direction="vertical">
          <EditSubmission
            discussion={activeDiscussion?.description}
            questionTemplate={course?.questionTemplate}
            question={activeQuestion?.description}
            handleSubmit={(description) =>
              editSubmission(courseID, userID, description)
            }
          />
        </Space>
      }
    >
      <CollapsedQuestion
        details={
          activeQuestion?.description
            ? activeQuestion?.description
            : activeDiscussion?.description
        }
        highlightKeys={null}
        words
      />
    </Card>
  );
};

export default connect(redux.mapStateToProps, redux)(YourQuestion);
