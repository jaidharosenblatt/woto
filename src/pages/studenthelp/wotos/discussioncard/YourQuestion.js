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
      headStyle={{ padding: "12px 16px" }}
      title={
        <Space direction="vertical">
          <EditSubmission
            questionTemplate={state.course?.sessionAttributes?.questionTemplate}
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
