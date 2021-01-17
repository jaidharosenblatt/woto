import React from "react";
import { useHistory } from "react-router-dom";

import NumberFormat from "react-number-format";
import { Form, Switch } from "antd";
import ArchiveCourseButton from "../../../modals/buttons/ArchiveCourseButton";
import TextInput from "../../../form/TextInput";
import SubmitButton from "../../../form/SubmitButton";
import { connect } from "react-redux";
import {
  courseArchive,
  editCourse,
} from "../../../../redux/sorted-courses/actionCreators";
import selectors from "../../../../redux/selectors";
/*
 * @matthewsclar Form component for course settings
 *
 */

const CourseSettingsForm = (props) => {
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
    await props.editCourse(values);
  };

  return (
    <Form initialValues={{ ...course }} layout="vertical" onFinish={onFinish}>
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

      <Form.Item label="Max Collaboration Size" name="collabSize" colon={false}>
        <NumberFormat className="ant-input" suffix=" students" />
      </Form.Item>

      <Form.Item label="Enable Woto Rooms" name="wotoRoom">
        <Switch defaultChecked={course.wotoRoom} />
      </Form.Item>
      <SubmitButton loading={props.loading} CTA="Apply Changes" />
      <ArchiveCourseButton course={course} handleArchive={handleArchive} />
    </Form>
  );
};

const mapStateToProps = (state) => {
  return { loading: selectors.getLoading(state) };
};
export default connect(mapStateToProps, { courseArchive, editCourse })(
  CourseSettingsForm
);
