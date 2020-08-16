import React from "react";
import { Button, Space } from "antd";
import LocationTimeTag from "../../header/LocationTimeTag";
import CollapsedQuestion from "../../collapsedquestion/CollapsedQuestion";
import Timer from "react-compound-timer";
import { convertTimeAgoString } from "../../../utilfunctions/timeAgo";
import soundfile from "../../../static/audio/ItsWotoTime.mp3";
import LeftRightRow from "../../leftrightrow/LeftRightRow";

/**
 * @matthewsclar Component for TAs to see Interaction details
 *
 */

const InteractionInfo = ({ course, session, student, endInteraction }) => {
  const notified = new Date();
  var timeStrings = course.sessionAttributes?.suggestedLength?.split(" ");
  const suggestedLength = course.sessionAttributes?.suggestedInteractionLength;

  var suggestedTime = timeStrings && parseInt(timeStrings[0]);
  suggestedTime = 12;

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
    PageTitleNotification.On("Help Readyy", 1000);
    setTimeout(PageTitleNotification.Off(), 10000);
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <LeftRightRow
        left={
          <Space direction="vertical">
            <h2>Helping {student.name}</h2>
            <LocationTimeTag
              location={session.location}
              time={`Notified ${convertTimeAgoString(notified)}`}
            />
          </Space>
        }
        right={
          <Space size="middle">
            <Button> Notify Again </Button>
            <Button type="danger" onClick={endInteraction}>
              End Interaction
            </Button>
          </Space>
        }
      />

      <LeftRightRow
        left={<CollapsedQuestion details={student.description} />}
        right={
          <>
            <p style={{ color: "grey" }}>
              Suggested Interaction Length: {suggestedLength}
            </p>
            <Timer
              formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
              checkpoints={[
                {
                  time: 60000 * suggestedTime,
                  callback: playSound,
                },
              ]}
            >
              Current Interaction Length: <Timer.Minutes />:
              <Timer.Seconds
                formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
              />
            </Timer>
          </>
        }
      />

      <div>
        <audio className="audio-alert">
          <source src={soundfile}></source>
        </audio>
      </div>
    </Space>
  );
};
export default InteractionInfo;
