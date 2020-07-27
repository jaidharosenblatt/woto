import React from "react";
import { Row, Col, Button, Space } from "antd";
import LocationTimeTag from "../../header/LocationTimeTag";
import CollapsedQuestion from "../../collapsedquestion/CollapsedQuestion";
import Timer from "react-compound-timer";

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
  var temp = suggestedLength.split(" ");
  var suggestedTime = parseInt(temp[0]);

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
              callback: () => console.log("Checkpoint A"),
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
    </Space>
  );
};
export default InteractionInfo;
