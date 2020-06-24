import React from "react";
import { Menu, Card, Row, Col, Form } from "antd";
import ChartElement from "./ChartElement";
import DropdownMenu from "./ChartChoices";
import SegmentedControl from "../../../components/form/SegmentedControl";

class ChartCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: "waitTime", dataChoice: "min" };
  }
  //2 states, waitTime and studentsSeen
  onPageChange = (e) => {
    console.log(e.key);
    this.setState({ page: e.key });
    this.render();
  };

  handleOnChange = (e) => {
    console.log(e);
    this.setState({ dataChoice: e.target.value });
  };

  render() {
    const { dataList, updateTime } = this.props;
    let chart = null;
    let title = "";
    let menu = null;

    const menuWait = (
      <Menu styles={{ width: 500 }} onClick={this.onPageChange}>
        <Menu.Item key="waitTime">
          <h2>Wait Time</h2>
        </Menu.Item>
      </Menu>
    );

    const menuStudents = (
      <Menu onClick={this.onPageChange}>
        <Menu.Item key="studentsSeen">
          <h2>Students Seen</h2>
        </Menu.Item>
      </Menu>
    );

    if (this.state.page === "waitTime") {
      chart = (
        <ChartElement
          list={dataList}
          choice={this.state.dataChoice}
          units="minutes"
        />
      );
      title = "Wait Time";
      menu = menuStudents;
    }
    if (this.state.page === "studentsSeen") {
      chart = (
        <ChartElement
          list={dataList}
          choice={this.state.dataChoice}
          units="students"
        />
      );
      title = "Students Seen";
      menu = menuWait;
    }

    return (
      <Row align="center">
        <Col span={24}>
          <Card>
            <Row justify="center" align="top">
              <Col md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                {" "}
                <DropdownMenu
                  onChange={this.onPageChange}
                  menu={menu}
                  fill={title}
                />
              </Col>
              <Col md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
                <Form>
                  <SegmentedControl
                    key="chartSelect"
                    name="chartSelector"
                    onChange={this.handleOnChange}
                    defaultValueStart="min"
                    options={[
                      { label: "Minimum", labelMobile: "Min", value: "min" },
                      { label: "Average", labelMobile: "Avg", value: "avg" },
                      { label: "Maximum", labelMobile: "Max", value: "max" },
                    ]}
                  />
                </Form>
              </Col>
              <Col
                md={{ span: 8 }}
                lg={{ span: 8 }}
                xl={{ span: 8 }}
                align="right"
              >
                <h3>Updated {updateTime} ago</h3>
              </Col>
            </Row>
            <Row>
              <Col align="center" lg={24} sm={24}>
                {chart}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default ChartCard;
