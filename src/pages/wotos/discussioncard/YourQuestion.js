import React from "react";
import { Card, Space } from "antd";
import CollapsedQuestion from "../../../components/collapsedquestion/CollapsedQuestion";
import EditSubmission from "../../../components/buttons/EditSubmission";
import { connect } from "react-redux";
import { editSubmission } from "../../../redux/courses/actions/student";
import selectors from "../../../redux/selectors";

const YourQuestion = (props) => {
  const { activeQuestion, activeDiscussion, course } = props;

  return (
    <Card
      bodyStyle={{ overflow: "scroll", marginRight: 8 }}
      title={
        <Space direction="vertical">
          <EditSubmission
            discussion={activeDiscussion?.description}
            questionTemplate={course?.questionTemplate}
            question={activeQuestion?.description}
            handleSubmit={(description) => props.editSubmission(description)}
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

export default connect(mapStateToProps, { editSubmission })(YourQuestion);
