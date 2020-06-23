import React from "react";
import { Row, Col, Button, Space } from "antd";
import {
  AssignmentIcon,
  PageIcon,
  ListIcon,
  HelpIcon,
} from "../../../static/Images";
import LocationTimeTag from "../../header/LocationTimeTag";

/**
 * @matthewsclar Component for TAs to see Interaction details
 *
 */

const InteractionInfo = ({
  studentName,
  assignment,
  problem,
  place,
  question,
  time,
  location,
}) => {
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

        <Row>
          <Space size="middle">
            <img className="" src={AssignmentIcon} />
            <p className="InteractionUserInfo"> Assignment {assignment} </p>
          </Space>
        </Row>

        <Row>
          <Space size="middle">
            <img className="InteractionPageIcon" src={PageIcon} />
            <p className="InteractionUserInfo"> Problem {problem} </p>
          </Space>
        </Row>

        <Row>
          <Space size="middle">
            <img className="" src={ListIcon} />
            <p className="InteractionUserInfo">{place} </p>
          </Space>
        </Row>

        <Row>
          <Space size="middle">
            <img className="" src={HelpIcon} />
            <p className="InteractionUserInfo"> {question} </p>
          </Space>
        </Row>

        <Row>
          <Space size="middle">
            <Button> Notify Again </Button>
            <Button type="danger"> End Interaction</Button>
          </Space>
        </Row>
      </Space>
    </Space>
  );
};
export default InteractionInfo;
