import React from "react";
import { Button, Card, Space, Avatar } from "antd";
import {} from "antd";
import { ClockCircleOutlined, BellOutlined } from "@ant-design/icons";
import { DefaultProfile } from "../../static/Images";
import util from "../../util";
import { connect } from "react-redux";
import selectors from "../../redux/selectors";
import {
  joinTAVideoLink,
  leaveQueue,
} from "../../redux/courses/actions/student";
import LeftRightRow from "../util-components/leftrightrow/LeftRightRow";
import EndInteractionButton from "../modals/buttons/EndInteractionButton";
import useHelpReady from "../../hooks/useHelpReady";

/**
 * @matthewsclar Component for students to recieve help for a given course
 * WORK IN PROGRESS, NOTIFICATION AND AUDIO NEEDS TO BE TESTED AND UPDATED,
 */

const BeingHelped = (props) => {
  useHelpReady(props.help);
  const timeJoined = util.convertTimeAgoString(props.help?.joinedAt);
  const timeNotified = util.convertTimeAgoString(props.help?.createdAt);
  const firstName = props.help.assistant?.name?.split(" ")[0];
  const role = props.help.assistant?.role;

  return (
    <Card
      title={
        <LeftRightRow
          left={<h2>{`You are working with ${firstName}`}</h2>}
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
            <p>{firstName}</p>
            <h3>{role}</h3>
          </Space>
        </Space>

        <Space>
          <Button
            size="large"
            type="primary"
            block
            href={props.help?.meetingURL}
            target="_blank"
            onClick={props.joinTAVideoLink}
          >
            Get Help Now!
          </Button>

          <EndInteractionButton handleLeave={props.leaveQueue} />
        </Space>
      </Space>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    activeQuestion: selectors.getActiveQuestion(state),
    help: selectors.getHelp(state),
  };
};

export default connect(mapStateToProps, { joinTAVideoLink, leaveQueue })(
  BeingHelped
);
