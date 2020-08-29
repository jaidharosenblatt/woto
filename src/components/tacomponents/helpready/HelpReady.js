import React, { useEffect, useContext } from "react";
import { Row, Col, Button, Card, Space } from "antd";

import { HelpContext } from "../../../pages/studenthelp/util/HelpContext";
import functions from "../../../pages/studenthelp/util/functions";
import soundfile from "../../../static/audio/ItsWotoTime.mp3";
import HelpReadyInfo from "./HelpReadyInfo";
import PastCollaborators from "../../collaborators/PastCollaborators";
import "./HelpReady.css";

/**
 * @matthewsclar Component for students to recieve help for a given course
 * WORK IN PROGRESS, NOTIFICATION AND AUDIO NEEDS TO BE TESTED AND UPDATED,
 */

const HelpReady = () => {
  const { state, dispatch } = useContext(HelpContext);
  const description = state.question.assistant?.description;
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

  useEffect(() => {
    const audioAlert = document.getElementsByClassName("audio-alert")[0];
    audioAlert.play();
    PageTitleNotification.On("Help Readyy", 1000);
    setTimeout(PageTitleNotification.Off(), 10000);
  }, [PageTitleNotification]);

  return (
    <Row>
      <Col xs={24} lg={12}>
        <Card>
          <div>
            <audio className="audio-alert">
              <source src={soundfile}></source>
            </audio>
          </div>
          <Space direction="vertical" style={{ width: "100%" }}>
            <h2>It's Your Turn to Get Help!</h2>
            <HelpReadyInfo />
            <Button
              size="large"
              type="primary"
              block
              href={description.meetingURL}
              target="_blank"
              onClick={() => functions.joinTAVideoLink(state, dispatch)}
            >
              Get Help Now!
            </Button>
            {/* {description.studentJoined && (
              <Button danger block onClick={() => console.log("end")}>
                End Interaction
              </Button>
            )} */}
          </Space>
        </Card>
      </Col>
      <Col xs={24} lg={12}>
        <PastCollaborators />
      </Col>
    </Row>
  );
};

export default HelpReady;
