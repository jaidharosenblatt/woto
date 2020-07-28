import React from "react";
import { Select, Form, Row, Col } from "antd";
import { convertCreatedAt } from "../../../utilfunctions/timeAgo";
import { ClockCircleOutlined } from "@ant-design/icons";
const { Option } = Select;
/**
 * @MatthewSclar Component used for a time selector
 * Used on OpenSessionPage
 *This component displays two Select form items with names start and ends
 *that contain options from the nearest 15 minute interval time till
 *the end of the day with 15 minute interval step.
 *
 *Ex. If current time = 1:37 PM
 *Select will have options starting at 1:30, 1:45, 2:00, 2:15... until 11:45 PM
 */

const TimeSelector = () => {
  var upcomingtimes = [];

  const fifteenMins = 1000 * 60 * 15;
  var date = new Date(); //or use any other date
  var rounded = new Date(
    Math.floor(date.getTime() / fifteenMins) * fifteenMins
  );

  for (let i = 0; i < 40; i++) {
    const time = new Date(rounded.getTime() + i * fifteenMins);
    upcomingtimes[time] = convertCreatedAt(time);
  }

  var options = [];
  Object.keys(upcomingtimes).forEach((time) => {
    options.push(
      <Option key={time} value={time}>
        {upcomingtimes[time]}
      </Option>
    );
  });

  return (
    <div className="icon-textbox">
      <ClockCircleOutlined />

      <Row gutter={4} style={{ width: "100%" }}>
        <Col span={11}>
          <Form.Item initialValue={options[0].key} name="startTime">
            <Select showSearch>{options}</Select>
          </Form.Item>
        </Col>
        <Col align="center" span={2}>
          <p style={{ fontSize: 20, color: "#D9D9D9" }}>-</p>
        </Col>

        <Col span={11}>
          <Form.Item initialValue={options[4].key} name="endTime">
            <Select showSearch>{options}</Select>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default TimeSelector;
