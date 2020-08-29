import React, { useEffect, useContext } from "react";
import { Row, Col, Avatar, Button, Card, Space } from "antd";

import { HelpContext } from "../../../pages/studenthelp/util/HelpContext";
import functions from "../../../pages/studenthelp/util/functions";
import { DefaultProfile } from "../../../static/Images";
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
  var beingHelped = false;

  if (state.question.assitant?.description.studentJoined !== null) {
    beingHelped = true;
  }

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

          <Space className="help-ready-big" size="middle">
            <Avatar src={DefaultProfile} />
            <Space direction="vertical">
              <HelpReadyInfo
                TAname={state.question.assistant?.description.name}
                position={state.question.assistant?.description.role}
                beingHelped={beingHelped}
              />

              {beingHelped ? (
                <Button type="danger" block onClick={() => console.log("end")}>
                  End Interaction
                </Button>
              ) : (
                <Button
                  type="primary"
                  block
                  onClick={() => functions.joinTAVideoLink(state, dispatch)}
                >
                  "Get Help!"
                </Button>
              )}
            </Space>
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
