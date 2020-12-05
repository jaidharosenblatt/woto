import React from "react";
import { Button, Card, Space } from "antd";
import LocationTimeTag from "../header/LocationTimeTag";
import CollapsedQuestion from "../collapsedquestion/CollapsedQuestion";
import Timer from "react-compound-timer";
import util from "../../../util";
import soundfile from "../../../static/audio/ItsWotoTime.mp3";
import LeftRightRow from "../../leftrightrow/LeftRightRow";
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
  meetingURL,
}) => {
  const notified = new Date(question.assistant?.description?.notifiedAt);
  const interactionLength = new Date() - notified;
  const suggestedLength = course?.interactionLength;

  var PageTitleNotification = {
    Vars: {
      OriginalTitle: document.title,
      Interval: null,
    },
    On: function(notification, intervalSpeed) {
      var _this = this;
      _this.Vars.Interval = setInterval(
        function() {
          document.title =
            _this.Vars.OriginalTitle === document.title
              ? notification
              : _this.Vars.OriginalTitle;
        },
        intervalSpeed ? intervalSpeed : 1000
      );
    },
    Off: function() {
      clearInterval(this.Vars.Interval);
      document.title = this.Vars.OriginalTitle;
    },
  };

  const playSound = () => {
    const audioAlert = document.getElementsByClassName("audio-alert")[0];
    audioAlert.play();
    PageTitleNotification.On("Help Ready", 1000);
    setTimeout(PageTitleNotification.Off(), 10000);
  };

  return (
    <Card
      style={{ margin: "8px 0" }}
      title={
        <LeftRightRow
          left={
            question.archived ? (
              <div>
                <h2>{question.student?.name}</h2>
                {question.assistant?.description?.name && (
                  <p>Helped by {question.assistant.description.name}</p>
                )}
              </div>
            ) : (
              <h2>Helping {question.student?.name}</h2>
            )
          }
          right={
            <Space size="middle">
              {!question.archived && <Button> Notify Again </Button>}
              <Button
                type={!question.archived && "danger"}
                onClick={endInteraction}
              >
                {question.archived ? "Close" : "End Interaction"}
              </Button>
            </Space>
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
              <Button block type="primary" target="_blank" href={meetingURL}>
                Launch Your Video Room
              </Button>
              {suggestedLength && (
                <p style={{ color: "grey" }}>
                  Suggested Interaction Length: {suggestedLength} mins
                </p>
              )}
              <Timer
                initialTime={interactionLength}
                formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
                checkpoints={[
                  {
                    time: 60000 * suggestedLength,
                    callback: playSound,
                  },
                ]}
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

      <div>
        <audio className="audio-alert">
          <source src={soundfile}></source>
        </audio>
      </div>
    </Card>
  );
};

const mapStateToProps = (state, prevProps) => {
  return {
    ...prevProps,
    meetingURL: selectors.getUserMeetingURL(state),
  };
};
export default connect(mapStateToProps)(InteractionInfo);
