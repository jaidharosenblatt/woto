import React from "react";
import NumberFormat from "react-number-format";
import { Form, Select } from "antd";
import TextInput from "../../../../../components/form/TextInput";
import SubmitButton from "../../../../../components/form/SubmitButton";
const { Option } = Select;

/*
 * @matthewsclar Form component for course settings
 *
 */

//Will eventually be an API call to get the semester options at a given university
var semesteroptions = <Option />;

class CourseSettingsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { disabled: true };
  }
  onFinish = (values) => {
    console.log(values);
  };
  onChange = () => {
    this.setState({
      disabled: false,
    });
  };
  render() {
    const course = this.props.course;
    console.log(course);
    return (
      <div
        style={{
          position: "relative",
          left: "10px",
          width: "500px",
          bottom: "30px",
        }}
      >
        <Form
          layout="vertical"
          onFinish={this.onFinish}
          onFieldsChange={this.onChange}
        >
          <br />
          <br />

          <TextInput name="coursename" label="Name" placeholder={course.name} />
          <TextInput
            name="coursenumber"
            label="Course Number"
            placeholder={course.number}
          />

          <Form.Item
            name="semester"
            label="Semester"
            placeholder={course.semester}
          >
            <Select placeholder={course.semester}>{semesteroptions}</Select>
          </Form.Item>

          <TextInput
            name="studentcode"
            label="Student Entry Course Code"
            placeholder={course.studentcode}
          />

          <Form.Item
            label="Suggested Interaction Length (in minutes)"
            name="interactionlength"
            colon={false}
          >
            <NumberFormat
              className="ant-input"
              suffix={" minutes"}
              placeholder={course.interactionlength}
            />
          </Form.Item>

          <Form.Item
            label="Max Collaboration Size"
            name="collabsize"
            colon={false}
          >
            <NumberFormat
              className="ant-input"
              suffix=" students"
              placeholder={course.collabsize}
            />
          </Form.Item>

          <SubmitButton CTA="Apply Changes" disabled={this.state.disabled} />
        </Form>
      </div>
    );
  }
}

export default CourseSettingsForm;
