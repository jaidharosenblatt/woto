import React, { useContext } from "react";
import { Form, Button, Select } from "antd";
import { CourseContext } from "./util/CourseContext";
import { AuthContext } from "../../contexts/AuthContext";
import { connect } from "react-redux";
import { select, editSession } from "../../ducks/courses";

const EditQuestionOptions = (props) => {
  const courseID = useContext(CourseContext);
  const auth = useContext(AuthContext);
  const user = auth.state.user;
  const userID = user._id;
  const state = select(props.courses, courseID);

  const questionTemplate = state.session?.questionTemplate
    ? state.session.questionTemplate
    : state.course.questionTemplate;
  const [form] = Form.useForm();
  var ret = [];
  var fieldsEditted = [];

  questionTemplate.forEach((field, key) => {
    if (field.type === "select" || field.type === "tags") {
      fieldsEditted.push(field.label.toLowerCase());
      ret.push(
        <Form.Item
          key={key}
          name={field.label.toLowerCase()}
          label={field.label}
        >
          <Select
            mode="tags"
            showArrow={false}
            style={{
              maxHeight: "96px",
              overflow: "auto",
              alignItems: "baseline",
              whiteSpace: "nowrap",
            }}
            dropdownStyle={{ display: "none" }}
          />
        </Form.Item>
      );
      var temp = {};
      temp[field.label.toLowerCase()] = field.options;
      form.setFieldsValue(temp);
    }
  });

  const onConfirm = async (values) => {
    var temp = questionTemplate;
    var count = 0;
    var i = 0;

    while (count < Object.keys(values).length && i < temp.length) {
      if (Object.keys(values)[count] === temp[i].label.toLowerCase()) {
        temp[i].options = values[Object.keys(values)[count]];
        count++;
      }
      i++;
    }

    const data = { questionTemplate: temp };
    try {
      props.editSession(courseID, userID, data, user.meetingURL);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="field-edit-wrapper">
      <Form
        onFinish={onConfirm}
        form={form}
        layout="vertical"
        style={{ maxWidth: 450 }}
      >
        {ret}

        <Button block type="primary" htmlType="submit" disabled={false}>
          Submit Edits
        </Button>
      </Form>
    </div>
  );
};

const mapStateToProps = (state, prevProps) => {
  return {
    courses: state.courses,
    ...prevProps,
  };
};

export default connect(mapStateToProps, { editSession })(EditQuestionOptions);
