import React from "react";
import { Button, Card, Space } from "antd";
import LocationTimeTag from "../header/LocationTimeTag";
import CollapsedQuestion from "../collapsedquestion/CollapsedQuestion";
import Timer from "react-compound-timer";
import util from "../../../util";
import LeftRightRow from "../../util-components/leftrightrow/LeftRightRow";
import { connect } from "react-redux";
import selectors from "../../../redux/selectors";

/**
 * @matthewsclar Component for TAs to see Interaction details
 *
 */

const InteractionInfo = ({
  course,
  session,
  question,
  endInteraction,
  help,
  meetingURL,
}) => {
  const notified = new Date(help?.createdAt);
  const interactionLength = new Date() - notified;
  const suggestedLength = course?.interactionLength;

  return (
    <Card
      style={{ margin: "8px 0" }}
      title={
        <LeftRightRow
          left={
            question.archived ? (
              <div>
                <h2>{question.student?.name}</h2>
                {help?.assistant?.name && (
                  <p>Helped by {help.assistant.name}</p>
                )}
              </div>
            ) : (
              <h2>Helping {question.student?.name}</h2>
            )
          }
          right={
            <Button
              type={!question.archived && "danger"}
              onClick={endInteraction}
            >
              {question.archived ? "Close" : "End Interaction"}
            </Button>
          }
        />
      }
    >
      <LeftRightRow
        left={
          <Space direction="vertical">
            <LocationTimeTag
              location={session.location}
              time={`${
                question.archived ? "Helped" : "Notified"
              } ${util.convertTimeAgoString(notified)}`}
            />
            <CollapsedQuestion words details={question.description} />
          </Space>
        }
        right={
          !question.archived && (
            <Space direction="vertical" align="right">
              {suggestedLength && (
                <p style={{ color: "grey" }}>
                  Suggested Interaction Length: {suggestedLength} mins
                </p>
              )}
              <Timer
                initialTime={interactionLength}
                formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
              >
                Current Interaction Length: <Timer.Minutes />:
                <Timer.Seconds
                  formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
                />
              </Timer>
            </Space>
          )
        }
      />
    </Card>
  );
};

const mapStateToProps = (state, prevProps) => {
  return {
    ...prevProps,
    help: selectors.getHelp(state),
    question: selectors.getActiveQuestion(state),
    meetingURL: selectors.getUserMeetingURL(state),
  };
};
export default connect(mapStateToProps)(InteractionInfo);
