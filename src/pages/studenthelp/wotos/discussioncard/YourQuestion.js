import React, { useContext } from "react";
import { Card, Space } from "antd";
import { HelpContext } from "../../util/HelpContext";
import functions from "../../util/functions";
import CollapsedQuestion from "../../../../components/collapsedquestion/CollapsedQuestion";
import EditSubmission from "../../../../components/buttons/EditSubmission";

const YourQuestion = () => {
  const { state, dispatch } = useContext(HelpContext);

  return (
    <Card
      bodyStyle={{ overflow: "scroll", marginRight: 8 }}
      title={
        <Space direction="vertical">
          <EditSubmission
            discussion={state.discussion && !state.discussion.archived}
            questionTemplate={state.course.questionTemplate}
            question={state.description}
            handleSubmit={(values) =>
              functions.editSubmission(state, dispatch, values)
            }
          />

          {state.discussionParticipant && (
            <p>Similarities with your group are highlighted</p>
          )}
        </Space>
      }
    >
      <CollapsedQuestion
        details={state.description}
        highlightKeys={state.commonValues}
        words
      />
    </Card>
  );
};
export default YourQuestion;
