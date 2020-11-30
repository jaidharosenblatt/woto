import React, { useContext } from "react";
import { Card, Space } from "antd";
import { AuthContext } from "../../../../contexts/AuthContext";
import CollapsedQuestion from "../../../../components/collapsedquestion/CollapsedQuestion";
import EditSubmission from "../../../../components/buttons/EditSubmission";
import { connect } from "react-redux";
import actions from "../../../../redux/courses/actionCreators";
import selectors from "../../../../redux/courses/selectors";

const YourQuestion = (props) => {
  const authContext = useContext(AuthContext);
  const userID = authContext.state.user._id;

  const { activeQuestion, activeDiscussion, course } = props;
  const courseID = course?._id;

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
              props.editSubmission(courseID, userID, description)
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

const mapStateToProps = (state, pastProps) => {
  return {
    ...pastProps,
    activeQuestion: selectors.getActiveQuestion(state),
    activeDiscussion: selectors.getActiveDiscussion(state),
    course: selectors.getCourse(state),
  };
};

const { editSubmission } = actions;

export default connect(mapStateToProps, { editSubmission })(YourQuestion);
