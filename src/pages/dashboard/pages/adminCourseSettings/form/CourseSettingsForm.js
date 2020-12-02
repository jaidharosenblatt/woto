import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import NumberFormat from "react-number-format";
import API from "../../../../../api/API";
import { Form, Tooltip, Input, Switch } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import ArchiveCourseButton from "../../../../../components/buttons/ArchiveCourseButton";
import TextInput from "../../../../../components/form/TextInput";
import SubmitButton from "../../../../../components/form/SubmitButton";
import { connect } from "react-redux";
import actions from "../../../../../redux/sorted-courses/actionCreators";
/*
 * @matthewsclar Form component for course settings
 *
 */

const CourseSettingsForm = (props) => {
  const [disabled, setDisabled] = useState(true);
  const [courseKey, setCourseKey] = useState("");
  const history = useHistory();

  const { course } = props;
  const handleArchive = async (toArchive) => {
    await props.courseArchive(toArchive);
    history.push("/");
  };

  const onFinish = async (values) => {
    if (values.interactionLength) {
      values.interactionLength = parseInt(values.interactionLength);
    }
    if (values.collabSize) {
      values.collabSize = parseInt(values.collabSize);
    }
    try {
      const response = await API.editCourse(course._id, values);
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
      <Form
        initialValues={{ ...course }}
        layout="vertical"
        onFinish={onFinish}
        onFieldsChange={onChange}
      >
        <br />
        <br />

        <TextInput name="name" label="Name" />
        <TextInput name="code" label="Course Code" />

        {/* <Form.Item
          name="semester"
          label="Semester"
          placeholder={course.semester}
        >
          <Select placeholder={course.Semester}>{semesteroptions}</Select>
        </Form.Item> */}

        <Form.Item
          label="Suggested Interaction Length (in minutes)"
          name="interactionLength"
          colon={false}
        >
          <NumberFormat className="ant-input" suffix={" minutes"} />
        </Form.Item>

        <Form.Item
          label="Max Collaboration Size"
          name="collabSize"
          colon={false}
        >
          <NumberFormat className="ant-input" suffix=" students" />
        </Form.Item>
        <Form.Item
          label={
            <p>
              General Student Key{" "}
              <Tooltip title="Share this key with your students to allow them join your course.">
                <QuestionCircleOutlined style={{ cursor: "pointer" }} />
              </Tooltip>
            </p>
          }
        >
          <Input value={courseKey.key}></Input>
        </Form.Item>
        <Form.Item label="Enable Woto Rooms" name="wotoRoom">
          <Switch defaultChecked={course.wotoRoom} />
        </Form.Item>
        <SubmitButton CTA="Apply Changes" disabled={disabled} />
        <ArchiveCourseButton course={course} handleArchive={handleArchive} />
      </Form>
    </div>
  );
};

const { courseArchive } = actions;
export default connect(null, { courseArchive })(CourseSettingsForm);
