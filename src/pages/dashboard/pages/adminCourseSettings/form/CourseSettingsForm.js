import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import API from "../../../../../api/API";
import { Form, Select, Tooltip, Input } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import TextInput from "../../../../../components/form/TextInput";
import SubmitButton from "../../../../../components/form/SubmitButton";
const { Option } = Select;

/*
 * @matthewsclar Form component for course settings
 *
 */

//Will eventually be an API call to get the semester options at a given university
var semesteroptions = <Option />;

const CourseSettingsForm = ({ course }) => {
  const [disabled, setDisabled] = useState(true);
  const [courseKey, setCourseKey] = useState("");
  const [sessionAttributes, setSessionAttributes] = useState();

  const onFinish = async (values) => {
    //MUST SET UP THE ABILITY TO ALTER OTHER FIELDS THAN NAME AND CODE, ONCE DB is updated!
    var settings2 = {
      ...sessionAttributes,
      collabsize: values.collabsize
        ? values.collabsize
        : course.sessionAttributes.collabsize,
      interactionlength: values.interactionlength
        ? values.interactionlength
        : course.sessionAttributes.interactionlength,
    };
    var settings = {
      name: values.name ? values.name : course.name,
      code: values.code ? values.code : course.code,
      sessionAttributes: settings2,
    };

    try {
      const response = await API.editCourse(course._id, settings);
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    setDisabled(false);
  };

  useEffect(() => {
    async function fetchKey() {
      try {
        const response = await API.getGeneralKey(course._id);
        console.log(response);
        setCourseKey(response);
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchAttributes() {
      try {
        const response = await API.getCourse(course._id);
        console.log(response);
        setSessionAttributes(response.sessionAttributes);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAttributes();
    fetchKey();
  }, [course]);

  const onChange = () => {
    setDisabled(false);
  };

  return (
    <div
      style={{
        position: "relative",
        left: "10px",
        width: "500px",
        bottom: "30px",
      }}
    >
      <Form layout="vertical" onFinish={onFinish} onFieldsChange={onChange}>
        <br />
        <br />

        <TextInput name="name" label="Name" placeholder={course.name} />
        <TextInput name="code" label="Course Code" placeholder={course.code} />

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
            placeholder={
              course.sessionAttributes &&
              course.sessionAttributes.interactionlength
            }
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
            placeholder={
              course.sessionAttributes && course.sessionAttributes.collabsize
            }
          />
        </Form.Item>
        <Form.Item
          label={
            <p>
              General Student Key
              {"      "}
              <Tooltip title="Share this key with your students to allow them join your course.">
                <QuestionCircleOutlined />
              </Tooltip>
            </p>
          }
        >
          <Input value={courseKey.key}></Input>
        </Form.Item>
        <SubmitButton CTA="Apply Changes" disabled={disabled} />
      </Form>
    </div>
  );
};

export default CourseSettingsForm;
