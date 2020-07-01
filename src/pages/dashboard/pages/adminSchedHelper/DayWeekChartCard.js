import React from "react";
import { Select, Card, Row, Col } from "antd";
import DayWeekChartElement from "./DayWeekChartElement";
import MinAvgMax from "../../../../components/instructorData/MinAvgMax";

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
      <DayWeekChartElement
        list={dataList}
        choice={this.state.dataChoice}
        units={dataUnitMap[this.state.dataSource]}
        onClick={this.props.onClick}
        xAxis={this.props.dataKey}
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

    const styles = {
      card: {
        backgroundColor: "#ffffff",
        padding: "0px",
        height: "100%",
        lineHeight: 1.25,
        margin: "0px",
      },
    };

    return (
      <Card style={styles.card}>
        <Row gutter={8} align="center">
          <Col span={12}>{select}</Col>
          <Col span={12} align="right">
            <MinAvgMax
              onChange={this.onDataChoiceChange}
              initialValue={this.state.dataChoice}
              name="dataChoice"
            />
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
