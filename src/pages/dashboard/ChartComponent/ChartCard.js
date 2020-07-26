import React from "react";
import { Select, Card, Row, Col } from "antd";
import ChartElement from "./ChartElement";
import MinAvgMax from "../../../components/instructorData/MinAvgMax";

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
    const styles = {
      card: {
        lineHeight: 1.25,
        backgroundColor: "#ffffff",
       // padding: "10px",
        //border: "1px solid #91D5FF",
        height: "100%",
        width: "100%"
      },
    }
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
          <p>Questions Asked</p>
        </Select.Option>
      </Select>
    );

    return (
      <div className="chartCard">
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
      </div>

    );
  }
}

export default ChartCard;
