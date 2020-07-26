import React from "react";
import { Select, Form, Space } from "antd";
import { convertCreatedAt } from "../../../utilfunctions/timeAgo";
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

class TimeSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: "",
      upcomingtimes: {},
    };
  }

  getTime = () => {
    var upcomingtimes = [];

    var coeff = 1000 * 60 * 15;
    var date = new Date(); //or use any other date
    var rounded = new Date(Math.floor(date.getTime() / coeff) * coeff);
    this.props.setStart(convertCreatedAt(rounded));
    this.props.setEnd(
      convertCreatedAt(new Date(rounded.getTime() + 4 * coeff))
    );

    for (let i = 0; i < 40; i++) {
      const time = new Date(rounded.getTime() + i * coeff);
      upcomingtimes[time] = convertCreatedAt(time);
    }

    this.setState({
      upcomingtimes: upcomingtimes,
    });
  };

  componentDidMount() {
    setTimeout(() => this.getTime(), 0);
  }

  render() {
    var options = [];
    var upcomingtimes = this.state.upcomingtimes;

    Object.keys(upcomingtimes).forEach((time, key) => {
      options.push(
        <Option key={time} value={time}>
          {" "}
          {upcomingtimes[time]}{" "}
        </Option>
      );
    });

    return (
      <Space>
        <Form.Item>
          <Select
            showSearch
            onChange={(value) => this.props.setStart(value)}
            value={this.props.start}
            disabled={this.props.disabled}
            style={{ width: "107px" }}
          >
            {options}
          </Select>
        </Form.Item>
        <p style={{ position: "relative", bottom: "10px" }}>-</p>
        <Form.Item>
          <Select
            showSearch
            onChange={(value) => this.props.setEnd(value)}
            value={this.props.end}
            disabled={this.props.disabled}
            style={{ width: "107px" }}
          >
            {options}
          </Select>
        </Form.Item>
      </Space>
    );
  }
}

export default TimeSelector;
