import React from "react";
import { Row, Col, Select, Form, Radio, Card, Button, Input } from "antd";
import HomeHeader from "../../HomeHeader";
import ScheduleTable from "../../../../components/Tables/admin-schedule/ScheduleTable";
import TimeSelector from "../../../ta/openjoin/TimeSelector";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "./Schedule.css";
//<RangePicker format="MMMM Do" />
/**
 * Allows admin to break down OH by day of week and time of day
 * @param {details} title ex "at a glance"
 * @param {details} description text to display under title
 * @param {course} name name of course
 * @param {course} institution school ex "duke"
 */
//add name for everything in form
class Schedule extends React.Component {
  constructor(props) {
    super(props);
    const SCHEDULE_DATA = [
      {
        key: "1",
        day: "Monday",
        startTime: "6 pm",
        endTime: "10 pm",
        teachingAssistants: ["Jaidha Rosenblatt", "Kaden Brown"],
        startDate: "6/19",
        endDate: "7/19",
      },
      {
        key: "2",
        day: "Tuesday",
        startTime: "6 pm",
        endTime: "10 pm",
        teachingAssistants: ["Tom Riddle", "Severus Snape"],
        startDate: "6/19",
        endDate: "7/19",
      },
      {
        key: "3",
        day: "Wednesday",
        startTime: "7 pm",
        endTime: "11 pm",
        teachingAssistants: ["Hermione Granger", "Hagrid Hufflepuff"],
        startDate: "6/19",
        endDate: "7/19",
      },
      {
        key: "4",
        day: "Thursday",
        startTime: "8 pm",
        endTime: "12 pm",
        teachingAssistants: ["Ronald Weasley", "Harry Potter"],
        startDate: "6/19",
        endDate: "7/19",
      },
    ];
    this.state = { weeklyRepeat: "no", dataSourceStudent: SCHEDULE_DATA };
  }

  onChange = (e) => {
    this.setState({ weeklyRepeat: e.target.value });
    console.log(this.state.weeklyRepeat);
  };

  handleDelete = (key) => {
    console.log(key);
    const dataSource = [...this.state.dataSourceStudent];
    this.setState(
      {
        dataSourceStudent: dataSource.filter((item) => item.key !== key),
      },
      () => {
        this.render();
      }
    );
  };

  renderRadio() {
    if (this.state.weeklyRepeat === "no") {
      return <></>;
    } else {
      // const rangeConfig = {
      //   rules: [
      //     { type: "array", required: true, message: "Please select time!" },
      //   ],
      // };

      return <></>;
    }
  }

  FieldForm = () => {
    // const formItemLayout = {
    //     labelCol: {
    //       sm: { span: 24 },
    //       md: { span: 4 },
    //     },
    //   wrapperCol: {
    //     sm: { span: 24 },
    //     md: { span: 14 },
    //   },
    // };
    // const formItemLayoutWithOutLabel = {
    //   wrapperCol: {
    //     sm: { span: 24, offset: 0 },
    //     md: { span: 14, offset: 4 },
    //   },
    // };

    // const config = {
    //   rules: [
    //     {
    //       type: "object",
    //       required: true,
    //       message: "Please select time!",
    //     },
    //   ],
    // };

    const dayConfig = {
      rules: [{ required: true, message: "Please select weekly repeat!" }],
    };

    const onFinish = (values) => {
      console.log("Received values of form:", values);
    };

    const styles = {
      card: {
        lineHeight: 1.25,
        backgroundColor: "#ffffff",
        // padding: "10px",
        //border: "1px solid #91D5FF",
        height: "100%",
        margin: "0px",
        //width: "100%"
      },
    };

    return (
      <Card title="Add Session" style={styles.card}>
        <Form
          // labelCol={{
          //   sm: { span: 24 },
          //   md: { span: 4 },
          // }}
          // wrapperCol={{
          //   sm: { span: 24 },
          //   md: { span: 14 },
          // }}
          layout="horizontal"
          onFinish={onFinish}
          // {...formItemLayoutWithOutLabel}
        >
          {" "}
          <Form.Item
            label="Day of Week"
            name="dayOfWeek"
            rules={[{ required: true, message: "Please select day of week!" }]}
          >
            <Select>
              <Select.Option value="Monday">Monday</Select.Option>
              <Select.Option value="Tuesday">Tuesday</Select.Option>
              <Select.Option value="Wednesday">Wednesday</Select.Option>
              <Select.Option value="Thursday">Thursday</Select.Option>
              <Select.Option value="Friday">Friday</Select.Option>
              <Select.Option value="Saturday">Saturday</Select.Option>
              <Select.Option value="Sunday">Sunday</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="weekly-repeat"
            label="Weekly Repeat"
            required="true"
            {...dayConfig}
          >
            <Radio.Group onChange={(e) => this.onChange(e)}>
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Radio.Group>
          </Form.Item>
          {this.renderRadio()}
          <TimeSelector />
          <Form.List name="names">
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map((field, index) => (
                    <Form.Item
                      label={index === 0 ? "Teaching Assistants" : ""}
                      required={false}
                      key={field.key}
                    >
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message:
                              "Please input teaching assistant's name or delete this field.",
                          },
                        ]}
                        noStyle
                      >
                        <Input
                          placeholder="Teaching Assistant"
                          style={{ width: "60%" }}
                        />
                      </Form.Item>
                      {fields.length > 0 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          style={{ margin: "0 8px" }}
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      style={{ width: "100%" }}
                    >
                      <PlusOutlined /> Add Teaching Assistant
                    </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  };

  render() {
    return (
      <div className="scheduleHelper">
        <Col span={24}>
          <br />
          <Row>
            <Col span={24}>
              <HomeHeader
                course={this.props.course.name}
                page={this.props.details.title}
                description={this.props.details.description}
              />
            </Col>
          </Row>
          <br />
          <Row justify="center">
            <Col flex="auto" span={24}>
              <ScheduleTable
                tableData={this.state.dataSourceStudent}
                removeUser={this.handleDelete}
                title="Schedule"
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col flex="auto" span={24}>
              <this.FieldForm />
            </Col>
          </Row>
        </Col>
      </div>
    );
  }
}

export default Schedule;
//DATA VARIABLES BELOW

//TABLE DATA VARIABLES
