import React, { useEffect } from "react";
import { Button, Space, Col } from "antd";
import ProfileBlock from "./tools/ProfileBlock";
import { BellIcon } from "./tools/Icons";
import { connect } from "react-redux";
import selectors from "../../redux/selectors";

import soundfile from "../../static/audio/NotificationAudio.mp3";

import { joinTAVideoLink } from "../../redux/courses/actions/student";
import { Redirect } from "react-router-dom";

/**
 * Modal for alerting user that it's their turn for help
 * Redirects to /session
 * @param {Object} assistant from activeQuestion
 * @param {String} courseID
 * @param {Function } joinTAVideoLink callback to join the help session
 */
const TurnHelpModal = (props) => {
  const user = { name: props.assistant?.name, role: props.assistant?.role };

  useEffect(() => {
    const audioAlert = document.getElementsByClassName("audio-alert")[0];
    audioAlert.play();
    var interval = setInterval(function () {
      audioAlert.play();
    }, 15000);
    setTimeout(function () {
      console.log("60 secs passed");
      clearInterval(interval);
    }, 60000);
  }, []);

  return (
    <Col align="middle">
      <Redirect to={`/courses/${props.courseID}/session`} />
      <Space direction="vertical">
        <BellIcon />
        <h1>It's your turn to get help!</h1>
        <ProfileBlock user={user} />

        <Button
          size="large"
          type="primary"
          block
          href={props.assistant?.meetingURL}
          target="_blank"
          onClick={props.joinTAVideoLink}
        >
          Join Video Room
        </Button>
      </Space>
      <div>
        <audio className="audio-alert">
          <source src={soundfile}></source>
        </audio>
      </div>
    </Col>
  );
};

const mapStateToProps = (state) => {
  return {
    assistant: selectors.getAssistant(state),
    courseID: selectors.getCourseID(state),
  };
};
export default connect(mapStateToProps, { joinTAVideoLink })(TurnHelpModal);
