import React from "react";
import { Row, Col, Button, Space } from "antd";
import LocationTimeTag from "../../header/LocationTimeTag";
import CollapsedQuestion from "../../collapsedquestion/CollapsedQuestion";

/**
 * @matthewsclar Component for TAs to see Interaction details
 *
 */

const InteractionInfo = ({ details, studentName, time, location }) => {
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
        <br/>
        <CollapsedQuestion details={details} />
        <br/>
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
