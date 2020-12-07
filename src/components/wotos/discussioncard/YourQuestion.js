import React from "react";
import { Card, Space } from "antd";
import CollapsedQuestion from "../../sessions/collapsedquestion/CollapsedQuestion";
import EditSubmission from "../../modals/buttons/EditSubmission";
import { connect } from "react-redux";
import { editSubmission } from "../../../redux/courses/actions/student";
import selectors from "../../../redux/selectors";

const YourQuestion = (props) => {
  const { activeQuestion, activeDiscussion, questionTemplate } = props;

  return (
    <Card
      bodyStyle={{ overflow: "scroll", marginRight: 8 }}
      title={
        <Space direction="vertical">
          <EditSubmission
            discussion={activeDiscussion?.description}
            questionTemplate={questionTemplate}
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
    questionTemplate: selectors.getQuestionTemplate(state),
    activeQuestion: selectors.getActiveQuestion(state),
    activeDiscussion: selectors.getActiveDiscussion(state),
  };
};

export default connect(mapStateToProps, { editSubmission })(YourQuestion);
