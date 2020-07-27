import React from "react";
import { Select, Form, Col, Row, Space } from "antd";
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

const styles = { text: { fontSize: 20, marginBottom: 20 } };
const TimeSelector = (props) => {
  var upcomingtimes = [];

  var coeff = 1000 * 60 * 15;
  var date = new Date(); //or use any other date
  var rounded = new Date(Math.floor(date.getTime() / coeff) * coeff);

  for (let i = 0; i < 40; i++) {
    const time = new Date(rounded.getTime() + i * coeff);
    upcomingtimes[time] = convertCreatedAt(time);
  }

  var options = [];

  Object.keys(upcomingtimes).forEach((time, key) => {
    options.push(
      <Option key={time} value={time}>
        {upcomingtimes[time]}
      </Option>
    );
  });

  return (
    <Space>
      <ClockCircleOutlined style={styles.text} />
      <Form.Item name="startTime">
        <Select style={{ minWidth: 100 }} showSearch disabled={props.disabled}>
          {options}
        </Select>
      </Form.Item>
      <p style={styles.text}> -</p>

      <Form.Item name="endTime">
        <Select style={{ minWidth: 100 }} showSearch disabled={props.disabled}>
          {options}
        </Select>
      </Form.Item>
    </Space>
  );
};

export default TimeSelector;
