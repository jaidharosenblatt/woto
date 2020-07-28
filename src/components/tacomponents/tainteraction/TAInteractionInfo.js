import React from "react";
import { Row, Col, Button, Space } from "antd";
import LocationTimeTag from "../../header/LocationTimeTag";
import CollapsedQuestion from "../../collapsedquestion/CollapsedQuestion";
import Timer from "react-compound-timer";

import soundfile from "../../../static/audio/ItsWotoTime.mp3";

/**
 * @matthewsclar Component for TAs to see Interaction details
 *
 */

const InteractionInfo = ({
  details,
  studentName,
  time,
  location,
  suggestedLength,
}) => {
  var timeStrings = suggestedLength.split(" ");
  var suggestedTime = parseInt(timeStrings[0]);
  suggestedTime = 1;

  var PageTitleNotification = {
    Vars: {
      OriginalTitle: document.title,
      Interval: null,
    },
    On: function (notification, intervalSpeed) {
      var _this = this;
      _this.Vars.Interval = setInterval(
        function () {
          document.title =
            _this.Vars.OriginalTitle === document.title
              ? notification
              : _this.Vars.OriginalTitle;
        },
        intervalSpeed ? intervalSpeed : 1000
      );
    },
    Off: function () {
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
    <Space direction="vertical">
      <h2 className="InteractionTitle">
        <b> Helping {studentName} </b>
      </h2>
      <Space direction="vertical">
        <Row align="left">
          <Col align="left">
            <Space align="center" size={2}>
              <LocationTimeTag
                location={location}
                time={`Notified ${time} minutes ago`}
              />
            </Space>
          </Col>
        </Row>
        <br />
        <CollapsedQuestion details={details} />

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
        <Row>
          <Space size="middle">
            <Button> Notify Again </Button>
            <Button type="danger"> End Interaction</Button>
          </Space>
        </Row>
      </Space>
      <div>
        <audio className="audio-alert">
          <source src={soundfile}></source>
        </audio>
      </div>
    </Space>
  );
};
export default InteractionInfo;
