import React from "react";
import NumberFormat from "react-number-format";
import API from "../../../../../api/API";
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
    this.state = { disabled: true, courseKey: "" };
  }
  onFinish = async (values) => {
    //MUST SET UP THE ABILITY TO ALTER OTHER FIELDS THAN NAME AND CODE, ONCE DB is updated!
    var settings = {
      name: values.name,
      code: values.code,
    };
    try {
      const response = await API.editCourse(this.props.course._id, settings);
      console.log(response);
      console.log("SUCCESS!");
    } catch (error) {
      console.log(error);
    }
    this.setState({
      disabled: true,
    });
  };

  componentDidMount = async () => {
    try {
      const response = await API.getGeneralKey(this.props.course._id);
      console.log(response);
      this.setState({
        courseKey: response,
      });
    } catch (error) {
      console.log(error);
    }
  };

  onChange = () => {
    this.setState({
      disabled: false,
    });
  };
  render() {
    const course = this.props.course;

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

          <TextInput name="name" label="Name" placeholder={course.name} />
          <TextInput
            name="coursenumber"
            label="Course Number"
            placeholder={course.code}
          />

          <Form.Item
            name="semester"
            label="Semester"
            placeholder={course.semester}
          >
            <Select placeholder={course.semester}>{semesteroptions}</Select>
          </Form.Item>

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

          <p>General Student Key: {this.state.courseKey.key}</p>

          <SubmitButton CTA="Apply Changes" disabled={this.state.disabled} />
        </Form>
      </div>
    );
  }
}

export default CourseSettingsForm;
