import React, { useContext } from "react";
import { Button, Card, Space } from "antd";
import LocationTimeTag from "../../header/LocationTimeTag";
import CollapsedQuestion from "../../collapsedquestion/CollapsedQuestion";
import Timer from "react-compound-timer";
import { convertTimeAgoString } from "../../../utilfunctions/timeAgo";
import soundfile from "../../../static/audio/ItsWotoTime.mp3";
import LeftRightRow from "../../leftrightrow/LeftRightRow";
import { AuthContext } from "../../../contexts/AuthContext";

/**
 * @matthewsclar Component for TAs to see Interaction details
 *
 */

const InteractionInfo = ({ course, session, student, endInteraction }) => {
  const authContext = useContext(AuthContext);
  const notified = new Date(student.assistant?.description?.notifiedAt);
  const suggestedLength = course?.interactionLength;

  console.log(student);
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
            student.archived ? (
              <div>
                <h2>{student.name}</h2>
                {student.assistant?.description?.name && (
                  <p>Helped by {student.assistant.description.name}</p>
                )}
              </div>
            ) : (
              <h2>Helping {student.name}</h2>
            )
          }
          right={
            <Space size="middle">
              {!student.archived && <Button> Notify Again </Button>}
              <Button
                type={!student.archived && "danger"}
                onClick={endInteraction}
              >
                {student.archived ? "Close" : "End Interaction"}
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
                student.archived ? "Helped" : "Notified"
              } ${convertTimeAgoString(notified)}`}
            />
            <CollapsedQuestion words details={student.description} />
          </Space>
        }
        right={
          !student.archived && (
            <Space direction="vertical" align="right">
              <Button
                block
                type="primary"
                target="_blank"
                href={authContext.state.user.meetingURL}
              >
                Launch Video Room
              </Button>
              {suggestedLength && (
                <p style={{ color: "grey" }}>
                  Suggested Interaction Length: {suggestedLength} mins
                </p>
              )}
              <Timer
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
export default InteractionInfo;
