import React from "react";
import { Select, Form, Space } from "antd";
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
const TimeSelector = () => {
  var upcomingtimes = [];

  const fifteenMins = 1000 * 60 * 15;
  const hour = 1000 * 60 * 60;
  var date = new Date(); //or use any other date
  var rounded = new Date(
    Math.floor(date.getTime() / fifteenMins) * fifteenMins
  );

  const initialStart = convertCreatedAt(rounded);
  var initialEnd = convertCreatedAt(new Date(rounded.getTime() + hour));

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
    <Space>
      <ClockCircleOutlined style={styles.text} />
      <Form.Item initialValue={initialStart} name="startTime">
        <Select style={{ minWidth: 150 }} showSearch>
          {options}
        </Select>
      </Form.Item>
      <p style={styles.text}> -</p>

      <Form.Item initialValue={initialEnd} name="endTime">
        <Select style={{ minWidth: 150 }} showSearch>
          {options}
        </Select>
      </Form.Item>
    </Space>
  );
};

export default TimeSelector;
