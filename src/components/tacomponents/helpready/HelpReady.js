import React, { useEffect } from "react";
import { Row, Col, Avatar, Button, Card, Space } from "antd";

import { DefaultProfile } from "../../../static/Images";
import soundfile from "../../../static/audio/ItsWotoTime.mp3";
import HelpReadyInfo from "./HelpReadyInfo";
import "./HelpReady.css";

/**
 * @matthewsclar Component for students to recieve help for a given course
 * WORK IN PROGRESS, NOTIFICATION AND AUDIO NEEDS TO BE TESTED AND UPDATED,
 */

const HelpReady = () => {
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
    <Card className="help-ready">
      <Col span={24}>
        <Row align="middle" gutter={24}>
          <Col xs={8} md={4} align="left">
            <Avatar src={DefaultProfile} />
          </Col>
          <Col xs={16} md={20}>
            <Space direction="vertical">
              <HelpReadyInfo
                TAname="Jaidha Rosenblatt"
                position="Graduate Teaching Assistant"
                time="3"
              />
              <Button type="primary" block>
                Get Help!
              </Button>
            </Space>
          </Col>
        </Row>
      </Col>
      <div>
        <audio className="audio-alert">
          <source src={soundfile}></source>
        </audio>
      </div>
    </Card>
  );
};

export default HelpReady;
