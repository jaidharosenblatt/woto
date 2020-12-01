import React, { useContext } from "react";
import { Form, Button, Select } from "antd";
import { AuthContext } from "../../contexts/AuthContext";
import { connect } from "react-redux";
import actions from "../../redux/courses";
import selectors from "../../redux/selectors";

const EditQuestionOptions = (props) => {
  const courseID = props.course?._id;
  const auth = useContext(AuthContext);
  const user = auth.state.user;
  const userID = user._id;
  const { session, course } = props;

  const questionTemplate = session?.questionTemplate
    ? session.questionTemplate
    : course.questionTemplate;
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

const mapStateToProps = (state) => {
  return {
    course: selectors.getCourse(state),
    session: selectors.getSession(state),
  };
};
const { editSession } = actions;
export default connect(mapStateToProps, { editSession })(EditQuestionOptions);
