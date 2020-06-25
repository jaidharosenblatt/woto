import React from "react";
import { Select, Card, Row, Col, Form } from "antd";
import ChartElement from "./ChartElement";
import SegmentedControl from "../../../components/form/SegmentedControl";

const dataUnitMap = { waitTime: "minutes", studentsSeen: "students" };
/**
 * @tommytilton @jaidharosenblatt
 * Render a chart where user can select data field whether to show
 * min/max/avg stats about it
 * @param {props} dataList list of data to display
 * @param {props} updateTime time chart's data was last updated
 */
class ChartCard extends React.Component {
  state = { dataSource: "waitTime", dataChoice: "avg" };

  onDataSourceChange = (value) => {
    this.setState({ dataSource: value });
  };

  onDataChoiceChange = (e) => {
    this.setState({ dataChoice: e.target.value });
  };

  render() {
    const { dataList, updateTime } = this.props;
    const chart = (
      <ChartElement
        list={dataList}
        choice={this.state.dataChoice}
        units={dataUnitMap[this.state.dataSource]}
      />
    );

    const select = (
      <Select
        onChange={this.onDataSourceChange}
        defaultValue={this.state.dataSource}
        style={{ width: "100%", maxWidth: "200px" }}
      >
        <Select.Option key="waitTime">
          <p>Wait Time</p>
        </Select.Option>
        <Select.Option key="studentsSeen">
          <p>Students Seen</p>
        </Select.Option>
      </Select>
    );

    return (
      <Card style={{ lineHeight: 2 }}>
        <Row gutter={8} align="center">
          <Col span={12}>{select}</Col>
          <Col span={12} align="right">
            <Form>
              <SegmentedControl
                maxWidth="300px"
                key="chartSelect"
                name="chartSelector"
                onChange={this.onDataChoiceChange}
                initialValue={this.state.dataChoice}
                options={[
                  { label: "Minimum", labelMobile: "Min", value: "min" },
                  { label: "Average", labelMobile: "Avg", value: "avg" },
                  { label: "Maximum", labelMobile: "Max", value: "max" },
                ]}
              />
            </Form>
          </Col>
        </Row>
        <Row>
          <Col span={12}></Col>
        </Row>
        <Row>
          <Col align="center" span={24}>
            {chart}
          </Col>
        </Row>
        <Row>
          <Col align="right" span={24}>
            <h3>Updated {updateTime} ago</h3>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default ChartCard;
