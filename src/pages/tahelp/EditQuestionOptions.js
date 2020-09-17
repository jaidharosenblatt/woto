import React, { useContext } from "react";
import { Form, Button, Select } from "antd";
import API from "../../api/API";
import { TAHelpContext } from "./util/TAHelpContext";

const EditQuestionOptions = () => {
  const { state } = useContext(TAHelpContext);
  const course_id = state.course.course_id;
  const questionTemplate = state.course.questionTemplate;
  const [form] = Form.useForm();
  //const [disabled, setDisabled] = useState(true);
  console.log(questionTemplate);
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
    console.log(questionTemplate);
    console.log(values);

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
      const response = await API.editSession(course_id, data);
      console.log(response);
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
        //onFieldsChange={() => setDisabled(false)}
      >
        {ret}

        <Button block type="primary" htmlType="submit" disabled={false}>
          Submit Edits
        </Button>
      </Form>
    </div>
  );
};
export default EditQuestionOptions;
