import React, { useState, useEffect, useContext } from "react";
import NumberFormat from "react-number-format";
import API from "../../../../../api/API";
import { Form, Select, Tooltip, Input, Switch } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import ArchiveCourseButton from "../../../../../components/buttons/ArchiveCourseButton";
import TextInput from "../../../../../components/form/TextInput";
import SubmitButton from "../../../../../components/form/SubmitButton";
import { CoursesContext } from "../../../../../contexts/CoursesContext";
const { Option } = Select;

/*
 * @matthewsclar Form component for course settings
 *
 */

//Will eventually be an API call to get the semester options at a given university
var semesteroptions = <Option />;

const CourseSettingsForm = ({ course }) => {
  const { courses, setCourses } = useContext(CoursesContext);
  const [disabled, setDisabled] = useState(true);
  const [courseKey, setCourseKey] = useState("");
  const [sessionAttributes, setSessionAttributes] = useState();
  var bool; //determines value of wotoroom enable switch

  const handleArchive = async (course) => {
    await API.editCourse(course._id, { archived: true });
    const temp = courses.filter((item) => item._id !== course._id);
    setCourses([...temp]);
  };

  const onFinish = async (values) => {
    console.log(values);
    var settings2 = {
      ...sessionAttributes,
      collabsize: values.collabsize
        ? values.collabsize
        : course.sessionAttributes?.collabsize,
      interactionlength: values.interactionlength
        ? values.interactionlength
        : course.sessionAttributes?.interactionlength,
      wotoroom: values.wotoroom
        ? values.wotoroom
        : course.sessionAttributes?.wotoroom,
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
  //set wotoroom enable switch on by default
  if (course.sessionAttributes?.wotoroom === false) {
    bool = course.sessionAttributes.wotoroom;
  } else {
    bool = true;
  }
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
            placeholder={course.sessionAttributes?.interactionlength}
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
            placeholder={course.sessionAttributes?.collabsize}
          />
        </Form.Item>
        <Form.Item
          label={
            <p>
              General Student Key
              {"      "}
              <Tooltip title="Share this key with your students to allow them join your course.">
                <QuestionCircleOutlined style={{ cursor: "pointer" }} />
              </Tooltip>
            </p>
          }
        >
          <Input value={courseKey.key}></Input>
        </Form.Item>
        <Form.Item label="Enable Woto Rooms" name="wotoroom">
          <Switch defaultChecked={bool} />
        </Form.Item>
        <SubmitButton CTA="Apply Changes" disabled={disabled} />
        <ArchiveCourseButton course={course} handleArchive={handleArchive} />
      </Form>
    </div>
  );
};

export default CourseSettingsForm;
