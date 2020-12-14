import React from "react";
import { Button, Card, Space, Avatar } from "antd";
import {} from "antd";
import { ClockCircleOutlined, BellOutlined } from "@ant-design/icons";
import { DefaultProfile } from "../../static/Images";
import util from "../../util";
// import soundfile from "../../../static/audio/ItsWotoTime.mp3";
// import PastCollaborators from "../past-collaborators/PastCollaborators";
import { connect } from "react-redux";
import selectors from "../../redux/selectors";
import {
  joinTAVideoLink,
  leaveQueue,
} from "../../redux/courses/actions/student";
import LeftRightRow from "../util-components/leftrightrow/LeftRightRow";
import EndInteractionButton from "../modals/buttons/EndInteractionButton";

/**
 * @matthewsclar Component for students to recieve help for a given course
 * WORK IN PROGRESS, NOTIFICATION AND AUDIO NEEDS TO BE TESTED AND UPDATED,
 */

const BeingHelped = (props) => {
  const { activeQuestion } = props;
  const description = activeQuestion?.assistant?.description;
  const timeJoined = util.convertTimeAgoString(description?.studentJoined);
  const timeNotified = util.convertTimeAgoString(description?.notifiedAt);

  // var PageTitleNotification = {
  //   Vars: {
  //     OriginalTitle: document.title,
  //     Interval: null,
  //   },
  //   On: function (notification, intervalSpeed) {
  //     var _this = this;
  //     _this.Vars.Interval = setInterval(
  //       function () {
  //         document.title =
  //           _this.Vars.OriginalTitle === document.title
  //             ? notification
  //             : _this.Vars.OriginalTitle;
  //       },
  //       intervalSpeed ? intervalSpeed : 1000
  //     );
  //   },
  //   Off: function () {
  //     clearInterval(this.Vars.Interval);
  //     document.title = this.Vars.OriginalTitle;
  //   },
  // };

  // useEffect(() => {
  //   const audioAlert = document.getElementsByClassName("audio-alert")[0];
  //   audioAlert.play();
  //   PageTitleNotification.On("Help Readyy", 0);
  //   setTimeout(PageTitleNotification.Off(), 10000);
  // }, [PageTitleNotification]);

  return (
    <Card
      title={
        <LeftRightRow
          left={<h2>It's Your Turn!</h2>}
          right={
            <Space>
              <h3>
                <BellOutlined /> Notified {timeNotified}
              </h3>
              {timeJoined && (
                <h3>
                  <ClockCircleOutlined /> Joined {timeJoined}
                </h3>
              )}
            </Space>
          }
        />
      }
    >
      <Space className="help-ready-interaction" direction="vertical">
        <Space>
          <Avatar size="large" src={DefaultProfile} />
          <Space direction="vertical" size={2}>
            <p>{description?.name}</p>
            <h3>{description?.role}</h3>
          </Space>
        </Space>

        <Space>
          <Button
            size="large"
            type="primary"
            block
            href={description?.meetingURL}
            target="_blank"
            onClick={props.joinTAVideoLink}
          >
            Get Help Now!
          </Button>

          <EndInteractionButton handleLeave={props.leaveQueue} />
        </Space>
      </Space>

      {/* <div>
        <audio className="audio-alert">
          <source src={soundfile}></source>
        </audio>
      </div> */}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    activeQuestion: selectors.getActiveQuestion(state),
  };
};

export default connect(mapStateToProps, { joinTAVideoLink, leaveQueue })(
  BeingHelped
);
